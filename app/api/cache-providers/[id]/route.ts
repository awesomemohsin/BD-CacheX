import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { CacheProvider } from '@/lib/models/CacheProvider';

import { logActivity } from '@/lib/logging';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;
    const body = await request.json();
    const oldProvider = await CacheProvider.findById(id);
    if (!oldProvider) {
      return NextResponse.json({ success: false, error: 'Provider not found' }, { status: 404 });
    }
    const userEmail = await logActivity(request, 'UPDATE', 'CacheProvider', `Updated cache provider: ${oldProvider.shortCode} - ${oldProvider.name}`);
    const provider = await CacheProvider.findByIdAndUpdate(
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
    return NextResponse.json({ success: true, data: provider });
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
    const provider = await CacheProvider.findById(id);
    if (!provider) {
      return NextResponse.json({ success: false, error: 'Provider not found' }, { status: 404 });
    }
    await logActivity(request, 'DELETE', 'CacheProvider', `Deleted cache provider: ${provider.shortCode} - ${provider.name}`);
    await CacheProvider.findByIdAndDelete(id);
    return NextResponse.json({ success: true, data: { id } });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
