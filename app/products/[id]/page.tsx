"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { AiOutlineMinus, AiOutlinePlus, AiOutlineHeart, AiOutlineShareAlt } from "react-icons/ai";
import { useCartStore } from "@/store/cartStore";
import { toast } from "sonner";
import { JustIn } from "@/components/JustIn";
interface Product {
  _id: string;
  title: string;
  price: number;
  description: string;
  images: string[];
  category?: string;
}

const ProductDetails = () => {
  const params = useParams();
  const router = useRouter();

  const addToCart = useCartStore((state) => state.addToCart);

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/products/${params.id}`, {
          cache: "no-store",
        });

        if (!res.ok) throw new Error("Product not found");

        const data = await res.json();
        setProduct(data);
        setSelectedImage(data.images?.[0] || null);
        setTimeout(() => setIsVisible(true), 100);
      } catch (err: any) {
        setError(err.message || "Failed to fetch product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  const increment = () => setQuantity((q) => q + 1);
  const decrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const handleAddToCart = () => {
    if (!product) return;

    addToCart({
      _id: product._id,
      title: product.title,
      price: product.price,
      image: product.images?.[0] || "/image/placeholder.jpg",
      quantity,
    });
    toast.success("Added to cart! 🛒", {
      description: `${product.title} × ${quantity}`,
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/cart");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white pt-20">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            <div className="space-y-4">
              <div className="aspect-square bg-gray-200 rounded-2xl animate-pulse" />
              <div className="flex gap-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-20 h-20 bg-gray-200 rounded-lg animate-pulse" />
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <div className="h-8 bg-gray-200 rounded animate-pulse" />
              <div className="h-6 bg-gray-200 w-1/3 rounded animate-pulse" />
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 bg-gray-200 w-3/4 rounded animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error)
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😞</div>
          <p className="text-red-500 text-xl font-medium">{error}</p>
        </div>
      </div>
    );

  if (!product) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white pt-20">
      <div ref={containerRef} className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* IMAGE GALLERY */}
          <div className={`transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"
          }`}>
            <div className="sticky top-24">
              <div className="relative group overflow-hidden rounded-2xl bg-white shadow-lg">
                <img
                  src={selectedImage || "/image/placeholder.jpg"}
                  alt={product.title}
                  className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-300 shadow-lg">
                    <AiOutlineHeart className="w-5 h-5" />
                  </button>
                  <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-300 shadow-lg">
                    <AiOutlineShareAlt className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
                {product.images?.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                      selectedImage === img
                        ? "border-black shadow-lg scale-105"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`View ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* PRODUCT INFO */}
          <div className={`transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"
          }`} style={{ transitionDelay: "200ms" }}>
            <div className="space-y-6">
              {product.category && (
                <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full font-medium">
                  {product.category}
                </span>
              )}

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                {product.title}
              </h1>

              <div className="flex items-baseline gap-4">
                <span className="text-3xl md:text-4xl font-bold text-black">
                  TK {product.price.toLocaleString()}
                </span>
                <span className="text-lg text-gray-500 line-through">
                  TK {Math.round(product.price * 1.2).toLocaleString()}
                </span>
              </div>

              <p className="text-gray-600 text-lg leading-relaxed">
                {product.description}
              </p>

              {/* QUANTITY SELECTOR */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Quantity</h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center bg-gray-100 rounded-xl overflow-hidden">
                    <button
                      onClick={decrement}
                      className="p-3 hover:bg-gray-200 transition-colors duration-200"
                    >
                      <AiOutlineMinus className="w-4 h-4" />
                    </button>
                    <span className="px-6 py-3 font-semibold min-w-[60px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={increment}
                      className="p-3 hover:bg-gray-200 transition-colors duration-200"
                    >
                      <AiOutlinePlus className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-gray-500">In stock</span>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="space-y-4 pt-4">
                <button
                  onClick={handleBuyNow}
                  className="w-full bg-black text-white py-4 px-8 rounded-xl font-semibold text-lg hover:bg-gray-800 transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Buy Now - TK {(product.price * quantity).toLocaleString()}
                </button>
                
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-white text-black border-2 border-black py-4 px-8 rounded-xl font-semibold text-lg hover:bg-black hover:text-white transform hover:scale-[1.02] transition-all duration-300"
                >
                  Add to Cart
                </button>
              </div>

              {/* FEATURES */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-200">
                <div className="text-center p-4">
                  <div className="text-2xl mb-2">🚚</div>
                  <div className="font-medium text-sm">Free Shipping</div>
                  <div className="text-xs text-gray-500">On orders over TK 1000</div>
                </div>
                <div className="text-center p-4">
                  <div className="text-2xl mb-2">↩️</div>
                  <div className="font-medium text-sm">Easy Returns</div>
                  <div className="text-xs text-gray-500">30-day return policy</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <JustIn/>
      </div>
    </div>
  );
};

export default ProductDetails;
