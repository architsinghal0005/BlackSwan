'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet'
import { DashboardProvider, useDashboard } from './dashboard-context'
import { SidebarNav } from './sidebar'
import { Topbar } from './topbar'
import { OverviewSection } from './sections/overview'
import { MapSection } from './sections/map-section'
import { RefineriesSection } from './sections/refineries'
import { LogisticsSection } from './sections/logistics'
import { RiskSection } from './sections/risk'
import { ReserveSection } from './sections/reserve'
import { SimulationSection } from './sections/simulation'
import { AnalyticsSection } from './sections/analytics'
import { ReportsSection } from './sections/reports'
import { SettingsSection } from './sections/settings'

function SectionRouter() {
  const { section } = useDashboard()
  const content = (() => {
    switch (section) {
      case 'overview':
        return <OverviewSection />
      case 'map':
        return <MapSection />
      case 'refineries':
        return <RefineriesSection />
      case 'logistics':
        return <LogisticsSection />
      case 'risk':
        return <RiskSection />
      case 'reserve':
        return <ReserveSection />
      case 'simulation':
        return <SimulationSection />
      case 'analytics':
        return <AnalyticsSection />
      case 'reports':
        return <ReportsSection />
      case 'settings':
        return <SettingsSection />
      default:
        return <OverviewSection />
    }
  })()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={section}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.22 }}
      >
        {content}
      </motion.div>
    </AnimatePresence>
  )
}

function ShellInner() {
  const [mobileOpen, setMobileOpen] = useState(false)
  return (
    <div className="flex min-h-dvh bg-background">
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-sidebar-border lg:block">
        <div className="sticky top-0 h-dvh">
          <SidebarNav />
        </div>
      </aside>

      {/* Mobile sidebar */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-64 border-sidebar-border p-0">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <SidebarNav onNavigate={() => setMobileOpen(false)} />
        </SheetContent>
      </Sheet>

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar onMenu={() => setMobileOpen(true)} />
        <main className="grid-bg flex-1 p-4 sm:p-6">
          <div className="mx-auto max-w-[1600px]">
            <SectionRouter />
          </div>
        </main>
      </div>
    </div>
  )
}

export function DashboardShell() {
  return (
    <DashboardProvider>
      <ShellInner />
    </DashboardProvider>
  )
}
