import React from "react";
import { ThreeDCardDemo } from "./ThreeDCardDemo";

const ThreeSection = () => {
  return (
    <section className="bg-white w-full py-10">
      <div
        className="
          mx-auto max-w-7xl
          flex flex-col sm:flex-row
          items-center justify-center
          gap-3 sm:gap-6 md:gap-10
          px-3 sm:px-6
        "
      >
        <ThreeDCardDemo image="/image/slide1.jpg" name="Premium Jacket" />
        <ThreeDCardDemo image="/image/slide2.jpg" name="Urban Sneakers" />
        <ThreeDCardDemo image="/image/slide3.jpg" name="Classic Watch" />
      </div>
    </section>
  );
};

export default ThreeSection;
