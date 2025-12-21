import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Collection from "@/models/Collection";
import Product from "@/models/Product";

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params; // ✅ Next.js 16 FIX
    await connectDB();

    // ❌ Prevent delete if products exist
    const productCount = await Product.countDocuments({
      collections: id,
    });

    if (productCount > 0) {
      return NextResponse.json(
        {
          message:
            "This collection has products. Remove them first.",
        },
        { status: 400 }
      );
    }

    const deleted = await Collection.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { message: "Collection not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE COLLECTION ERROR:", error);
    return NextResponse.json(
      { message: "Delete failed" },
      { status: 500 }
    );
  }
}
