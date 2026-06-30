"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { SectionHeader } from "@/components/dashboard/ui"
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { Droplet, Gauge, Timer } from "lucide-react"

const tanks = [
  { id: "SPR-A", name: "Mangalore Cavern A", grade: "Sour Heavy", fill: 84, capacity: "1.50M bbl" },
  { id: "SPR-B", name: "Mangalore Cavern B", grade: "Sour Heavy", fill: 61, capacity: "1.50M bbl" },
  { id: "SPR-C", name: "Padur Cavern C", grade: "Sweet Light", fill: 73, capacity: "2.50M bbl" },
  { id: "SPR-D", name: "Padur Cavern D", grade: "Medium Sour", fill: 48, capacity: "2.50M bbl" },
  { id: "SPR-E", name: "Vizag Cavern E", grade: "Medium Sour", fill: 92, capacity: "1.33M bbl" },
]

const drawdownProjection = [
  { day: "D0", reserve: 23, demand: 23 },
  { day: "D5", reserve: 21, demand: 22 },
  { day: "D10", reserve: 18, demand: 20 },
  { day: "D15", reserve: 16, demand: 19 },
  { day: "D20", reserve: 19, demand: 18 },
  { day: "D26", reserve: 24, demand: 17 },
]

function fillTone(fill: number) {
  if (fill >= 75) return "bg-success"
  if (fill >= 50) return "bg-cyan"
  return "bg-amber"
}

export function ReserveSection() {
  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Buffer Management"
        title="Strategic Petroleum Reserve"
        description="Monitor underground storage levels and model emergency drawdown scenarios to bridge supply gaps during chokepoint disruptions."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Total Reserve", value: "9.34M", unit: "bbl", icon: Droplet, tone: "text-cyan" },
          { label: "Days of Cover", value: "23", unit: "days", icon: Timer, tone: "text-amber" },
          { label: "Avg Fill Level", value: "71.6", unit: "%", icon: Gauge, tone: "text-success" },
        ].map((s) => (
          <Card key={s.label} className="border-border/60 bg-card/60 p-4 backdrop-blur">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{s.label}</span>
              <s.icon className={`h-4 w-4 ${s.tone}`} />
            </div>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="font-mono text-2xl font-semibold tabular-nums">{s.value}</span>
              <span className="text-xs text-muted-foreground">{s.unit}</span>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="border-border/60 bg-card/60 p-5 backdrop-blur lg:col-span-2">
          <h3 className="mb-4 text-sm font-medium">Storage Caverns</h3>
          <div className="space-y-4">
            {tanks.map((t) => (
              <div key={t.id}>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{t.name}</span>
                    <Badge variant="outline" className="border-border/60 text-muted-foreground">
                      {t.grade}
                    </Badge>
                  </div>
                  <span className="font-mono tabular-nums">{t.fill}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-secondary">
                  <div
                    className={`h-full rounded-full ${fillTone(t.fill)}`}
                    style={{ width: `${t.fill}%` }}
                  />
                </div>
                <div className="mt-0.5 text-xs text-muted-foreground">{t.capacity} capacity</div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="border-border/60 bg-card/60 p-5 backdrop-blur lg:col-span-3">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-medium">Drawdown & Recovery Projection</h3>
            <Badge className="bg-cyan/15 text-cyan hover:bg-cyan/15">Hormuz Scenario</Badge>
          </div>
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={drawdownProjection} margin={{ top: 4, right: 8, left: -24, bottom: 0 }}>
                <defs>
                  <linearGradient id="reserveFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--cyan)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="var(--cyan)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    background: "var(--popover)",
                    border: "1px solid var(--border)",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Area type="monotone" dataKey="reserve" stroke="var(--cyan)" strokeWidth={2} fill="url(#reserveFill)" name="Days of cover" />
                <Area type="monotone" dataKey="demand" stroke="var(--amber)" strokeWidth={2} strokeDasharray="4 4" fill="transparent" name="Demand floor" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 rounded-lg border border-cyan/30 bg-cyan/5 p-3 text-xs text-muted-foreground">
            Model recommends a 1.2M bbl drawdown at D0 to bridge the rerouting gap. Reserve recovers to full
            coverage by D26 as West African cargoes arrive.
          </div>
          <div className="mt-3">
            <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
              <span>Recovery progress (projected)</span>
              <span>D26 target</span>
            </div>
            <Progress value={62} className="h-1.5" />
          </div>
        </Card>
      </div>
    </div>
  )
}
