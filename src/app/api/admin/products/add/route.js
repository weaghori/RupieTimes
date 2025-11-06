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

    // Get dynamic variants from form data
    const variantsData = [];
    let variantIndex = 0;
    
    // Loop through all variants in form data
    while (true) {
      const duration = formData.get(`variants[${variantIndex}][duration]`);
      const durationMonths = formData.get(`variants[${variantIndex}][durationMonths]`);
      const price = formData.get(`variants[${variantIndex}][price]`);
      const description = formData.get(`variants[${variantIndex}][description]`) || '';

      // Stop if no more variants found
      if (!duration && !durationMonths && !price) {
        break;
      }

      // Validate required fields for this variant
      if (duration && durationMonths && price) {
        variantsData.push({
          duration: duration.trim(),
          durationMonths: parseInt(durationMonths),
          price: parseFloat(price),
          description: description.trim()
        });
      }
      
      variantIndex++;
    }

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

    // Validate at least one variant
    if (variantsData.length === 0) {
      return NextResponse.json({ 
        success: false,
        error: 'At least one pricing variant is required' 
      }, { status: 400 });
    }

    // Validate variant data
    for (const variant of variantsData) {
      if (variant.durationMonths < 1) {
        return NextResponse.json({ 
          success: false,
          error: 'Duration months must be at least 1' 
        }, { status: 400 });
      }
      if (variant.price < 0) {
        return NextResponse.json({ 
          success: false,
          error: 'Price cannot be negative' 
        }, { status: 400 });
      }
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
            variants: variantsData,
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