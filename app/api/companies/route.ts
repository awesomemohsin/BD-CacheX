import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { Company } from '@/lib/models/Company';

export async function GET() {
  try {
    await dbConnect();
    const companies = await Company.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: companies });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const company = await Company.create(body);
    return NextResponse.json({ success: true, data: company }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
