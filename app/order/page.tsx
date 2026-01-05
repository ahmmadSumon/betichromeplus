"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function OrderPage() {
  const [orderId, setOrderId] = useState("");
  const router = useRouter();

  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderId.trim()) {
      router.push(`/order-status?id=${orderId.trim()}`);
    }
  };

  return (
    <div className="bg-white w-full mt-10 py-12">
      <div className="max-w-4xl mx-auto px-4 space-y-10">
        {/* PAGE TITLE */}
        <h1 className="text-3xl md:text-4xl font-bold text-center">
          Order & Shipping Information
        </h1>

        {/* ORDER TRACKING */}
        <section className="bg-blue-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">📦 Track Your Order</h2>
          <form onSubmit={handleTrackOrder} className="flex gap-3">
            <input
              type="text"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="Enter your Order ID (e.g., ORD-1234567890-abc123)"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium"
            >
              Track Order
            </button>
          </form>
        </section>

        {/* ORDERING PROCESS */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">🛒 Ordering Process</h2>
          <ul className="list-decimal list-inside text-gray-700 space-y-2">
            <li>Select your desired product and size.</li>
            <li>Add the product to your cart.</li>
            <li>Proceed to checkout and fill in your details.</li>
            <li>Confirm your order.</li>
            <li>Our team will contact you for order confirmation.</li>
          </ul>
        </section>

        {/* SHIPPING INFO */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">🚚 Shipping Information</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Delivery available all over Bangladesh.</li>
            <li>Standard delivery time: 2–5 working days.</li>
            <li>Shipping cost may vary based on location.</li>
            <li>Cash on Delivery (COD) available.</li>
          </ul>
        </section>

        {/* RETURNS & REFUNDS */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">🔁 Returns & Refunds</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Returns accepted within 3 days of delivery.</li>
            <li>Product must be unused and in original condition.</li>
            <li>Refunds will be processed after inspection.</li>
            <li>Shipping cost is non-refundable.</li>
          </ul>
        </section>

        {/* NOTE */}
        <div className="bg-gray-100 p-4 rounded-lg text-sm text-gray-600">
          If you have any questions regarding orders or delivery, please contact
          our support team.
        </div>
      </div>
    </div>
  );
}
