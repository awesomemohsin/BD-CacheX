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

export async function GET() {
  try {
    await dbConnect();
    const allocations = await Allocation.find({})
      .populate('companyId')
      .populate('cacheProviderId')
      .populate('serverId')
      .sort({ createdAt: -1 });

    const formatted = allocations.map((alloc: any) => {
      const json = alloc.toJSON();
      return {
        ...json,
        companyName: alloc.companyId?.name || 'Deleted Company',
        companyType: alloc.companyId?.type || 'ISP',
        cacheProviderName: alloc.cacheProviderId?.name || 'Deleted Provider',
        serverName: alloc.serverId?.name || 'Deleted Server',
        companyId: alloc.companyId?._id?.toString() || alloc.companyId?.toString() || '',
        cacheProviderId: alloc.cacheProviderId?._id?.toString() || alloc.cacheProviderId?.toString() || '',
        serverId: alloc.serverId?._id?.toString() || alloc.serverId?.toString() || '',
      };
    });

    return NextResponse.json({ success: true, data: formatted });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();

    // Duplicate distribution query check (same server, same capacity, same go-live date)
    const goLiveDate = new Date(body.goLiveDate);
    const startOfDay = new Date(goLiveDate.getFullYear(), goLiveDate.getMonth(), goLiveDate.getDate());
    const endOfDay = new Date(goLiveDate.getFullYear(), goLiveDate.getMonth(), goLiveDate.getDate(), 23, 59, 59, 999);

    const duplicate = await Allocation.findOne({
      serverId: body.serverId,
      capacityGB: Number(body.capacityGB),
      goLiveDate: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    });

    if (duplicate) {
      return NextResponse.json(
        {
          success: false,
          error: 'Duplicate distribution data found.',
          duplicateId: duplicate._id.toString(),
        },
        { status: 409 }
      );
    }

    const [company, provider, server] = await Promise.all([
      Company.findById(body.companyId),
      CacheProvider.findById(body.cacheProviderId),
      Server.findById(body.serverId),
    ]);

    const cpName = provider ? `${provider.shortCode} - ${provider.name}` : 'Unknown';
    const compName = company ? company.name : 'Unknown';
    const srvName = server ? server.name : 'Unknown';
    const details = `Allocated ${body.capacityGB} GB from ${cpName} to ${compName} on server ${srvName}`;
    const userEmail = await logActivity(request, 'CREATE', 'Allocation', details);
    
    const allocation = await Allocation.create({
      companyId: body.companyId,
      cacheProviderId: body.cacheProviderId,
      serverId: body.serverId,
      capacityGB: body.capacityGB,
      serverCount: body.serverCount || 1,
      goLiveDate: new Date(body.goLiveDate),
      status: body.status,
      notes: body.notes,
      createdBy: userEmail,
      updatedBy: userEmail,
    });

    await updateServerUsedCapacity(body.serverId);
    await updateCacheProviderStats(body.cacheProviderId);

    return NextResponse.json({ success: true, data: allocation }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
