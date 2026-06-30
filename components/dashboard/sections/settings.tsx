"use client"

import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { SectionHeader } from "@/components/dashboard/ui"
import { useState } from "react"

const toggles = [
  { id: "alerts", label: "Critical risk alerts", desc: "Push notifications when any region exceeds 80 risk index", on: true },
  { id: "auto", label: "Auto-approve low-risk actions", desc: "Execute optimizer recommendations under $0.5M exposure", on: false },
  { id: "ais", label: "Live AIS vessel tracking", desc: "Stream real-time positions for chartered fleet", on: true },
  { id: "sanctions", label: "Sanctions compliance guardrails", desc: "Block procurement options failing price-cap rules", on: true },
]

export function SettingsSection() {
  const [risk, setRisk] = useState([70])
  const [state, setState] = useState(() => Object.fromEntries(toggles.map((t) => [t.id, t.on])))

  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Configuration"
        title="Settings"
        description="Tune alerting thresholds, automation policy, and data feeds for the BlackSwan engine."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-border/60 bg-card/60 p-5 backdrop-blur">
          <h3 className="text-sm font-medium">Automation & Alerts</h3>
          <div className="mt-4 space-y-1">
            {toggles.map((t, i) => (
              <div key={t.id}>
                <div className="flex items-center justify-between gap-4 py-3">
                  <div>
                    <div className="text-sm font-medium">{t.label}</div>
                    <div className="text-xs text-muted-foreground">{t.desc}</div>
                  </div>
                  <Switch
                    checked={state[t.id]}
                    onCheckedChange={(v) => setState((s) => ({ ...s, [t.id]: v }))}
                    aria-label={t.label}
                  />
                </div>
                {i < toggles.length - 1 && <Separator className="bg-border/60" />}
              </div>
            ))}
          </div>
        </Card>

        <Card className="border-border/60 bg-card/60 p-5 backdrop-blur">
          <h3 className="text-sm font-medium">Risk Threshold</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Trigger automatic rerouting recommendations above this composite risk index.
          </p>
          <div className="mt-6 flex items-baseline gap-2">
            <span className="font-mono text-3xl font-semibold tabular-nums text-amber">{risk[0]}</span>
            <span className="text-xs text-muted-foreground">/ 100</span>
          </div>
          <Slider
            value={risk}
            onValueChange={(v) => setRisk(Array.isArray(v) ? v : [v])}
            max={100}
            step={1}
            className="mt-4"
          />
          <div className="mt-2 flex justify-between text-xs text-muted-foreground">
            <span>Conservative</span>
            <span>Aggressive</span>
          </div>

          <Separator className="my-6 bg-border/60" />

          <h3 className="text-sm font-medium">Data Feeds</h3>
          <div className="mt-3 space-y-2 text-xs">
            {[
              { name: "Reuters Geopolitical Wire", status: "Connected" },
              { name: "Lloyd's List AIS", status: "Connected" },
              { name: "Baltic Exchange Freight", status: "Connected" },
              { name: "OFAC Sanctions Registry", status: "Connected" },
            ].map((f) => (
              <div key={f.name} className="flex items-center justify-between rounded-md border border-border/60 bg-secondary/30 px-3 py-2">
                <span>{f.name}</span>
                <span className="flex items-center gap-1.5 text-success">
                  <span className="h-1.5 w-1.5 rounded-full bg-success" /> {f.status}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
