import React from "react";
import { ThreeDCardDemo } from "./ThreeDCardDemo";
import { Link } from "lucide-react";

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
   
        
        <ThreeDCardDemo image="/image/slide1.jpg" name="Winter" />
        
        
        <ThreeDCardDemo image="/image/slide2.jpg" name="Mens" />
        
      </div>
    </section>
  );
};

export default TwoSection;
