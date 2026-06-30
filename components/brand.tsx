import { cn } from '@/lib/utils'

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn('h-7 w-7', className)}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M16 2 L29 9 V23 L16 30 L3 23 V9 Z"
        className="stroke-primary"
        strokeWidth="1.5"
        fill="color-mix(in oklch, var(--primary) 16%, transparent)"
      />
      <path
        d="M10 21c2.5-1 4-3 4.5-6 .4 2 1.6 3.4 3.5 4 .8.3 2 .4 3 .2-1 1.8-3 3-5.4 3-2.4 0-4.2-.6-5.6-1.2Z"
        className="fill-primary"
      />
      <circle cx="20.5" cy="13" r="1" className="fill-background" />
    </svg>
  )
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-2 transition-opacity duration-200 hover:opacity-80', className)}>
      <Logo />
      <span className="text-lg font-semibold tracking-tight">
        Black<span className="text-primary">Swan</span>
      </span>
    </div>
  )
}
