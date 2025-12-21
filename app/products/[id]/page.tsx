"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  images: string[];
  category?: string;
}

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/products/${params.id}`);
        if (!res.ok) throw new Error("Product not found");
        const data = await res.json();
        setProduct(data);
        setSelectedImage(data.images?.[0] || null);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Failed to fetch product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  const increment = () => setQuantity((q) => q + 1);
  const decrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  if (loading)
    return (
      <div className="max-w-4xl mx-auto py-10 px-4 animate-pulse">
        <div className="h-10 bg-gray-300 mb-4 rounded"></div>
        <div className="h-96 bg-gray-300 rounded mb-4"></div>
        <div className="h-6 bg-gray-300 w-1/4 mb-2 rounded"></div>
        <div className="h-4 bg-gray-300 w-full rounded"></div>
      </div>
    );

  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;
  if (!product) return null;

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 flex flex-col md:flex-row gap-10 mt-20">
      {/* Image Gallery */}
      <div className="flex-1">
        <img
          src={selectedImage || "/image/placeholder.jpg"}
          alt={product.title}
          className="w-full h-96 object-cover rounded-lg mb-4"
        />
        <div className="flex gap-2 overflow-x-auto">
          {product.images?.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Thumbnail ${idx + 1}`}
              className={`w-20 h-20 object-cover rounded cursor-pointer border-2 ${
                selectedImage === img ? "border-blue-500" : "border-gray-200"
              }`}
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="flex-1 flex flex-col gap-4">
        <h1 className="text-4xl font-bold">{product.title}</h1>
        <p className="text-xl font-semibold text-green-600">${product.price}</p>
        {product.category && (
          <p className="text-sm text-gray-500">Category: {product.category}</p>
        )}
        <p className="text-gray-700">{product.description}</p>

        {/* Quantity Selector */}
        <div className="flex items-center gap-4 mt-4">
          <span className="font-medium">Quantity:</span>
          <div className="flex items-center border rounded">
            <button
              className="px-3 py-1 text-lg hover:bg-gray-100"
              onClick={decrement}
            >
              <AiOutlineMinus />
            </button>
            <span className="px-4 py-1">{quantity}</span>
            <button
              className="px-3 py-1 text-lg hover:bg-gray-100"
              onClick={increment}
            >
              <AiOutlinePlus />
            </button>
          </div>
        </div>

        {/* Add to Cart Button */}
        <div className="flex gap-2">
  <button className="mt-6 bg-black text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
          Add to Cart
        </button>
         <button className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
          Buy Now
        </button>
        </div>
      
      </div>
    </div>
  );
};

export default ProductDetails;
