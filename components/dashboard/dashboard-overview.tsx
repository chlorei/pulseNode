"use client"

import { StatCards } from "@/components/dashboard/stat-cards"
import { MonitorList } from "@/components/dashboard/monitor-list"
import { LatencyMap } from "@/components/dashboard/latency-map"
import type { Monitor } from "@/lib/mock-data"

interface DashboardOverviewProps {
  monitors: Monitor[]
  onSelectMonitor: (monitor: Monitor) => void
}

export function DashboardOverview({
  monitors,
  onSelectMonitor,
}: DashboardOverviewProps) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Monitor your services in real-time
        </p>
      </div>
      <StatCards monitors={monitors} />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <MonitorList monitors={monitors} onSelectMonitor={onSelectMonitor} />
        </div>
        <div>
          <LatencyMap />
        </div>
      </div>
    </div>
  )
}
