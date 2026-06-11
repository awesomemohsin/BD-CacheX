import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { Allocation } from '@/lib/models/Allocation';
import { Server } from '@/lib/models/Server';

async function updateServerUsedCapacity(serverId: any) {
  if (!serverId) return;
  const allocations = await Allocation.find({ serverId, status: 'Active' });
  const usedCapacity = allocations.reduce((sum, alloc) => sum + alloc.capacityGB, 0);
  await Server.findByIdAndUpdate(serverId, { usedCapacityGB: usedCapacity });
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
    
    const allocation = await Allocation.create({
      companyId: body.companyId,
      cacheProviderId: body.cacheProviderId,
      serverId: body.serverId,
      capacityGB: body.capacityGB,
      goLiveDate: new Date(body.goLiveDate),
      status: body.status,
      notes: body.notes,
    });

    await updateServerUsedCapacity(body.serverId);

    return NextResponse.json({ success: true, data: allocation }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
