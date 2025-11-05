import { NextResponse } from 'next/server';
import { GridFSBucket, ObjectId } from 'mongodb';
import mongoose from 'mongoose';
import { authenticateAdmin } from '@/app/lib/middleware/auth';

export async function POST(request) {
  try {
    console.log('Starting file upload process...');
    
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

    console.log('Admin authenticated for upload:', authResult.admin.email);
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);

    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json(
        { 
          success: false,
          error: 'No file provided' 
        }, 
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Invalid file type. Only JPEG, PNG, GIF, and WebP images are allowed.' 
        }, 
        { status: 400 }
      );
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { 
          success: false,
          error: 'File size too large. Maximum size is 5MB.' 
        }, 
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const db = mongoose.connection.db;
    const bucket = new GridFSBucket(db, { bucketName: 'uploads' });

    // Upload file to GridFS
    const timestamp = Date.now();
    const filename = `${timestamp}-${file.name.replace(/\s+/g, '-')}`;

    const uploadStream = bucket.openUploadStream(filename, {
      contentType: file.type,
      metadata: {
        originalName: file.name,
        uploadedBy: authResult.admin.id,
        uploadedByEmail: authResult.admin.email,
        uploadDate: new Date()
      }
    });

    const uploadResult = await new Promise((resolve, reject) => {
      uploadStream.end(buffer);
      uploadStream.on('finish', () => {
        resolve({
          filename: filename,
          contentType: file.type,
          size: buffer.length,
          gridfsId: uploadStream.id.toString()
        });
      });
      uploadStream.on('error', reject);
    });

    console.log('File uploaded successfully:', uploadResult.filename);

    return NextResponse.json({
      success: true,
      message: 'File uploaded successfully',
      ...uploadResult
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to upload file: ' + error.message 
      }, 
      { status: 500 }
    );
  }
}

// Optional: GET endpoint to retrieve uploaded files
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const fileId = searchParams.get('id');

    if (!fileId) {
      return NextResponse.json(
        { error: 'File ID is required' },
        { status: 400 }
      );
    }

    await mongoose.connect(process.env.MONGODB_URI);
    const db = mongoose.connection.db;
    const bucket = new GridFSBucket(db, { bucketName: 'uploads' });

    // Check if file exists
    const files = await bucket.find({ _id: new ObjectId(fileId) }).toArray();
    if (files.length === 0) {
      return NextResponse.json(
        { error: 'File not found' },
        { status: 404 }
      );
    }

    const file = files[0];
    const downloadStream = bucket.openDownloadStream(new ObjectId(fileId));

    const chunks = [];
    for await (const chunk of downloadStream) {
      chunks.push(chunk);
    }

    const buffer = Buffer.concat(chunks);

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': file.contentType,
        'Content-Disposition': `inline; filename="${file.filename}"`,
        'Cache-Control': 'public, max-age=31536000', // Cache for 1 year
      },
    });

  } catch (error) {
    console.error('File retrieval error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve file' },
      { status: 500 }
    );
  }
}