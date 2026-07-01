'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  ChevronsLeft,
  FileText,
  MessageSquareText,
  PenLine,
  Scale,
  Settings,
} from 'lucide-react'

import { cn } from '@/lib/utils'

const navItems = [
  { label: '法研 Agent', href: '/agent', icon: MessageSquareText },
  { label: '合同生成', href: '/generate', icon: FileText },
  { label: '合同修订', href: '/editor', icon: PenLine },
  { label: '诉讼助手', href: '/litigation', icon: Scale },
]

export function WorkspaceSidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={cn(
        'sticky top-0 flex h-svh shrink-0 flex-col border-r border-sidebar-border bg-sidebar transition-[width] duration-300',
        collapsed ? 'w-[76px]' : 'w-64',
      )}
    >
      <div className="flex h-16 items-center gap-2.5 px-4">
        <Image
          src="/app-icon.png"
          alt="准典 LexPilot 图标"
          width={32}
          height={32}
          className="size-8 shrink-0 rounded-md"
        />
        {!collapsed && (
          <span className="flex items-baseline gap-1.5 overflow-hidden">
            <span className="font-serif text-lg font-semibold tracking-tight text-sidebar-foreground">
              准典
            </span>
            <span className="text-[10px] font-medium tracking-[0.2em] text-muted-foreground">
              LEXPILOT
            </span>
          </span>
        )}
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-3 py-4">
        {navItems.map((item) => {
          const active = pathname === item.href
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              title={item.label}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                collapsed && 'justify-center px-0',
                active
                  ? 'bg-secondary text-sidebar-accent-foreground'
                  : 'text-muted-foreground hover:bg-secondary/60 hover:text-sidebar-foreground',
              )}
            >
              <Icon className="size-5 shrink-0" strokeWidth={1.75} />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      <div className="flex flex-col gap-1 border-t border-sidebar-border px-3 py-4">
        <Link
          href="/settings"
          title="用户设置"
          className={cn(
            'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
            collapsed && 'justify-center px-0',
            pathname === '/settings'
              ? 'bg-secondary text-sidebar-accent-foreground'
              : 'text-muted-foreground hover:bg-secondary/60 hover:text-sidebar-foreground',
          )}
        >
          <Settings className="size-5 shrink-0" strokeWidth={1.75} />
          {!collapsed && <span className="truncate">用户设置</span>}
        </Link>

        <div
          className={cn(
            'mt-1 flex items-center gap-3 rounded-lg px-3 py-2',
            collapsed && 'justify-center px-0',
          )}
        >
          <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
            Z
          </div>
          {!collapsed && (
            <div className="flex min-w-0 flex-col">
              <span className="truncate text-sm font-medium text-sidebar-foreground">
                ZD0614
              </span>
              <span className="truncate text-xs text-muted-foreground">专业版</span>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => setCollapsed((v) => !v)}
          className={cn(
            'mt-1 flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-sidebar-foreground',
            collapsed && 'justify-center px-0',
          )}
        >
          <ChevronsLeft
            className={cn('size-5 shrink-0 transition-transform', collapsed && 'rotate-180')}
            strokeWidth={1.75}
          />
          {!collapsed && <span>收起侧栏</span>}
        </button>
      </div>
    </aside>
  )
}
