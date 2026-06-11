import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { CacheProvider } from '@/lib/models/CacheProvider';

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
    const provider = await CacheProvider.create(body);
    return NextResponse.json({ success: true, data: provider }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
