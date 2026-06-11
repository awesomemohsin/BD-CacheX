import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { User } from '@/lib/models/User';
import { logActivity } from '@/lib/logging';

export async function GET(request: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email') || request.headers.get('x-user-email');

    if (!email) {
      return NextResponse.json({ success: false, error: 'Email is required' }, { status: 400 });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }

    // Convert document to JSON to invoke transformation (hiding password)
    return NextResponse.json({ success: true, data: user.toJSON() });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    
    // Check permission - only razu@circlenetworkbd.net can create new users
    const creatorEmail = request.headers.get('x-user-email') || '';
    if (creatorEmail.toLowerCase() !== 'razu@circlenetworkbd.net') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized. Only Mahbub Alam Razu (razu@circlenetworkbd.net) can create new users.' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { name, email, phone, password, role } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ success: false, error: 'Name, email, and password are required' }, { status: 400 });
    }

    // Check if user already exists
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return NextResponse.json({ success: false, error: 'User with this email already exists' }, { status: 400 });
    }

    const newUser = await User.create({
      name,
      email: email.toLowerCase(),
      phone,
      password, // Plaintext as per testing scope requirements
      role: role || 'User',
    });

    const details = `Created new user account: ${name} (${email})`;
    await logActivity(request, 'CREATE', 'User', details);

    return NextResponse.json({ success: true, data: newUser.toJSON() }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
