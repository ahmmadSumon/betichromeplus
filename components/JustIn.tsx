"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Link from "next/link";

interface Product {
  _id: string;
  title: string;
  price: number;
  images: string[];
}

export function JustIn() {
  const [products, setProducts] = useState<Product[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const toggleWishlist = (id: string) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  useEffect(() => {
  let active = true;

  const fetchProducts = async (retry = 0) => {
    try {
      const res = await fetch("/api/products", {
        cache: "no-store",
      });

      if (!res.ok) throw new Error("Failed");

      const data = await res.json();
      if (active) setProducts(data || []);
    } catch (error) {
      if (retry < 2) {
        setTimeout(() => fetchProducts(retry + 1), 1000);
      } else {
        if (active) setProducts([]);
      }
    } finally {
      if (active) setLoading(false);
    }
  };

  fetchProducts();

  return () => {
    active = false;
  };
}, []);

  if (loading) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4 py-10">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="h-64 bg-gray-200 animate-pulse rounded-lg"
        />
      ))}
    </div>
  );
}


  if (!products.length) {
    return (
      <div className="py-20 text-center text-gray-500">
        No products available.
      </div>
    );
  }

  return (
    <div className="bg-white w-full py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Just Arrived</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => {
            const isWishlisted = wishlist.includes(product._id);

            return (
              <Card
                key={product._id}
                className="relative hover:shadow-lg transition-shadow duration-300"
              >
                <Link href={`/products/${product._id}`} className="block">
                  <CardContent className="p-0 relative">
                    <img
                      src={product.images?.[0] || "/image/placeholder.jpg"}
                      alt={product.title || "Product"}
                      className="w-full h-64 object-cover rounded-t-lg"
                    />
                    <div className="p-2">
                      <h3 className="text-lg font-semibold">{product.title}</h3>
                      <p className="text-sm text-gray-600">
                        TK {product.price || 0}
                      </p>
                    </div>
                  </CardContent>
                </Link>

                <button
                  onClick={() => toggleWishlist(product._id)}
                  className="absolute top-2 right-2 bg-white/80 p-2 rounded-full hover:scale-110 transition-transform z-10"
                >
                  {isWishlisted ? <FaHeart className="text-black" /> : <FaRegHeart className="text-black" />}
                </button>

                <CardFooter className="p-2" />
              </Card>
            );
          })}
        </div>

        <div className="flex justify-center mt-10">
          <Button variant="outline" className="px-10 py-6 text-base">
            Show More
          </Button>
        </div>
      </div>
    </div>
  );
}
