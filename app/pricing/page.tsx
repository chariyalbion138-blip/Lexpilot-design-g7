import type { Metadata } from 'next'

import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { PricingTiers } from '@/components/pricing/pricing-tiers'
import { PricingComparison } from '@/components/pricing/pricing-comparison'
import { Reveal } from '@/components/motion-primitives'

export const metadata: Metadata = {
  title: '定价方案 · 准典 LexPilot',
  description:
    '准典 LexPilot 提供体验版、基础版、专业版与旗舰版，支持按月 / 按年订阅及加油包，按团队规模平滑升级。',
}

export default function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />

      <main id="top" className="flex-1">
        <section className="px-6 pt-36 pb-16">
          <Reveal className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-xs font-medium tracking-wider text-muted-foreground">
              定价方案
            </span>
            <h1 className="mt-6 font-serif text-4xl font-semibold tracking-tight text-balance text-foreground sm:text-5xl">
              按需选择，随业务平滑升级
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-pretty text-muted-foreground">
              从独立律师到大型律所与企业法务中心，准典 LexPilot
              提供清晰的配额与权益，让每一份投入都对应可衡量的产出。
            </p>
          </Reveal>
        </section>

        <PricingTiers />

        <section className="px-6 py-24">
          <PricingComparison />
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
