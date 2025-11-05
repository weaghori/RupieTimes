// src/app/api/admin/products/route.js
import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/utils/dbConnect';
import Product from "@/app/lib/models/product";

export async function GET(request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const skip = (page - 1) * limit;

    const products = await Product.find()
      .sort({ uploadDate: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Product.countDocuments();

    return NextResponse.json({
      success: true,
      products,
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