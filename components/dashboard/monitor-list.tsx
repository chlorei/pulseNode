"use client"

import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import type { Monitor } from "@/lib/mock-data"

interface MonitorListProps {
  monitors: Monitor[]
  onSelectMonitor: (monitor: Monitor) => void
}

function MiniSparkline({ data, status }: { data: number[]; status: string }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const width = 80
  const height = 24

  const points = data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * width
      const y = height - ((value - min) / range) * height
      return `${x},${y}`
    })
    .join(" ")

  const color =
    status === "up"
      ? "var(--color-emerald)"
      : status === "down"
        ? "var(--color-rose)"
        : "var(--color-chart-4)"

  return (
    <svg width={width} height={height} className="overflow-visible">
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function StatusBadge({ status }: { status: Monitor["status"] }) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "gap-1.5 border-0 px-2 py-0.5",
        status === "up" && "bg-emerald/10 text-emerald",
        status === "down" && "bg-rose/10 text-rose",
        status === "degraded" && "bg-chart-4/10 text-chart-4"
      )}
    >
      <span
        className={cn(
          "size-1.5 rounded-full",
          status === "up" && "bg-emerald animate-pulse-dot",
          status === "down" && "bg-rose animate-pulse-dot",
          status === "degraded" && "bg-chart-4 animate-pulse-dot"
        )}
      />
      {status === "up" ? "Operational" : status === "down" ? "Down" : "Degraded"}
    </Badge>
  )
}

export function MonitorList({ monitors, onSelectMonitor }: MonitorListProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.4 }}
      className="glass-card overflow-hidden rounded-xl"
    >
      <div className="flex items-center justify-between border-b border-border/50 px-5 py-4">
        <h2 className="text-sm font-semibold text-foreground">Active Monitors</h2>
        <span className="text-xs text-muted-foreground">
          {monitors.length} monitors
        </span>
      </div>
      <div className="divide-y divide-border/30">
        {monitors.map((monitor, i) => (
          <motion.button
            key={monitor.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 + i * 0.05 }}
            onClick={() => onSelectMonitor(monitor)}
            className="flex w-full items-center gap-4 px-5 py-3 text-left transition-colors hover:bg-secondary/30"
          >
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-secondary text-xs font-semibold text-electric">
              {monitor.favicon}
            </div>
            <div className="flex min-w-0 flex-1 flex-col">
              <span className="truncate text-sm font-medium text-foreground">
                {monitor.name}
              </span>
              <span className="flex items-center gap-1 truncate text-xs text-muted-foreground">
                {monitor.url}
                <ExternalLink className="size-3 shrink-0" />
              </span>
            </div>
            <StatusBadge status={monitor.status} />
            <div className="hidden items-center gap-4 sm:flex">
              <span
                className={cn(
                  "w-16 text-right font-mono text-sm",
                  monitor.status === "up" && "text-foreground",
                  monitor.status === "down" && "text-rose",
                  monitor.status === "degraded" && "text-chart-4"
                )}
              >
                {monitor.status === "down" ? "---" : `${monitor.latency}ms`}
              </span>
              <MiniSparkline data={monitor.sparkline} status={monitor.status} />
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}
