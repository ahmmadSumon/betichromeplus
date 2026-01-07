"use client";

import { EncryptedText } from "@/components/ui/encrypted-text";
import React, { useState, useEffect } from "react";

// Global cache to store data across navigation
let globalDataCache: any = null;
let isDataLoaded = false;

interface DataPreloaderProps {
  onDataReady: (data: any) => void;
  children: React.ReactNode;
}

export function DataPreloader({ onDataReady, children }: DataPreloaderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Loading Products...");
  const [progress, setProgress] = useState(0);

  const updateProgress = (value: number, text: string) => {
    setProgress(value);
    setLoadingText(text);
  };

  const loadDataSilently = async () => {
    try {
      const [productsRes, collectionsRes] = await Promise.all([
        fetch('/api/products?limit=50'),
        fetch('/api/collections')
      ]);
      
      const [productsData, collectionsData] = await Promise.all([
        productsRes.json(),
        collectionsRes.json()
      ]);
      
      const data = {
        products: productsData.products || [],
        collections: collectionsData.collections || []
      };
      
      globalDataCache = data;
      isDataLoaded = true;
      onDataReady(data);
    } catch (error) {
      console.error('Silent load error:', error);
    }
  };

  useEffect(() => {
    // If data is already cached, use it immediately
    if (isDataLoaded && globalDataCache) {
      onDataReady(globalDataCache);
      return;
    }

    // Check if this is a fresh page load (not navigation)
    const isPageLoad = !window.history.state || 
                      document.referrer === '' || 
                      !document.referrer.includes(window.location.origin);
    
    // Only show preloader on fresh page loads
    if (!isPageLoad) {
      loadDataSilently();
      return;
    }

    setIsLoading(true);
    
    // Preload all essential data
    const preloadData = async () => {
      try {
        updateProgress(20, "Connecting to Database...");
        
        const productsRes = await fetch('/api/products?limit=50');
        const productsData = await productsRes.json();
        updateProgress(50, "Loading Collections...");

        const collectionsRes = await fetch('/api/collections');
        const collectionsData = await collectionsRes.json();
        updateProgress(80, "Optimizing Images...");

        if (productsData.products?.length > 0) {
          const imagePromises = productsData.products
            .slice(0, 6)
            .map((product: any) => {
              if (product.images?.[0]) {
                return new Promise((resolve) => {
                  const img = new Image();
                  img.onload = resolve;
                  img.onerror = resolve;
                  img.src = product.images[0];
                });
              }
              return Promise.resolve();
            });
          
          await Promise.all(imagePromises);
        }

        updateProgress(100, "Ready!");
        
        const data = {
          products: productsData.products || [],
          collections: collectionsData.collections || []
        };
        
        globalDataCache = data;
        isDataLoaded = true;
        onDataReady(data);

        setTimeout(() => {
          setIsLoading(false);
        }, 500);

      } catch (error) {
        console.error('Preload error:', error);
        updateProgress(100, "Ready!");
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    };

    preloadData();
  }, [onDataReady]);

  if (!isLoading) {
    return <>{children}</>;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
      <div className="mx-auto max-w-lg py-10 text-center">
        <EncryptedText
          text="Betichrome Plus"
          encryptedClassName="text-neutral-500"
          revealedClassName="text-white font-bold text-4xl mb-8"
          revealDelayMs={30}
        />
        
        <div className="mt-8">
          <EncryptedText
            text={loadingText}
            encryptedClassName="text-neutral-600"
            revealedClassName="text-gray-300 text-lg"
            revealDelayMs={20}
          />
        </div>

        <div className="w-full bg-gray-800 rounded-full h-2 mt-6">
          <div 
            className="bg-white h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <p className="text-gray-500 text-sm mt-4">{progress}%</p>
      </div>
    </div>
  );
}