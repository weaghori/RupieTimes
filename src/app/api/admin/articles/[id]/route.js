import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Product from '@/app/lib/models/product';

// GET - Get specific article
export async function GET(request, { params }) {
  try {
    const { id } = params;

    const product = await Product.findOne(
      { 'articles._id': id },
      { 'articles.$': 1, heading: 1 }
    );

    if (!product || !product.articles.length) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      );
    }

    const article = {
      ...product.articles[0].toObject(),
      productId: product._id,
      productHeading: product.heading
    };

    return NextResponse.json({ article });

  } catch (error) {
    console.error('Error fetching article:', error);
    return NextResponse.json(
      { error: 'Failed to fetch article' },
      { status: 500 }
    );
  }
}

// PUT - Update specific article
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { title, content, image, order, isActive } = body;

    const updateFields = {};
    if (title !== undefined) updateFields['articles.$.title'] = title;
    if (content !== undefined) updateFields['articles.$.content'] = content;
    if (image !== undefined) updateFields['articles.$.image'] = image;
    if (order !== undefined) updateFields['articles.$.order'] = order;
    if (isActive !== undefined) updateFields['articles.$.isActive'] = isActive;
    updateFields['articles.$.updatedAt'] = new Date();

    const product = await Product.findOneAndUpdate(
      { 'articles._id': id },
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!product) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      );
    }

    const updatedArticle = product.articles.find(
      article => article._id.toString() === id
    );

    return NextResponse.json({
      message: 'Article updated successfully',
      article: updatedArticle
    });

  } catch (error) {
    console.error('Error updating article:', error);
    return NextResponse.json(
      { error: 'Failed to update article' },
      { status: 500 }
    );
  }
}

// DELETE - Remove article from product
export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    const product = await Product.findOneAndUpdate(
      { 'articles._id': id },
      { $pull: { articles: { _id: id } } },
      { new: true }
    );

    if (!product) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Article deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting article:', error);
    return NextResponse.json(
      { error: 'Failed to delete article' },
      { status: 500 }
    );
  }
}