'use client'

import { cn } from '@/lib/utils'

const toneMap: Record<string, string> = {
  primary: 'text-primary',
  cyan: 'text-cyan',
  amber: 'text-amber',
  danger: 'text-danger',
  success: 'text-success',
}

const toneBgMap: Record<string, string> = {
  primary: 'bg-primary/12 text-primary',
  cyan: 'bg-cyan/12 text-cyan',
  amber: 'bg-amber/12 text-amber',
  danger: 'bg-danger/12 text-danger',
  success: 'bg-success/12 text-success',
}

export function toneText(tone: string) {
  return toneMap[tone] ?? 'text-primary'
}

export function toneBadge(tone: string) {
  return toneBgMap[tone] ?? toneBgMap.primary
}

export function SectionHead({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children?: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {children && <div className="flex items-center gap-2">{children}</div>}
    </div>
  )
}

export function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string
  title: string
  description?: string
}) {
  return (
    <div>
      {eyebrow && (
        <div className="mb-1 text-xs font-mono uppercase tracking-[0.2em] text-primary">
          {eyebrow}
        </div>
      )}
      <h1 className="text-2xl font-semibold tracking-tight text-balance">{title}</h1>
      {description && (
        <p className="mt-1.5 max-w-3xl text-sm text-muted-foreground leading-relaxed text-pretty">
          {description}
        </p>
      )}
    </div>
  )
}

export function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-mono text-sm font-medium tabular-nums">{value}</div>
      <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
    </div>
  )
}

export function GlassCard({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={cn('glass rounded-xl border border-border', className)}>
      {children}
    </div>
  )
}

export function Delta({ value, invert = false }: { value: number; invert?: boolean }) {
  const positive = value >= 0
  // For some metrics (cost, risk), down is good — invert color logic
  const good = invert ? !positive : positive
  return (
    <span
      className={cn(
        'tabular inline-flex items-center gap-0.5 text-xs font-medium',
        good ? 'text-success' : 'text-danger',
      )}
    >
      {positive ? '▲' : '▼'} {Math.abs(value).toFixed(1)}%
    </span>
  )
}
