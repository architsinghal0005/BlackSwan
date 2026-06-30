"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/dashboard/ui"
import { reports } from "@/lib/data"
import { FileText, Download, Plus, Clock } from "lucide-react"

export function ReportsSection() {
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <SectionHeader
          eyebrow="Briefings"
          title="Reports"
          description="Generated decision briefs and scheduled assessments for executive and operational stakeholders."
        />
        <Button>
          <Plus className="mr-1.5 h-4 w-4" /> New report
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {reports.map((r) => (
          <Card key={r.id} className="flex flex-col border-border/60 bg-card/60 p-5 backdrop-blur">
            <div className="flex items-start justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/12">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <Badge
                className={
                  r.status === "Ready"
                    ? "bg-success/15 text-success hover:bg-success/15"
                    : "bg-amber/15 text-amber hover:bg-amber/15"
                }
              >
                {r.status}
              </Badge>
            </div>
            <h3 className="mt-4 text-sm font-medium leading-snug text-balance">{r.title}</h3>
            <p className="mt-2 flex-1 text-xs text-muted-foreground leading-relaxed">{r.summary}</p>
            <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" /> {r.date}
              </span>
              <span>{r.pages} pages</span>
            </div>
            <Button variant="secondary" size="sm" className="mt-3 w-full">
              <Download className="mr-1.5 h-3.5 w-3.5" /> Download PDF
            </Button>
          </Card>
        ))}
      </div>
    </div>
  )
}
