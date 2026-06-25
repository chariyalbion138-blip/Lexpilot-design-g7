'use client'

import { useState } from 'react'
import { Check, ChevronDown, ArrowRight, Zap } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Reveal } from '@/components/motion-primitives'

type BillingTab = 'monthly' | 'yearly' | 'addon'

type Tier = {
  name: string
  tagline: string
  /** null 表示免费 / 联系 */
  monthly: number | null
  yearly: number | null
  priceLabel?: string
  quotaTitle: string
  quota: string[]
  extras: string[]
  highlight?: boolean
  cta: string
  ctaHref: string
}

const tiers: Tier[] = [
  {
    name: '体验版',
    tagline: '零门槛体验核心能力',
    monthly: 0,
    yearly: 0,
    priceLabel: '——',
    quotaTitle: '核心配额',
    quota: ['法研 Agent：5 次', '合同生成：5 次', '合同修订：5 次'],
    extras: ['基础条款风险提示', '标准法律研究库'],
    cta: '开始体验',
    ctaHref: '/login',
  },
  {
    name: '基础版',
    tagline: '独立律师与小型团队起步',
    monthly: 199,
    yearly: 159,
    quotaTitle: '核心配额（每月）',
    quota: ['法研 Agent：200 次', '合同生成：200 次', '合同修订：200 次'],
    extras: ['增强条款风险提示', '邮件工单支持'],
    cta: '立即订阅',
    ctaHref: '/login',
  },
  {
    name: '专业版',
    tagline: '成长型律所的协作主力',
    monthly: 299,
    yearly: 239,
    quotaTitle: '核心配额（每月）',
    quota: ['法研 Agent：1000 次', '合同生成：1000 次', '合同修订：1000 次'],
    extras: ['类案推荐与裁判倾向', '团队模板库沉淀', '优先客户经理支持'],
    highlight: true,
    cta: '立即订阅',
    ctaHref: '/login',
  },
  {
    name: '旗舰版',
    tagline: '大型律所与企业法务中心',
    monthly: 1000,
    yearly: 800,
    quotaTitle: '核心配额（每月）',
    quota: ['法研 Agent：10000 次', '合同生成：不限量', '合同修订：不限量'],
    extras: ['私有化 / 专属部署', '专属 SLA 与安全审计', '7×24 企业级支持'],
    cta: '联系顾问',
    ctaHref: '/contact',
  },
]

type AddonPack = {
  name: string
  desc: string
  price: number
  unit: string
  amount: string
}

const addons: AddonPack[] = [
  {
    name: '法研 Agent 加油包',
    desc: '为高强度检索与研究临时扩容',
    price: 99,
    unit: '元 / 包',
    amount: '+ 100 次法研 Agent',
  },
  {
    name: '合同生成加油包',
    desc: '应对集中起草高峰',
    price: 129,
    unit: '元 / 包',
    amount: '+ 150 份合同生成',
  },
  {
    name: '合同修订加油包',
    desc: '批量审阅与比对场景',
    price: 129,
    unit: '元 / 包',
    amount: '+ 150 份合同修订',
  },
]

const tabs: { id: BillingTab; label: string; note?: string }[] = [
  { id: 'monthly', label: '按月订阅' },
  { id: 'yearly', label: '按年订阅', note: '更划算' },
  { id: 'addon', label: '加油包' },
]

export function PricingTiers() {
  const [tab, setTab] = useState<BillingTab>('monthly')
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})

  const isYearly = tab === 'yearly'

  return (
    <section className="mx-auto max-w-6xl px-6">
      {/* 选项卡 */}
      <Reveal className="flex justify-center">
        <div className="inline-flex items-center gap-1 rounded-full border border-border bg-card p-1 text-sm shadow-sm">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={cn(
                'flex items-center gap-1.5 rounded-full px-4 py-2 font-medium transition-colors',
                tab === t.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {t.label}
              {t.note && (
                <span
                  className={cn(
                    'rounded-full px-1.5 py-0.5 text-[11px] font-semibold',
                    tab === t.id
                      ? 'bg-gold text-gold-foreground'
                      : 'bg-gold/15 text-gold',
                  )}
                >
                  {t.note}
                </span>
              )}
            </button>
          ))}
        </div>
      </Reveal>

      {tab === 'addon' ? (
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {addons.map((pack, i) => (
            <Reveal key={pack.name} delay={i * 0.08}>
              <div className="flex h-full flex-col rounded-xl border border-border bg-card p-7 shadow-sm">
                <span className="flex size-10 items-center justify-center rounded-xl bg-gold/15 text-gold">
                  <Zap className="size-5" />
                </span>
                <h3 className="mt-5 font-serif text-xl font-semibold text-foreground">
                  {pack.name}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {pack.desc}
                </p>
                <p className="mt-5 text-sm font-medium text-foreground">{pack.amount}</p>
                <div className="mt-4 flex items-baseline gap-1.5">
                  <span className="font-serif text-3xl font-semibold tracking-tight text-foreground">
                    ¥{pack.price}
                  </span>
                  <span className="text-sm text-muted-foreground">{pack.unit}</span>
                </div>
                <Button
                  className="mt-6 h-11 w-full text-sm"
                  variant="outline"
                  nativeButton={false}
                  render={<a href="/login" />}
                >
                  购买加油包
                  <ArrowRight className="size-4" />
                </Button>
                <p className="mt-3 text-center text-xs text-muted-foreground">
                  一次性购买，叠加于当前套餐配额
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {tiers.map((tier, i) => {
            const price = isYearly ? tier.yearly : tier.monthly
            const isFree = price === 0
            const open = expanded[tier.name]
            return (
              <Reveal key={tier.name} delay={i * 0.06}>
                <div
                  className={cn(
                    'relative flex h-full flex-col rounded-xl border p-6',
                    tier.highlight
                      ? 'border-gold/60 bg-card shadow-lg ring-1 ring-gold/30'
                      : 'border-border bg-card shadow-sm',
                  )}
                >
                  {tier.highlight && (
                    <span className="absolute -top-3 left-6 rounded-full bg-gold px-3 py-1 text-xs font-semibold text-gold-foreground shadow-sm">
                      最受律所欢迎
                    </span>
                  )}

                  <h3 className="font-serif text-xl font-semibold text-foreground">
                    {tier.name}
                  </h3>
                  <p className="mt-1.5 min-h-10 text-sm leading-relaxed text-muted-foreground">
                    {tier.tagline}
                  </p>

                  {/* 价格 */}
                  <div className="mt-5 flex items-baseline gap-1">
                    {isFree ? (
                      <span className="font-serif text-4xl font-semibold tracking-tight text-foreground">
                        {tier.priceLabel ?? '免费'}
                      </span>
                    ) : (
                      <>
                        <span className="font-serif text-4xl font-semibold tracking-tight text-foreground">
                          ¥{price}
                        </span>
                        <span className="text-sm text-muted-foreground">/ 月</span>
                      </>
                    )}
                  </div>
                  <p className="mt-1 min-h-4 text-xs text-muted-foreground">
                    {!isFree && isYearly ? '按年付费，折合每月' : '\u00A0'}
                  </p>

                  <Button
                    className="mt-5 h-11 w-full text-sm"
                    variant={tier.highlight ? 'default' : 'outline'}
                    nativeButton={false}
                    render={<a href={tier.ctaHref} />}
                  >
                    {tier.cta}
                    <ArrowRight className="size-4" />
                  </Button>

                  {/* 配额 */}
                  <p className="mt-7 text-sm font-semibold text-foreground">
                    {tier.quotaTitle}
                  </p>
                  <ul className="mt-4 space-y-3 border-t border-border/70 pt-4">
                    {tier.quota.map((q) => (
                      <li key={q} className="flex items-start gap-2.5 text-sm">
                        <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
                          <Check className="size-3" />
                        </span>
                        <span className="leading-relaxed text-muted-foreground">{q}</span>
                      </li>
                    ))}

                    {open &&
                      tier.extras.map((e) => (
                        <li key={e} className="flex items-start gap-2.5 text-sm">
                          <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
                            <Check className="size-3" />
                          </span>
                          <span className="leading-relaxed text-muted-foreground">{e}</span>
                        </li>
                      ))}
                  </ul>

                  <button
                    type="button"
                    onClick={() =>
                      setExpanded((s) => ({ ...s, [tier.name]: !s[tier.name] }))
                    }
                    className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {open ? '收起权益' : `查看全部权益（+${tier.extras.length} 项）`}
                    <ChevronDown
                      className={cn(
                        'size-3.5 transition-transform',
                        open && 'rotate-180',
                      )}
                    />
                  </button>
                </div>
              </Reveal>
            )
          })}
        </div>
      )}

      <p className="mt-10 text-center text-xs leading-relaxed text-muted-foreground">
        所有价格均为含税价格，支持对公转账与发票。年付套餐期间不可降级为月付套餐。
      </p>
    </section>
  )
}
