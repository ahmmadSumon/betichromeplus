import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Collection from "@/models/Collection";
import Product from "@/models/Product";

/* =======================
   GET ALL COLLECTIONS
   WITH PRODUCT COUNT
======================= */
export async function GET() {
  try {
    await connectDB();

    const collections = await Collection.find()
      .sort({ createdAt: -1 })
      .lean();

    const collectionsWithCount = await Promise.all(
      collections.map(async (col) => {
        const productCount = await Product.countDocuments({
          collections: col._id,
        });

        return {
          ...col,
          productCount,
        };
      })
    );

    return NextResponse.json(collectionsWithCount);
  } catch (error) {
    console.error("GET COLLECTIONS ERROR:", error);
    return NextResponse.json(
      { message: "Failed to fetch collections" },
      { status: 500 }
    );
  }
}

/* =======================
   CREATE COLLECTION
======================= */
export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const collection = await Collection.create(body);

    return NextResponse.json(collection);
  } catch (error) {
    console.error("CREATE COLLECTION ERROR:", error);
    return NextResponse.json(
      { message: "Failed to create collection" },
      { status: 500 }
    );
  }
}
