import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { CacheProvider } from '@/lib/models/CacheProvider';

import { logActivity } from '@/lib/logging';

export async function GET() {
  try {
    await dbConnect();
    const providers = await CacheProvider.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: providers });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    
    // Ensure stats are computed dynamically, strip user input
    delete body.serverCount;
    delete body.totalCapacity;
    delete body.usedServerCount;
    delete body.usedCapacity;

    const userEmail = await logActivity(request, 'CREATE', 'CacheProvider', `Created cache provider: ${body.shortCode} - ${body.name}`);
    const provider = await CacheProvider.create({
      ...body,
      createdBy: userEmail,
      updatedBy: userEmail,
    });
    return NextResponse.json({ success: true, data: provider }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
