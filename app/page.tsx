import React from "react";
import HeroSection from "@/components/HeroSection";
import { ThreeDCardDemo } from "@/components/ThreeDCardDemo";
import TwoSection from "@/components/TwoSection";
import Latest from "@/components/Latest";
import {JustIn} from "@/components/JustIn";
import { FeaturesSection } from "@/components/FeaturesSection";
import Showcase from "@/components/Showcase";
import ThreeSection from "@/components/ThreeSection";
import BrandInfoScrollSection from "@/components/BrandInfoScrollSection";

export default function Page() {
  return (
    <>
      <div className="relative z-0">
        <HeroSection />
      </div>
      <div className="relative z-10">
        <ThreeSection/>
      </div>
      <div className="relative z-10">
        <Latest />
      </div>
      <div className="relative z-10">
        <TwoSection />
      </div>
      <div className="relative z-10">
        <JustIn />
      </div>
      <div className="relative z-10">
        <Showcase />
      </div>
      <div className="relative z-10">
        <FeaturesSection />
      </div>
      <div className="relative z-10">
        <BrandInfoScrollSection/>
      </div>
    </>
  );
}
