import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/utils/dbConnect';
import Product from '@/app/lib/models/product';
import Subscription from '@/app/lib/models/Subscription';
import { authenticateUser } from '@/app/lib/middleware/auth';

export async function GET(request, { params }) {
  try {
    // Check user authentication
    const authResult = authenticateUser(request);
    if (!authResult.success) {
      return NextResponse.json(
        { 
          success: false, 
          error: authResult.error 
        }, 
        { status: authResult.status }
      );
    }

    const { id } = await params;
    await connectDB();

    // Check if user has active subscription for this product
    const activeSubscription = await Subscription.findOne({
      user: authResult.user.id,
      product: id,
      status: 'active',
      endDate: { $gt: new Date() }
    });

    // Get product with articles
    const product = await Product.findById(id)
      .select('heading articles isActive');

    if (!product || !product.isActive) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    // Filter articles based on subscription status
    let articles = [];
    let hasAccess = false;

    if (activeSubscription) {
      // User has active subscription - show all active articles
      articles = product.articles
        .filter(article => article.isActive)
        .sort((a, b) => a.order - b.order);
      hasAccess = true;
    } else {
      // User doesn't have subscription - show only first article as preview
      const previewArticle = product.articles
        .filter(article => article.isActive)
        .sort((a, b) => a.order - b.order)[0];
      
      if (previewArticle) {
        articles = [{
          ...previewArticle.toObject(),
          content: previewArticle.content.substring(0, 200) + '...', // Preview only
          isPreview: true
        }];
      }
      hasAccess = false;
    }

    return NextResponse.json({
      success: true,
      product: {
        id: product._id,
        heading: product.heading
      },
      articles,
      hasAccess,
      subscription: activeSubscription ? {
        id: activeSubscription._id,
        endDate: activeSubscription.endDate,
        daysRemaining: Math.ceil((activeSubscription.endDate - new Date()) / (1000 * 60 * 60 * 24))
      } : null
    });

  } catch (error) {
    console.error('Error fetching product articles:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch articles' },
      { status: 500 }
    );
  }
}