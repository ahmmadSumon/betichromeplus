import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

export const dynamic = "force-dynamic";

/* ---------- GET PRODUCTS ---------- */
export async function GET() {
  await connectDB();

  const products = await Product.find(
    {},
    { title: 1, images: 1, price: 1 }
  )
    .sort({ createdAt: -1 })
    .limit(8)
    .lean();

  return NextResponse.json(products);
}

/* ---------- ADD PRODUCT (🔥 MISSING PART) ---------- */
export async function POST(req: Request) {
  await connectDB();

  try {
    const body = await req.json();

    const product = await Product.create(body);

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("CREATE PRODUCT ERROR:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
