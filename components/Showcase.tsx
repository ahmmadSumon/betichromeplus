"use client";

import React from "react";
import CardSwap, { Card } from "./CardSwap";

const Showcase = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-20 overflow-hidden">
      <div
        className="
          grid grid-cols-1 md:grid-cols-2
          items-center
          gap-12
          relative
        "
      >
        {/* LEFT CONTENT */}
        <div className="z-10">
<h2 className="text-4xl md:text-5xl font-extrabold text-black leading-tight">
  Elevate Your <br /> Everyday Style
</h2>

<p className="text-gray-600 mt-4 max-w-md text-lg">
  Handpicked fashion essentials crafted for comfort, confidence, and timeless appeal.
</p>

<button className="mt-8 px-8 cursor-pointer py-4 rounded-full bg-black text-white font-semibold hover:bg-gray-800 transition">
  Shop the Collection
</button>




        </div>

        {/* RIGHT CARD SWAP */}
        <div className="relative h-[260px] md:h-[600px]">
          <CardSwap
            width={720}
            height={420}
            cardDistance={70}
            verticalDistance={80}
            delay={2500}
            pauseOnHover
            easing="elastic"
          >
            {/* CARD 1 */}
         <Card className="text-white p-3 sm:p-4">
  <img
    src="/image/slide1.jpg"
    alt="Premium Jacket"
    className="
      w-full
      h-[220px] sm:h-[360px]
      object-cover
      rounded-lg
      mb-3 sm:mb-4
    "
  />
  <h3 className="text-lg sm:text-xl text-gray-600 font-bold">
    Premium Jacket
  </h3>
  <p className="text-xs sm:text-sm text-gray-400 mt-1">
    Modern winter collection
  </p>
</Card>


            {/* CARD 2 */}
           <Card className="text-white p-3 sm:p-4">
  <img
    src="/image/slide2.jpg"
    alt="Urban Wear"
    className="
      w-full
      h-[220px] sm:h-[360px]
      object-cover
      rounded-lg
      mb-3 sm:mb-4
    "
  />
  <h3 className="text-lg sm:text-xl text-gray-600 font-bold">
    Urban Wear
  </h3>
  <p className="text-xs sm:text-sm text-gray-400 mt-1">
    Designed for everyday comfort
  </p>
</Card>


            {/* CARD 3 */}
            <Card className="text-white p-3 sm:p-4">
  <img
    src="/image/slide4.jpg"
    alt="Trending Style"
    className="
      w-full
      h-[220px] sm:h-[360px]
      object-cover
      rounded-lg
      mb-3 sm:mb-4
    "
  />
  <h3 className="text-lg sm:text-xl text-gray-600 font-bold">
    Trending Style
  </h3>
  <p className="text-xs sm:text-sm text-gray-400 mt-1">
    Best seller this season
  </p>
</Card>

          </CardSwap>
        </div>
      </div>
    </section>
  );
};

export default Showcase;
