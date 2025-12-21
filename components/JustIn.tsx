"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

interface Product {
  _id: string;
  title: string;
  price: number;
  images: string[];
}

export function JustIn() {
  const [products, setProducts] = useState<Product[] | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/products", {
      method: "GET",
      cache: "no-store",
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(() => setProducts([]));

    return () => controller.abort();
  }, []);

  if (products === null) {
    return (
      <div className="py-20 text-center text-gray-500">
        Loading products...
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="py-20 text-center text-gray-500">
        No products found.
      </div>
    );
  }

  return (
    <div className="bg-white py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Just Arrived</h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {products.map((p) => (
            <Card key={p._id}>
              <Link href={`/products/${p._id}`}>
                <CardContent className="p-0">
                  <img
                    src={p.images?.[0] || "/image/placeholder.jpg"}
                    className="w-full h-64 object-cover"
                    alt={p.title}
                  />
                  <div className="p-2">
                    <h3 className="font-semibold">{p.title}</h3>
                    <p>TK {p.price}</p>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
