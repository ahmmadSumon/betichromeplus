"use client";

import { EncryptedText } from "@/components/ui/encrypted-text";
import React, { useState, useEffect } from "react";

export function EncryptedTextDemoSecond() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    // Check if user has visited before
    const hasVisited = localStorage.getItem('hasVisited');
    
    if (hasVisited) {
      setIsLoading(false);
    }
  }, []);

  const handleClick = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
      localStorage.setItem('hasVisited', 'true');
      
      // Show loader animation
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }
  };

  if (!isLoading) {
    return null;
  }

  if (!hasInteracted) {
    return (
      <div 
        className="fixed inset-0 flex items-center justify-center bg-black z-50 cursor-pointer"
        onClick={handleClick}
      >
        <div className="mx-auto max-w-lg py-10 text-center">
          <p className="text-white font-bold text-2xl mb-4">Welcome to Betichrome Plus</p>
          <p className="text-gray-400 text-sm">Click anywhere to continue</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
      <div className="mx-auto max-w-lg py-10 text-center">
        <EncryptedText
          text="Welcome to Betichrome Plus."
          encryptedClassName="text-neutral-500"
          revealedClassName="text-white font-bold text-2xl"
          revealDelayMs={50}
        />
      </div>
    </div>
  );
}
