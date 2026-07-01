'use client'

import { useMemo, useState } from 'react'
import { ChevronDown, Sparkles } from 'lucide-react'

import { cn } from '@/lib/utils'

type Risk = 'high' | 'mid' | 'low'

type Revision = {
  id: number
  title: string
  risk: Risk
  detail: string
  suggestion: string
}

const revisions: Revision[] = [
  { id: 1, title: '履约保证金退还条件苛刻且存在不予返还风险', risk: 'high', detail: '现有条款约定保证金退还需满足多项前提，且缺少违约方举证责任，乙方处于明显不利地位。', suggestion: '建议明确退还时限（如解除后 15 日内），并限定不予返还的具体情形。' },
  { id: 2, title: '租赁用途合规责任完全转嫁乙方', risk: 'mid', detail: '合同将全部合规审批责任归于乙方，未区分甲方作为出租人的基础义务。', suggestion: '建议由甲方保证房屋权属及基础用途合法，合规责任按过错分担。' },
  { id: 3, title: '免租期补缴租金触发条件过于宽泛', risk: 'mid', detail: '触发补缴的情形描述模糊，易被扩大解释。', suggestion: '建议列举明确的触发情形并设置补缴上限。' },
  { id: 4, title: '逾期接收租赁物违约金标准偏高', risk: 'low', detail: '按日计违约金比例高于同类合同常见水平。', suggestion: '建议下调至日租金的合理倍数，或设置总额上限。' },
  { id: 5, title: '违约责任严重失衡', risk: 'high', detail: '甲乙双方违约责任标准不对等，乙方承担明显更重责任。', suggestion: '建议对等约定双方违约金比例与责任范围。' },
  { id: 6, title: '乙方丧失优先承租权', risk: 'mid', detail: '条款排除了法定优先承租权，可能因违反强制性规定而无效。', suggestion: '建议保留法定优先承租权，或明确合理放弃条件。' },
  { id: 7, title: '非甲方原因停水停电免责范围过宽', risk: 'mid', detail: '免责范围包含部分本应由甲方保障的情形。', suggestion: '建议限定为不可抗力及第三方原因导致的中断。' },
  { id: 8, title: '甲方单方进入权缺乏限制', risk: 'low', detail: '甲方进入租赁物的条件与通知义务约定不足。', suggestion: '建议约定进入需提前通知并限于紧急或检修情形。' },
  { id: 9, title: '公共区域物品处置权过大', risk: 'low', detail: '甲方对乙方置于公共区域物品的处置权限过大。', suggestion: '建议约定处置前的通知与暂存义务。' },
  { id: 10, title: '出租人单方采取停水停电措施且免责', risk: 'high', detail: '允许甲方以催收为由停水停电，存在违法风险。', suggestion: '建议删除该条，改为通过法律途径主张权利。' },
  { id: 11, title: '出租人强制进入及处置物品免责范围过宽', risk: 'high', detail: '强制进入及处置条款缺乏程序约束，侵权风险高。', suggestion: '建议增加通知、清点与第三方见证程序。' },
  { id: 12, title: '恢复原状费用标准缺失', risk: 'mid', detail: '恢复原状的范围与费用计算标准未约定。', suggestion: '建议明确正常损耗免责及费用核定方式。' },
  { id: 13, title: '送达地址约定存在瑕疵', risk: 'mid', detail: '未约定送达地址变更通知义务及视为送达规则。', suggestion: '建议补充地址变更通知条款与送达确认规则。' },
  { id: 14, title: '律师费等维权费用全部由乙方承担', risk: 'low', detail: '维权费用一律由乙方承担，未考虑甲方过错情形。', suggestion: '建议按责任比例或败诉方承担原则约定。' },
  { id: 15, title: '合同金额未约定中文大写', risk: 'mid', detail: '金额仅有数字表述，缺少中文大写，易产生歧义。', suggestion: '建议补充中文大写金额并与数字保持一致。' },
]

const riskMeta: Record<Risk, { label: string; badge: string; dot: string }> = {
  high: {
    label: '高风险',
    badge: 'bg-destructive/10 text-destructive',
    dot: 'bg-destructive',
  },
  mid: {
    label: '中风险',
    badge: 'bg-gold/15 text-foreground',
    dot: 'bg-gold',
  },
  low: {
    label: '低风险',
    badge: 'bg-primary/10 text-primary',
    dot: 'bg-primary',
  },
}

function RevisionItem({ item }: { item: Revision }) {
  const [open, setOpen] = useState(false)
  const meta = riskMeta[item.risk]

  return (
    <div className="shrink-0 overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-foreground/20">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-start gap-3 px-4 py-3 text-left"
      >
        <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium text-muted-foreground">
          {item.id}
        </span>
        <span className="flex-1 text-sm leading-relaxed text-foreground">{item.title}</span>
        <span className="flex shrink-0 items-center gap-2">
          <span
            className={cn(
              'rounded-md px-1.5 py-0.5 text-xs font-medium whitespace-nowrap',
              meta.badge,
            )}
          >
            {meta.label}
          </span>
          <ChevronDown
            className={cn(
              'size-4 text-muted-foreground transition-transform',
              open && 'rotate-180',
            )}
          />
        </span>
      </button>
      {open && (
        <div className="border-t border-border/70 bg-secondary/30 px-4 py-3.5">
          <p className="text-xs leading-relaxed text-muted-foreground">{item.detail}</p>
          <div className="mt-3 flex items-start gap-2 rounded-lg bg-card p-3 ring-1 ring-gold/25">
            <Sparkles className="mt-0.5 size-3.5 shrink-0 text-gold" />
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-medium text-foreground">修订建议</span>
              <span className="text-xs leading-relaxed text-muted-foreground">
                {item.suggestion}
              </span>
            </div>
          </div>
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              className="flex-1 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              采纳建议
            </button>
            <button
              type="button"
              className="rounded-md px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary"
            >
              忽略
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export function RevisionPanel() {
  const counts = useMemo(() => {
    return revisions.reduce(
      (acc, r) => {
        acc[r.risk] += 1
        return acc
      },
      { high: 0, mid: 0, low: 0 } as Record<Risk, number>,
    )
  }, [])

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-border px-5 py-4">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-base font-semibold text-foreground">待修订</h2>
          <span className="text-xs text-muted-foreground">
            共 {revisions.length} 项 · 待处理 {revisions.length - 1}
          </span>
        </div>
        <div className="mt-3 flex items-center gap-2">
          {(['high', 'mid', 'low'] as Risk[]).map((r) => (
            <span
              key={r}
              className="flex items-center gap-1.5 rounded-lg bg-secondary/60 px-2.5 py-1 text-xs text-foreground"
            >
              <span className={cn('size-1.5 rounded-full', riskMeta[r].dot)} />
              {riskMeta[r].label}
              <span className="font-medium">{counts[r]}</span>
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2.5 overflow-y-auto px-4 py-4">
        {revisions.map((item) => (
          <RevisionItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}
