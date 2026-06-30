'use client'

import Link from 'next/link'
import {
  BarChart3,
  Database,
  FileText,
  FlaskConical,
  LayoutDashboard,
  Map,
  type LucideIcon,
  Route,
  Settings,
  ShieldAlert,
  SlidersHorizontal,
} from 'lucide-react'
import { Wordmark } from '@/components/brand'
import { useDashboard, type SectionId } from './dashboard-context'
import { cn } from '@/lib/utils'

const nav: { id: SectionId; label: string; icon: LucideIcon }[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'map', label: 'Live Map', icon: Map },
  { id: 'refineries', label: 'Refineries', icon: FlaskConical },
  { id: 'logistics', label: 'Logistics Optimizer', icon: Route },
  { id: 'risk', label: 'Risk Engine', icon: ShieldAlert },
  { id: 'reserve', label: 'Strategic Reserve', icon: Database },
  { id: 'simulation', label: 'Simulation', icon: SlidersHorizontal },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'reports', label: 'Reports', icon: FileText },
  { id: 'settings', label: 'Settings', icon: Settings },
]

export function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const { section, setSection } = useDashboard()
  return (
    <div className="flex h-full flex-col bg-sidebar">
      <div className="flex h-16 items-center border-b border-sidebar-border px-5">
        <Link href="/" aria-label="BlackSwan home">
          <Wordmark />
        </Link>
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {nav.map((item) => {
          const active = section === item.id
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setSection(item.id)
                onNavigate?.()
              }}
              className={cn(
                'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors',
                active
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                  : 'text-muted-foreground hover:bg-sidebar-accent/50 hover:text-foreground',
              )}
              aria-current={active ? 'page' : undefined}
            >
              <item.icon
                className={cn('size-4 shrink-0', active && 'text-primary')}
              />
              <span className="truncate">{item.label}</span>
              {active && (
                <span className="ml-auto h-4 w-1 rounded-full bg-primary" />
              )}
            </button>
          )
        })}
      </nav>
      <div className="border-t border-sidebar-border p-3">
        <div className="rounded-lg border border-sidebar-border bg-card/50 p-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping-slow rounded-full bg-success" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
            </span>
            Engine status
          </div>
          <div className="mt-1 text-sm font-medium">All systems operational</div>
          <div className="tabular mt-1 text-xs text-muted-foreground">
            Last sync · 12s ago
          </div>
        </div>
      </div>
    </div>
  )
}
