"use client";

import { useState, useEffect } from "react";
import { DataPreloader } from "./DataPreloader";

interface ClientWrapperProps {
  children: React.ReactNode;
}

export function ClientWrapper({ children }: ClientWrapperProps) {
  const [preloadedData, setPreloadedData] = useState<any>(null);

  return (
    <DataPreloader onDataReady={setPreloadedData}>
      {children}
    </DataPreloader>
  );
}