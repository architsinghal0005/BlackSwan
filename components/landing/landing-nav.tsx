'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Wordmark } from '@/components/brand'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const links = [
  { label: 'Platform', href: '#features' },
  { label: 'Architecture', href: '#architecture' },
  { label: 'Technology', href: '#technology' },
  { label: 'Case Study', href: '#case-study' },
]

export function LandingNav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
        scrolled ? 'glass-strong border-b border-border' : 'border-b border-transparent',
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" aria-label="BlackSwan home">
          <Wordmark />
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            nativeButton={false}
            className="hidden sm:inline-flex"
            render={<Link href="/dashboard">Sign in</Link>}
          />
          <Button
            size="sm"
            nativeButton={false}
            render={<Link href="/dashboard">Launch Terminal</Link>}
          />
        </div>
      </div>
    </header>
  )
}
