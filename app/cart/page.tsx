"use client";

import { useCartStore } from "@/store/cartStore";
import Image from "next/image";
import Link from "next/link";

const CartPage = () => {
  const {
    cart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    clearCart,
  } = useCartStore();

  if (!cart || cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-gray-500 text-lg">Your cart is empty 🛒</p>
      </div>
    );
  }

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 mt-20">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="space-y-6">
        {cart.map((item) => (
          <div
            key={item._id}
            className="flex items-center gap-4 border p-4 rounded-lg"
          >
            <Image
              src={item.image || "/image/placeholder.jpg"}
              alt={item.title}
              width={100}
              height={100}
              className="rounded object-cover"
            />

            <div className="flex-1">
              <h2 className="font-semibold text-lg">{item.title}</h2>
              <p className="text-gray-600">৳ {item.price}</p>

              <div className="flex items-center gap-3 mt-2">
                <button
                  onClick={() => decreaseQty(item._id)}
                  className="px-3 py-1 border rounded"
                >
                  −
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => increaseQty(item._id)}
                  className="px-3 py-1 border rounded"
                >
                  +
                </button>
              </div>
            </div>

            <div className="text-right">
              <p className="font-semibold">
                ৳ {item.price * item.quantity}
              </p>
              <button
                onClick={() => removeFromCart(item._id)}
                className="text-red-500 text-sm mt-2"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* SUMMARY */}
      <div className="mt-10 border-t pt-6 flex justify-between items-center">
        <h2 className="text-xl font-bold">Total: ৳ {total}</h2>

        <div className="flex gap-3">
          <button
            onClick={clearCart}
            className="px-6 py-2 border rounded"
          >
            Clear Cart
          </button>
           <Link href="/account?from=checkout">
           
           
          <button className="px-6 py-2 bg-black text-white rounded">
            Checkout
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
