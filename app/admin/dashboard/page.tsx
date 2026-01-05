"use client";

import { SiteHeader } from "@/components/site-header"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { SectionCards } from "@/components/section-cards"
import { OrdersManagement } from "@/components/orders-management"
import { useState } from "react"

export default function Page() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="flex flex-1 flex-col">
      {/* Header */}
      <SiteHeader />

      {/* Navigation Tabs */}
      <div className="border-b bg-background">
        <div className="flex gap-4 p-4">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              activeTab === "dashboard" 
                ? "bg-black text-white" 
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              activeTab === "orders" 
                ? "bg-black text-white" 
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            Orders
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="@container/main flex flex-1 flex-col gap-4 p-4 md:p-6">
        {activeTab === "dashboard" ? (
          <>
            <SectionCards />
            <div className="rounded-lg border bg-background p-4">
              <ChartAreaInteractive />
            </div>
          </>
        ) : (
          <OrdersManagement />
        )}
      </div>
    </div>
  )
}
