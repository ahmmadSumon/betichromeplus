"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Order {
  _id: string;
  orderId: string;
  customerInfo: {
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
    city: string;
  };
  items: Array<{
    title: string;
    quantity: number;
    price: number;
  }>;
  subtotal: number;
  paymentMethod: string;
  status: string;
  createdAt: string;
}

export function OrdersManagement() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/orders");
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setOrders(
          orders.map((order) =>
            order.orderId === orderId ? { ...order, status: newStatus } : order
          )
        );
        toast.success("Order status updated");
      }
    } catch (error) {
      toast.error("Failed to update order status");
    }
  };

  const getStatusColor = (status: string) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      processing: "bg-blue-100 text-blue-800",
      shipped: "bg-purple-100 text-purple-800",
      delivered: "bg-green-100 text-green-800",
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Orders Management</h1>
        <p className="text-gray-500">{orders.length} total orders</p>
      </div>

      <div className="grid gap-4">
        {orders.map((order) => (
          <div key={order._id} className="bg-white border rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <h3 className="font-semibold text-sm text-gray-500">ORDER ID</h3>
                <p className="font-mono text-sm">{order.orderId}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-sm text-gray-500">CUSTOMER</h3>
                <p className="text-sm">
                  {order.customerInfo.firstName} {order.customerInfo.lastName}
                </p>
                <p className="text-xs text-gray-600">{order.customerInfo.phone}</p>
                <p className="text-xs text-gray-600">{order.customerInfo.city}</p>
              </div>

              <div>
                <h3 className="font-semibold text-sm text-gray-500">ORDER DETAILS</h3>
                <p className="text-sm">{order.items.length} items</p>
                <p className="text-sm font-semibold">৳{order.subtotal}</p>
                <p className="text-xs text-gray-600 capitalize">
                  {order.paymentMethod}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-sm text-gray-500">STATUS</h3>
                <select
                  value={order.status}
                  onChange={(e) => updateOrderStatus(order.orderId, e.target.value)}
                  className={`text-sm px-3 py-1 rounded-full border ${getStatusColor(
                    order.status
                  )}`}
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                </select>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t">
              <h4 className="font-semibold text-sm mb-2">Items:</h4>
              <div className="space-y-1">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between text-sm text-gray-600"
                  >
                    <span>
                      {item.title} × {item.quantity}
                    </span>
                    <span>৳{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {orders.length === 0 && (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">📦</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No orders yet</h2>
          <p className="text-gray-500">
            Orders will appear here when customers place them.
          </p>
        </div>
      )}
    </div>
  );
}