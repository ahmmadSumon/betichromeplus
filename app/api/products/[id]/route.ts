import { NextResponse } from "next/server";
import {connectDB} from "@/lib/mongodb";
import {Product }from "@/models/Product";

interface Context {
  params: Promise<{ id: string }>;
}

/* ================= UPDATE PRODUCT ================= */
export async function PUT(req: Request, context: Context) {
  try {
    await connectDB();

    const { id } = await context.params; // ✅ FIX HERE
    const body = await req.json();

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true }
    );

    if (!updatedProduct) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedProduct);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

/* ================= DELETE PRODUCT ================= */
export async function DELETE(req: Request, context: Context) {
  try {
    await connectDB();

    const { id } = await context.params; // ✅ FIX HERE

    const deleted = await Product.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
