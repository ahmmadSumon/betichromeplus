"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

interface Order {
  orderId: string;
  status: string;
  createdAt: string;
  customerInfo: {
    firstName: string;
    lastName: string;
    phone: string;
  };
  items: Array<{
    title: string;
    quantity: number;
    price: number;
  }>;
  subtotal: number;
}

function OrderStatusContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchOrder = async () => {
    if (!orderId) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`/api/orders/${orderId}`);
      const data = await res.json();
      console.log('Order data:', data);
      
      if (data.error) {
        setOrder(null);
      } else {
        setOrder(data);
      }
    } catch (error) {
      console.error('Error fetching order:', error);
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(fetchOrder, 30000);
    return () => clearInterval(interval);
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold mb-2">Order Not Found</h1>
          <p className="text-gray-500 mb-4">Order ID: {orderId}</p>
          <Link href="/" className="text-blue-600 hover:underline">
            Go to Home
          </Link>
        </div>
      </div>
    );
  }

  const statusSteps = [
    { key: "pending", label: "Order Placed", active: true },
    { key: "processing", label: "Processing", active: order.status !== "pending" },
    { key: "shipped", label: "Shipped", active: order.status === "shipped" || order.status === "delivered" },
    { key: "delivered", label: "Delivered", active: order.status === "delivered" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-10">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h1 className="text-2xl font-bold mb-6">Order Status</h1>
          
          <div className="mb-8">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Order ID</p>
                <p className="font-mono font-semibold">{order.orderId}</p>
              </div>
              <button
                onClick={fetchOrder}
                className="text-sm text-blue-600 hover:text-blue-800 transition"
              >
                🔄 Refresh Status
              </button>
            </div>
          </div>

          {/* Status Progress */}
          <div className="mb-8">
            <div className="flex justify-between items-center">
              {statusSteps.map((step, index) => (
                <div key={step.key} className="flex flex-col items-center flex-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    step.active ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"
                  }`}>
                    {step.active ? "✓" : index + 1}
                  </div>
                  <p className={`text-xs mt-2 ${step.active ? "text-green-600" : "text-gray-500"}`}>
                    {step.label}
                  </p>
                  {index < statusSteps.length - 1 && (
                    <div className={`h-1 w-full mt-4 ${
                      statusSteps[index + 1].active ? "bg-green-500" : "bg-gray-200"
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Order Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Customer Information</h3>
              <p>{order.customerInfo?.firstName} {order.customerInfo?.lastName}</p>
              <p>{order.customerInfo?.phone}</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Order Summary</h3>
              <div className="space-y-2">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>{item.title} × {item.quantity}</span>
                    <span>৳{item.price * item.quantity}</span>
                  </div>
                ))}
                <div className="border-t pt-2 font-semibold">
                  Total: ৳{order.subtotal}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link 
              href="/"
              className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OrderStatusPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 pt-24 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    }>
      <OrderStatusContent />
    </Suspense>
  );
}