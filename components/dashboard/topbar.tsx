'use client'

import { Bell, Menu, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { newsFeed } from '@/lib/data'
import { cn } from '@/lib/utils'

export function Topbar({ onMenu }: { onMenu: () => void }) {
  const alerts = newsFeed.filter((n) => n.severity === 'critical' || n.severity === 'high')
  return (
    <header className="glass-strong sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border px-4 sm:px-6">
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={onMenu}
        aria-label="Open navigation"
      >
        <Menu className="size-5" />
      </Button>

      <div className="relative max-w-[200px] sm:max-w-md flex-1">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search refineries, vessels, grades…"
          className="h-9 border-border bg-secondary/50 pl-9"
        />
      </div>

      <div className="ml-auto flex items-center gap-2 sm:gap-3">
        {/* alert level */}
        <div className="hidden items-center gap-2 rounded-lg border border-danger/30 bg-danger/10 px-3 py-1.5 md:flex">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping-slow rounded-full bg-danger" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-danger" />
          </span>
          <span className="text-xs font-medium text-danger">Alert Level: ELEVATED</span>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
                <Bell className="size-5" />
                <span className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-danger px-1 text-xs font-semibold text-white">
                  {alerts.length}
                </span>
              </Button>
            }
          />
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuGroup>
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            {alerts.map((a) => (
              <DropdownMenuItem key={a.id} className="flex-col items-start gap-1 py-2.5">
                <div className="flex w-full items-center justify-between">
                  <span
                    className={cn(
                      'text-xs font-medium',
                      a.severity === 'critical' ? 'text-danger' : 'text-amber',
                    )}
                  >
                    {a.region}
                  </span>
                  <span className="text-xs text-muted-foreground">{a.time}</span>
                </div>
                <span className="text-sm leading-snug text-foreground">{a.headline}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <button
                type="button"
                className="flex items-center gap-2 rounded-lg px-1.5 py-1 transition-colors hover:bg-accent"
              >
                <Avatar className="size-8">
                  <AvatarFallback className="bg-primary/15 text-xs text-primary">AK</AvatarFallback>
                </Avatar>
                <div className="hidden text-left sm:block">
                  <div className="text-sm font-medium leading-none">A. Kapoor</div>
                  <div className="mt-0.5 text-xs text-muted-foreground">Supply Strategist</div>
                </div>
              </button>
            }
          />
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuGroup>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Preferences</DropdownMenuItem>
            <DropdownMenuItem>API keys</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
