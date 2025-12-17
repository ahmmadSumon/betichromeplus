import React from "react";
import { ThreeDCardDemo } from "./ThreeDCardDemo";

const TwoSection = () => {
  return (
    <section className="bg-white w-full">
      <div
        className="
          mx-auto max-w-7xl
          flex flex-col sm:flex-row
          items-center justify-center
          gap-2 sm:gap-6 md:gap-10   /* 🔥 smaller gap on mobile */
          px-3 sm:px-6
        "
      >
        <ThreeDCardDemo image="/image/slide1.jpg" name="Premium Jacket" />
        <ThreeDCardDemo image="/image/slide2.jpg" name="Premium Jacket" />
      </div>
    </section>
  );
};

export default TwoSection;
