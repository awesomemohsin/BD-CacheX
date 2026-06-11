import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { Server } from '@/lib/models/Server';

import { logActivity } from '@/lib/logging';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;
    const body = await request.json();
    const oldServer = await Server.findById(id);
    if (!oldServer) {
      return NextResponse.json({ success: false, error: 'Server not found' }, { status: 404 });
    }
    const userEmail = await logActivity(request, 'UPDATE', 'Server', `Updated server: ${oldServer.brand} - ${oldServer.model} - ${oldServer.name}`);
    const server = await Server.findByIdAndUpdate(
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
    return NextResponse.json({ success: true, data: server });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;
    const server = await Server.findById(id);
    if (!server) {
      return NextResponse.json({ success: false, error: 'Server not found' }, { status: 404 });
    }
    await logActivity(request, 'DELETE', 'Server', `Deleted server: ${server.brand} - ${server.model} - ${server.name}`);
    await Server.findByIdAndDelete(id);
    return NextResponse.json({ success: true, data: { id } });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
