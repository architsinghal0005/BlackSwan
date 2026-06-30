"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SectionHeader } from "@/components/dashboard/ui"
import { riskHeatmap, supplyRiskTrend, eventTimeline } from "@/lib/data"
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { AlertTriangle, Activity, Shield } from "lucide-react"

function heat(value: number) {
  if (value >= 80) return "bg-danger/80 text-background"
  if (value >= 60) return "bg-amber/80 text-background"
  if (value >= 40) return "bg-cyan/40 text-foreground"
  return "bg-success/30 text-foreground"
}

const severityTone: Record<string, string> = {
  critical: "border-danger/50 text-danger",
  high: "border-amber/50 text-amber",
  medium: "border-cyan/50 text-cyan",
  low: "border-success/50 text-success",
}

export function RiskSection() {
  const cols: { key: "supply" | "freight" | "political"; label: string }[] = [
    { key: "supply", label: "Supply" },
    { key: "freight", label: "Freight" },
    { key: "political", label: "Political" },
  ]

  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Probabilistic Modeling"
        title="Risk Engine"
        description="Bayesian disruption scoring fuses geopolitical signals, AIS anomalies, and freight derivatives into a unified regional risk surface."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Composite Risk Index", value: "78", icon: AlertTriangle, tone: "text-danger" },
          { label: "Model Confidence", value: "92%", icon: Activity, tone: "text-cyan" },
          { label: "Mitigations Active", value: "6", icon: Shield, tone: "text-success" },
        ].map((s) => (
          <Card key={s.label} className="border-border/60 bg-card/60 p-4 backdrop-blur">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{s.label}</span>
              <s.icon className={`h-4 w-4 ${s.tone}`} />
            </div>
            <div className="mt-2 font-mono text-2xl font-semibold tabular-nums">{s.value}</div>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="border-border/60 bg-card/60 p-5 backdrop-blur lg:col-span-3">
          <h3 className="mb-4 text-sm font-medium">Regional Risk Heatmap</h3>
          <div className="space-y-2">
            <div className="grid grid-cols-[1.4fr_repeat(3,1fr)] gap-2 px-1 text-xs uppercase tracking-wider text-muted-foreground">
              <span>Region</span>
              {cols.map((c) => (
                <span key={c.key} className="text-center">
                  {c.label}
                </span>
              ))}
            </div>
            {riskHeatmap.map((row) => (
              <div key={row.region} className="grid grid-cols-[1.4fr_repeat(3,1fr)] items-center gap-2">
                <span className="text-xs font-medium">{row.region}</span>
                {cols.map((c) => (
                  <div
                    key={c.key}
                    className={`rounded-md py-2 text-center font-mono text-xs font-semibold tabular-nums ${heat(
                      row[c.key],
                    )}`}
                  >
                    {row[c.key]}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Card>

        <Card className="border-border/60 bg-card/60 p-5 backdrop-blur lg:col-span-2">
          <h3 className="mb-4 text-sm font-medium">Supply Risk — 24h Trend</h3>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={supplyRiskTrend} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
                <defs>
                  <linearGradient id="riskFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--danger)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="var(--danger)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="label" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} domain={[40, 90]} />
                <Tooltip
                  contentStyle={{
                    background: "var(--popover)",
                    border: "1px solid var(--border)",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Area type="monotone" dataKey="value" stroke="var(--danger)" strokeWidth={2} fill="url(#riskFill)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card className="border-border/60 bg-card/60 p-5 backdrop-blur">
        <h3 className="mb-4 text-sm font-medium">Event Propagation Timeline</h3>
        <div className="relative space-y-5 border-l border-border/60 pl-6">
          {eventTimeline.map((ev) => (
            <div key={ev.title} className="relative">
              <span
                className={`absolute -left-[1.85rem] top-1 h-3 w-3 rounded-full border-2 border-background ${
                  ev.severity === "critical"
                    ? "bg-danger"
                    : ev.severity === "high"
                      ? "bg-amber"
                      : "bg-cyan"
                }`}
              />
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs text-muted-foreground">{ev.time}</span>
                <span className="text-sm font-medium">{ev.title}</span>
                <Badge variant="outline" className={severityTone[ev.severity]}>
                  {ev.severity}
                </Badge>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{ev.detail}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
