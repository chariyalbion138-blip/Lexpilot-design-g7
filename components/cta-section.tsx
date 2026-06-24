'use client'

import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Reveal } from '@/components/motion-primitives'

export function CtaSection() {
  return (
    <section id="cta" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-primary px-8 py-16 text-center text-primary-foreground sm:px-16">
            {/* 细网格底纹 */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]"
            />
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -top-24 left-1/2 size-72 -translate-x-1/2 rounded-full bg-accent/20 blur-3xl"
              animate={{ opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />

            <div className="relative">
              <h2 className="mx-auto max-w-2xl font-serif text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                让专业与效率，在同一份工作中兼得
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-primary-foreground/75">
                预约一次产品演示，了解准典 LexPilot 如何融入你的合同与诉讼工作流。
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <Button
                  size="lg"
                  variant="secondary"
                  className="h-11 px-6 text-sm"
                  nativeButton={false}
                  render={<a href="#demo" />}
                >
                  预约产品演示
                  <ArrowRight className="size-4" />
                </Button>
                <Button
                  size="lg"
                  variant="ghost"
                  className="h-11 px-6 text-sm text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                  nativeButton={false}
                  render={<a href="#contact" />}
                >
                  联系顾问
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
