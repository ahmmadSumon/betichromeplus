import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

export const dynamic = "force-dynamic"; // 👈 IMPORTANT

export async function GET() {
  try {
    await connectDB();

    const products = await Product.find()
      .populate("collections")
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(products);
  } catch (error) {
    console.error("Products fetch error:", error);
    return NextResponse.json([], { status: 500 });
  }
}
