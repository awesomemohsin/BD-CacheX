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

export async function GET() {
  try {
    await dbConnect();
    const distributions = await Distribution.find({})
      .populate('companyId')
      .populate('cacheProviderId')
      .populate('serverId')
      .sort({ createdAt: -1 });

    const formatted = distributions.map((dist: any) => {
      const json = dist.toJSON();
      return {
        ...json,
        companyName: dist.companyId?.name || 'Deleted Company',
        companyType: dist.companyId?.type || 'ISP',
        cacheProviderName: dist.cacheProviderId?.name || 'Deleted Provider',
        serverName: dist.serverId?.name || 'Deleted Server',
        companyId: dist.companyId?._id?.toString() || dist.companyId?.toString() || '',
        cacheProviderId: dist.cacheProviderId?._id?.toString() || dist.cacheProviderId?.toString() || '',
        serverId: dist.serverId?._id?.toString() || dist.serverId?.toString() || '',
        company: dist.companyId && typeof dist.companyId === 'object' ? {
          ...dist.companyId.toJSON(),
          id: dist.companyId._id.toString()
        } : undefined,
        cacheProvider: dist.cacheProviderId && typeof dist.cacheProviderId === 'object' ? {
          ...dist.cacheProviderId.toJSON(),
          id: dist.cacheProviderId._id.toString()
        } : undefined,
        server: dist.serverId && typeof dist.serverId === 'object' ? {
          ...dist.serverId.toJSON(),
          id: dist.serverId._id.toString()
        } : undefined,
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

    const duplicate = await Distribution.findOne({
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
    const userEmail = await logActivity(request, 'CREATE', 'Distribution', details);
    
    const distribution = await Distribution.create({
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

    return NextResponse.json({ success: true, data: distribution }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
