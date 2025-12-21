import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

interface Context {
  params: Promise<{ id: string }>; // keep Promise
}

export async function GET(req: Request, context: Context) {
  await connectDB();

  const { id } = await context.params; // ✅ unwrap the Promise

  try {
    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch (err) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function PUT(req: Request, context: Context) {
  await connectDB();

  const { id } = await context.params; // ✅ unwrap
  const body = await req.json();

  const updated = await Product.findByIdAndUpdate(id, { $set: body }, { new: true });

  if (!updated) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(updated);
}

export async function DELETE(req: Request, context: Context) {
  await connectDB();
  const { id } = await context.params; // ✅ unwrap
  await Product.findByIdAndDelete(id);

  return NextResponse.json({ success: true });
}
