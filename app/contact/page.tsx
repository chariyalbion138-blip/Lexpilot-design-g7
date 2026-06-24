import type { Metadata } from 'next'
import { Mail, MapPin, Phone } from 'lucide-react'

import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { ContactForm } from '@/components/contact/contact-form'
import { Reveal } from '@/components/motion-primitives'

export const metadata: Metadata = {
  title: '预约演示 · 联系我们 · 准典 LexPilot',
  description:
    '预约准典 LexPilot 产品演示，或联系我们的销售团队，了解智能法律助手如何为您的团队提效。',
}

const contacts = [
  { icon: Mail, label: '邮箱', value: 'hello@lexpilot.com' },
  { icon: Phone, label: '电话', value: '400-888-0000' },
  { icon: MapPin, label: '地址', value: '上海市浦东新区世纪大道 100 号' },
]

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />

      <main id="top" className="flex-1">
        <section className="px-6 pt-36 pb-24">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:gap-16">
            {/* 左：说明 */}
            <Reveal>
              <span className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-xs font-medium tracking-wider text-muted-foreground">
                预约演示 · 联系销售
              </span>
              <h1 className="mt-6 font-serif text-4xl font-semibold tracking-tight text-foreground text-balance sm:text-5xl">
                与我们的顾问聊聊
              </h1>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-muted-foreground text-pretty">
                无论你是独立执业律师，还是律所与法务团队，我们都会结合你的业务场景，安排一次有针对性的产品演示，并提供试用账户。
              </p>

              <ul className="mt-10 flex flex-col gap-5">
                {contacts.map((c) => (
                  <li key={c.label} className="flex items-center gap-4">
                    <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                      <c.icon className="size-4" />
                    </span>
                    <div>
                      <p className="text-xs text-muted-foreground">{c.label}</p>
                      <p className="text-sm font-medium text-foreground">{c.value}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* 右：表单 */}
            <Reveal delay={0.1}>
              <ContactForm />
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
