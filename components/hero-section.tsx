'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowRight, ShieldCheck } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Parallax } from '@/components/motion-primitives'

const easing = [0.22, 1, 0.36, 1] as const

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

function lineVariants(reduce: boolean | null) {
  return {
    hidden: { opacity: 0, y: reduce ? 0 : 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: easing },
    },
  }
}

const stats = [
  { value: '98%', label: '条款审查覆盖率' },
  { value: '4×', label: '文书产出效率' },
  { value: '10万+', label: '法律法规与判例' },
]

export function HeroSection() {
  const reduce = useReducedMotion()
  const v = lineVariants(reduce)

  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-border/60 pt-32 pb-20"
    >
      {/* 背景细网格，传递严谨克制的工程感 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.4] [background-image:linear-gradient(to_right,color-mix(in_oklch,var(--border)_60%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklch,var(--border)_60%,transparent)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div variants={container} initial="hidden" animate="visible">
          <motion.div variants={v}>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium text-muted-foreground">
              <ShieldCheck className="size-3.5 text-accent" />
              面向律所与法务团队的智能法律助手
            </span>
          </motion.div>

          <motion.h1
            variants={v}
            className="mt-6 font-serif text-4xl leading-[1.15] font-semibold tracking-tight text-balance text-foreground sm:text-5xl lg:text-6xl"
          >
            以严谨为尺，
            <br />
            让每一份法律工作
            <span className="relative whitespace-nowrap text-accent">
              {' '}更稳健
              <motion.span
                aria-hidden
                className="absolute inset-x-0 -bottom-1 h-px origin-left bg-accent/70"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.9, ease: easing, delay: 0.9 }}
              />
            </span>
          </motion.h1>

          <motion.p
            variants={v}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            准典 LexPilot 融合合同生成、合同修订、诉讼助手与法律研究四大能力，
            以可溯源的专业输出，辅助律师完成高强度、高精度的法律事务。
          </motion.p>

          <motion.div variants={v} className="mt-9 flex flex-wrap items-center gap-3">
            <Button
              size="lg"
              className="h-11 px-5 text-sm"
              nativeButton={false}
              render={<a href="#cta" />}
            >
              预约产品演示
              <ArrowRight className="size-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-11 px-5 text-sm"
              nativeButton={false}
              render={<a href="#capabilities" />}
            >
              了解能力矩阵
            </Button>
          </motion.div>

          <motion.dl
            variants={v}
            className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-border/70 pt-7"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="font-serif text-2xl font-semibold text-foreground sm:text-3xl">
                  {s.value}
                </dt>
                <dd className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {s.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        {/* 右侧主视觉：随滚动产生轻微视差位移 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: easing, delay: 0.25 }}
          className="relative"
        >
          <Parallax speed={-28}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border bg-card shadow-[0_30px_80px_-40px_rgba(20,30,60,0.45)]">
              <Image
                src="/hero-chamber.png"
                alt="高端律所内景，象征专业与可信赖的法律服务"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent" />
            </div>
          </Parallax>

          {/* 浮层信息卡，独立视差速率形成错层 */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easing, delay: 0.7 }}
            className="absolute -bottom-6 -left-6 hidden w-60 rounded-xl border border-border bg-card/95 p-4 shadow-lg backdrop-blur sm:block"
          >
            <p className="text-xs font-medium text-muted-foreground">实时条款风险提示</p>
            <p className="mt-2 text-sm leading-relaxed text-foreground">
              第 7.2 条违约责任约定不对等，建议补充守约方救济条款。
            </p>
            <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-accent">
              <span className="size-1.5 rounded-full bg-accent" />
              中风险 · 已定位
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
