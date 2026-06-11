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

    const serverId = allocation.serverId;
    await Allocation.findByIdAndDelete(id);

    await updateServerUsedCapacity(serverId);

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

    const oldServerId = oldAllocation.serverId;
    
    const updatedAllocation = await Allocation.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (updatedAllocation) {
      await updateServerUsedCapacity(updatedAllocation.serverId);
      if (oldServerId.toString() !== updatedAllocation.serverId.toString()) {
        await updateServerUsedCapacity(oldServerId);
      }
    }

    return NextResponse.json({ success: true, data: updatedAllocation });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
