"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Globe,
  Clock,
  MapPin,
  Bell,
  ChevronRight,
  ChevronLeft,
  Check,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

interface AddMonitorDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const steps = [
  { icon: Globe, label: "General" },
  { icon: Clock, label: "Frequency" },
  { icon: MapPin, label: "Regions" },
  { icon: Bell, label: "Notifications" },
]

const checkRegions = [
  { id: "us-east", label: "US East (Virginia)" },
  { id: "us-west", label: "US West (Oregon)" },
  { id: "eu-west", label: "EU West (Ireland)" },
  { id: "eu-central", label: "EU Central (Frankfurt)" },
  { id: "ap-south", label: "Asia Pacific (Singapore)" },
  { id: "sa-east", label: "South America (Sao Paulo)" },
]

export function AddMonitorDialog({
  open,
  onOpenChange,
}: AddMonitorDialogProps) {
  const [step, setStep] = useState(0)
  const [frequency, setFrequency] = useState([5])
  const [selectedRegions, setSelectedRegions] = useState<string[]>([
    "us-east",
    "eu-west",
  ])

  const toggleRegion = (id: string) => {
    setSelectedRegions((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-card border-border bg-card sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-foreground">Add New Monitor</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Configure a new uptime check for your service.
          </DialogDescription>
        </DialogHeader>

        {/* Step Indicator */}
        <div className="flex items-center justify-between px-2">
          {steps.map((s, i) => (
            <div key={s.label} className="flex items-center gap-2">
              <div
                className={cn(
                  "flex size-8 items-center justify-center rounded-full text-xs font-medium transition-colors",
                  i <= step
                    ? "bg-electric text-primary-foreground"
                    : "bg-secondary text-muted-foreground"
                )}
              >
                {i < step ? (
                  <Check className="size-3.5" />
                ) : (
                  <s.icon className="size-3.5" />
                )}
              </div>
              {i < steps.length - 1 && (
                <div
                  className={cn(
                    "hidden h-px w-8 sm:block md:w-12",
                    i < step ? "bg-electric" : "bg-border"
                  )}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="min-h-[200px]"
          >
            {step === 0 && (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="name" className="text-foreground">
                    Monitor Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="My Production API"
                    className="border-border bg-secondary text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="url" className="text-foreground">
                    URL
                  </Label>
                  <Input
                    id="url"
                    placeholder="https://api.example.com/health"
                    className="border-border bg-secondary text-foreground placeholder:text-muted-foreground"
                  />
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-3">
                  <Label className="text-foreground">Check Frequency</Label>
                  <Slider
                    value={frequency}
                    onValueChange={setFrequency}
                    min={1}
                    max={60}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>1 min</span>
                    <span className="font-mono text-sm font-semibold text-electric">
                      Every {frequency[0]} min
                    </span>
                    <span>60 min</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Lower intervals provide faster incident detection but consume
                  more check credits.
                </p>
              </div>
            )}

            {step === 2 && (
              <div className="flex flex-col gap-3">
                <Label className="text-foreground">Check Regions</Label>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {checkRegions.map((region) => (
                    <button
                      key={region.id}
                      onClick={() => toggleRegion(region.id)}
                      className={cn(
                        "flex items-center gap-3 rounded-lg border p-3 text-left text-sm transition-colors",
                        selectedRegions.includes(region.id)
                          ? "border-electric bg-electric/10 text-foreground"
                          : "border-border bg-secondary text-muted-foreground hover:border-border hover:bg-secondary/80"
                      )}
                    >
                      <Checkbox
                        checked={selectedRegions.includes(region.id)}
                        className="border-border data-[state=checked]:border-electric data-[state=checked]:bg-electric"
                      />
                      {region.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="flex flex-col gap-4">
                <Label className="text-foreground">Notification Channels</Label>
                <div className="space-y-2">
                  {[
                    "Email (team@acme.com)",
                    "Slack (#alerts)",
                    "Telegram Bot",
                    "Webhook URL",
                  ].map((ch) => (
                    <button
                      key={ch}
                      className="flex w-full items-center gap-3 rounded-lg border border-border bg-secondary p-3 text-left text-sm text-muted-foreground transition-colors hover:border-electric/50 hover:text-foreground"
                    >
                      <Checkbox className="border-border data-[state=checked]:border-electric data-[state=checked]:bg-electric" />
                      {ch}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="gap-1 text-muted-foreground"
          >
            <ChevronLeft className="size-4" />
            Back
          </Button>
          {step < steps.length - 1 ? (
            <Button
              size="sm"
              onClick={() => setStep((s) => s + 1)}
              className="gap-1 bg-electric text-primary-foreground hover:bg-electric/90"
            >
              Next
              <ChevronRight className="size-4" />
            </Button>
          ) : (
            <Button
              size="sm"
              onClick={() => onOpenChange(false)}
              className="bg-emerald text-primary-foreground hover:bg-emerald/90"
            >
              <Check className="mr-1 size-4" />
              Create Monitor
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
