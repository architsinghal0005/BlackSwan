'use client'

import { Anchor, Factory, Ship } from 'lucide-react'
import {
  chokepoints,
  conflictZones,
  ports,
  refineries,
  vessels,
  type Vessel,
} from '@/lib/data'
import { cn } from '@/lib/utils'

type Layers = {
  routes: boolean
  tankers: boolean
  refineries: boolean
  ports: boolean
  conflict: boolean
  chokepoints: boolean
  weather: boolean
}

// shipping routes as percentage coordinate polylines
const routes = [
  { id: 'rt1', points: '61,49 60,47 62,50 64,52', tone: 'var(--cyan)' },
  { id: 'rt2', points: '48,60 50,58 55,56 60,53 64,52', tone: 'var(--primary)' },
  { id: 'rt3', points: '56,41 57,44 59,47 63,51 65,51', tone: 'var(--amber)' },
  { id: 'rt4', points: '22,47 30,50 42,55 52,55 60,53 64,56', tone: 'var(--primary)' },
]

export function WorldMap({
  layers,
  selectedId,
  onSelectVessel,
  disrupted = false,
  className,
}: {
  layers: Layers
  selectedId?: string | null
  onSelectVessel?: (v: Vessel) => void
  disrupted?: boolean
  className?: string
}) {
  return (
    <div
      className={cn(
        'relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-border bg-card',
        className,
      )}
    >
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: 'url(/world-dotmap.png)' }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 grid-bg opacity-30" aria-hidden="true" />

      {/* SVG overlay layers */}
      <svg
        viewBox="0 0 100 56.25"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {layers.weather &&
          [
            { cx: 76, cy: 56, r: 6 },
            { cx: 60, cy: 48, r: 4.5 },
          ].map((w, i) => (
            <circle
              key={i}
              cx={w.cx}
              cy={w.cy * 0.5625}
              r={w.r}
              fill="var(--cyan)"
              opacity={0.08}
            />
          ))}

        {layers.conflict &&
          conflictZones.map((z) => (
            <g key={z.id}>
              <circle
                cx={z.x}
                cy={z.y * 0.5625}
                r={3.6 * z.intensity + 1.4}
                fill="var(--danger)"
                opacity={0.14}
              />
              <circle
                cx={z.x}
                cy={z.y * 0.5625}
                r={1.4}
                fill="var(--danger)"
                opacity={0.5}
              />
            </g>
          ))}

        {layers.routes &&
          routes.map((r) => (
            <polyline
              key={r.id}
              points={r.points
                .split(' ')
                .map((p) => {
                  const [x, y] = p.split(',').map(Number)
                  return `${x},${y * 0.5625}`
                })
                .join(' ')}
              fill="none"
              stroke={r.tone}
              strokeWidth={0.35}
              strokeOpacity={0.55}
              className="animate-dash"
            />
          ))}
      </svg>

      {/* Chokepoints */}
      {layers.chokepoints &&
        chokepoints.map((c) => (
          <Marker key={c.id} x={c.x} y={c.y} label={`${c.name} · ${c.flow}`}>
            <div
              className={cn(
                'flex size-3 rotate-45 items-center justify-center border',
                c.risk === 'Critical'
                  ? 'border-danger bg-danger/40'
                  : c.risk === 'High'
                    ? 'border-amber bg-amber/40'
                    : 'border-cyan bg-cyan/40',
              )}
            />
          </Marker>
        ))}

      {/* Ports */}
      {layers.ports &&
        ports.map((p) => (
          <Marker key={p.id} x={p.x} y={p.y} label={`Port · ${p.name}`}>
            <Anchor className="size-3 text-muted-foreground" />
          </Marker>
        ))}

      {/* Refineries */}
      {layers.refineries &&
        refineries.map((r) => (
          <Marker key={r.id} x={r.x} y={r.y} label={`${r.name} · ${r.utilization}%`}>
            <div className="flex size-5 items-center justify-center rounded-md border border-primary/50 bg-primary/20">
              <Factory className="size-3 text-primary" />
            </div>
          </Marker>
        ))}

      {/* Tankers */}
      {layers.tankers &&
        vessels.map((v) => {
          const active = selectedId === v.id
          const tone =
            v.status === 'At Risk' || (disrupted && v.status === 'Delayed')
              ? 'text-danger'
              : v.status === 'Delayed' || v.status === 'Rerouted'
                ? 'text-amber'
                : 'text-cyan'
          return (
            <button
              key={v.id}
              type="button"
              onClick={() => onSelectVessel?.(v)}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              style={{ left: `${v.x}%`, top: `${v.y}%` }}
              aria-label={`Vessel ${v.name}`}
            >
              <span className="relative flex items-center justify-center">
                {active && (
                  <span className="absolute inline-flex h-6 w-6 animate-ping-slow rounded-full bg-primary/40" />
                )}
                <span
                  className={cn(
                    'relative flex size-6 items-center justify-center rounded-full border bg-card/90 shadow transition-transform hover:scale-110',
                    active ? 'border-primary ring-2 ring-primary/40' : 'border-border',
                  )}
                >
                  <Ship className={cn('size-3', tone)} />
                </span>
              </span>
            </button>
          )
        })}
    </div>
  )
}

function Marker({
  x,
  y,
  label,
  children,
}: {
  x: number
  y: number
  label: string
  children: React.ReactNode
}) {
  return (
    <div
      className="group absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      {children}
      <div className="pointer-events-none absolute bottom-full left-1/2 mb-1.5 hidden -translate-x-1/2 whitespace-nowrap rounded-md border border-border bg-popover px-2 py-1 text-xs text-popover-foreground shadow-lg group-hover:block">
        {label}
      </div>
    </div>
  )
}
