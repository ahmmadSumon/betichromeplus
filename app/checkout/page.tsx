"use client";

import { useCartStore } from "@/store/cartStore";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function CheckoutPage() {
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);
  const router = useRouter();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [loading, setLoading] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    address: "",
    apartment: "",
    city: "",
    district: "",
    postcode: "",
    phone: "",
    email: "",
    notes: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerInfo: formData,
          items: cart,
          subtotal,
          paymentMethod,
        }),
      });

      const result = await response.json();
      console.log('Order creation response:', result);
      
      if (response.ok && result.success) {
        setOrderId(result.orderId);
        setOrderConfirmed(true);
        clearCart();
        toast.success("Order placed successfully!");
      } else {
        console.error('Order creation failed:', result);
        toast.error(result.error || "Failed to place order");
      }
    } catch (error) {
      console.error('Order submission error:', error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (orderConfirmed) {
    return (
      <div className="bg-gray-50 min-h-screen py-12 flex items-center justify-center">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="text-6xl mb-4">✅</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Order Confirmed!
          </h1>
          <p className="text-gray-600 mb-4">
            Your order has been placed successfully.
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Order ID: <span className="font-mono font-semibold">{orderId}</span>
          </p>
          <div className="space-y-3">
            <button
              onClick={() => router.push(`/order-status?id=${orderId}`)}
              className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition"
            >
              Check Order Process
            </button>
            <button
              onClick={() => router.push("/")}
              className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition"
            >
              Go to Home Page
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          <p className="text-gray-500 mt-1">
            Complete your order by providing your details
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* LEFT – Billing Details */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-xl font-semibold mb-6">Billing details</h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input 
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="input" 
                placeholder="First name *" 
                required 
              />
              <input 
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="input" 
                placeholder="Last name *" 
                required 
              />

              <input
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                className="input md:col-span-2"
                placeholder="Company name (optional)"
              />

              <input
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="input md:col-span-2"
                placeholder="House number and street name *"
                required
              />

              <input
                name="apartment"
                value={formData.apartment}
                onChange={handleInputChange}
                className="input md:col-span-2"
                placeholder="Apartment, suite, unit, etc. (optional)"
              />

              <input 
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="input" 
                placeholder="Town / City *" 
                required 
              />
              <input 
                name="district"
                value={formData.district}
                onChange={handleInputChange}
                className="input" 
                placeholder="District *" 
                required 
              />

              <input
                name="postcode"
                value={formData.postcode}
                onChange={handleInputChange}
                className="input"
                placeholder="Postcode / ZIP (optional)"
              />

              <input
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="input md:col-span-2"
                placeholder="Billing Mobile Number *"
                required
              />

              <input
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="input md:col-span-2"
                placeholder="Billing Email (optional)"
              />

              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                className="input md:col-span-2 min-h-[100px]"
                placeholder="Order notes (optional)"
              />
            </form>
          </div>

          {/* RIGHT – Order Summary */}
          <div className="bg-white rounded-xl shadow-sm p-8 h-fit">
            <h2 className="text-xl font-semibold mb-6">Your order</h2>

            {/* PRODUCTS */}
            <div className="space-y-4 border-b pb-5">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between text-sm text-gray-700"
                >
                  <span>
                    {item.title} <span className="text-gray-400">× {item.quantity}</span>
                  </span>
                  <span className="font-medium">
                    ৳{item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            {/* PRICE SUMMARY */}
            <div className="space-y-3 mt-5 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span>৳{subtotal}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Shipping</span>
                <span className="text-green-600">
                  Inside Dhaka — Free
                </span>
              </div>
            </div>

            <div className="flex justify-between mt-6 text-lg font-semibold border-t pt-4">
              <span>Total</span>
              <span>৳{subtotal}</span>
            </div>

            {/* PAYMENT METHODS */}
            <div className="mt-6 space-y-4 text-sm">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="radio"
                  className="mt-1 accent-black"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                />
                <div>
                  <p className="font-medium">Cash on Delivery</p>
                  <p className="text-gray-500 text-xs">
                    Pay with cash when your order is delivered.
                  </p>
                </div>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="radio"
                  className="mt-1 accent-black"
                  checked={paymentMethod === "bkash"}
                  onChange={() => setPaymentMethod("bkash")}
                />
                <div>
                  <p className="font-medium">bKash Payment Gateway</p>
                  <p className="text-gray-500 text-xs">
                    Pay via bKash, Rocket, cards or online banking.
                  </p>
                </div>
              </label>
            </div>

            <p className="text-xs text-gray-500 mt-5">
              Your personal data will be used to process your order and support
              your experience throughout this website.
            </p>

            <button 
              onClick={handleSubmit}
              disabled={loading}
              className="w-full mt-6 bg-black text-white py-3 rounded-lg font-medium hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? "Processing..." : "Place Order"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
