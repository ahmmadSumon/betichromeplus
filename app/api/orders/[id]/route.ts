import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  console.log('=== ORDER API CALLED ===');
  
  const { id } = await params;
  console.log('Looking for order with ID:', id);
  
  try {
    await connectDB();
    console.log('Database connected successfully');
    
    const order = await Order.findOne({ orderId: id });
    console.log('Database query result:', order);
    
    if (!order) {
      console.log('Order not found in database');
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }
    
    console.log('Order found, returning:', order);
    return NextResponse.json(order);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: "Failed to fetch order" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { status } = await request.json();
    const { id } = await params;
    
    const order = await Order.findOneAndUpdate(
      { orderId: id },
      { status },
      { new: true }
    );
    
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }
    
    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update order" },
      { status: 500 }
    );
  }
}