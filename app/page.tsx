"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { TopBar } from "@/components/dashboard/top-bar"
import { DashboardOverview } from "@/components/dashboard/dashboard-overview"
import { DashboardSkeleton } from "@/components/dashboard/dashboard-skeleton"
import { MonitorDetail } from "@/components/dashboard/monitor-detail"
import { IncidentsView } from "@/components/dashboard/incidents-view"
import { AddMonitorDialog } from "@/components/dashboard/add-monitor-dialog"
import { IntegrationModal } from "@/components/dashboard/integration-modal"
import { monitors, type Monitor } from "@/lib/mock-data"

export default function DashboardPage() {
  const [activeNav, setActiveNav] = useState("dashboard")
  const [selectedMonitor, setSelectedMonitor] = useState<Monitor | null>(null)
  const [addMonitorOpen, setAddMonitorOpen] = useState(false)
  const [integrationOpen, setIntegrationOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [sidebarWidth, setSidebarWidth] = useState(240)

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200)
    return () => clearTimeout(timer)
  }, [])

  // Listen for sidebar width changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const sidebar = document.querySelector("aside")
      if (sidebar) {
        const width = sidebar.getBoundingClientRect().width
        setSidebarWidth(width)
      }
    })
    const sidebar = document.querySelector("aside")
    if (sidebar) {
      observer.observe(sidebar, { attributes: true, attributeFilter: ["style"] })
    }
    return () => observer.disconnect()
  }, [])

  const handleNavChange = (id: string) => {
    setActiveNav(id)
    setSelectedMonitor(null)
    if (id === "integrations") {
      setIntegrationOpen(true)
      setActiveNav("dashboard")
    }
  }

  const handleSelectMonitor = (monitor: Monitor) => {
    setSelectedMonitor(monitor)
  }

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar activeNav={activeNav} onNavChange={handleNavChange} />

      <motion.main
        className="flex flex-1 flex-col"
        animate={{ marginLeft: sidebarWidth }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        <TopBar onAddMonitor={() => setAddMonitorOpen(true)} />

        <div className="flex-1 p-6">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="skeleton"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <DashboardSkeleton />
              </motion.div>
            ) : selectedMonitor ? (
              <MonitorDetail
                key={`detail-${selectedMonitor.id}`}
                monitor={selectedMonitor}
                onBack={() => setSelectedMonitor(null)}
              />
            ) : activeNav === "dashboard" ? (
              <motion.div
                key="overview"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <DashboardOverview
                  monitors={monitors}
                  onSelectMonitor={handleSelectMonitor}
                />
              </motion.div>
            ) : activeNav === "incidents" ? (
              <motion.div
                key="incidents"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <IncidentsView />
              </motion.div>
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-1 items-center justify-center"
              >
                <div className="text-center">
                  <p className="text-lg font-medium text-foreground">
                    {activeNav.charAt(0).toUpperCase() + activeNav.slice(1)}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    This section is coming soon
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.main>

      <AddMonitorDialog
        open={addMonitorOpen}
        onOpenChange={setAddMonitorOpen}
      />
      <IntegrationModal
        open={integrationOpen}
        onOpenChange={setIntegrationOpen}
      />
    </div>
  )
}
