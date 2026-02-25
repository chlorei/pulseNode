"use client"

import { motion } from "framer-motion"
import { AlertTriangle, CheckCircle2, Search as SearchIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { incidents } from "@/lib/mock-data"

export function IncidentsView() {
  const ongoing = incidents.filter((i) => i.status !== "resolved")
  const resolved = incidents.filter((i) => i.status === "resolved")

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Incidents
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Track and manage ongoing and past incidents
        </p>
      </div>

      {/* Ongoing */}
      {ongoing.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-xl"
        >
          <div className="flex items-center gap-2 border-b border-border/50 px-5 py-4">
            <AlertTriangle className="size-4 text-rose" />
            <h2 className="text-sm font-semibold text-foreground">
              Active Incidents
            </h2>
            <Badge
              variant="outline"
              className="ml-auto border-0 bg-rose/10 text-rose"
            >
              {ongoing.length}
            </Badge>
          </div>
          <div className="divide-y divide-border/30">
            {ongoing.map((inc, i) => (
              <motion.div
                key={inc.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-4 px-5 py-4"
              >
                <div
                  className={cn(
                    "mt-1 size-2 shrink-0 rounded-full",
                    inc.status === "ongoing" ? "bg-rose animate-pulse-dot" : "bg-chart-4 animate-pulse-dot"
                  )}
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-foreground">
                      {inc.monitorName}
                    </span>
                    <Badge
                      variant="outline"
                      className={cn(
                        "h-5 border-0 px-1.5 text-[10px]",
                        inc.status === "ongoing"
                          ? "bg-rose/10 text-rose"
                          : "bg-chart-4/10 text-chart-4"
                      )}
                    >
                      {inc.status}
                    </Badge>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {inc.description}
                  </p>
                  <span className="mt-1 text-xs text-muted-foreground">
                    Duration: {inc.duration}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Resolved */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card rounded-xl"
      >
        <div className="flex items-center gap-2 border-b border-border/50 px-5 py-4">
          <CheckCircle2 className="size-4 text-emerald" />
          <h2 className="text-sm font-semibold text-foreground">
            Resolved
          </h2>
          <span className="ml-auto text-xs text-muted-foreground">
            {resolved.length} incidents
          </span>
        </div>
        <div className="divide-y divide-border/30">
          {resolved.map((inc, i) => (
            <motion.div
              key={inc.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.05 }}
              className="flex items-start gap-4 px-5 py-4"
            >
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald/50" />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">
                    {inc.monitorName}
                  </span>
                  <Badge
                    variant="outline"
                    className="h-5 border-0 bg-emerald/10 px-1.5 text-[10px] text-emerald"
                  >
                    resolved
                  </Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {inc.description}
                </p>
                <span className="mt-1 text-xs text-muted-foreground">
                  Duration: {inc.duration}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
