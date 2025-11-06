import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Product from '@/app/lib/models/product';

// GET - Get all articles for a specific product
export async function GET(request, { params }) {
  try {
    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: 400 }
      );
    }

    const product = await Product.findById(id).select('articles heading');

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Sort articles by order and creation date
    const sortedArticles = product.articles.sort((a, b) => {
      if (a.order !== b.order) return a.order - b.order;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return NextResponse.json({
      product: {
        id: product._id,
        heading: product.heading
      },
      articles: sortedArticles
    });

  } catch (error) {
    console.error('Error fetching product articles:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product articles' },
      { status: 500 }
    );
  }
}