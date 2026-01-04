"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";

interface ProductType {
  _id: string;
  title: string;
  price: number;
  images: string[];
}

const Page = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<HTMLDivElement>(null);

  const fetchProducts = async (pageNum: number) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/products?page=${pageNum}&limit=10`);
      const data = await res.json();
      
      if (pageNum === 1) {
        setProducts(data.products);
      } else {
        setProducts(prev => [...prev, ...data.products]);
      }
      
      setHasMore(data.hasMore);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(1);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loading && hasMore) {
          setPage(prev => {
            const nextPage = prev + 1;
            fetchProducts(nextPage);
            return nextPage;
          });
        }
      },
      { threshold: 0.1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [loading, hasMore]);

  return (
    <div className="bg-white w-full py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">
          All Products
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <Card key={product._id} className="relative hover:shadow-lg transition-shadow duration-300">
              <Link href={`/products/${product._id}`} className="block">
                <CardContent className="p-0 relative">
                  <img
                    src={product.images?.[0] || "/image/placeholder.jpg"}
                    alt={product.title}
                    className="w-full h-64 object-cover rounded-t-lg"
                  />
                  <div className="p-2">
                    <h3 className="text-lg font-semibold">{product.title}</h3>
                    <p className="text-sm text-gray-600">TK {product.price}</p>
                  </div>
                </CardContent>
              </Link>
              <CardFooter className="p-2" />
            </Card>
          ))}
        </div>

        {/* Loading indicator */}
        {loading && (
          <div className="flex justify-center mt-8">
            <div className="text-gray-500">Loading more products...</div>
          </div>
        )}

        {/* Intersection observer target */}
        <div ref={observerRef} className="h-10" />

        {/* End message */}
        {!hasMore && products.length > 0 && (
          <div className="flex justify-center mt-8">
            <div className="text-gray-500">No more products to load</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
