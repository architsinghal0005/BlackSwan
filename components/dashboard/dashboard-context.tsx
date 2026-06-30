'use client'

import { createContext, useContext, useMemo, useState } from 'react'
import type { ScenarioId } from '@/lib/data'

export type SectionId =
  | 'overview'
  | 'map'
  | 'refineries'
  | 'logistics'
  | 'risk'
  | 'reserve'
  | 'simulation'
  | 'analytics'
  | 'reports'
  | 'settings'

type Ctx = {
  section: SectionId
  setSection: (s: SectionId) => void
  activeScenarios: ScenarioId[]
  toggleScenario: (s: ScenarioId) => void
  simRunning: boolean
  simApplied: boolean
  runSimulation: () => void
  resetSimulation: () => void
  /** 0 = baseline, scales with active scenarios while applied */
  impact: number
}

const DashboardCtx = createContext<Ctx | null>(null)

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [section, setSection] = useState<SectionId>('overview')
  const [activeScenarios, setActiveScenarios] = useState<ScenarioId[]>([])
  const [simRunning, setSimRunning] = useState(false)
  const [simApplied, setSimApplied] = useState(false)

  const toggleScenario = (s: ScenarioId) =>
    setActiveScenarios((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s],
    )

  const runSimulation = () => {
    setSimRunning(true)
    setSimApplied(false)
    window.setTimeout(() => {
      setSimRunning(false)
      setSimApplied(true)
    }, 1600)
  }

  const resetSimulation = () => {
    setSimApplied(false)
    setActiveScenarios([])
  }

  const impact = useMemo(
    () => (simApplied ? activeScenarios.length : 0),
    [simApplied, activeScenarios],
  )

  const value: Ctx = {
    section,
    setSection,
    activeScenarios,
    toggleScenario,
    simRunning,
    simApplied,
    runSimulation,
    resetSimulation,
    impact,
  }

  return <DashboardCtx.Provider value={value}>{children}</DashboardCtx.Provider>
}

export function useDashboard() {
  const ctx = useContext(DashboardCtx)
  if (!ctx) throw new Error('useDashboard must be used within DashboardProvider')
  return ctx
}
