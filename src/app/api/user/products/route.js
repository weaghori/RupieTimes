// src/app/api/user/products/route.js
import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/utils/dbConnect';
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
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 12;
    const category = searchParams.get('category') || '';
    const search = searchParams.get('search') || '';
    const skip = (page - 1) * limit;

    // Build query for active products only
    let query = { isActive: true };
    
    if (category) {
      query.category = { $regex: category, $options: 'i' };
    }
    
    if (search) {
      query.$or = [
        { heading: { $regex: search, $options: 'i' } },
        { shortDescription: { $regex: search, $options: 'i' } },
        { fullDescription: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    const products = await Product.find(query)
      .select('-metadata -__v')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Product.countDocuments(query);

    // Get unique categories for filter
    const categories = await Product.distinct('category', { isActive: true });

    return NextResponse.json({
      success: true,
      products,
      categories,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch products: ' + error.message
    }, { status: 500 });
  }
}