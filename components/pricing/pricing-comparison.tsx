'use client'

import { Fragment } from 'react'
import { Check, Minus } from 'lucide-react'
import { Reveal } from '@/components/motion-primitives'
import { cn } from '@/lib/utils'

const tiers = ['体验版', '基础版', '专业版', '旗舰版']

type Row = { label: string; values: (boolean | string)[] }

const groups: { title: string; rows: Row[] }[] = [
  {
    title: '核心配额（每月）',
    rows: [
      { label: '法研 Agent', values: ['5 次', '200 次', '1000 次', '10000 次'] },
      { label: '合同生成', values: ['5 次', '200 次', '1000 次', '不限量'] },
      { label: '合同修订', values: ['5 次', '200 次', '1000 次', '不限量'] },
    ],
  },
  {
    title: '诉讼与研究',
    rows: [
      { label: '诉讼要点梳理', values: [true, true, true, true] },
      { label: '证据与时间线管理', values: [false, true, true, true] },
      {
        label: '法律研究检索库',
        values: ['标准库', '标准库', '增强库 + 类案', '定制数据'],
      },
      { label: '类案推荐与裁判倾向', values: [false, false, true, true] },
    ],
  },
  {
    title: '协作与安全',
    rows: [
      { label: '团队模板库沉淀', values: [false, false, true, true] },
      { label: '权限分级与协作审阅', values: [false, false, true, true] },
      { label: '私有化 / 专属部署', values: [false, false, false, true] },
      { label: '安全审计与 SLA', values: [false, false, '标准', '企业级'] },
      {
        label: '支持方式',
        values: ['社区', '邮件工单', '专属客户经理', '7×24 专属团队'],
      },
    ],
  },
]

function Cell({ value }: { value: boolean | string }) {
  if (value === true)
    return <Check className="mx-auto size-4 text-gold" aria-label="包含" />
  if (value === false)
    return <Minus className="mx-auto size-4 text-muted-foreground/50" aria-label="不包含" />
  return <span className="text-sm text-muted-foreground">{value}</span>
}

export function PricingComparison() {
  return (
    <section className="mx-auto max-w-6xl px-6">
      <Reveal className="text-center">
        <h2 className="font-serif text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          能力对比一览
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          按团队规模与场景选择，随业务增长平滑升级。
        </p>
      </Reveal>

      <Reveal delay={0.1} className="mt-10 overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse text-left">
            <thead>
              <tr className="border-b border-border">
                <th className="px-6 py-4 text-sm font-semibold text-foreground">功能</th>
                {tiers.map((t, i) => (
                  <th
                    key={t}
                    className={cn(
                      'px-6 py-4 text-center text-sm font-semibold text-foreground',
                      i === 2 && 'bg-gold/5',
                    )}
                  >
                    {t}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {groups.map((g) => (
                <Fragment key={g.title}>
                  <tr className="bg-secondary/50">
                    <td
                      colSpan={tiers.length + 1}
                      className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                    >
                      {g.title}
                    </td>
                  </tr>
                  {g.rows.map((row) => (
                    <tr key={row.label} className="border-b border-border/60 last:border-0">
                      <td className="px-6 py-3.5 text-sm text-foreground">{row.label}</td>
                      {row.values.map((v, i) => (
                        <td
                          key={i}
                          className={cn('px-6 py-3.5 text-center', i === 2 && 'bg-gold/5')}
                        >
                          <Cell value={v} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>
    </section>
  )
}
