"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";

interface ProductTableProps {
  refreshTrigger?: boolean;
  onEdit?: (product: any) => void;
}

export const ProductTable: React.FC<ProductTableProps> = ({
  refreshTrigger,
  onEdit,
}) => {
  const [products, setProducts] = useState<any[]>([]);

  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, [refreshTrigger]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
    const data = await res.json();

    if (!res.ok) {
      toast.error(data.error || "Delete failed");
      return;
    }

    toast.success("Product deleted");
    fetchProducts();
  };

  if (products.length === 0) {
    return (
      <p className="text-center mt-6 text-gray-500">
        No products available.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((p) => (
        <div
          key={p._id}
          className="bg-white shadow-md rounded-lg overflow-hidden border flex flex-col"
        >
          {/* Image */}
          <div className="relative h-40 w-full">
            {p.images && p.images.length > 0 ? (
              <Image
                src={p.images[0]}
                alt={p.title}
                fill
                sizes="100vw"
                style={{ objectFit: "cover" }}
                unoptimized
              />
            ) : (
              <div className="bg-gray-200 w-full h-full flex items-center justify-center text-gray-500">
                No Image
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="p-3 flex flex-col gap-1 flex-1">
            <h3 className="font-semibold text-gray-800 truncate">
              {p.title}
            </h3>
            <p className="text-sm text-gray-500 truncate">
              {p.category}
            </p>

            {/* Collections */}
            <div className="flex flex-wrap gap-1 mt-1">
              {p.collections?.map((c: string, i: number) => (
                <span
                  key={i}
                  className="bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full text-xs"
                >
                  {c}
                </span>
              ))}
            </div>

            {/* Price & Quantity */}
            <div className="flex justify-between items-center mt-2">
              <span className="font-medium text-gray-700">
                ${p.price}
              </span>
              <span className="text-sm text-gray-500">
                {p.quantity} pcs
              </span>
            </div>

            {/* Actions */}
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => onEdit?.(p)}
                className="flex-1 bg-yellow-400 text-white text-sm py-1 rounded hover:bg-yellow-500"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(p._id)}
                className="flex-1 bg-red-500 text-white text-sm py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
