'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Reveal } from '@/components/motion-primitives'

const faqs = [
  {
    q: '准典生成的法律文书可以直接使用吗？',
    a: '准典提供的是专业辅助输出，所有结论与文书均建议由执业律师审定后使用。产品定位为提升效率与质量，而非替代专业判断。',
  },
  {
    q: '数据安全与保密如何保障？',
    a: '我们采用传输与存储双重加密，案件与合同资料严格隔离，并支持企业级权限管理与操作审计，满足律所与法务团队的保密要求。',
  },
  {
    q: '法律研究的结论是否可溯源？',
    a: '检索与归纳结果均标注法律法规、司法解释或判例的原文出处，便于使用者逐条核验，确保引用准确、可追溯。',
  },
  {
    q: '是否支持团队范本与知识沉淀？',
    a: '支持。团队可将经审定的合同范本、文书框架与研究成果沉淀为知识资产，在后续工作中复用，保持输出的一致性。',
  },
  {
    q: '适配哪些业务场景？',
    a: '覆盖合同生成、合同修订、诉讼准备与法律研究等高频场景，适用于律所各业务条线与企业法务团队的日常工作。',
  },
]

export function FaqSection() {
  return (
    <section id="faq" className="border-b border-border/60 bg-secondary/40 py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <div className="lg:sticky lg:top-28">
            <span className="text-xs font-medium tracking-[0.2em] text-accent">
              常见问题
            </span>
            <h2 className="mt-4 font-serif text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl">
              你可能关心的细节
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              如需进一步了解部署、合规与定价方案，欢迎预约一对一沟通。
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <Accordion className="rounded-2xl border border-border bg-card px-6">
            {faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`item-${i}`}>
                <AccordionTrigger className="py-5 font-serif text-base font-medium hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  )
}
