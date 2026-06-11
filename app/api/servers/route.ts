import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { Server } from '@/lib/models/Server';

import { logActivity } from '@/lib/logging';

export async function GET() {
  try {
    await dbConnect();
    const servers = await Server.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: servers });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const userEmail = await logActivity(request, 'CREATE', 'Server', `Created server: ${body.brand} - ${body.model} - ${body.name}`);
    const server = await Server.create({
      ...body,
      createdBy: userEmail,
      updatedBy: userEmail,
    });
    return NextResponse.json({ success: true, data: server }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
