"use client";

import * as React from "react";
import Link from "next/link"; // Import Link
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { Card, CardContent } from "@/components/ui/card";

interface Product {
  _id: string;
  images: string[];
  title: string;
  price?: number;
}

export function ProductCarousel() {
  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: "start", skipSnaps: false },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );

  const [products, setProducts] = React.useState<Product[]>([]);

  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data.slice(-8).reverse());
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };
    fetchProducts();
  }, []);

  const getSlideWidth = () => {
    if (typeof window === "undefined") return "50%";
    const width = window.innerWidth;
    if (width >= 1200) return "20%";
    if (width >= 768) return "25%";
    if (width >= 640) return "33.3333%";
    return "50%";
  };

  const [slideWidth, setSlideWidth] = React.useState(getSlideWidth());

  React.useEffect(() => {
    const handleResize = () => setSlideWidth(getSlideWidth());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto py-6">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-2">
          {products.map((product) => (
            <div key={product._id} className="flex-none" style={{ width: slideWidth }}>
              {/* Wrap card with Link */}
              <Link href={`/products/${product._id}`}>
                <Card className="overflow-hidden rounded-xl cursor-pointer">
                  <CardContent className="p-0">
                    <div className="relative w-full h-60 md:h-72 group">
                      <img
                        src={product.images[0] || "/image/slide1.jpg"}
                        alt={product.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-white text-lg font-bold">
                          {product.title}
                        </span>
                      </div>
                    </div>
                    <div className="p-4 text-center">
                      <h3 className="text-lg font-semibold">{product.title}</h3>
                      {product.price && (
                        <p className="text-sm text-gray-500">${product.price}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
