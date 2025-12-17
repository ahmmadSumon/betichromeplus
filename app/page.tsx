"use client";

import React, { useState, useEffect } from "react";
import { EncryptedText } from "@/components/ui/encrypted-text";
import Nav from "@/components/Nav";
import HeroSection from "@/components/HeroSection";
import { ThreeDCardDemo } from "@/components/ThreeDCardDemo";
import TwoSection from "@/components/TwoSection";
import Latest from "@/components/Latest";
import JustIn from "@/components/JustIn";
import { FeaturesSection } from "@/components/FeaturesSection";
import Showcase from "@/components/Showcase";
import ThreeSection from "@/components/ThreeSection";
import BrandInfoScrollSection from "@/components/BrandInfoScrollSection";
import Footer from "@/components/Footer";

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const text = "Welcome to the Matrix, Neo.";
    const revealDelayMs = 50;

    // total time for loader: text length * delay + small buffer
    const totalTime = text.length * revealDelayMs + 500;

    const timer = setTimeout(() => {
      setFadeOut(true);
      // remove loader after fade-out animation
      setTimeout(() => setLoading(false), 500);
    }, totalTime);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && (
        <div
          className={`fixed inset-0 flex items-center justify-center bg-black z-50 transition-opacity duration-500 ${
            fadeOut ? "opacity-0" : "opacity-100"
          }`}
        >
          <EncryptedText
            text="Welcome to the Betichrome Plus."
            encryptedClassName="text-neutral-500"
            revealedClassName="text-white font-bold text-2xl"
            revealDelayMs={50}
          />
        </div>
      )}

      {!loading && (
        <div>
   
          <div className="relative z-0">
  <HeroSection />
</div>

<div className="relative z-10">
  <TwoSection />
</div>
<div className="relative z-10">
  <Latest />
</div>
<div className="relative z-10">
  <ThreeSection/>
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
<div className="relative z-10">
 <Footer/>
</div>

        </div>
      )}
    </>
  );
}
