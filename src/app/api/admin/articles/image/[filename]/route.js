// src/app/api/admin/articles/image/[filename]/route.js
import { NextResponse } from 'next/server';
import { GridFSBucket } from 'mongodb';
import mongoose from 'mongoose';

export async function GET(request, { params }) {
  try {
    const { filename } = await params;
    
    await mongoose.connect(process.env.MONGODB_URI);
    const db = mongoose.connection.db;
    const bucket = new GridFSBucket(db, { bucketName: 'uploads' }); // Articles bucket

    const files = await bucket.find({ filename }).toArray();
    if (files.length === 0) {
      return new NextResponse('Image not found', { status: 404 });
    }

    const file = files[0];
    const downloadStream = bucket.openDownloadStream(file._id);

    return new Promise((resolve, reject) => {
      const chunks = [];
      downloadStream.on('data', (chunk) => chunks.push(chunk));
      downloadStream.on('end', () => {
        const buffer = Buffer.concat(chunks);
        resolve(new NextResponse(buffer, {
          status: 200,
          headers: {
            'Content-Type': file.contentType,
            'Cache-Control': 'public, max-age=31536000',
          },
        }));
      });
      downloadStream.on('error', reject);
    });

  } catch (error) {
    console.error('Article image serve error:', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
}