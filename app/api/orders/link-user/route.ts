import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { orderId } = await request.json();
    
    await connectDB();
    
    // Update the order to link it to the current user
    const result = await Order.updateOne(
      { orderId },
      { $set: { userEmail: session.user.email } }
    );
    
    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, message: "Order linked to user" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to link order" },
      { status: 500 }
    );
  }
}