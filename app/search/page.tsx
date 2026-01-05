"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

interface Product {
  _id: string;
  title: string;
  price: number;
  images: string[];
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query.trim()) {
        setProducts([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const res = await fetch(`/api/products?search=${encodeURIComponent(query)}`);
        const data = await res.json();
        setProducts(data.products || data || []);
      } catch (error) {
        console.error("Search error:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <div className="min-h-screen bg-white pt-24 pb-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Search Results
          </h1>
          {query && (
            <p className="text-gray-600">
              Showing results for: <span className="font-semibold">"{query}"</span>
            </p>
          )}
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 aspect-square rounded-lg mb-2" />
                <div className="h-4 bg-gray-200 rounded mb-1" />
                <div className="h-4 bg-gray-200 w-2/3 rounded" />
              </div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {products.map((product) => (
              <Card key={product._id} className="hover:shadow-lg hover:scale-105 transition-all duration-300">
                <Link href={`/products/${product._id}`}>
                  <CardContent className="p-0">
                    <img
                      src={product.images?.[0] || "/image/placeholder.jpg"}
                      className="w-full aspect-square object-cover rounded-t-lg"
                      alt={product.title}
                    />
                    <div className="p-3">
                      <h3 className="font-semibold text-sm mb-1 line-clamp-2">
                        {product.title}
                      </h3>
                      <p className="text-lg font-bold">TK {product.price}</p>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        ) : query ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              No products found
            </h2>
            <p className="text-gray-600">
              Try searching with different keywords
            </p>
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Start searching
            </h2>
            <p className="text-gray-600">
              Enter a search term to find products
            </p>
          </div>
        )}
      </div>
    </div>
  );
}