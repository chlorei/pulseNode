"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send, Bot, ShieldAlert, Clock, Lock } from "lucide-react"
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
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

interface IntegrationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const alertTypes = [
  {
    id: "instant-down",
    icon: ShieldAlert,
    label: "Instant Down Alert",
    description: "Notify immediately when service goes down",
    defaultOn: true,
  },
  {
    id: "slow-response",
    icon: Clock,
    label: "Slow Response Alert",
    description: "Notify when response time exceeds threshold",
    defaultOn: true,
  },
  {
    id: "ssl-expiring",
    icon: Lock,
    label: "SSL Expiry Alert",
    description: "Notify 14 days before SSL certificate expires",
    defaultOn: false,
  },
]

export function IntegrationModal({
  open,
  onOpenChange,
}: IntegrationModalProps) {
  const [testSent, setTestSent] = useState(false)
  const [alerts, setAlerts] = useState<Record<string, boolean>>(
    Object.fromEntries(alertTypes.map((a) => [a.id, a.defaultOn]))
  )

  const handleTestNotification = () => {
    setTestSent(true)
    setTimeout(() => setTestSent(false), 3000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-card border-border bg-card sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-electric/10">
              <Bot className="size-5 text-electric" />
            </div>
            <div>
              <DialogTitle className="text-foreground">
                Telegram Alerts
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Receive instant notifications in Telegram
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="flex flex-col gap-5">
          {/* Bot Token */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="bot-token" className="text-foreground">
              Bot Token
            </Label>
            <Input
              id="bot-token"
              type="password"
              placeholder="123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11"
              className="border-border bg-secondary font-mono text-sm text-foreground placeholder:text-muted-foreground"
            />
            <p className="text-xs text-muted-foreground">
              Get a token from{" "}
              <span className="text-electric">@BotFather</span> on Telegram
            </p>
          </div>

          {/* Chat ID */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="chat-id" className="text-foreground">
              Chat ID
            </Label>
            <Input
              id="chat-id"
              placeholder="-1001234567890"
              className="border-border bg-secondary font-mono text-sm text-foreground placeholder:text-muted-foreground"
            />
          </div>

          {/* Test Button */}
          <Button
            onClick={handleTestNotification}
            variant="outline"
            className={cn(
              "gap-2 border-border transition-all",
              testSent
                ? "border-emerald/50 bg-emerald/10 text-emerald"
                : "text-foreground hover:bg-secondary"
            )}
          >
            <Send className="size-4" />
            {testSent ? "Test Notification Sent" : "Send Test Notification"}
          </Button>

          {/* Alert Type Toggles */}
          <div className="flex flex-col gap-3">
            <Label className="text-foreground">Alert Types</Label>
            {alertTypes.map((alert, i) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center justify-between rounded-lg border border-border bg-secondary/50 p-3"
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-secondary">
                    <alert.icon className="size-4 text-electric" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {alert.label}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {alert.description}
                    </p>
                  </div>
                </div>
                <Switch
                  checked={alerts[alert.id]}
                  onCheckedChange={(checked) =>
                    setAlerts((prev) => ({ ...prev, [alert.id]: checked }))
                  }
                />
              </motion.div>
            ))}
          </div>

          {/* Save */}
          <Button className="bg-electric text-primary-foreground hover:bg-electric/90">
            Save Integration
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
