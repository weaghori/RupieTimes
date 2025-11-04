import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/utils/dbConnect';
import Product from '@/app/lib/models/product';

export async function GET(request, { params }) {
  try {
    await connectDB();
    
    //  FIX: Add 'await' before params
    const { id } = await params;

    const product = await Product.findById(id);
    
    if (!product) {
      return NextResponse.json({ 
        success: false,
        error: 'Product not found' 
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      product
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch product: ' + error.message
    }, { status: 500 });
  }
}