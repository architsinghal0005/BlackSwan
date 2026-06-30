// Realistic placeholder domain data for the BlackSwan platform.

export type Trend = { label: string; value: number }

export const supplyRiskTrend: Trend[] = [
  { label: '00:00', value: 58 },
  { label: '04:00', value: 61 },
  { label: '08:00', value: 64 },
  { label: '12:00', value: 72 },
  { label: '16:00', value: 69 },
  { label: '20:00', value: 74 },
  { label: 'Now', value: 78 },
]

export const procurementCostTrend = [
  { month: 'Jan', baseline: 82.4, optimized: 79.1 },
  { month: 'Feb', baseline: 84.0, optimized: 78.6 },
  { month: 'Mar', baseline: 88.2, optimized: 80.3 },
  { month: 'Apr', baseline: 91.7, optimized: 81.9 },
  { month: 'May', baseline: 95.1, optimized: 83.2 },
  { month: 'Jun', baseline: 98.6, optimized: 84.0 },
  { month: 'Jul', baseline: 101.2, optimized: 85.7 },
]

export const utilizationTrend = [
  { day: 'Mon', value: 88 },
  { day: 'Tue', value: 91 },
  { day: 'Wed', value: 86 },
  { day: 'Thu', value: 93 },
  { day: 'Fri', value: 90 },
  { day: 'Sat', value: 84 },
  { day: 'Sun', value: 89 },
]

export const tankerTrend = [
  { t: 'W1', value: 142 },
  { t: 'W2', value: 138 },
  { t: 'W3', value: 151 },
  { t: 'W4', value: 147 },
  { t: 'W5', value: 159 },
  { t: 'W6', value: 163 },
]

export type Kpi = {
  id: string
  label: string
  value: string
  unit?: string
  delta: number
  tone: 'primary' | 'cyan' | 'amber' | 'danger' | 'success'
  spark: number[]
}

export const kpis: Kpi[] = [
  {
    id: 'risk',
    label: 'Global Supply Risk Index',
    value: '78',
    unit: '/100',
    delta: 6.4,
    tone: 'danger',
    spark: [58, 61, 64, 72, 69, 74, 78],
  },
  {
    id: 'routes',
    label: 'Active Shipping Routes',
    value: '1,284',
    delta: 2.1,
    tone: 'cyan',
    spark: [1190, 1210, 1240, 1255, 1260, 1278, 1284],
  },
  {
    id: 'tankers',
    label: 'Tankers in Transit',
    value: '163',
    delta: 3.8,
    tone: 'primary',
    spark: [142, 138, 151, 147, 159, 161, 163],
  },
  {
    id: 'util',
    label: 'Refinery Utilization',
    value: '89.4',
    unit: '%',
    delta: -1.2,
    tone: 'amber',
    spark: [92, 91, 90, 93, 90, 88, 89],
  },
  {
    id: 'cost',
    label: 'Avg Procurement Cost',
    value: '$85.7',
    unit: '/bbl',
    delta: -4.6,
    tone: 'success',
    spark: [98, 96, 94, 91, 89, 87, 85.7],
  },
  {
    id: 'buffer',
    label: 'Emergency Buffer',
    value: '23',
    unit: 'days',
    delta: -2.0,
    tone: 'amber',
    spark: [31, 30, 28, 27, 26, 24, 23],
  },
]

export type Vessel = {
  id: string
  name: string
  type: string
  cargo: string
  origin: string
  destination: string
  eta: string
  speed: number
  status: 'On Schedule' | 'Delayed' | 'Rerouted' | 'At Risk'
  // position as percentage on the map container
  x: number
  y: number
}

export const vessels: Vessel[] = [
  {
    id: 'IMO-9342017',
    name: 'Pacific Sentinel',
    type: 'VLCC',
    cargo: 'Murban Crude · 2.0M bbl',
    origin: 'Ruwais, UAE',
    destination: 'Sikka, India',
    eta: '4d 6h',
    speed: 13.4,
    status: 'On Schedule',
    x: 63,
    y: 50,
  },
  {
    id: 'IMO-9711842',
    name: 'Atlantic Vanguard',
    type: 'Suezmax',
    cargo: 'Bonny Light · 1.0M bbl',
    origin: 'Bonny, Nigeria',
    destination: 'Sikka, India',
    eta: '11d 2h',
    speed: 12.1,
    status: 'Rerouted',
    x: 48,
    y: 58,
  },
  {
    id: 'IMO-9556120',
    name: 'Northern Aurora',
    type: 'Aframax',
    cargo: 'Urals · 0.7M bbl',
    origin: 'Novorossiysk, RU',
    destination: 'Vadinar, India',
    eta: '8d 14h',
    speed: 11.8,
    status: 'Delayed',
    x: 56,
    y: 41,
  },
  {
    id: 'IMO-9803344',
    name: 'Gulf Meridian',
    type: 'VLCC',
    cargo: 'Basrah Medium · 2.0M bbl',
    origin: 'Basrah, Iraq',
    destination: 'Jamnagar, India',
    eta: '5d 9h',
    speed: 12.9,
    status: 'At Risk',
    x: 60,
    y: 47,
  },
  {
    id: 'IMO-9120558',
    name: 'Pearl of Doha',
    type: 'LNG Carrier',
    cargo: 'Condensate · 0.9M bbl',
    origin: 'Ras Laffan, QA',
    destination: 'Kochi, India',
    eta: '6d 1h',
    speed: 14.2,
    status: 'On Schedule',
    x: 62,
    y: 53,
  },
]

export type Refinery = {
  id: string
  name: string
  location: string
  apiGravity: number
  sulfur: number
  throughput: number // kbd
  utilization: number
  status: 'Optimal' | 'Constrained' | 'Critical'
  grades: string[]
  x: number
  y: number
}

export const refineries: Refinery[] = [
  {
    id: 'RF-JAM',
    name: 'Jamnagar Complex',
    location: 'Gujarat, India',
    apiGravity: 32.1,
    sulfur: 1.8,
    throughput: 1240,
    utilization: 94,
    status: 'Optimal',
    grades: ['Murban', 'Basrah Medium', 'Bonny Light', 'WTI'],
    x: 64,
    y: 52,
  },
  {
    id: 'RF-SIK',
    name: 'Sikka Terminal Refinery',
    location: 'Gujarat, India',
    apiGravity: 29.4,
    sulfur: 2.4,
    throughput: 405,
    utilization: 81,
    status: 'Constrained',
    grades: ['Urals', 'Basrah Heavy', 'Murban'],
    x: 65,
    y: 51,
  },
  {
    id: 'RF-VAD',
    name: 'Vadinar Refinery',
    location: 'Gujarat, India',
    apiGravity: 31.0,
    sulfur: 2.1,
    throughput: 405,
    utilization: 88,
    status: 'Optimal',
    grades: ['Urals', 'Murban', 'CPC Blend'],
    x: 65,
    y: 52,
  },
  {
    id: 'RF-MAN',
    name: 'Mangalore Refinery',
    location: 'Karnataka, India',
    apiGravity: 33.5,
    sulfur: 1.4,
    throughput: 300,
    utilization: 72,
    status: 'Critical',
    grades: ['Murban', 'Bonny Light', 'Forcados'],
    x: 64,
    y: 56,
  },
  {
    id: 'RF-KOC',
    name: 'Kochi Refinery',
    location: 'Kerala, India',
    apiGravity: 30.2,
    sulfur: 1.9,
    throughput: 310,
    utilization: 86,
    status: 'Optimal',
    grades: ['Basrah Medium', 'Murban', 'Condensate'],
    x: 64,
    y: 58,
  },
  {
    id: 'RF-PAR',
    name: 'Paradip Refinery',
    location: 'Odisha, India',
    apiGravity: 28.8,
    sulfur: 2.6,
    throughput: 300,
    utilization: 79,
    status: 'Constrained',
    grades: ['Basrah Heavy', 'Urals', 'Arab Heavy'],
    x: 70,
    y: 53,
  },
]

export type ProcurementOption = {
  id: string
  source: string
  grade: string
  cost: number
  delivery: string
  compatibility: number
  freight: number
  portDelay: string
  confidence: number
  recommended: boolean
}

export const procurementOptions: ProcurementOption[] = [
  {
    id: 'opt-1',
    source: 'West Africa — Bonny, Nigeria',
    grade: 'Bonny Light',
    cost: 83.4,
    delivery: '11 days',
    compatibility: 96,
    freight: 4.2,
    portDelay: '+0.5d',
    confidence: 94,
    recommended: true,
  },
  {
    id: 'opt-2',
    source: 'US Gulf — Houston, USA',
    grade: 'WTI Midland',
    cost: 86.1,
    delivery: '21 days',
    compatibility: 91,
    freight: 6.8,
    portDelay: '+1.0d',
    confidence: 88,
    recommended: false,
  },
  {
    id: 'opt-3',
    source: 'Caspian — Novorossiysk, RU',
    grade: 'CPC Blend',
    cost: 79.9,
    delivery: '14 days',
    compatibility: 84,
    freight: 5.1,
    portDelay: '+2.5d',
    confidence: 71,
    recommended: false,
  },
  {
    id: 'opt-4',
    source: 'Latin America — Coveñas, CO',
    grade: 'Vasconia',
    cost: 81.2,
    delivery: '24 days',
    compatibility: 79,
    freight: 7.3,
    portDelay: '+1.5d',
    confidence: 76,
    recommended: false,
  },
]

export type NewsItem = {
  id: string
  time: string
  region: string
  severity: 'critical' | 'high' | 'medium' | 'low'
  headline: string
  probability: number
}

export const newsFeed: NewsItem[] = [
  {
    id: 'n1',
    time: '2m ago',
    region: 'Strait of Hormuz',
    severity: 'critical',
    headline: 'Naval activity escalates near key transit lane; insurers raise war-risk premiums',
    probability: 64,
  },
  {
    id: 'n2',
    time: '18m ago',
    region: 'Red Sea',
    severity: 'high',
    headline: 'Three carriers announce Cape of Good Hope rerouting for Asia-bound cargo',
    probability: 81,
  },
  {
    id: 'n3',
    time: '41m ago',
    region: 'West Africa',
    severity: 'low',
    headline: 'Nigerian terminal resumes loadings after maintenance window closes',
    probability: 22,
  },
  {
    id: 'n4',
    time: '1h ago',
    region: 'Black Sea',
    severity: 'medium',
    headline: 'New sanctions package under review could restrict Urals price-cap compliance',
    probability: 47,
  },
  {
    id: 'n5',
    time: '2h ago',
    region: 'South China Sea',
    severity: 'medium',
    headline: 'Typhoon system forming; port operations at risk of 36-72h closure',
    probability: 55,
  },
]

export type EventPoint = {
  time: string
  title: string
  detail: string
  severity: 'critical' | 'high' | 'medium' | 'low'
}

export const eventTimeline: EventPoint[] = [
  {
    time: 'T-0',
    title: 'Hormuz tensions spike',
    detail: 'Risk model raises chokepoint disruption probability to 64%.',
    severity: 'critical',
  },
  {
    time: 'T-2h',
    title: 'Freight rates jump 14%',
    detail: 'VLCC TD3C spot climbs on rerouting demand.',
    severity: 'high',
  },
  {
    time: 'T-6h',
    title: 'Insurance premiums revised',
    detail: 'War-risk surcharge added for Gulf transits.',
    severity: 'medium',
  },
  {
    time: 'T-1d',
    title: 'Two cargoes flagged at-risk',
    detail: 'Gulf Meridian and one chartered VLCC under review.',
    severity: 'high',
  },
]

export const chokepoints = [
  { id: 'cp1', name: 'Strait of Hormuz', flow: '21M bbl/d', risk: 'Critical', x: 60, y: 47 },
  { id: 'cp2', name: 'Bab el-Mandeb', flow: '6.2M bbl/d', risk: 'High', x: 57, y: 56 },
  { id: 'cp3', name: 'Strait of Malacca', flow: '16M bbl/d', risk: 'Medium', x: 76, y: 58 },
  { id: 'cp4', name: 'Suez Canal', flow: '9.2M bbl/d', risk: 'High', x: 55, y: 44 },
]

export const conflictZones = [
  { id: 'cz1', name: 'Persian Gulf', x: 60, y: 47, intensity: 0.9 },
  { id: 'cz2', name: 'Red Sea Corridor', x: 56, y: 53, intensity: 0.8 },
  { id: 'cz3', name: 'Black Sea', x: 55, y: 40, intensity: 0.6 },
]

export const ports = [
  { id: 'p1', name: 'Sikka', x: 65, y: 51 },
  { id: 'p2', name: 'Ras Laffan', x: 61, y: 49 },
  { id: 'p3', name: 'Bonny', x: 48, y: 60 },
  { id: 'p4', name: 'Houston', x: 22, y: 47 },
]

export type Recommendation = {
  id: string
  title: string
  rationale: string
  savings: string
  riskReduction: number
  transit: string
  compatibility: number
  confidence: number
}

export const recommendations: Recommendation[] = [
  {
    id: 'r1',
    title: 'Switch Jamnagar to West African Bonny Light',
    rationale:
      'Hormuz disruption probability at 64%. Bonny Light maintains 96% chemical compatibility at a lower delivered cost.',
    savings: '$2.4M / cargo',
    riskReduction: 38,
    transit: '11 days',
    compatibility: 96,
    confidence: 94,
  },
  {
    id: 'r2',
    title: 'Draw down Strategic Reserve by 1.2M bbl',
    rationale:
      'Bridge the 9-day procurement gap during rerouting. Recovery achievable within 26 days at current freight.',
    savings: '$1.1M exposure avoided',
    riskReduction: 24,
    transit: 'Immediate',
    compatibility: 100,
    confidence: 90,
  },
  {
    id: 'r3',
    title: 'Defer Mangalore Urals charter',
    rationale:
      'Black Sea sanctions risk rising. Substitute with US Gulf WTI Midland to de-risk compliance exposure.',
    savings: '$0.8M / cargo',
    riskReduction: 19,
    transit: '21 days',
    compatibility: 91,
    confidence: 83,
  },
]

export const riskHeatmap = [
  { region: 'Persian Gulf', supply: 92, freight: 78, political: 88 },
  { region: 'Red Sea', supply: 84, freight: 90, political: 81 },
  { region: 'West Africa', supply: 38, freight: 44, political: 35 },
  { region: 'US Gulf', supply: 22, freight: 30, political: 18 },
  { region: 'Black Sea', supply: 66, freight: 52, political: 74 },
  { region: 'SE Asia', supply: 49, freight: 58, political: 41 },
]

export const importDependency = [
  { name: 'Middle East', value: 58, fill: 'var(--color-chart-1)' },
  { name: 'West Africa', value: 16, fill: 'var(--color-chart-2)' },
  { name: 'Americas', value: 14, fill: 'var(--color-chart-3)' },
  { name: 'CIS / Russia', value: 12, fill: 'var(--color-chart-4)' },
]

export type ScenarioId =
  | 'hormuz'
  | 'sanctions'
  | 'port'
  | 'weather'
  | 'piracy'
  | 'delay'

export const scenarios: { id: ScenarioId; label: string; desc: string }[] = [
  { id: 'hormuz', label: 'Close Strait of Hormuz', desc: 'Full chokepoint closure' },
  { id: 'sanctions', label: 'New Sanctions', desc: 'Restrict CIS-origin grades' },
  { id: 'port', label: 'Port Shutdown', desc: 'Sikka terminal offline 72h' },
  { id: 'weather', label: 'Weather Disruption', desc: 'Cyclone in Arabian Sea' },
  { id: 'piracy', label: 'Pirate Activity', desc: 'Gulf of Aden threat level high' },
  { id: 'delay', label: 'Tanker Delay', desc: 'Fleet-wide +3 day slippage' },
]

export const workflowSteps = [
  { id: 'signals', label: 'Geopolitical Signals', desc: 'News, AIS, sanctions feeds', tone: 'cyan' },
  { id: 'risk', label: 'Risk Engine', desc: 'Probabilistic disruption scoring', tone: 'amber' },
  { id: 'chem', label: 'Chemical Compatibility', desc: 'Crude assay matching', tone: 'primary' },
  { id: 'milp', label: 'MILP Optimization', desc: 'Cost-constrained solver', tone: 'primary' },
  { id: 'proc', label: 'Recommended Procurement', desc: 'Ranked sourcing plan', tone: 'success' },
  { id: 'reserve', label: 'Strategic Reserve', desc: 'Buffer drawdown plan', tone: 'cyan' },
] as const

export const reports = [
  {
    id: 'rep1',
    title: 'Hormuz Disruption Response Plan',
    date: 'Jun 29, 2026',
    pages: 24,
    status: 'Ready',
    summary:
      'Comprehensive response strategy for a 64%-probability Strait of Hormuz disruption affecting 21M bbl/d of transit flow.',
  },
  {
    id: 'rep2',
    title: 'Q2 Procurement Optimization Review',
    date: 'Jun 24, 2026',
    pages: 38,
    status: 'Ready',
    summary:
      'Quarterly analysis of arbitrage-driven savings across the refinery network, totaling $14.2M in avoided cost.',
  },
  {
    id: 'rep3',
    title: 'Red Sea Rerouting Impact Assessment',
    date: 'Jun 18, 2026',
    pages: 17,
    status: 'Draft',
    summary:
      'Freight and schedule impact of Cape of Good Hope rerouting on Asia-bound West African cargoes.',
  },
]
