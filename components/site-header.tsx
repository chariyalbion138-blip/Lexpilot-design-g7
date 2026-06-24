'use client'

import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { Scale } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navItems = [
  { label: '能力矩阵', href: '#capabilities' },
  { label: '使用流程', href: '#process' },
  { label: '客户口碑', href: '#testimonials' },
  { label: '常见问题', href: '#faq' },
]

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={cn(
          'mx-auto flex h-16 max-w-6xl items-center justify-between px-6 transition-all duration-500',
          scrolled &&
            'mt-3 max-w-5xl rounded-full border border-border/70 bg-background/80 px-5 shadow-sm backdrop-blur-xl',
        )}
      >
        <a href="#top" className="flex items-center gap-2.5">
          <Image
            src="/app-icon.png"
            alt="准典 LexPilot 图标"
            width={32}
            height={32}
            className="size-8 rounded-md"
          />
          <span className="flex items-baseline gap-1.5">
            <span className="font-serif text-lg font-semibold tracking-tight text-foreground">
              准典
            </span>
            <span className="text-xs font-medium tracking-[0.2em] text-muted-foreground">
              LEXPILOT
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="hidden sm:inline-flex"
            nativeButton={false}
            render={<a href="#login" />}
          >
            登录
          </Button>
          <Button size="sm" nativeButton={false} render={<a href="#cta" />}>
            预约演示
          </Button>
        </div>
      </div>
    </motion.header>
  )
}
