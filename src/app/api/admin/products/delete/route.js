import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/utils/dbConnect';
import Product from '@/app/lib/models/product';
import { GridFSBucket, ObjectId } from 'mongodb';
import mongoose from 'mongoose';
import { authenticateAdmin } from '@/app/lib/middleware/auth';

export async function DELETE(request) {
  try {
    console.log('Starting product deletion process...');
    
    // ✅ Check admin authentication
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

    console.log('Admin authenticated for deletion:', authResult.admin.email);
    
    await connectDB();

    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');

    if (!productId) {
      return NextResponse.json({ 
        success: false,
        error: 'Product ID is required' 
      }, { status: 400 });
    }

    // Find product first
    const product = await Product.findById(productId);
    if (!product) {
      return NextResponse.json({ 
        success: false,
        error: 'Product not found' 
      }, { status: 404 });
    }

    console.log('Deleting product:', product.heading, 'by admin:', authResult.admin.email);

    // Delete file from GridFS
    if (product.metadata.gridfsId) {
      try {
        const db = mongoose.connection.db;
        const bucket = new GridFSBucket(db, { bucketName: 'products' });
        await bucket.delete(new ObjectId(product.metadata.gridfsId));
        console.log('GridFS file deleted:', product.metadata.gridfsId);
      } catch (error) {
        console.log('File not found in GridFS, continuing with metadata deletion...');
      }
    }

    // Delete product metadata
    await Product.findByIdAndDelete(productId);

    console.log('Product metadata deleted successfully');

    return NextResponse.json({
      success: true,
      message: 'Product deleted successfully'
    });

  } catch (error) {
    console.error('Delete product error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to delete product: ' + error.message
    }, { status: 500 });
  }
}