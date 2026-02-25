"use client"

import { motion } from "framer-motion"
import { Globe } from "lucide-react"
import { cn } from "@/lib/utils"
import { regions } from "@/lib/mock-data"

export function LatencyMap() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.4 }}
      className="glass-card rounded-xl"
    >
      <div className="flex items-center justify-between border-b border-border/50 px-5 py-4">
        <h2 className="text-sm font-semibold text-foreground">
          Global Latency
        </h2>
        <Globe className="size-4 text-muted-foreground" />
      </div>
      <div className="grid grid-cols-2 gap-3 p-5 sm:grid-cols-3">
        {regions.map((region, i) => (
          <motion.div
            key={region.name}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 + i * 0.08 }}
            className="flex flex-col gap-1.5 rounded-lg bg-secondary/50 p-3"
          >
            <span className="text-xs text-muted-foreground">{region.name}</span>
            <div className="flex items-center justify-between">
              <span className="font-mono text-lg font-semibold text-foreground">
                {region.latency}
                <span className="text-xs font-normal text-muted-foreground">ms</span>
              </span>
              <span
                className={cn(
                  "size-2 rounded-full",
                  region.status === "up" ? "bg-emerald" : "bg-chart-4"
                )}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
