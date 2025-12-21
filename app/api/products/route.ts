import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

export const dynamic = "force-dynamic";

export async function GET() {
  const start = Date.now();

  try {
    await connectDB();

    const products = await Product.find(
      {},                         // filter
      { title: 1, images: 1, price: 1 } // projection (IMPORTANT)
    )
      .sort({ createdAt: -1 })
      .limit(8)                   // 🔥 LIMIT
      .lean();

    console.log("Products API time:", Date.now() - start, "ms");

    return NextResponse.json(products);
  } catch (err) {
    console.error("API ERROR:", err);
    return NextResponse.json([], { status: 500 });
  }
}
