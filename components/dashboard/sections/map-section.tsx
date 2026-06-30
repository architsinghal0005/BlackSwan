'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { Gauge, Navigation, Ship, X } from 'lucide-react'
import { SectionHead } from '@/components/dashboard/ui'
import { WorldMap } from '@/components/dashboard/world-map'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { useDashboard } from '@/components/dashboard/dashboard-context'
import { newsFeed, eventTimeline, vessels, type Vessel } from '@/lib/data'
import { cn } from '@/lib/utils'

const layerDefs: { key: keyof Layers; label: string }[] = [
  { key: 'routes', label: 'Shipping routes' },
  { key: 'tankers', label: 'Tankers' },
  { key: 'refineries', label: 'Refineries' },
  { key: 'ports', label: 'Ports' },
  { key: 'conflict', label: 'Conflict zones' },
  { key: 'chokepoints', label: 'Choke points' },
  { key: 'weather', label: 'Weather' },
]

type Layers = {
  routes: boolean
  tankers: boolean
  refineries: boolean
  ports: boolean
  conflict: boolean
  chokepoints: boolean
  weather: boolean
}

const severityTone: Record<string, string> = {
  critical: 'text-danger border-danger/30 bg-danger/10',
  high: 'text-amber border-amber/30 bg-amber/10',
  medium: 'text-cyan border-cyan/30 bg-cyan/10',
  low: 'text-muted-foreground border-border bg-secondary/40',
}

const statusTone: Record<string, string> = {
  'On Schedule': 'text-success',
  Delayed: 'text-amber',
  Rerouted: 'text-cyan',
  'At Risk': 'text-danger',
}

export function MapSection() {
  const { impact } = useDashboard()
  const [layers, setLayers] = useState<Layers>({
    routes: true,
    tankers: true,
    refineries: true,
    ports: true,
    conflict: true,
    chokepoints: true,
    weather: false,
  })
  const [selected, setSelected] = useState<Vessel | null>(null)

  const toggle = (k: keyof Layers) =>
    setLayers((p) => ({ ...p, [k]: !p[k] }))

  const regionRisk = Math.min(98, 78 + impact * 4)

  return (
    <div className="space-y-6">
      <SectionHead
        title="Live Geopolitical Map"
        description="Global crude flows, vessel positions and active risk overlays."
      >
        <Badge variant="outline" className="gap-1.5 border-danger/30 text-danger">
          <span className="size-1.5 rounded-full bg-danger animate-pulse-soft" />
          Live
        </Badge>
      </SectionHead>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        {/* Map + layers */}
        <div className="space-y-4 xl:col-span-2">
          <div className="relative">
            <WorldMap
              layers={layers}
              selectedId={selected?.id}
              onSelectVessel={setSelected}
              disrupted={impact > 0}
            />

            {/* Side panel */}
            {selected && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-strong absolute right-3 top-3 w-72 rounded-xl border border-border p-4 shadow-xl"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex size-9 items-center justify-center rounded-lg bg-primary/15 text-primary">
                      <Ship className="size-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">{selected.name}</div>
                      <div className="tabular text-xs text-muted-foreground">{selected.id}</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelected(null)}
                    className="rounded-md p-1 text-muted-foreground hover:bg-accent hover:text-foreground"
                    aria-label="Close panel"
                  >
                    <X className="size-4" />
                  </button>
                </div>
                <dl className="mt-4 space-y-2.5 text-sm">
                  <Row label="Type" value={selected.type} />
                  <Row label="Cargo" value={selected.cargo} />
                  <Row label="Origin" value={selected.origin} />
                  <Row label="Destination" value={selected.destination} />
                  <Row label="Speed" value={`${selected.speed} kn`} />
                  <Row label="ETA" value={selected.eta} />
                  <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground">Status</dt>
                    <dd className={cn('font-medium', statusTone[selected.status])}>
                      {selected.status}
                    </dd>
                  </div>
                </dl>
              </motion.div>
            )}
          </div>

          {/* Layer controls */}
          <div className="glass rounded-xl border border-border p-4">
            <div className="mb-3 flex items-center gap-2 text-sm font-medium">
              <Navigation className="size-4 text-primary" /> Map Layers
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {layerDefs.map((l) => (
                <label
                  key={l.key}
                  className="flex items-center justify-between gap-2 rounded-lg border border-border bg-secondary/40 px-3 py-2"
                >
                  <span className="text-xs text-muted-foreground">{l.label}</span>
                  <Switch
                    checked={layers[l.key]}
                    onCheckedChange={() => toggle(l.key)}
                    aria-label={l.label}
                  />
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Geopolitical Intelligence Panel */}
        <div className="space-y-4">
          <div className="glass rounded-xl border border-border p-5">
            <div className="flex items-center justify-between">
              <h3 className="flex items-center gap-2 font-medium">
                <Gauge className="size-4 text-amber" /> Regional Risk
              </h3>
              <span className="tabular text-2xl font-semibold text-danger">{regionRisk}</span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-danger transition-all"
                style={{ width: `${regionRisk}%` }}
              />
            </div>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              <span className="font-medium text-foreground">AI summary: </span>
              Elevated naval activity near the Strait of Hormuz is driving a sharp rise in
              war-risk premiums. Asia-bound cargoes face rerouting pressure; recommend
              activating West African substitution and reserve drawdown contingencies.
            </p>
          </div>

          {/* News feed */}
          <div className="glass rounded-xl border border-border p-5">
            <h3 className="mb-3 font-medium">Live Intelligence Feed</h3>
            <div className="space-y-2.5">
              {newsFeed.map((n) => (
                <div
                  key={n.id}
                  className="rounded-lg border border-border bg-secondary/30 p-3"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={cn(
                        'rounded border px-1.5 py-0.5 text-xs font-medium uppercase tracking-wide',
                        severityTone[n.severity],
                      )}
                    >
                      {n.region}
                    </span>
                    <span className="tabular text-xs text-muted-foreground">{n.time}</span>
                  </div>
                  <p className="mt-2 text-xs leading-snug text-foreground">{n.headline}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="h-1 flex-1 overflow-hidden rounded-full bg-secondary">
                      <div
                        className={cn(
                          'h-full rounded-full',
                          n.severity === 'critical' || n.severity === 'high'
                            ? 'bg-danger'
                            : 'bg-amber',
                        )}
                        style={{ width: `${n.probability}%` }}
                      />
                    </div>
                    <span className="tabular text-xs text-muted-foreground">
                      {n.probability}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="glass rounded-xl border border-border p-5">
            <h3 className="mb-4 font-medium">Event Timeline</h3>
            <ol className="relative space-y-4 border-l border-border pl-5">
              {eventTimeline.map((e) => (
                <li key={e.title} className="relative">
                  <span
                    className={cn(
                      'absolute -left-[26px] top-1 size-2.5 rounded-full ring-4 ring-background',
                      e.severity === 'critical'
                        ? 'bg-danger'
                        : e.severity === 'high'
                          ? 'bg-amber'
                          : 'bg-cyan',
                    )}
                  />
                  <div className="flex items-center gap-2">
                    <span className="tabular text-xs font-medium text-muted-foreground">
                      {e.time}
                    </span>
                    <span className="text-sm font-medium">{e.title}</span>
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">{e.detail}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      {/* Vessel quick list */}
      <div className="glass rounded-xl border border-border p-5">
        <h3 className="mb-3 font-medium">Tracked Vessels ({vessels.length})</h3>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {vessels.map((v) => (
            <button
              key={v.id}
              type="button"
              onClick={() => setSelected(v)}
              className={cn(
                'flex items-center gap-3 rounded-lg border p-3 text-left transition-colors',
                selected?.id === v.id
                  ? 'border-primary bg-primary/10'
                  : 'border-border bg-secondary/30 hover:border-primary/40',
              )}
            >
              <Ship className={cn('size-4 shrink-0', statusTone[v.status])} />
              <div className="min-w-0">
                <div className="truncate text-sm font-medium">{v.name}</div>
                <div className="truncate text-xs text-muted-foreground">{v.cargo}</div>
              </div>
              <span className={cn('ml-auto shrink-0 text-xs', statusTone[v.status])}>
                {v.eta}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-right font-medium">{value}</dd>
    </div>
  )
}
