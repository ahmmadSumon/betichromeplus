'use client'

import { SiteHeader } from "@/components/site-header";
import { AddProductForm } from "@/components/AddProductForm";
import { ProductTable } from "@/components/ProductTable";
import { useState } from "react";

export default function ProductsPage() {
  const [refresh, setRefresh] = useState(false);
const [selectedProduct, setSelectedProduct] = useState<any>(null);

  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />

      <div className="p-6 space-y-8">
        <AddProductForm
  product={selectedProduct}
  onSuccess={() => {
    setSelectedProduct(null);
    setRefresh(!refresh);
  }}
/>

<ProductTable
  refreshTrigger={refresh}
  onEdit={(product) => setSelectedProduct(product)}
/>

      </div>
    </div>
  );
}
