'use client'

import { FileText, FileSearch, Gavel, BookMarked } from 'lucide-react'

import { Card } from '@/components/ui/card'
import { Reveal, Stagger, StaggerItem } from '@/components/motion-primitives'
import { cn } from '@/lib/utils'

const capabilities = [
  {
    icon: FileText,
    name: '合同生成',
    desc: '基于业务场景与既定范式，快速生成结构完整、条款严谨的合同初稿，沉淀团队范本资产。',
    points: ['场景化模板库', '要素智能补全', '范本一致性校验'],
  },
  {
    icon: FileSearch,
    name: '合同修订',
    desc: '逐条比对与风险标注，识别权责不对等、表述歧义与缺失条款，给出可溯源的修改建议。',
    points: ['条款风险定位', '版本差异比对', '修改理由可溯源'],
  },
  {
    icon: Gavel,
    name: '诉讼助手',
    desc: '梳理案件事实与争议焦点，辅助构建诉讼策略、证据清单与文书框架，提升应诉准备效率。',
    points: ['争议焦点梳理', '证据链组织', '文书框架草拟'],
  },
  {
    icon: BookMarked,
    name: '法律研究',
    desc: '覆盖法律法规、司法解释与典型判例，提供精准检索与观点归纳，附原文出处便于核验。',
    points: ['法规判例检索', '裁判观点归纳', '出处原文可核验'],
  },
]

export function CapabilitiesSection() {
  return (
    <section id="capabilities" className="border-b border-border/60 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="max-w-2xl">
            <span className="text-xs font-medium tracking-[0.2em] text-accent">
              能力矩阵
            </span>
            <h2 className="mt-4 font-serif text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl">
              覆盖法律事务全链路的四大核心能力
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              从文本起草到争议解决，准典以专业、可溯源的输出贯穿合同与诉讼场景，
              成为律师与法务可信赖的工作伙伴。
            </p>
          </div>
        </Reveal>

        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2">
          {capabilities.map((item, i) => (
            <StaggerItem key={item.name}>
              <Card
                className={cn(
                  'group h-full gap-0 rounded-2xl border-border bg-card p-7 transition-all duration-300',
                  'hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_24px_60px_-40px_rgba(20,30,60,0.5)]',
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="flex size-12 items-center justify-center rounded-xl bg-secondary text-primary transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                    <item.icon className="size-5.5" />
                  </span>
                  <span className="font-serif text-sm text-muted-foreground/60">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mt-6 font-serif text-xl font-semibold text-foreground">
                  {item.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {item.desc}
                </p>
                <ul className="mt-6 flex flex-wrap gap-2 border-t border-border/70 pt-5">
                  {item.points.map((p) => (
                    <li
                      key={p}
                      className="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground"
                    >
                      {p}
                    </li>
                  ))}
                </ul>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
