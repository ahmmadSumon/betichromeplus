"use client";

import React, { useEffect, useState, useRef } from "react";
import { ThreeDCardDemo } from "./ThreeDCardDemo";

interface Collection {
  _id: string;
  name: string;
  image: string;
}

const ThreeSection = () => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    fetch("/api/collections")
      .then((res) => res.json())
      .then((data) => setCollections(data));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white w-full py-10">
      <div
        className="
          mx-auto max-w-7xl
          flex flex-col sm:flex-row
          items-center justify-center
          gap-3 sm:gap-6 md:gap-10
          px-3 sm:px-6
        "
      >
        {collections.map((item, index) => (
          <div
            key={item._id}
            className={`transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
              isVisible
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-16 scale-95"
            }`}
            style={{ transitionDelay: `${index * 150}ms` }}
          >
            <ThreeDCardDemo
              image={item.image}
              name={item.name}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ThreeSection;
