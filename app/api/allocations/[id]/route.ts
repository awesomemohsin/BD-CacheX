import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { Allocation } from '@/lib/models/Allocation';
import { Server } from '@/lib/models/Server';
import { CacheProvider } from '@/lib/models/CacheProvider';
import { Company } from '@/lib/models/Company';
import { logActivity } from '@/lib/logging';

async function updateServerUsedCapacity(serverId: any) {
  if (!serverId) return;
  const allocations = await Allocation.find({ serverId, status: 'Active' });
  const usedCapacity = allocations.reduce((sum, alloc) => sum + alloc.capacityGB, 0);
  await Server.findByIdAndUpdate(serverId, { usedCapacityGB: usedCapacity });
}

async function updateCacheProviderStats(cacheProviderId: any) {
  if (!cacheProviderId) return;
  const allocations = await Allocation.find({ cacheProviderId, status: 'Active' });
  const serverCount = allocations.reduce((sum, a) => sum + (a.serverCount || 1), 0);
  const totalCapacity = allocations.reduce((sum, a) => sum + a.capacityGB, 0);
  
  await CacheProvider.findByIdAndUpdate(cacheProviderId, {
    serverCount,
    totalCapacity,
    usedServerCount: serverCount,
    usedCapacity: totalCapacity,
  });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;
    
    const allocation = await Allocation.findById(id);
    if (!allocation) {
      return NextResponse.json({ success: false, error: 'Allocation not found' }, { status: 404 });
    }

    const [company, provider, server] = await Promise.all([
      Company.findById(allocation.companyId),
      CacheProvider.findById(allocation.cacheProviderId),
      Server.findById(allocation.serverId),
    ]);
    const cpName = provider ? `${provider.shortCode} - ${provider.name}` : 'Unknown';
    const compName = company ? company.name : 'Unknown';
    const srvName = server ? server.name : 'Unknown';
    const details = `Deleted allocation of ${allocation.capacityGB} GB from ${cpName} to ${compName} on server ${srvName}`;
    await logActivity(request, 'DELETE', 'Allocation', details);

    const serverId = allocation.serverId;
    const cacheProviderId = allocation.cacheProviderId;
    await Allocation.findByIdAndDelete(id);

    await updateServerUsedCapacity(serverId);
    await updateCacheProviderStats(cacheProviderId);

    return NextResponse.json({ success: true, data: { id } });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;
    const body = await request.json();
    
    const oldAllocation = await Allocation.findById(id);
    if (!oldAllocation) {
      return NextResponse.json({ success: false, error: 'Allocation not found' }, { status: 404 });
    }

    const [oldComp, oldProv, oldSrv] = await Promise.all([
      Company.findById(oldAllocation.companyId),
      CacheProvider.findById(oldAllocation.cacheProviderId),
      Server.findById(oldAllocation.serverId),
    ]);
    const cpName = oldProv ? `${oldProv.shortCode} - ${oldProv.name}` : 'Unknown';
    const compName = oldComp ? oldComp.name : 'Unknown';
    const srvName = oldSrv ? oldSrv.name : 'Unknown';
    const details = `Updated allocation of ${oldAllocation.capacityGB} GB from ${cpName} to ${compName} on server ${srvName}`;
    const userEmail = await logActivity(request, 'UPDATE', 'Allocation', details);

    const oldServerId = oldAllocation.serverId;
    const oldProviderId = oldAllocation.cacheProviderId;
    
    const updatedAllocation = await Allocation.findByIdAndUpdate(
      id,
      {
        ...body,
        updatedBy: userEmail,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (updatedAllocation) {
      await updateServerUsedCapacity(updatedAllocation.serverId);
      if (oldServerId.toString() !== updatedAllocation.serverId.toString()) {
        await updateServerUsedCapacity(oldServerId);
      }
      
      await updateCacheProviderStats(updatedAllocation.cacheProviderId);
      if (oldProviderId && oldProviderId.toString() !== updatedAllocation.cacheProviderId.toString()) {
        await updateCacheProviderStats(oldProviderId);
      }
    }

    return NextResponse.json({ success: true, data: updatedAllocation });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
