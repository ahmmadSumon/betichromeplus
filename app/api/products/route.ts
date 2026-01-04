import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const products = await Product.find({}, { title: 1, images: 1, price: 1 })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const totalProducts = await Product.countDocuments();
    const hasMore = skip + limit < totalProducts;

    return NextResponse.json({
      products,
      hasMore,
      totalProducts,
      currentPage: page,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}