'use client'

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { ArrowUpRight } from 'lucide-react'
import { Sparkline } from '@/components/sparkline'
import { Delta, SectionHead, toneText } from '@/components/dashboard/ui'
import { useDashboard } from '@/components/dashboard/dashboard-context'
import {
  kpis,
  procurementCostTrend,
  recommendations,
  supplyRiskTrend,
  utilizationTrend,
} from '@/lib/data'
import { cn } from '@/lib/utils'

const toneColor: Record<string, string> = {
  primary: 'var(--primary)',
  cyan: 'var(--cyan)',
  amber: 'var(--amber)',
  danger: 'var(--danger)',
  success: 'var(--success)',
}

function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="glass-strong rounded-lg border border-border px-3 py-2 text-xs shadow-lg">
      <div className="mb-1 font-medium text-foreground">{label}</div>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="flex items-center gap-2 text-muted-foreground">
          <span className="size-2 rounded-full" style={{ background: p.color }} />
          <span className="capitalize">{p.name}:</span>
          <span className="tabular font-medium text-foreground">{p.value}</span>
        </div>
      ))}
    </div>
  )
}

export function OverviewSection() {
  const { impact, simApplied } = useDashboard()

  return (
    <div className="space-y-6">
      <SectionHead
        title="Operations Overview"
        description="Real-time posture across the refinery network and global supply chain."
      />

      {simApplied && impact > 0 && (
        <div className="flex items-center gap-2 rounded-lg border border-amber/30 bg-amber/10 px-4 py-2.5 text-sm text-amber">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping-slow rounded-full bg-amber" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-amber" />
          </span>
          Simulation active · {impact} scenario{impact > 1 ? 's' : ''} applied — metrics reflect projected disruption.
        </div>
      )}

      {/* KPI grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {kpis.map((k) => {
          const inverted = k.id === 'cost' || k.id === 'risk' || k.id === 'buffer'
          return (
            <div
              key={k.id}
              className="glass group rounded-xl border border-border p-5 transition-colors hover:border-primary/30"
            >
              <div className="flex items-start justify-between">
                <span className="text-sm text-muted-foreground">{k.label}</span>
                <Delta value={k.delta} invert={inverted} />
              </div>
              <div className="mt-3 flex items-end justify-between gap-3">
                <div className="flex items-baseline gap-1">
                  <span className="tabular text-3xl font-semibold tracking-tight">
                    {k.value}
                  </span>
                  {k.unit && (
                    <span className="text-sm text-muted-foreground">{k.unit}</span>
                  )}
                </div>
                <Sparkline
                  data={k.spark}
                  color={toneColor[k.tone]}
                  className="h-9 w-24"
                />
              </div>
            </div>
          )
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="glass rounded-xl border border-border p-5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-medium">Procurement Cost — Baseline vs Optimized</h3>
              <p className="text-xs text-muted-foreground">USD / barrel · trailing 7 months</p>
            </div>
            <span className={cn('text-xs font-medium', toneText('success'))}>
              -13.5% vs baseline
            </span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={procurementCostTrend} margin={{ left: -16, right: 8, top: 4 }}>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip content={<ChartTooltip />} />
                <Line type="monotone" dataKey="baseline" name="Baseline" stroke="var(--muted-foreground)" strokeWidth={2} dot={false} strokeDasharray="4 4" />
                <Line type="monotone" dataKey="optimized" name="Optimized" stroke="var(--success)" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass rounded-xl border border-border p-5">
          <div className="mb-4">
            <h3 className="font-medium">Supply Risk Index</h3>
            <p className="text-xs text-muted-foreground">24-hour rolling</p>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={supplyRiskTrend} margin={{ left: -16, right: 8, top: 4 }}>
                <defs>
                  <linearGradient id="riskFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--danger)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="var(--danger)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="label" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} interval={1} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} domain={[40, 90]} />
                <Tooltip content={<ChartTooltip />} />
                <Area type="monotone" dataKey="value" name="Risk" stroke="var(--danger)" strokeWidth={2.5} fill="url(#riskFill)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="glass rounded-xl border border-border p-5">
          <h3 className="mb-4 font-medium">Refinery Utilization</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={utilizationTrend} margin={{ left: -20, right: 8 }}>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} domain={[70, 100]} />
                <Tooltip content={<ChartTooltip />} cursor={{ fill: 'var(--accent)' }} />
                <Bar dataKey="value" name="Utilization %" fill="var(--cyan)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI recommendations preview */}
        <div className="glass rounded-xl border border-border p-5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-medium">Top AI Recommendations</h3>
            <span className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-xs text-primary">
              Live
            </span>
          </div>
          <div className="space-y-3">
            {recommendations.slice(0, 2).map((r) => (
              <div
                key={r.id}
                className="flex items-start gap-3 rounded-lg border border-border bg-secondary/40 p-3.5"
              >
                <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
                  <ArrowUpRight className="size-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm font-medium">{r.title}</p>
                    <span className="tabular shrink-0 text-xs text-success">{r.savings}</span>
                  </div>
                  <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{r.rationale}</p>
                  <div className="mt-2 flex flex-wrap gap-3 text-xs text-muted-foreground">
                    <span>Risk −{r.riskReduction}%</span>
                    <span>Compat {r.compatibility}%</span>
                    <span className="text-primary">Confidence {r.confidence}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
