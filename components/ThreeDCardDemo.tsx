"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

interface ProductCardProps {
  image: string;
  name: string; // Name used for both display and route
}

export function ThreeDCardDemo({ image, name }: ProductCardProps) {
  const router = useRouter();

  const handleNavigate = () => {
    if (!name) return;

    // Use name for route: lowercase + replace spaces with dashes
    const route = name.toLowerCase().replace(/\s+/g, "-");
    router.push(`/${route}`);
  };

  return (
    <CardContainer className="w-full h-full flex justify-center">
      <div className="w-full h-full cursor-pointer" onClick={handleNavigate}>
        <CardBody
          className="
            relative group/card
            w-full
            h-[60vh] sm:h-[360px] md:h-[460px]
            rounded-xl
            overflow-hidden
            border border-black/10
            bg-black
          "
        >
          {/* IMAGE */}
          <CardItem translateZ="70" className="w-full h-full">
            <img
              src={image}
              alt={name}
              className="
                w-full h-full object-cover
                md:group-hover/card:scale-110
                transition-transform duration-500
              "
            />
          </CardItem>

          {/* DARK OVERLAY */}
          <div
            className="
              absolute inset-0
              bg-black/20
              md:bg-black/0
              md:group-hover/card:bg-black/30
              transition-colors duration-300
              z-10
            "
          />

          {/* ALWAYS VISIBLE NAME */}
          <div
            className="
              absolute bottom-20 left-5 z-20 
              backdrop-blur-md bg-white/10 
              px-5 py-3 rounded-xl 
              border border-white/20 shadow-lg
            "
          >
            <h3 className="text-white text-3xl md:text-5xl uppercase font-bold">
              {name}
            </h3>
          </div>

          {/* HOVER CONTENT */}
          <CardItem
            translateZ="140"
            className="
              absolute inset-0
              flex md:flex
              flex-col items-center justify-center
              text-center z-30
              opacity-100 md:opacity-0
              translate-y-0 md:translate-y-4
              md:group-hover/card:opacity-100
              md:group-hover/card:translate-y-0
              transition-all duration-300
            "
          >
            <p className="text-white text-sm mb-3 tracking-wide uppercase">
              Check what’s new
            </p>

            <button
              className="
                px-6 py-2
                rounded-full
                bg-white text-black
                text-sm font-semibold
              "
            >
              Click Here
            </button>
          </CardItem>
        </CardBody>
      </div>
    </CardContainer>
  );
}
