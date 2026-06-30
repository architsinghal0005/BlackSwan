'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import {
  Activity,
  ArrowRight,
  Boxes,
  Brain,
  Database,
  FlaskConical,
  Gauge,
  Globe2,
  LineChart,
  Network,
  Route,
  Ship,
  ShieldAlert,
  Sparkles,
  Workflow,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Wordmark } from '@/components/brand'
import { LandingNav } from '@/components/landing/landing-nav'
import { cn } from '@/lib/utils'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
}

function Section({
  id,
  className,
  children,
}: {
  id?: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className={cn('mx-auto max-w-7xl px-4 sm:px-6', className)}>
      {children}
    </section>
  )
}

const features = [
  {
    icon: ShieldAlert,
    title: 'Geopolitical Risk Engine',
    desc: 'Probabilistic disruption scoring across chokepoints, sanctions regimes and conflict zones updated in real time.',
    tone: 'text-danger',
  },
  {
    icon: FlaskConical,
    title: 'Crude Chemistry Matching',
    desc: 'Assay-level compatibility between refinery configurations and 200+ global crude grades.',
    tone: 'text-primary',
  },
  {
    icon: Workflow,
    title: 'MILP Optimization',
    desc: 'Cost-constrained mixed-integer solver recommends the optimal procurement and routing plan.',
    tone: 'text-cyan',
  },
  {
    icon: Ship,
    title: 'Live Tanker Tracking',
    desc: 'AIS-driven vessel positions, ETAs and rerouting intelligence across active shipping lanes.',
    tone: 'text-cyan',
  },
  {
    icon: Database,
    title: 'Strategic Reserve Planning',
    desc: 'Buffer drawdown modeling that bridges supply gaps and computes realistic recovery timelines.',
    tone: 'text-amber',
  },
  {
    icon: Brain,
    title: 'AI Recommendations',
    desc: 'Explainable, confidence-scored actions your procurement desk can execute with conviction.',
    tone: 'text-primary',
  },
]

const flow = [
  { icon: Globe2, label: 'Geopolitical Signals', tone: 'text-cyan' },
  { icon: ShieldAlert, label: 'Risk Engine', tone: 'text-amber' },
  { icon: FlaskConical, label: 'Chemical Compatibility', tone: 'text-primary' },
  { icon: Workflow, label: 'MILP Optimization', tone: 'text-primary' },
  { icon: Route, label: 'Recommended Procurement', tone: 'text-success' },
  { icon: Database, label: 'Strategic Reserve', tone: 'text-cyan' },
]

const tech = [
  'Next.js', 'TypeScript', 'React', 'Tailwind CSS', 'Recharts',
  'MILP Solver', 'AIS Stream', 'Crude Assay DB', 'LLM Reasoning', 'Edge Runtime',
]

const stats = [
  { value: '$14.2M', label: 'Avoided cost / quarter' },
  { value: '1,284', label: 'Routes monitored' },
  { value: '64%', label: 'Hormuz risk detected early' },
  { value: '< 90s', label: 'Time to recommendation' },
]

export function LandingPage() {
  return (
    <div className="relative min-h-dvh overflow-hidden bg-background">
      <LandingNav />

      {/* Hero */}
      <Section className="relative pt-32 pb-20 sm:pt-40">
        {/* Background Globe Video */}
        <div
          className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden"
          style={{
            maskImage: 'radial-gradient(circle at center, black 40%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 80%)',
          }}
          aria-hidden="true"
        >
          <video 
            src="/globe-video.mp4" 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="h-full w-full object-cover max-w-none opacity-80"
          />
        </div>
        <div className="pointer-events-none absolute inset-0 -z-10 grid-bg opacity-40" aria-hidden="true" />
        <div
          className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[480px] w-[820px] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
          style={{ background: 'radial-gradient(circle, var(--primary), transparent 70%)' }}
          aria-hidden="true"
        />

        <motion.div
          initial="hidden"
          animate="show"
          transition={{ staggerChildren: 0.12 }}
          className="relative z-10 mx-auto max-w-3xl text-center pointer-events-none"
        >
          <div className="pointer-events-auto flex flex-col items-center justify-center">
          <motion.div variants={fadeUp} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted-foreground">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping-slow rounded-full bg-danger" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-danger" />
              </span>
              Live alert · Strait of Hormuz risk elevated
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="mt-6 text-balance text-4xl font-semibold tracking-tight sm:text-6xl"
          >
            Predict. Optimize.{' '}
            <span className="text-primary">Secure energy supply.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground"
          >
            BlackSwan is the AI-powered decision support platform that keeps refineries
            running through geopolitical disruption — recommending alternative crude
            procurement strategies before supply shocks hit.
          </motion.p>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="mt-9 flex flex-wrap items-center justify-center gap-3"
          >
            <Button
              size="lg"
              nativeButton={false}
              render={
                <Link href="/dashboard">
                  Launch Terminal <ArrowRight className="ml-1 size-4" />
                </Link>
              }
            />
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              render={<a href="#architecture">View Architecture</a>}
            />
          </motion.div>
        </div>
      </motion.div>

        {/* floating preview strip */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="relative z-10 mx-auto mt-16 grid max-w-5xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-4"
        >
          {stats.map((s) => (
            <div key={s.label} className="bg-card/80 p-5 text-center backdrop-blur">
              <div className="tabular text-2xl font-semibold tracking-tight text-foreground">
                {s.value}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </Section>

      {/* Features */}
      <Section id="features" className="py-20">
        <Header
          eyebrow="Platform"
          title="A decision layer for crude procurement"
          subtitle="Six engines working in concert to turn geopolitical chaos into a single, executable recommendation."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group rounded-xl border border-border bg-card/50 p-6 backdrop-blur transition-colors hover:border-primary/40"
            >
              <div className="flex size-11 items-center justify-center rounded-lg border border-border bg-secondary/60">
                <f.icon className={cn('size-5', f.tone)} />
              </div>
              <h3 className="mt-5 font-medium">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Architecture */}
      <Section id="architecture" className="py-20">
        <Header
          eyebrow="Architecture"
          title="From signal to executed strategy"
          subtitle="Every recommendation flows through a transparent, auditable pipeline."
        />
        <div className="mt-12 rounded-2xl border border-border bg-card/40 p-6 backdrop-blur sm:p-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch">
            {flow.map((step, i) => (
              <div key={step.label} className="flex flex-col flex-1 items-center gap-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.08 }}
                  className="flex w-full flex-1 flex-col items-center gap-3 rounded-xl border border-border bg-secondary/40 p-5 text-center"
                >
                  <div className="flex size-12 items-center justify-center rounded-full border border-border bg-card">
                    <step.icon className={cn('size-5', step.tone)} />
                  </div>
                  <span className="text-sm font-medium leading-tight">{step.label}</span>
                </motion.div>
                {i < flow.length - 1 && (
                  <ArrowRight className="size-5 shrink-0 rotate-90 text-muted-foreground lg:rotate-0" />
                )}
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Technology */}
      <Section id="technology" className="py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Header
              align="left"
              eyebrow="Technology"
              title="Built like a trading terminal, reasoned like an analyst"
              subtitle="A real-time data spine fused with optimization and large-language reasoning, delivered on a modern edge stack."
            />
            <div className="mt-8 flex flex-wrap gap-2">
              {tech.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-border bg-secondary/50 px-3 py-1.5 text-xs text-muted-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Network, label: 'Real-time ingestion', value: 'AIS · News · Sanctions' },
              { icon: Gauge, label: 'Optimization latency', value: '< 90 seconds' },
              { icon: LineChart, label: 'Forecast horizon', value: '90-day outlook' },
              { icon: Boxes, label: 'Crude assays', value: '200+ grades' },
            ].map((c) => (
              <div key={c.label} className="rounded-xl border border-border bg-card/50 p-5 backdrop-blur">
                <c.icon className="size-5 text-primary" />
                <div className="mt-4 text-sm text-muted-foreground">{c.label}</div>
                <div className="mt-1 font-medium">{c.value}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Case study */}
      <Section id="case-study" className="py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl border border-border bg-card/50 p-8 backdrop-blur sm:p-12"
        >
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full opacity-20 blur-3xl"
            style={{ background: 'radial-gradient(circle, var(--cyan), transparent 70%)' }}
            aria-hidden="true"
          />
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs text-muted-foreground">
            <Sparkles className="size-3.5 text-amber" /> Case Study
          </span>
          <h3 className="mt-5 max-w-2xl text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
            Gujarat refinery network avoids a 9-day supply gap during a Hormuz scare
          </h3>
          <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
            When chokepoint disruption probability crossed 60%, BlackSwan recommended
            switching Jamnagar to West African Bonny Light and a measured strategic
            reserve drawdown — preserving 94% utilization and saving an estimated
            $2.4M per cargo with 96% chemical compatibility.
          </p>
          <div className="mt-8 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3">
            {[
              { icon: Activity, value: '94%', label: 'Utilization maintained' },
              { icon: Route, value: '$2.4M', label: 'Saved per cargo' },
              { icon: FlaskConical, value: '96%', label: 'Chemical compatibility' },
            ].map((c) => (
              <div key={c.label} className="flex items-center gap-3 bg-card p-5">
                <c.icon className="size-5 text-primary" />
                <div>
                  <div className="tabular text-xl font-semibold">{c.value}</div>
                  <div className="text-xs text-muted-foreground">{c.label}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Button
              nativeButton={false}
              render={
                <Link href="/dashboard">
                  Explore the live terminal <ArrowRight className="ml-1 size-4" />
                </Link>
              }
            />
          </div>
        </motion.div>
      </Section>

      {/* Footer */}
      <footer className="border-t border-border">
        <Section className="py-12">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row">
            <div className="max-w-xs">
              <Wordmark />
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Geopolitical refinery arbitrage engine. Predict. Optimize. Secure energy supply.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
              {[
                { h: 'Platform', items: ['Overview', 'Risk Engine', 'Optimizer', 'Reserve'] },
                { h: 'Company', items: ['About', 'Careers', 'Security', 'Contact'] },
                { h: 'Resources', items: ['Docs', 'API', 'Status', 'Changelog'] },
              ].map((col) => (
                <div key={col.h}>
                  <div className="text-sm font-medium">{col.h}</div>
                  <ul className="mt-3 space-y-2">
                    {col.items.map((it) => (
                      <li key={it}>
                        <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                          {it}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
            <span>© 2026 BlackSwan Intelligence. All rights reserved.</span>
            <span>Built for decision velocity under uncertainty.</span>
          </div>
        </Section>
      </footer>
    </div>
  )
}

function Header({
  eyebrow,
  title,
  subtitle,
  align = 'center',
}: {
  eyebrow: string
  title: string
  subtitle: string
  align?: 'center' | 'left'
}) {
  return (
    <div className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center')}>
      <span className="text-xs font-medium uppercase tracking-widest text-primary">
        {eyebrow}
      </span>
      <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">{subtitle}</p>
    </div>
  )
}
