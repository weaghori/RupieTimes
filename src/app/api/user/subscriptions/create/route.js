// src/app/api/user/subscriptions/create/route.js
import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/utils/dbConnect';
import Subscription from '@/app/lib/models/Subscription';
import Product from '@/app/lib/models/product';
import { authenticateUser } from '@/app/lib/middleware/auth';

export async function POST(request) {
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
    
    const body = await request.json();
    const { productId, duration, paymentMethod = 'manual' } = body;

    // Validate input
    if (!productId || !duration) {
      return NextResponse.json(
        { success: false, error: 'Product ID and duration are required' },
        { status: 400 }
      );
    }

    // Check if product exists and is active
    const product = await Product.findOne({ 
      _id: productId, 
      isActive: true 
    });

    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found or inactive' },
        { status: 404 }
      );
    }

    // ✅ ENHANCED VALIDATION: Find the selected variant with better error message
    const variant = product.variants.find(v => v.duration === duration);
    if (!variant) {
      // Get available durations for better error message
      const availableDurations = product.variants.map(v => `"${v.duration}"`).join(', ');
      return NextResponse.json(
        { 
          success: false, 
          error: `Selected duration "${duration}" is not available for this product. Available options: ${availableDurations}` 
        },
        { status: 400 }
      );
    }

    // Check if user already has an active subscription for this product
    const existingSubscription = await Subscription.findOne({
      user: authResult.user.id,
      product: productId,
      status: 'active',
      endDate: { $gt: new Date() }
    });

    if (existingSubscription) {
      return NextResponse.json(
        { success: false, error: 'You already have an active subscription for this product' },
        { status: 400 }
      );
    }

    // Calculate end date using durationMonths
    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + (variant.durationMonths || 3));

    // Create subscription
    const subscription = new Subscription({
      user: authResult.user.id,
      product: productId,
      variant: {
        duration: variant.duration,
        price: variant.price,
        durationMonths: variant.durationMonths || 3
      },
      status: 'active',
      paymentStatus: 'completed',
      startDate,
      endDate,
      metadata: {
        paymentMethod,
        subscribedAt: new Date()
      }
    });

    await subscription.save();

    // Populate product details for response
    await subscription.populate('product', 'heading shortDescription filename category');

    // Format response with safe product data
    const subscriptionResponse = {
      id: subscription._id,
      product: subscription.product ? {
        _id: subscription.product._id,
        heading: subscription.product.heading,
        shortDescription: subscription.product.shortDescription,
        filename: subscription.product.filename,
        category: subscription.product.category
      } : null,
      variant: subscription.variant,
      status: subscription.status,
      startDate: subscription.startDate,
      endDate: subscription.endDate,
      isActive: subscription.isActive
    };

    return NextResponse.json({
      success: true,
      message: 'Subscription created successfully',
      subscription: subscriptionResponse
    });
  } catch (error) {
    console.error('Error creating subscription:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to create subscription: ' + error.message
    }, { status: 500 });
  }
}