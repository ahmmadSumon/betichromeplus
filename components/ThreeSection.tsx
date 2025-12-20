"use client";

import React, { useEffect, useState } from "react";
import { ThreeDCardDemo } from "./ThreeDCardDemo";

interface Collection {
  _id: string;
  name: string;
  image: string;
}

const ThreeSection = () => {
  const [collections, setCollections] = useState<Collection[]>([]);

  useEffect(() => {
    fetch("/api/collections")
      .then((res) => res.json())
      .then((data) => setCollections(data));
  }, []);

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
        {collections.map((item) => (
          <ThreeDCardDemo
            key={item._id}
            image={item.image}
            name={item.name}
          />
        ))}
      </div>
    </section>
  );
};

export default ThreeSection;
