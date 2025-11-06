// src/app/api/user/subscriptions/route.js
import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/utils/dbConnect';
import Subscription from '@/app/lib/models/Subscription';
import Product from '@/app/lib/models/product';
import { authenticateUser } from '@/app/lib/middleware/auth';

export async function GET(request) {
  try {
    // Check user authentication
    const authResult = authenticateUser(request);
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
    
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'active';

    // Build query based on status
    let query = { user: authResult.user.id };
    
    if (status === 'active') {
      query.status = 'active';
      query.endDate = { $gt: new Date() };
    } else if (status !== 'all') {
      query.status = status;
    }

    const subscriptions = await Subscription.find(query)
      .populate('product', 'heading shortDescription filename category variants')
      .sort({ createdAt: -1 });

    // Format response with safe data access
    const formattedSubscriptions = subscriptions.map(sub => ({
      id: sub._id,
      product: sub.product ? {
        _id: sub.product._id,
        heading: sub.product.heading || 'No Title',
        shortDescription: sub.product.shortDescription || 'No description available',
        filename: sub.product.filename || null,
        category: sub.product.category || 'Uncategorized',
        variants: sub.product.variants || []
      } : {
        _id: null,
        heading: 'Product Not Available',
        shortDescription: 'This product is no longer available',
        filename: null,
        category: 'Uncategorized',
        variants: []
      },
      variant: sub.variant || { duration: 'N/A', price: 0, durationMonths: 0 },
      status: sub.status,
      startDate: sub.startDate,
      endDate: sub.endDate,
      paymentStatus: sub.paymentStatus,
      isActive: sub.isActive,
      daysRemaining: sub.endDate ? Math.ceil((sub.endDate - new Date()) / (1000 * 60 * 60 * 24)) : 0
    }));

    return NextResponse.json({
      success: true,
      subscriptions: formattedSubscriptions
    });
  } catch (error) {
    console.error('Error fetching subscriptions:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch subscriptions: ' + error.message
    }, { status: 500 });
  }
}