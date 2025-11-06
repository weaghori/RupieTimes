// src/app/api/admin/products/update/route.js
import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/utils/dbConnect';
import Product from "@/app/lib/models/product";
import { GridFSBucket, ObjectId } from 'mongodb';
import mongoose from 'mongoose';
import { authenticateAdmin } from '@/app/lib/middleware/auth';

export async function PUT(request) {
  try {
    console.log('Starting product update process...');
    
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

    console.log('Admin authenticated for update:', authResult.admin.email);
    
    await connectDB();

    const formData = await request.formData();
    const productId = formData.get('productId');
    const heading = formData.get('heading') || '';
    const shortDescription = formData.get('shortDescription') || '';
    const fullDescription = formData.get('fullDescription') || '';
    const category = formData.get('category') || '';
    const tags = formData.get('tags') || '';
    const file = formData.get('image');
    const isActive = formData.get('isActive');

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

    if (!productId) {
      return NextResponse.json({ 
        success: false,
        error: 'Product ID is required' 
      }, { status: 400 });
    }

    // Find existing product
    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      return NextResponse.json({ 
        success: false,
        error: 'Product not found' 
      }, { status: 404 });
    }

    // Prepare update data
    let updateData = {
      heading,
      shortDescription,
      fullDescription,
      category,
      tags: tags ? tags.split(',').map(tag => tag.trim()).filter(tag => tag) : existingProduct.tags,
      'metadata.updatedBy': authResult.admin.id,
      'metadata.updatedByEmail': authResult.admin.email,
      'metadata.updatedAt': new Date()
    };

    // Handle isActive status
    if (isActive !== null) {
      updateData.isActive = isActive === 'true';
    }

    // Handle variants update
    if (variantsData.length > 0) {
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
      
      updateData.variants = variantsData;
    }

    // If new file is uploaded
    if (file) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const db = mongoose.connection.db;
      const bucket = new GridFSBucket(db, { bucketName: 'products' });

      // Delete old file from GridFS
      if (existingProduct.metadata.gridfsId) {
        try {
          await bucket.delete(new ObjectId(existingProduct.metadata.gridfsId));
          console.log('Old GridFS file deleted:', existingProduct.metadata.gridfsId);
        } catch (error) {
          console.log('Old file not found in GridFS, continuing...');
        }
      }

      // Upload new file
      const timestamp = Date.now();
      const filename = `${timestamp}-${file.name}`;

      const uploadStream = bucket.openUploadStream(filename, {
        contentType: file.type,
        metadata: {
          heading,
          shortDescription,
          fullDescription,
          category,
          originalName: file.name,
          updatedBy: authResult.admin.id,
          updatedByEmail: authResult.admin.email
        }
      });

      await new Promise((resolve, reject) => {
        uploadStream.end(buffer);
        uploadStream.on('finish', resolve);
        uploadStream.on('error', reject);
      });

      updateData.filename = filename;
      updateData.contentType = file.type;
      updateData.size = buffer.length;
      updateData['metadata.gridfsId'] = uploadStream.id.toString();
      updateData['metadata.originalName'] = file.name;
    }

    // Update product in database
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updateData,
      { new: true, runValidators: true }
    );

    console.log('Product updated by admin:', authResult.admin.email);

    return NextResponse.json({
      success: true,
      message: 'Product updated successfully',
      product: {
        id: updatedProduct._id,
        filename: updatedProduct.filename,
        heading: updatedProduct.heading,
        shortDescription: updatedProduct.shortDescription,
        fullDescription: updatedProduct.fullDescription,
        category: updatedProduct.category,
        tags: updatedProduct.tags,
        variants: updatedProduct.variants,
        basePrice: updatedProduct.basePrice,
        isActive: updatedProduct.isActive,
        uploadDate: updatedProduct.uploadDate,
        updatedAt: updatedProduct.updatedAt,
        metadata: updatedProduct.metadata
      }
    });

  } catch (error) {
    console.error('Update product error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to update product: ' + error.message
    }, { status: 500 });
  }
}