import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const data = await request.json();
    const session = await getServerSession();
    
    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // If user is logged in, capture their session info
    const orderData = {
      orderId,
      ...data,
      ...(session?.user ? {
        userEmail: session.user.email,
        userId: session.user.id,
        // If customer didn't provide email, use session email
        customerInfo: {
          ...data.customerInfo,
          email: data.customerInfo.email || session.user.email
        }
      } : {})
    };
    
    const order = new Order(orderData);
    await order.save();
    
    return NextResponse.json({ success: true, orderId });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const orders = await Order.find({}).sort({ createdAt: -1 });
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}