"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { SectionHeader, Stat, toneText } from "@/components/dashboard/ui"
import { procurementOptions, recommendations, workflowSteps } from "@/lib/data"
import { ArrowRight, Check, Cpu, Sparkles, TrendingDown } from "lucide-react"

export function LogisticsSection() {
  const [selected, setSelected] = useState(procurementOptions[0].id)

  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Decision Engine"
        title="Logistics & Arbitrage Optimizer"
        description="A MILP solver weighs crude compatibility, freight, geopolitical risk, and delivery windows to rank sourcing alternatives in real time."
      />

      {/* Pipeline */}
      <Card className="border-border/60 bg-card/60 p-5 backdrop-blur">
        <div className="mb-4 flex items-center gap-2">
          <Cpu className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-medium">Optimization Pipeline</h3>
          <Badge variant="outline" className="ml-auto border-primary/40 text-primary">
            Live
          </Badge>
        </div>
        <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-6">
          {workflowSteps.map((step, i) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="relative rounded-lg border border-border/60 bg-secondary/40 p-3"
            >
              <div className={`text-xs font-mono uppercase tracking-wider ${toneText(step.tone)}`}>
                0{i + 1}
              </div>
              <div className="mt-1 text-xs font-medium leading-tight">{step.label}</div>
              <div className="mt-1 text-xs text-muted-foreground leading-tight">{step.desc}</div>
              {i < workflowSteps.length - 1 && (
                <ArrowRight className="absolute -right-2.5 top-1/2 hidden h-4 w-4 -translate-y-1/2 text-muted-foreground/40 lg:block" />
              )}
            </motion.div>
          ))}
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Procurement options */}
        <Card className="border-border/60 bg-card/60 p-5 backdrop-blur lg:col-span-3">
          <h3 className="mb-1 text-sm font-medium">Ranked Procurement Alternatives</h3>
          <p className="mb-4 text-xs text-muted-foreground">
            Select a sourcing option to inspect the trade-off profile.
          </p>
          <div className="space-y-3">
            {procurementOptions.map((opt) => {
              const active = selected === opt.id
              return (
                <button
                  key={opt.id}
                  onClick={() => setSelected(opt.id)}
                  className={`w-full rounded-lg border p-4 text-left transition-colors ${
                    active
                      ? "border-primary/60 bg-primary/5"
                      : "border-border/60 bg-secondary/30 hover:border-border"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{opt.grade}</span>
                        {opt.recommended && (
                          <Badge className="bg-success/15 text-success hover:bg-success/15">
                            <Sparkles className="mr-1 h-3 w-3" /> Recommended
                          </Badge>
                        )}
                      </div>
                      <div className="mt-0.5 text-xs text-muted-foreground">{opt.source}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-lg font-semibold tabular-nums">${opt.cost}</div>
                      <div className="text-xs text-muted-foreground">per bbl</div>
                    </div>
                  </div>
                  <div className="mt-3 grid grid-cols-4 gap-2 text-center">
                    <Stat label="Delivery" value={opt.delivery} />
                    <Stat label="Compat" value={`${opt.compatibility}%`} />
                    <Stat label="Freight" value={`$${opt.freight}`} />
                    <Stat label="Confidence" value={`${opt.confidence}%`} />
                  </div>
                  <div className="mt-3">
                    <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
                      <span>Chemical compatibility</span>
                      <span>{opt.compatibility}%</span>
                    </div>
                    <Progress value={opt.compatibility} className="h-1.5" />
                  </div>
                </button>
              )
            })}
          </div>
        </Card>

        {/* Recommendations */}
        <div className="space-y-4 lg:col-span-2">
          <Card className="border-success/30 bg-success/5 p-5">
            <div className="flex items-center gap-2">
              <TrendingDown className="h-4 w-4 text-success" />
              <h3 className="text-sm font-medium">Projected Optimization Impact</h3>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <div className="font-mono text-2xl font-semibold text-success tabular-nums">$4.3M</div>
                <div className="text-xs text-muted-foreground">Cost avoided / cycle</div>
              </div>
              <div>
                <div className="font-mono text-2xl font-semibold text-success tabular-nums">-38%</div>
                <div className="text-xs text-muted-foreground">Supply risk exposure</div>
              </div>
            </div>
          </Card>

          {recommendations.map((rec, i) => (
            <Card key={rec.id} className="border-border/60 bg-card/60 p-4 backdrop-blur">
              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/15 text-xs font-medium text-primary">
                  {i + 1}
                </span>
                <h4 className="text-sm font-medium leading-tight">{rec.title}</h4>
              </div>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{rec.rationale}</p>
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
                <span className="text-success">{rec.savings}</span>
                <span className="text-muted-foreground">Risk -{rec.riskReduction}%</span>
                <span className="text-muted-foreground">{rec.transit}</span>
                <span className="ml-auto font-mono text-primary">{rec.confidence}% conf.</span>
              </div>
              <Button size="sm" variant="secondary" className="mt-3 w-full">
                <Check className="mr-1.5 h-3.5 w-3.5" /> Approve action
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
