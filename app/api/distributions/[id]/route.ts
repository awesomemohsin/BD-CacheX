import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { Distribution } from '@/lib/models/Distribution';
import { Server } from '@/lib/models/Server';
import { CacheProvider } from '@/lib/models/CacheProvider';
import { Company } from '@/lib/models/Company';
import { logActivity } from '@/lib/logging';

async function updateServerUsedCapacity(serverId: any) {
  if (!serverId) return;
  const distributions = await Distribution.find({ serverId, status: 'Active' });
  const usedCapacity = distributions.reduce((sum, dist) => sum + dist.capacityGB, 0);
  await Server.findByIdAndUpdate(serverId, { usedCapacityGB: usedCapacity });
}

async function updateCacheProviderStats(cacheProviderId: any) {
  if (!cacheProviderId) return;
  const distributions = await Distribution.find({ cacheProviderId, status: 'Active' });
  const serverCount = distributions.reduce((sum, d) => sum + (d.serverCount || 1), 0);
  const totalCapacity = distributions.reduce((sum, d) => sum + d.capacityGB, 0);
  
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
    
    const distribution = await Distribution.findById(id);
    if (!distribution) {
      return NextResponse.json({ success: false, error: 'Distribution not found' }, { status: 404 });
    }

    const [company, provider, server] = await Promise.all([
      Company.findById(distribution.companyId),
      CacheProvider.findById(distribution.cacheProviderId),
      Server.findById(distribution.serverId),
    ]);
    const cpName = provider ? `${provider.shortCode} - ${provider.name}` : 'Unknown';
    const compName = company ? company.name : 'Unknown';
    const srvName = server ? server.name : 'Unknown';
    const details = `Deleted distribution of ${distribution.capacityGB} GB from ${cpName} to ${compName} on server ${srvName}`;
    await logActivity(request, 'DELETE', 'Distribution', details);

    const serverId = distribution.serverId;
    const cacheProviderId = distribution.cacheProviderId;
    await Distribution.findByIdAndDelete(id);

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
    
    const oldDistribution = await Distribution.findById(id);
    if (!oldDistribution) {
      return NextResponse.json({ success: false, error: 'Distribution not found' }, { status: 404 });
    }

    const [oldComp, oldProv, oldSrv] = await Promise.all([
      Company.findById(oldDistribution.companyId),
      CacheProvider.findById(oldDistribution.cacheProviderId),
      Server.findById(oldDistribution.serverId),
    ]);
    const cpName = oldProv ? `${oldProv.shortCode} - ${oldProv.name}` : 'Unknown';
    const compName = oldComp ? oldComp.name : 'Unknown';
    const srvName = oldSrv ? oldSrv.name : 'Unknown';
    const details = `Updated distribution of ${oldDistribution.capacityGB} GB from ${cpName} to ${compName} on server ${srvName}`;
    const userEmail = await logActivity(request, 'UPDATE', 'Distribution', details);

    const oldServerId = oldDistribution.serverId;
    const oldProviderId = oldDistribution.cacheProviderId;
    
    const updatedDistribution = await Distribution.findByIdAndUpdate(
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

    if (updatedDistribution) {
      await updateServerUsedCapacity(updatedDistribution.serverId);
      if (oldServerId.toString() !== updatedDistribution.serverId.toString()) {
        await updateServerUsedCapacity(oldServerId);
      }
      
      await updateCacheProviderStats(updatedDistribution.cacheProviderId);
      if (oldProviderId && oldProviderId.toString() !== updatedDistribution.cacheProviderId.toString()) {
        await updateCacheProviderStats(oldProviderId);
      }
    }

    return NextResponse.json({ success: true, data: updatedDistribution });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
