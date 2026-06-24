'use client'

import { useState } from 'react'
import { Check, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Reveal } from '@/components/motion-primitives'

type Plan = {
  name: string
  tagline: string
  monthly: number | null
  yearly: number | null
  unit: string
  highlight?: boolean
  cta: string
  ctaHref: string
  features: string[]
}

const plans: Plan[] = [
  {
    name: '执业版',
    tagline: '适合独立律师与小型团队起步',
    monthly: 299,
    yearly: 239,
    unit: '元 / 人 / 月',
    cta: '开始使用',
    ctaHref: '/login',
    features: [
      '合同生成与修订（每月 80 份）',
      '法律研究检索（标准库）',
      '诉讼要点梳理助手',
      '基础条款风险提示',
      '邮件工单支持',
    ],
  },
  {
    name: '律所版',
    tagline: '为成长型律所打造的协作主力',
    monthly: 599,
    yearly: 479,
    unit: '元 / 人 / 月',
    highlight: true,
    cta: '预约演示',
    ctaHref: '/contact',
    features: [
      '合同能力不限量使用',
      '法律研究检索（增强库 + 类案）',
      '诉讼助手全流程（证据 / 时间线）',
      '团队知识库与模板沉淀',
      '权限分级与协作审阅',
      '优先客户经理支持',
    ],
  },
  {
    name: '企业版',
    tagline: '面向大型律所与企业法务中心',
    monthly: null,
    yearly: null,
    unit: '按需定制',
    cta: '联系顾问',
    ctaHref: '/contact',
    features: [
      '私有化 / 专属部署',
      '与内部系统及数据集成',
      '定制模型与合规策略',
      '专属 SLA 与安全审计',
      '一对一实施与培训',
      '7×24 企业级支持',
    ],
  },
]

export function PricingPlans() {
  const [yearly, setYearly] = useState(true)

  return (
    <section className="mx-auto max-w-6xl px-6">
      <Reveal className="flex flex-col items-center">
        <div className="inline-flex items-center gap-1 rounded-full border border-border bg-card p-1 text-sm shadow-sm">
          <button
            type="button"
            onClick={() => setYearly(false)}
            className={cn(
              'rounded-full px-4 py-1.5 font-medium transition-colors',
              !yearly ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground',
            )}
          >
            按月
          </button>
          <button
            type="button"
            onClick={() => setYearly(true)}
            className={cn(
              'flex items-center gap-1.5 rounded-full px-4 py-1.5 font-medium transition-colors',
              yearly ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground',
            )}
          >
            按年
            <span
              className={cn(
                'rounded-full px-1.5 py-0.5 text-[11px] font-semibold',
                yearly ? 'bg-gold text-gold-foreground' : 'bg-secondary text-secondary-foreground',
              )}
            >
              省 20%
            </span>
          </button>
        </div>
      </Reveal>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {plans.map((plan, i) => {
          const price = yearly ? plan.yearly : plan.monthly
          return (
            <Reveal key={plan.name} delay={i * 0.08}>
              <div
                className={cn(
                  'relative flex h-full flex-col rounded-xl border p-7',
                  plan.highlight
                    ? 'border-gold/60 bg-card shadow-lg ring-1 ring-gold/30'
                    : 'border-border bg-card shadow-sm',
                )}
              >
                {plan.highlight && (
                  <span className="absolute -top-3 left-7 rounded-full bg-gold px-3 py-1 text-xs font-semibold text-gold-foreground shadow-sm">
                    最受律所欢迎
                  </span>
                )}
                <h3 className="font-serif text-xl font-semibold text-foreground">{plan.name}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{plan.tagline}</p>

                <div className="mt-6 flex items-baseline gap-1.5">
                  {price !== null ? (
                    <>
                      <span className="font-serif text-4xl font-semibold tracking-tight text-foreground">
                        ¥{price}
                      </span>
                      <span className="text-sm text-muted-foreground">{plan.unit}</span>
                    </>
                  ) : (
                    <span className="font-serif text-3xl font-semibold tracking-tight text-foreground">
                      {plan.unit}
                    </span>
                  )}
                </div>
                {price !== null && yearly && (
                  <p className="mt-1 text-xs text-muted-foreground">按年付费，折合每人每月</p>
                )}

                <Button
                  className="mt-6 h-11 w-full text-sm"
                  variant={plan.highlight ? 'default' : 'outline'}
                  nativeButton={false}
                  render={<a href={plan.ctaHref} />}
                >
                  {plan.cta}
                  <ArrowRight className="size-4" />
                </Button>

                <ul className="mt-7 space-y-3 border-t border-border/70 pt-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-foreground">
                      <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
                        <Check className="size-3" />
                      </span>
                      <span className="leading-relaxed text-muted-foreground">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
