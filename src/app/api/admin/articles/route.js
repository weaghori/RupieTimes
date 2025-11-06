import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Product from '@/app/lib/models/product';

// GET - Get all articles across all products (with pagination)
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const productId = searchParams.get('productId');
    const skip = (page - 1) * limit;

    let pipeline = [];

    // If specific product ID provided
    if (productId && mongoose.Types.ObjectId.isValid(productId)) {
      pipeline = [
        { $match: { _id: new mongoose.Types.ObjectId(productId) } },
        { $unwind: '$articles' },
        { $replaceRoot: { newRoot: { 
          $mergeObjects: [
            '$articles',
            { productId: '$_id', productHeading: '$heading' }
          ]
        }}}
      ];
    } else {
      // Get articles from all products
      pipeline = [
        { $unwind: '$articles' },
        { $replaceRoot: { newRoot: { 
          $mergeObjects: [
            '$articles',
            { productId: '$_id', productHeading: '$heading' }
          ]
        }}},
        { $sort: { 'createdAt': -1 } },
        { $skip: skip },
        { $limit: limit }
      ];
    }

    const articles = await Product.aggregate(pipeline);
    
    // Get total count for pagination
    const totalCountPipeline = [
      { $unwind: '$articles' },
      { $count: 'total' }
    ];
    const totalResult = await Product.aggregate(totalCountPipeline);
    const total = totalResult.length > 0 ? totalResult[0].total : 0;

    return NextResponse.json({
      articles,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { status: 500 }
    );
  }
}

// POST - Add new article to a product
export async function POST(request) {
  try {
    const body = await request.json();
    const { productId, title, content, image, order, isActive = true } = body;

    if (!productId || !title || !content) {
      return NextResponse.json(
        { error: 'Product ID, title, and content are required' },
        { status: 400 }
      );
    }

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: 400 }
      );
    }

    const newArticle = {
      _id: new mongoose.Types.ObjectId(),
      title,
      content,
      image: image || {},
      order: order || 0,
      isActive,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const product = await Product.findByIdAndUpdate(
      productId,
      { 
        $push: { 
          articles: { 
            $each: [newArticle], 
            $sort: { order: 1 } 
          } 
        } 
      },
      { new: true, runValidators: true }
    );

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    const addedArticle = product.articles.find(
      article => article._id.toString() === newArticle._id.toString()
    );

    return NextResponse.json({
      message: 'Article added successfully',
      article: addedArticle,
      product: {
        id: product._id,
        heading: product.heading
      }
    }, { status: 201 });

  } catch (error) {
    console.error('Error adding article:', error);
    return NextResponse.json(
      { error: 'Failed to add article' },
      { status: 500 }
    );
  }
}