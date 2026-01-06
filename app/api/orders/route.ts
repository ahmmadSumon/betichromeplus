import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { rateLimit } from "@/lib/rate-limit";
import { orderSchema } from "@/lib/validation";
import { logger } from "@/lib/logger";

export async function POST(request: NextRequest) {
  // Rate limiting
  const rateLimitResult = rateLimit(request, { limit: 5, windowMs: 60 * 1000 });
  if (!rateLimitResult.success) {
    return NextResponse.json(
      { error: "Too many order requests" },
      { status: 429, headers: { 'Retry-After': '60' } }
    );
  }

  try {
    await connectDB();
    const data = await request.json();
    const session = await getServerSession();
    
    // Validate input
    const validatedData = orderSchema.parse(data);
    
    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // If user is logged in, capture their session info
    const orderData = {
      orderId,
      ...validatedData,
      ...(session?.user ? {
        userEmail: session.user.email,
        userId: session.user.id,
        // If customer didn't provide email, use session email
        customerInfo: {
          ...validatedData.customerInfo,
          email: validatedData.customerInfo.email || session.user.email
        }
      } : {})
    };
    
    const order = new Order(orderData);
    await order.save();
    
    logger.info('Order created', { 
      orderId, 
      userId: session?.user?.id || 'guest',
      subtotal: validatedData.subtotal 
    });
    
    return NextResponse.json({ success: true, orderId });
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      logger.warn('Order validation failed', { error: error.message });
      return NextResponse.json(
        { error: "Invalid order data", details: error.message },
        { status: 400 }
      );
    }
    
    logger.error('Failed to create order', error as Error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const orders = await Order.find({}).sort({ createdAt: -1 }).limit(100); // Limit results
    
    logger.info('Orders fetched', { count: orders.length });
    
    return NextResponse.json(orders);
  } catch (error) {
    logger.error('Failed to fetch orders', error as Error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}