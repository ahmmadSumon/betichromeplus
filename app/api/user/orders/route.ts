import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession();
    
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    
    // Find orders that match the logged-in user
    const orders = await Order.find({
      $or: [
        // Match by email if provided
        ...(session.user.email ? [{ "customerInfo.email": session.user.email }] : []),
        // Match by userEmail field
        { "userEmail": session.user.email },
        // Match by name components
        ...(session.user.name ? [
          {
            $or: [
              // Full name match
              { "customerInfo.firstName": { $regex: `^${session.user.name.split(' ')[0]}$`, $options: 'i' } },
              // First name + last name match
              {
                $and: [
                  { "customerInfo.firstName": { $regex: `^${session.user.name.split(' ')[0]}$`, $options: 'i' } },
                  ...(session.user.name.split(' ').length > 1 ? 
                    [{ "customerInfo.lastName": { $regex: `^${session.user.name.split(' ').slice(1).join(' ')}$`, $options: 'i' } }] : 
                    [])
                ]
              }
            ]
          }
        ] : [])
      ]
    }).sort({ createdAt: -1 });
    
    return NextResponse.json(orders);
  } catch (error) {
    console.error('Error fetching user orders:', error);
    return NextResponse.json(
      { error: "Failed to fetch user orders" },
      { status: 500 }
    );
  }
}