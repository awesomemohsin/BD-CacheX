import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { ActivityLog } from '@/lib/models/ActivityLog';

export async function GET() {
  try {
    await dbConnect();
    const logs = await ActivityLog.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: logs });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
