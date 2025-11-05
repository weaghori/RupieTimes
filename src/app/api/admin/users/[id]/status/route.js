import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/utils/dbConnect';
import User from '@/app/lib/models/User';
import { authenticateAdmin } from '@/app/lib/middleware/auth';

export async function PUT(request, { params }) {
  try {
    // Check admin authentication
    const authResult = authenticateAdmin(request);
    if (!authResult.success) {
      return NextResponse.json(
        { 
          success: false, 
          error: authResult.error 
        }, 
        { status: authResult.status }
      );
    }

    await connectDB();
    
    const { id } = await params;
    const { isActive } = await request.json();

    console.log(`Updating user ${id} status to:`, isActive);

    // Find the user first to verify existence
    const existingUser = await User.findById(id);
    if (!existingUser) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    // Update user status
    const user = await User.findByIdAndUpdate(
      id,
      { isActive: Boolean(isActive) }, // Ensure boolean value
      { new: true, runValidators: true }
    ).select('-password');

    console.log('Updated user:', user);

    return NextResponse.json({
      success: true,
      message: `User ${isActive ? 'activated' : 'deactivated'} successfully`,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        role: user.role,
        isActive: user.isActive,
        address: user.address,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    });
  } catch (error) {
    console.error("Error updating user status:", error);
    return NextResponse.json({
      success: false,
      error: 'Failed to update user status: ' + error.message
    }, { status: 500 });
  }
}