import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/utils/dbConnect';
import Product from "@/app/lib/models/product";
import { GridFSBucket } from 'mongodb';
import mongoose from 'mongoose';
import { authenticateAdmin } from '@/app/lib/middleware/auth';

export async function POST(request) {
  try {
    console.log('Starting product upload process...');
    
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

    console.log('Admin authenticated:', authResult.admin.email);
    
    await connectDB();
    console.log('MongoDB connected');

    const formData = await request.formData();
    const file = formData.get('image');
    const heading = formData.get('heading') || '';
    const shortDescription = formData.get('shortDescription') || '';
    const fullDescription = formData.get('fullDescription') || '';
    const category = formData.get('category') || '';
    const tags = formData.get('tags') || '';

    // Variant prices (required)
    const price3Months = formData.get('price3Months') || '0';
    const price6Months = formData.get('price6Months') || '0';
    const price1Year = formData.get('price1Year') || '0';

    if (!file) {
      return NextResponse.json({ 
        success: false,
        error: 'No file uploaded' 
      }, { status: 400 });
    }

    // Validate required fields
    if (!heading || !shortDescription || !fullDescription || !category) {
      return NextResponse.json({ 
        success: false,
        error: 'Heading, short description, full description, and category are required' 
      }, { status: 400 });
    }

    // Validate at least one variant has price
    if (!price3Months && !price6Months && !price1Year) {
      return NextResponse.json({ 
        success: false,
        error: 'At least one variant price is required (3 months, 6 months, or 1 year)' 
      }, { status: 400 });
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create GridFS bucket
    const db = mongoose.connection.db;
    const bucket = new GridFSBucket(db, {
      bucketName: 'products'
    });

    // Generate unique filename
    const timestamp = Date.now();
    const filename = `${timestamp}-${file.name}`;

    // Prepare variants array
    const variants = [];

    // Add 3 months variant if price provided
    if (price3Months && parseFloat(price3Months) > 0) {
      variants.push({
        duration: '3 months',
        price: parseFloat(price3Months)
      });
    }

    // Add 6 months variant if price provided
    if (price6Months && parseFloat(price6Months) > 0) {
      variants.push({
        duration: '6 months',
        price: parseFloat(price6Months)
      });
    }

    // Add 1 year variant if price provided
    if (price1Year && parseFloat(price1Year) > 0) {
      variants.push({
        duration: '1 year',
        price: parseFloat(price1Year)
      });
    }

    // Validate we have at least one variant
    if (variants.length === 0) {
      return NextResponse.json({ 
        success: false,
        error: 'At least one valid variant price is required' 
      }, { status: 400 });
    }

    // Upload to GridFS
    const uploadStream = bucket.openUploadStream(filename, {
      contentType: file.type,
      metadata: {
        heading,
        shortDescription,
        fullDescription,
        category,
        originalName: file.name,
        createdBy: authResult.admin.id,
        createdByEmail: authResult.admin.email
      }
    });

    return new Promise((resolve, reject) => {
      uploadStream.end(buffer);

      uploadStream.on('finish', async () => {
        try {
          // Save metadata to Product collection
          const product = new Product({
            filename: filename,
            contentType: file.type,
            size: buffer.length,
            heading,
            shortDescription,
            fullDescription,
            category,
            tags: tags ? tags.split(',').map(tag => tag.trim()).filter(tag => tag) : [],
            variants,
            metadata: {
              gridfsId: uploadStream.id.toString(),
              originalName: file.name,
              createdBy: authResult.admin.id,
              createdByEmail: authResult.admin.email,
              adminRole: authResult.admin.role
            }
          });

          await product.save();
          console.log('Product saved to database by admin:', authResult.admin.email);

          resolve(NextResponse.json({ 
            success: true,
            message: 'Product uploaded successfully', 
            product: {
              id: product._id,
              filename: product.filename,
              heading: product.heading,
              shortDescription: product.shortDescription,
              fullDescription: product.fullDescription,
              category: product.category,
              tags: product.tags,
              variants: product.variants,
              basePrice: product.basePrice,
              uploadDate: product.uploadDate,
              createdBy: product.metadata.createdByEmail
            }
          }));
        } catch (error) {
          console.error('Error saving product metadata:', error);
          reject(NextResponse.json({ 
            success: false,
            error: 'Failed to save product metadata: ' + error.message 
          }, { status: 500 }));
        }
      });

      uploadStream.on('error', (error) => {
        console.error('GridFS upload error:', error);
        reject(NextResponse.json({ 
          success: false,
          error: 'GridFS upload failed: ' + error.message 
        }, { status: 500 }));
      });
    });

  } catch (error) {
    console.error('Upload error details:', error);
    return NextResponse.json({ 
      success: false,
      error: 'Upload failed: ' + error.message 
    }, { status: 500 });
  }
}