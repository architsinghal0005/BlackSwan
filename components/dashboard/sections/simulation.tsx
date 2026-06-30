"use client"

import { motion } from "motion/react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/dashboard/ui"
import { useDashboard } from "@/components/dashboard/dashboard-context"
import { scenarios } from "@/lib/data"
import { Play, RotateCcw, Loader2, Zap, TrendingUp, TrendingDown, Check } from "lucide-react"

export function SimulationSection() {
  const {
    activeScenarios,
    toggleScenario,
    simRunning,
    simApplied,
    runSimulation,
    resetSimulation,
    impact,
  } = useDashboard()

  // Derived metrics scale with the number of active shocks once applied.
  const riskIndex = Math.min(99, 78 + impact * 5)
  const costPerBbl = (85.7 + impact * 3.4).toFixed(1)
  const daysCover = Math.max(6, 23 - impact * 3)
  const reroutes = impact * 7

  const outputs = [
    { label: "Supply Risk Index", value: `${riskIndex}`, base: "78", up: true, bad: true, icon: Zap },
    { label: "Procurement Cost", value: `$${costPerBbl}`, base: "$85.7", up: true, bad: true, icon: TrendingUp },
    { label: "Days of Cover", value: `${daysCover}`, base: "23", up: false, bad: true, icon: TrendingDown },
    { label: "Forced Reroutes", value: `${reroutes}`, base: "0", up: true, bad: true, icon: TrendingUp },
  ]

  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="What-If Modeling"
        title="Scenario Simulation"
        description="Inject geopolitical shocks and watch the engine propagate impact across risk, cost, reserves, and routing in real time."
      />

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Controls */}
        <Card className="border-border/60 bg-card/60 p-5 backdrop-blur lg:col-span-2">
          <h3 className="mb-1 text-sm font-medium">Shock Selection</h3>
          <p className="mb-4 text-xs text-muted-foreground">Toggle one or more disruptions to stack their impact.</p>
          <div className="space-y-2">
            {scenarios.map((s) => {
              const active = activeScenarios.includes(s.id)
              return (
                <button
                  key={s.id}
                  onClick={() => toggleScenario(s.id)}
                  className={`flex w-full items-center justify-between rounded-lg border p-3 text-left transition-colors ${
                    active
                      ? "border-danger/50 bg-danger/5"
                      : "border-border/60 bg-secondary/30 hover:border-border"
                  }`}
                >
                  <div>
                    <div className="text-sm font-medium">{s.label}</div>
                    <div className="text-xs text-muted-foreground">{s.desc}</div>
                  </div>
                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded-md border ${
                      active ? "border-danger bg-danger text-background" : "border-border"
                    }`}
                  >
                    {active && <Check className="h-3.5 w-3.5" />}
                  </span>
                </button>
              )
            })}
          </div>

          <div className="mt-4 flex gap-2">
            <Button
              className="flex-1"
              onClick={runSimulation}
              disabled={activeScenarios.length === 0 || simRunning}
            >
              {simRunning ? (
                <>
                  <Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> Running model...
                </>
              ) : (
                <>
                  <Play className="mr-1.5 h-4 w-4" /> Run simulation
                </>
              )}
            </Button>
            <Button variant="secondary" onClick={resetSimulation} disabled={simRunning}>
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </Card>

        {/* Outputs */}
        <Card className="border-border/60 bg-card/60 p-5 backdrop-blur lg:col-span-3">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-medium">Projected System Impact</h3>
            {simApplied ? (
              <Badge className="bg-danger/15 text-danger hover:bg-danger/15">
                {activeScenarios.length} shock{activeScenarios.length !== 1 ? "s" : ""} applied
              </Badge>
            ) : (
              <Badge variant="outline" className="border-border/60 text-muted-foreground">
                Baseline
              </Badge>
            )}
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {outputs.map((o) => (
              <motion.div
                key={o.label}
                animate={{ scale: simApplied ? [1, 1.02, 1] : 1 }}
                transition={{ duration: 0.4 }}
                className="rounded-lg border border-border/60 bg-secondary/30 p-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{o.label}</span>
                  <o.icon className={`h-4 w-4 ${simApplied ? "text-danger" : "text-muted-foreground"}`} />
                </div>
                <div className="mt-2 font-mono text-2xl font-semibold tabular-nums">
                  {simApplied ? o.value : o.base}
                </div>
                {simApplied && (
                  <div className="mt-1 text-xs text-danger">
                    from {o.base} baseline
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <div className="mt-4 rounded-lg border border-border/60 bg-secondary/20 p-4">
            <div className="text-xs font-medium">Engine Response</div>
            <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
              {simApplied
                ? `With ${activeScenarios.length} active shock${
                    activeScenarios.length !== 1 ? "s" : ""
                  }, the optimizer recommends rerouting ${reroutes} cargoes via the Cape of Good Hope, drawing down ${(
                    impact * 0.6
                  ).toFixed(1)}M bbl from strategic reserve, and switching procurement to West African and US Gulf grades to contain cost exposure.`
                : "Select one or more shocks and run the model to see how supply risk, procurement cost, reserves, and routing respond across the network."}
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
