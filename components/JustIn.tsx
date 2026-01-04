"use client";

import React, { useEffect, useState, useRef } from "react";
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
  const [isVisible, setIsVisible] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/products", {
      method: "GET",
      cache: "no-store",
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((data) => setProducts(data.products || data))
      .catch(() => setProducts([]));

    return () => controller.abort();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
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
    <div ref={sectionRef} className="bg-white py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className={`text-2xl font-bold mb-6 transition-all duration-800 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          Just Arrived
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {products.map((p, index) => {
            const isLeftSide = index % 2 === 0;
            return (
              <div
                key={p._id}
                className={`transition-all duration-1000 ease-out ${
                  isVisible
                    ? "opacity-100 translate-x-0"
                    : isLeftSide
                    ? "opacity-0 -translate-x-20"
                    : "opacity-0 translate-x-20"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <Card className="hover:shadow-lg hover:scale-105 transition-all duration-300">
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
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
