"use client";

import React, { useEffect, useState, useRef } from "react";
import { ThreeDCardDemo } from "./ThreeDCardDemo";
import { Link } from "lucide-react";

const TwoSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white w-full">
      <div
        className="
          mx-auto max-w-7xl
          flex flex-col sm:flex-row
          items-center justify-center
          gap-2 sm:gap-6 md:gap-10
          px-3 sm:px-6
        "
      >
        <div
          className={`transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
            isVisible
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-16 scale-95"
          }`}
          style={{ transitionDelay: "0ms" }}
        >
          <ThreeDCardDemo image="/image/slide1.jpg" name="Winter" />
        </div>
        
        <div
          className={`transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
            isVisible
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-16 scale-95"
          }`}
          style={{ transitionDelay: "100ms" }}
        >
          <ThreeDCardDemo image="/image/slide2.jpg" name="Mens" />
        </div>
      </div>
    </section>
  );
};

export default TwoSection;
