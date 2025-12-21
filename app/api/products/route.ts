import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

export const dynamic = "force-dynamic"; // 🚨 REQUIRED
export const revalidate = 0; // 🚨 REQUIRED

export async function GET() {
  try {
    await connectDB();

    const products = await Product.find()
      .populate("collections")
      .sort({ createdAt: -1 })
      .lean(); // 🚀 faster JSON

    return NextResponse.json(products, {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    });
  } catch (error) {
    console.error("Products API error:", error);
    return NextResponse.json([], { status: 500 });
  }
}
