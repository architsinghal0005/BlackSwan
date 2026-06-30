'use client'

type Props = {
  data: number[]
  color?: string
  className?: string
  width?: number
  height?: number
}

export function Sparkline({
  data,
  color = 'var(--primary)',
  className,
  width = 120,
  height = 36,
}: Props) {
  if (!data.length) return null
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const step = width / (data.length - 1)
  const points = data.map((d, i) => {
    const x = i * step
    const y = height - ((d - min) / range) * (height - 4) - 2
    return [x, y] as const
  })
  const line = points.map(([x, y]) => `${x},${y}`).join(' ')
  const area = `0,${height} ${line} ${width},${height}`
  const id = `spark-${color.replace(/[^a-z0-9]/gi, '')}-${data.length}`

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.28" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={area} fill={`url(#${id})`} />
      <polyline
        points={line}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}
