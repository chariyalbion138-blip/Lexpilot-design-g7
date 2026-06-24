'use client'

import { Quote } from 'lucide-react'

import { Card } from '@/components/ui/card'
import { Reveal, Stagger, StaggerItem } from '@/components/motion-primitives'

const testimonials = [
  {
    quote:
      '合同审查环节的风险标注精准且有据可依，初审效率显著提升，让团队把精力集中在真正需要判断的争点上。',
    name: '陈律师',
    role: '某综合性律所 · 高级合伙人',
  },
  {
    quote:
      '法律研究的检索与归纳省去了大量重复劳动，且每条结论都附原文出处，核验起来非常安心。',
    name: '林法务总监',
    role: '上市公司 · 法务负责人',
  },
  {
    quote:
      '诉讼助手在争议焦点梳理和证据组织上提供了清晰框架，作为应诉准备的起点十分得力。',
    name: '吴律师',
    role: '争议解决团队 · 资深律师',
  },
]

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="border-b border-border/60 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="max-w-2xl">
            <span className="text-xs font-medium tracking-[0.2em] text-accent">
              客户口碑
            </span>
            <h2 className="mt-4 font-serif text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl">
              专业人士的真实评价
            </h2>
          </div>
        </Reveal>

        <Stagger className="mt-14 grid gap-5 md:grid-cols-3">
          {testimonials.map((t) => (
            <StaggerItem key={t.name} className="h-full">
              <Card className="flex h-full flex-col gap-0 rounded-2xl border-border bg-card p-7">
                <Quote className="size-7 text-accent/70" />
                <p className="mt-5 flex-1 text-sm leading-relaxed text-foreground/90">
                  {t.quote}
                </p>
                <div className="mt-6 border-t border-border/70 pt-5">
                  <p className="font-serif text-base font-semibold text-foreground">
                    {t.name}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{t.role}</p>
                </div>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
