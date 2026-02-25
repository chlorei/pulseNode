"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  ExternalLink,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
} from "lucide-react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import {
  type Monitor,
  incidents,
  generateLatencyData,
  responseCodeData,
} from "@/lib/mock-data"

interface MonitorDetailProps {
  monitor: Monitor
  onBack: () => void
}

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: Array<{ value: number }>
  label?: string
}) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2 shadow-lg">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-sm font-semibold text-foreground">
        {payload[0].value}ms
      </p>
    </div>
  )
}

export function MonitorDetail({ monitor, onBack }: MonitorDetailProps) {
  const latencyData = useMemo(() => generateLatencyData(), [])
  const monitorIncidents = incidents.filter(
    (inc) => inc.monitorId === monitor.id
  )

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-6"
    >
      {/* Header */}
      <div className="flex items-start gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="mt-0.5 shrink-0 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              {monitor.name}
            </h1>
            <a
              href={monitor.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-electric"
            >
              <ExternalLink className="size-4" />
            </a>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{monitor.url}</p>
        </div>
      </div>

      {/* Hero Stats */}
      <div className="grid gap-4 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card flex flex-col items-center justify-center rounded-xl p-8"
        >
          <span className="text-5xl font-bold tracking-tight text-foreground">
            {monitor.uptime}%
          </span>
          <span className="mt-2 text-sm text-muted-foreground">Uptime</span>
          <Badge
            variant="outline"
            className={cn(
              "mt-3 gap-1.5 border-0 px-3 py-1",
              monitor.status === "up" && "bg-emerald/10 text-emerald",
              monitor.status === "down" && "bg-rose/10 text-rose",
              monitor.status === "degraded" && "bg-chart-4/10 text-chart-4"
            )}
          >
            {monitor.status === "up" && (
              <CheckCircle2 className="size-3.5" />
            )}
            {monitor.status === "down" && <XCircle className="size-3.5" />}
            {monitor.status === "degraded" && (
              <AlertTriangle className="size-3.5" />
            )}
            {monitor.status === "up"
              ? "Operational"
              : monitor.status === "down"
                ? "Down"
                : "Degraded"}
          </Badge>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="glass-card flex flex-col items-center justify-center rounded-xl p-8"
        >
          <span className="text-5xl font-bold tracking-tight text-foreground">
            {monitor.status === "down" ? "---" : `${monitor.latency}`}
            {monitor.status !== "down" && (
              <span className="text-xl font-normal text-muted-foreground">
                ms
              </span>
            )}
          </span>
          <span className="mt-2 text-sm text-muted-foreground">
            Current Response Time
          </span>
          <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="size-3" />
            Checked 30s ago
          </div>
        </motion.div>
      </div>

      {/* Latency Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card rounded-xl p-5"
      >
        <h2 className="mb-4 text-sm font-semibold text-foreground">
          Response Time (24h)
        </h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={latencyData}>
              <defs>
                <linearGradient id="latencyGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-electric)"
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-electric)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="var(--color-border)"
                vertical={false}
              />
              <XAxis
                dataKey="time"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
                interval="preserveStartEnd"
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
                width={40}
                tickFormatter={(v) => `${v}ms`}
              />
              <RechartsTooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="latency"
                stroke="var(--color-electric)"
                strokeWidth={2}
                fill="url(#latencyGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Bottom row: Incidents + Response Codes */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Incident Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card rounded-xl"
        >
          <div className="border-b border-border/50 px-5 py-4">
            <h2 className="text-sm font-semibold text-foreground">
              Incident History
            </h2>
          </div>
          <div className="p-5">
            {monitorIncidents.length > 0 ? (
              <div className="relative space-y-4 pl-6">
                <div className="absolute left-2 top-1 bottom-1 w-px bg-border" />
                {monitorIncidents.map((inc) => (
                  <div key={inc.id} className="relative">
                    <div
                      className={cn(
                        "absolute -left-6 top-1 size-3 rounded-full border-2 border-background",
                        inc.status === "resolved" && "bg-emerald",
                        inc.status === "ongoing" && "bg-rose",
                        inc.status === "investigating" && "bg-chart-4"
                      )}
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-foreground">
                          {inc.description}
                        </span>
                      </div>
                      <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{inc.duration}</span>
                        <span>-</span>
                        <Badge
                          variant="outline"
                          className={cn(
                            "h-5 border-0 px-1.5 text-[10px]",
                            inc.status === "resolved" &&
                              "bg-emerald/10 text-emerald",
                            inc.status === "ongoing" && "bg-rose/10 text-rose",
                            inc.status === "investigating" &&
                              "bg-chart-4/10 text-chart-4"
                          )}
                        >
                          {inc.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <CheckCircle2 className="size-8 text-emerald/50" />
                <p className="mt-2 text-sm text-muted-foreground">
                  No incidents recorded
                </p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Response Codes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="glass-card rounded-xl"
        >
          <div className="border-b border-border/50 px-5 py-4">
            <h2 className="text-sm font-semibold text-foreground">
              Response Code Distribution
            </h2>
          </div>
          <div className="flex flex-col gap-4 p-5">
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={responseCodeData} layout="vertical">
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="var(--color-border)"
                    horizontal={false}
                  />
                  <XAxis
                    type="number"
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fill: "var(--color-muted-foreground)",
                      fontSize: 11,
                    }}
                  />
                  <YAxis
                    dataKey="code"
                    type="category"
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fill: "var(--color-muted-foreground)",
                      fontSize: 11,
                    }}
                    width={35}
                  />
                  <RechartsTooltip
                    cursor={{ fill: "var(--color-secondary)", opacity: 0.5 }}
                    content={({ active, payload }) => {
                      if (!active || !payload?.length) return null
                      const data = payload[0].payload
                      return (
                        <div className="rounded-lg border border-border bg-card px-3 py-2 shadow-lg">
                          <p className="text-xs text-muted-foreground">
                            {data.code}
                          </p>
                          <p className="text-sm font-semibold text-foreground">
                            {data.count.toLocaleString()} requests
                          </p>
                        </div>
                      )
                    }}
                  />
                  <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={20}>
                    {responseCodeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {responseCodeData.map((item) => (
                <div
                  key={item.code}
                  className="flex flex-col items-center rounded-lg bg-secondary/50 p-2"
                >
                  <span
                    className="text-xs font-medium"
                    style={{ color: item.fill }}
                  >
                    {item.code}
                  </span>
                  <span className="font-mono text-sm font-semibold text-foreground">
                    {item.count.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
