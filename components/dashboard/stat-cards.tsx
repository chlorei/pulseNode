"use client"

import { motion } from "framer-motion"
import { Activity, Clock, ArrowUpRight, ArrowDownRight, Server } from "lucide-react"
import type { Monitor } from "@/lib/mock-data"

interface StatCardsProps {
  monitors: Monitor[]
}

export function StatCards({ monitors }: StatCardsProps) {
  const totalMonitors = monitors.length
  const activeMonitors = monitors.filter((m) => m.status === "up").length
  const downMonitors = monitors.filter((m) => m.status === "down").length
  const avgLatency = Math.round(
    monitors.filter((m) => m.status !== "down").reduce((acc, m) => acc + m.latency, 0) /
      monitors.filter((m) => m.status !== "down").length
  )
  const overallUptime =
    (monitors.reduce((acc, m) => acc + m.uptime, 0) / monitors.length).toFixed(2)

  const stats = [
    {
      label: "Total Monitors",
      value: totalMonitors.toString(),
      sub: `${activeMonitors} active, ${downMonitors} down`,
      icon: Server,
      trend: "up" as const,
      trendValue: "+2 this week",
    },
    {
      label: "Avg. Response Time",
      value: `${avgLatency}ms`,
      sub: "Global average",
      icon: Clock,
      trend: "down" as const,
      trendValue: "-12ms from yesterday",
    },
    {
      label: "Overall Uptime",
      value: `${overallUptime}%`,
      sub: "Last 30 days",
      icon: Activity,
      trend: "up" as const,
      trendValue: "+0.02% from last month",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, duration: 0.4 }}
          className="glass-card rounded-xl p-5"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{stat.label}</span>
            <div className="flex size-8 items-center justify-center rounded-lg bg-secondary">
              <stat.icon className="size-4 text-electric" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-semibold tracking-tight text-foreground">
              {stat.value}
            </span>
            <p className="mt-0.5 text-xs text-muted-foreground">{stat.sub}</p>
          </div>
          <div className="mt-3 flex items-center gap-1 text-xs">
            {stat.trend === "up" ? (
              <ArrowUpRight className="size-3 text-emerald" />
            ) : (
              <ArrowDownRight className="size-3 text-emerald" />
            )}
            <span className="text-emerald">{stat.trendValue}</span>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
