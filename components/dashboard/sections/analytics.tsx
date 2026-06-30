"use client"

import { Card } from "@/components/ui/card"
import { SectionHeader } from "@/components/dashboard/ui"
import { procurementCostTrend, importDependency, utilizationTrend, tankerTrend } from "@/lib/data"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

const tooltipStyle = {
  background: "var(--popover)",
  border: "1px solid var(--border)",
  borderRadius: 8,
  fontSize: 12,
}

export function AnalyticsSection() {
  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Performance Intelligence"
        title="Analytics"
        description="Track procurement efficiency, import diversification, and operational throughput across the refinery network."
      />

      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { label: "YTD Cost Avoided", value: "$14.2M", sub: "via arbitrage" },
          { label: "Avg Savings / bbl", value: "$3.8", sub: "vs baseline" },
          { label: "Import Diversity", value: "0.71", sub: "HHI normalized" },
          { label: "Optimization Hit Rate", value: "91%", sub: "approved actions" },
        ].map((s) => (
          <Card key={s.label} className="border-border/60 bg-card/60 p-4 backdrop-blur">
            <div className="text-xs text-muted-foreground">{s.label}</div>
            <div className="mt-1.5 font-mono text-xl font-semibold tabular-nums">{s.value}</div>
            <div className="text-xs text-muted-foreground">{s.sub}</div>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="border-border/60 bg-card/60 p-5 backdrop-blur lg:col-span-2">
          <h3 className="mb-4 text-sm font-medium">Procurement Cost — Baseline vs Optimized</h3>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={procurementCostTrend} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="baseFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--danger)" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="var(--danger)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="optFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--success)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="var(--success)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} domain={[70, 105]} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Area type="monotone" dataKey="baseline" name="Baseline" stroke="var(--danger)" strokeWidth={2} fill="url(#baseFill)" />
                <Area type="monotone" dataKey="optimized" name="Optimized" stroke="var(--success)" strokeWidth={2} fill="url(#optFill)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="border-border/60 bg-card/60 p-5 backdrop-blur">
          <h3 className="mb-4 text-sm font-medium">Import Dependency by Region</h3>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={importDependency}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={55}
                  outerRadius={90}
                  paddingAngle={2}
                  stroke="var(--background)"
                  strokeWidth={2}
                >
                  {importDependency.map((entry) => (
                    <Cell key={entry.name} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-border/60 bg-card/60 p-5 backdrop-blur">
          <h3 className="mb-4 text-sm font-medium">Refinery Utilization — 7 Day</h3>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={utilizationTrend} margin={{ top: 4, right: 8, left: -24, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} domain={[70, 100]} />
                <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--secondary)" }} />
                <Bar dataKey="value" name="Utilization %" fill="var(--primary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="border-border/60 bg-card/60 p-5 backdrop-blur">
          <h3 className="mb-4 text-sm font-medium">Tankers in Transit — 6 Week</h3>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={tankerTrend} margin={{ top: 4, right: 8, left: -24, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="t" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} domain={[120, 180]} />
                <Tooltip contentStyle={tooltipStyle} />
                <Line type="monotone" dataKey="value" name="Tankers" stroke="var(--cyan)" strokeWidth={2} dot={{ r: 3, fill: "var(--cyan)" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  )
}
