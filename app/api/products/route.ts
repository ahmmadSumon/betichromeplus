import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Product } from "@/models/Product";

export async function GET() {
  try {
    await connectDB();
    const products = await Product.find().sort({ createdAt: -1 });
    return NextResponse.json(products);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();

    const {
      title,
      description,
      category,
      collections = [],
      sizes = [],
      colors = [],
      tags = [],
      quantity,
      price,
      images = [],
    } = body;

    if (!title || !category || !price) {
      return NextResponse.json(
        { error: "Title, category and price are required" },
        { status: 400 }
      );
    }

    const product = await Product.create({
      title,
      description,
      category,
      collections,
      sizes,
      colors,
      tags,
      quantity: Number(quantity) || 0,
      price: Number(price),
      images,
    });

    return NextResponse.json(product, { status: 201 });
  } catch (err: any) {
    console.error("PRODUCT CREATE ERROR:", err);
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
