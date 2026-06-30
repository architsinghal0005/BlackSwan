'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from 'recharts'
import { Droplet, Gauge, Search, Thermometer } from 'lucide-react'
import { SectionHead } from '@/components/dashboard/ui'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { refineries, type Refinery } from '@/lib/data'
import { cn } from '@/lib/utils'

const statusTone: Record<string, string> = {
  Optimal: 'border-success/30 bg-success/10 text-success',
  Constrained: 'border-amber/30 bg-amber/10 text-amber',
  Critical: 'border-danger/30 bg-danger/10 text-danger',
}

export function RefineriesSection() {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<Refinery>(refineries[0])

  const filtered = refineries.filter(
    (r) =>
      r.name.toLowerCase().includes(query.toLowerCase()) ||
      r.location.toLowerCase().includes(query.toLowerCase()) ||
      r.grades.some((g) => g.toLowerCase().includes(query.toLowerCase())),
  )

  const radarData = [
    { metric: 'API Gravity', value: (selected.apiGravity / 40) * 100 },
    { metric: 'Sulfur Fit', value: 100 - selected.sulfur * 22 },
    { metric: 'Throughput', value: (selected.throughput / 1240) * 100 },
    { metric: 'Utilization', value: selected.utilization },
    { metric: 'Grade Range', value: selected.grades.length * 22 },
  ]

  return (
    <div className="space-y-6">
      <SectionHead
        title="Refinery Chemistry Database"
        description="Crude assay configurations and compatibility across the network."
      />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        {/* Table */}
        <div className="glass rounded-xl border border-border xl:col-span-2">
          <div className="border-b border-border p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, location or crude grade…"
                className="h-9 border-border bg-secondary/50 pl-9"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs text-muted-foreground">
                  <th className="px-4 py-3 font-medium">Refinery</th>
                  <th className="px-4 py-3 font-medium hidden sm:table-cell">API°</th>
                  <th className="px-4 py-3 font-medium hidden sm:table-cell">Sulfur %</th>
                  <th className="px-4 py-3 font-medium">kbd</th>
                  <th className="px-4 py-3 font-medium">Util.</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr
                    key={r.id}
                    onClick={() => setSelected(r)}
                    className={cn(
                      'cursor-pointer border-b border-border/60 transition-colors hover:bg-accent/40',
                      selected.id === r.id && 'bg-primary/10',
                    )}
                  >
                    <td className="px-4 py-3">
                      <div className="font-medium">{r.name}</div>
                      <div className="text-xs text-muted-foreground">{r.location}</div>
                    </td>
                    <td className="tabular px-4 py-3 hidden sm:table-cell">{r.apiGravity}</td>
                    <td className="tabular px-4 py-3 hidden sm:table-cell">{r.sulfur}</td>
                    <td className="tabular px-4 py-3">{r.throughput}</td>
                    <td className="tabular px-4 py-3">{r.utilization}%</td>
                    <td className="px-4 py-3">
                      <span
                        className={cn(
                          'rounded border px-2 py-0.5 text-xs font-medium',
                          statusTone[r.status],
                        )}
                      >
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-10 text-center text-sm text-muted-foreground">
                      No refineries match &ldquo;{query}&rdquo;
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detail panel */}
        <motion.div
          key={selected.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="glass space-y-5 rounded-xl border border-border p-5"
        >
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold">{selected.name}</h3>
              <p className="text-sm text-muted-foreground">{selected.location}</p>
            </div>
            <Badge
              variant="outline"
              className={cn('shrink-0', statusTone[selected.status])}
            >
              {selected.status}
            </Badge>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 xl:grid-cols-1 2xl:grid-cols-3">
            <Metric icon={Thermometer} label="API Gravity" value={`${selected.apiGravity}°`} />
            <Metric icon={Droplet} label="Sulfur" value={`${selected.sulfur}%`} />
            <Metric icon={Gauge} label="Throughput" value={`${selected.throughput}`} />
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Current utilization</span>
              <span className="tabular font-medium">{selected.utilization}%</span>
            </div>
            <Progress value={selected.utilization} className="h-2" />
          </div>

          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData} outerRadius="72%">
                <PolarGrid stroke="var(--border)" />
                <PolarAngleAxis
                  dataKey="metric"
                  tick={{ fill: 'var(--muted-foreground)', fontSize: 10 }}
                />
                <Radar
                  dataKey="value"
                  stroke="var(--primary)"
                  fill="var(--primary)"
                  fillOpacity={0.25}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div>
            <div className="mb-2 text-sm font-medium">Compatible crude grades</div>
            <div className="flex flex-wrap gap-2">
              {selected.grades.map((g) => (
                <span
                  key={g}
                  className="rounded-full border border-border bg-secondary/50 px-2.5 py-1 text-xs text-muted-foreground"
                >
                  {g}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function Metric({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType
  label: string
  value: string
}) {
  return (
    <div className="rounded-lg border border-border bg-secondary/40 p-3">
      <Icon className="size-4 text-primary" />
      <div className="tabular mt-2 text-lg font-semibold">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  )
}
