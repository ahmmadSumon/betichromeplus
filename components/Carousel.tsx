"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { Card, CardContent } from "@/components/ui/card";

interface Product {
  image: string;
  name: string;
  price?: string;
}

const products: Product[] = [
  { image: "/image/slide1.jpg", name: "Premium Jacket", price: "$120" },
  { image: "/image/slide2.jpg", name: "Classic Sneakers", price: "$80" },
  { image: "/image/slide3.jpg", name: "Stylish Hat", price: "$40" },
  { image: "/image/slide4.jpg", name: "Leather Bag", price: "$150" },
  { image: "/image/slide2.jpg", name: "Sunglasses", price: "$60" },
   { image: "/image/slide1.jpg", name: "Premium Jacket", price: "$120" },
  { image: "/image/slide2.jpg", name: "Classic Sneakers", price: "$80" },
  { image: "/image/slide3.jpg", name: "Stylish Hat", price: "$40" },
  { image: "/image/slide4.jpg", name: "Leather Bag", price: "$150" },
  { image: "/image/slide3.jpg", name: "Sunglasses", price: "$60" },
];

export function ProductCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", skipSnaps: false },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );

  return (
    <div className="w-full max-w-7xl mx-auto py-6">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-2">
          {products.map((product, idx) => (
            <div
              key={idx}
              className="
                shrink-0
                w-[49%]      /* mobile: 2 items */
                sm:w-[32%]   /* tablet: ~3 items */
                md:w-[25%]   /* desktop: 5 items */
              "
            >
              <Card className="overflow-hidden rounded-xl">
                <CardContent className="p-0">
                  <div className="relative w-full h-60 md:h-72 group">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-white text-lg font-bold">
                        {product.name}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    {product.price && (
                      <p className="text-sm text-gray-500">{product.price}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
