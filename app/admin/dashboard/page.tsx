import { SiteHeader } from "@/components/site-header"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { SectionCards } from "@/components/section-cards"

export default function Page() {
  return (
    <div className="flex flex-1 flex-col">
      {/* Header */}
      <SiteHeader />

      {/* Content */}
      <div className="@container/main flex flex-1 flex-col gap-4 p-4 md:p-6">
        <SectionCards />

        <div className="rounded-lg border bg-background p-4">
          <ChartAreaInteractive />
        </div>
      </div>
    </div>
  )
}
