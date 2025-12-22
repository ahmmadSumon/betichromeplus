"use client";

import { useCartStore } from "@/store/cartStore";
import { useState } from "react";

export default function CheckoutPage() {
  const cart = useCartStore((state) => state.cart);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const [paymentMethod, setPaymentMethod] = useState("cod");

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

            <form className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input className="input" placeholder="First name *" required />
              <input className="input" placeholder="Last name *" required />

              <input
                className="input md:col-span-2"
                placeholder="Company name (optional)"
              />

              <select className="input md:col-span-2">
                <option>Bangladesh</option>
              </select>

              <input
                className="input md:col-span-2"
                placeholder="House number and street name *"
                required
              />

              <input
                className="input md:col-span-2"
                placeholder="Apartment, suite, unit, etc. (optional)"
              />

              <input className="input" placeholder="Town / City *" required />
              <input className="input" placeholder="District *" required />

              <input
                className="input"
                placeholder="Postcode / ZIP (optional)"
              />

              <input
                className="input md:col-span-2"
                placeholder="Billing Mobile Number *"
                required
              />

              <input
                className="input md:col-span-2"
                placeholder="Billing Email (optional)"
              />

              <textarea
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

            <button className="w-full mt-6 bg-black text-white py-3 rounded-lg font-medium hover:opacity-90 transition">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
