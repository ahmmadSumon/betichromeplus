import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";
import { productSchema } from "@/lib/validation";
import { logger } from "@/lib/logger";

export async function GET(request: NextRequest) {
  // Rate limiting
  const rateLimitResult = rateLimit(request, { limit: 100, windowMs: 60 * 1000 });
  if (!rateLimitResult.success) {
    return NextResponse.json(
      { error: "Too many requests" },
      { status: 429, headers: { 'Retry-After': '60' } }
    );
  }

  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = Math.min(parseInt(searchParams.get("limit") || "10"), 50); // Max 50 items
    const search = searchParams.get("search");
    const skip = (page - 1) * limit;

    let query = {};
    if (search) {
      // Sanitize search input
      const sanitizedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      query = {
        $or: [
          { title: { $regex: sanitizedSearch, $options: "i" } },
          { description: { $regex: sanitizedSearch, $options: "i" } },
          { category: { $regex: sanitizedSearch, $options: "i" } }
        ]
      };
    }

    const products = await Product.find(query, { title: 1, images: 1, price: 1 })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const totalProducts = await Product.countDocuments(query);
    const hasMore = skip + limit < totalProducts;

    logger.info('Products fetched', { 
      count: products.length, 
      page, 
      search: search || 'none' 
    });

    return NextResponse.json({
      products,
      hasMore,
      totalProducts,
      currentPage: page,
    });
  } catch (error) {
    logger.error('Failed to fetch products', error as Error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  // Rate limiting for POST requests
  const rateLimitResult = rateLimit(request, { limit: 10, windowMs: 60 * 1000 });
  if (!rateLimitResult.success) {
    return NextResponse.json(
      { error: "Too many requests" },
      { status: 429, headers: { 'Retry-After': '60' } }
    );
  }

  try {
    await connectDB();
    const data = await request.json();
    
    // Validate input
    const validatedData = productSchema.parse(data);
    
    const product = new Product(validatedData);
    await product.save();
    
    logger.info('Product created', { productId: product._id, title: product.title });
    
    return NextResponse.json({ success: true, product });
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      logger.warn('Product validation failed', { error: error.message });
      return NextResponse.json(
        { error: "Invalid product data", details: error.message },
        { status: 400 }
      );
    }
    
    logger.error('Failed to create product', error as Error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}