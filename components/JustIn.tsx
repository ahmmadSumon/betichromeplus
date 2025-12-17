"use client";

import React, { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const products = [
  { id: 1, name: "Premium Jacket", price: "$120", image: "/image/slide1.jpg" },
  { id: 2, name: "Stylish Sneakers", price: "$85", image: "/image/slide2.jpg" },
  { id: 3, name: "Classic Watch", price: "$250", image: "/image/slide3.jpg" },
  { id: 4, name: "Leather Bag", price: "$180", image: "/image/slide4.jpg" },
  { id: 5, name: "Leather Bag", price: "$180", image: "/image/slide4.jpg" },
  { id: 6, name: "Classic Watch", price: "$250", image: "/image/slide3.jpg" },
  { id: 7, name: "Stylish Sneakers", price: "$85", image: "/image/slide2.jpg" },
  { id: 8, name: "Leather Bag", price: "$180", image: "/image/slide4.jpg" },
];

const JustIn = () => {
  const [wishlist, setWishlist] = useState<number[]>([]);

  const toggleWishlist = (id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  return (
    <div className="bg-white w-full py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Just Arrived</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => {
            const isWishlisted = wishlist.includes(product.id);

            return (
              <Card
                key={product.id}
                className="relative hover:shadow-lg transition-shadow duration-300"
              >
                <CardContent className="p-0 relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-80 object-cover rounded-t-lg"
                  />

                  {/* Wishlist */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-2 right-2 bg-white/80 p-2 rounded-full hover:scale-110 transition-transform"
                  >
                    {isWishlisted ? (
                      <FaHeart className="text-black" />
                    ) : (
                      <FaRegHeart className="text-black" />
                    )}
                  </button>

                  <div className="p-2">
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="text-sm text-gray-600">{product.price}</p>
                  </div>
                </CardContent>

                <CardFooter className="p-2">
                  <Button className="w-full">Add to Cart</Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {/* Simple Button */}
        <div className="flex justify-center mt-10">
          <Button variant="outline" className="px-10 py-6 text-base">
            Show More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JustIn;
