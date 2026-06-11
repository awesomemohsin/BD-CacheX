import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { Company } from '@/lib/models/Company';

import { logActivity } from '@/lib/logging';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;
    const body = await request.json();
    const oldCompany = await Company.findById(id);
    if (!oldCompany) {
      return NextResponse.json({ success: false, error: 'Company not found' }, { status: 404 });
    }
    const userEmail = await logActivity(request, 'UPDATE', 'Company', `Updated company: ${oldCompany.name}`);
    const company = await Company.findByIdAndUpdate(
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
    return NextResponse.json({ success: true, data: company });
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
    const company = await Company.findById(id);
    if (!company) {
      return NextResponse.json({ success: false, error: 'Company not found' }, { status: 404 });
    }
    await logActivity(request, 'DELETE', 'Company', `Deleted company: ${company.name}`);
    await Company.findByIdAndDelete(id);
    return NextResponse.json({ success: true, data: { id } });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
