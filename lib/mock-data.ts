export interface Monitor {
  id: string
  name: string
  url: string
  status: "up" | "down" | "degraded"
  latency: number
  uptime: number
  favicon: string
  sparkline: number[]
}

export interface Incident {
  id: string
  monitorId: string
  monitorName: string
  status: "resolved" | "ongoing" | "investigating"
  startedAt: string
  resolvedAt?: string
  duration: string
  description: string
}

export interface LatencyDataPoint {
  time: string
  latency: number
}

export interface ResponseCodeData {
  code: string
  count: number
  fill: string
}

export const monitors: Monitor[] = [
  {
    id: "1",
    name: "Production API",
    url: "https://api.acme.com",
    status: "up",
    latency: 42,
    uptime: 99.98,
    favicon: "A",
    sparkline: [45, 42, 48, 41, 39, 44, 42, 46, 43, 42, 40, 38, 42, 44, 43],
  },
  {
    id: "2",
    name: "Marketing Site",
    url: "https://www.acme.com",
    status: "up",
    latency: 128,
    uptime: 99.95,
    favicon: "M",
    sparkline: [130, 125, 140, 128, 135, 132, 128, 122, 130, 126, 128, 132, 130, 128, 126],
  },
  {
    id: "3",
    name: "Dashboard App",
    url: "https://app.acme.com",
    status: "up",
    latency: 87,
    uptime: 99.99,
    favicon: "D",
    sparkline: [90, 85, 92, 88, 87, 90, 85, 88, 86, 87, 89, 88, 86, 87, 85],
  },
  {
    id: "4",
    name: "Payment Gateway",
    url: "https://pay.acme.com",
    status: "degraded",
    latency: 342,
    uptime: 98.72,
    favicon: "P",
    sparkline: [200, 280, 350, 420, 380, 342, 290, 310, 340, 360, 350, 342, 330, 340, 342],
  },
  {
    id: "5",
    name: "Auth Service",
    url: "https://auth.acme.com",
    status: "down",
    latency: 0,
    uptime: 97.85,
    favicon: "S",
    sparkline: [55, 52, 58, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  {
    id: "6",
    name: "CDN Edge",
    url: "https://cdn.acme.com",
    status: "up",
    latency: 12,
    uptime: 100.0,
    favicon: "C",
    sparkline: [14, 12, 11, 13, 12, 10, 12, 14, 13, 12, 11, 12, 13, 12, 11],
  },
  {
    id: "7",
    name: "Staging Environment",
    url: "https://staging.acme.com",
    status: "up",
    latency: 156,
    uptime: 99.9,
    favicon: "T",
    sparkline: [160, 155, 162, 158, 156, 160, 155, 158, 156, 155, 158, 160, 156, 154, 156],
  },
  {
    id: "8",
    name: "Blog & Docs",
    url: "https://docs.acme.com",
    status: "up",
    latency: 95,
    uptime: 99.97,
    favicon: "B",
    sparkline: [100, 95, 102, 98, 95, 90, 95, 98, 96, 95, 92, 94, 96, 95, 93],
  },
]

export const incidents: Incident[] = [
  {
    id: "inc-1",
    monitorId: "5",
    monitorName: "Auth Service",
    status: "ongoing",
    startedAt: "2026-02-25T10:15:00Z",
    duration: "2h 30m",
    description: "Authentication service is experiencing elevated error rates. Investigating root cause.",
  },
  {
    id: "inc-2",
    monitorId: "4",
    monitorName: "Payment Gateway",
    status: "investigating",
    startedAt: "2026-02-25T09:45:00Z",
    duration: "3h",
    description: "Elevated response times detected on payment processing endpoints.",
  },
  {
    id: "inc-3",
    monitorId: "2",
    monitorName: "Marketing Site",
    status: "resolved",
    startedAt: "2026-02-24T14:20:00Z",
    resolvedAt: "2026-02-24T14:45:00Z",
    duration: "25m",
    description: "CDN propagation delay caused intermittent 502 errors.",
  },
  {
    id: "inc-4",
    monitorId: "1",
    monitorName: "Production API",
    status: "resolved",
    startedAt: "2026-02-23T08:10:00Z",
    resolvedAt: "2026-02-23T08:22:00Z",
    duration: "12m",
    description: "Database connection pool exhaustion caused brief outage.",
  },
  {
    id: "inc-5",
    monitorId: "3",
    monitorName: "Dashboard App",
    status: "resolved",
    startedAt: "2026-02-22T16:30:00Z",
    resolvedAt: "2026-02-22T16:35:00Z",
    duration: "5m",
    description: "Deployment rollback triggered by health check failure.",
  },
]

export function generateLatencyData(): LatencyDataPoint[] {
  const data: LatencyDataPoint[] = []
  const now = new Date()
  for (let i = 24; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60 * 60 * 1000)
    const hour = time.getHours().toString().padStart(2, "0")
    data.push({
      time: `${hour}:00`,
      latency: Math.floor(Math.random() * 60) + 20,
    })
  }
  return data
}

export const responseCodeData: ResponseCodeData[] = [
  { code: "2xx", count: 12847, fill: "var(--color-emerald)" },
  { code: "3xx", count: 1245, fill: "var(--color-electric)" },
  { code: "4xx", count: 342, fill: "var(--color-chart-4)" },
  { code: "5xx", count: 28, fill: "var(--color-rose)" },
]

export const regions = [
  { name: "US East", latency: 42, status: "up" as const },
  { name: "US West", latency: 38, status: "up" as const },
  { name: "EU West", latency: 95, status: "up" as const },
  { name: "EU Central", latency: 102, status: "up" as const },
  { name: "Asia Pacific", latency: 180, status: "up" as const },
  { name: "South America", latency: 210, status: "degraded" as const },
]
