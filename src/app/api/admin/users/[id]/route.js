import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/utils/dbConnect';
import User from '@/app/lib/models/User';
import { authenticateAdmin } from '@/app/lib/middleware/auth';

export async function DELETE(request, { params }) {
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

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to delete user: ' + error.message
    }, { status: 500 });
  }
}