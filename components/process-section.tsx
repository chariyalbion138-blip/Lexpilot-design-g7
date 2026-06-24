'use client'

import { Reveal, Stagger, StaggerItem, Parallax } from '@/components/motion-primitives'

const steps = [
  {
    step: '第一步',
    title: '提交事务与材料',
    desc: '上传合同文本、案件材料或检索需求，明确业务场景与目标，准典即刻理解任务上下文。',
  },
  {
    step: '第二步',
    title: '智能处理与生成',
    desc: '依据专业范式完成起草、审查、梳理或检索，逐项标注依据，输出可追溯的结构化结果。',
  },
  {
    step: '第三步',
    title: '审定与交付归档',
    desc: '律师在建议基础上确认定稿，一键导出标准文书，并沉淀为团队可复用的知识资产。',
  },
]

export function ProcessSection() {
  return (
    <section id="process" className="relative border-b border-border/60 bg-secondary/40 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-medium tracking-[0.2em] text-accent">
              使用流程
            </span>
            <h2 className="mt-4 font-serif text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl">
              三步完成，专业由你定夺
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              准典提升效率而非替代判断，关键结论始终由专业人士审定。
            </p>
          </div>
        </Reveal>

        <div className="relative mt-16">
          {/* 贯穿连线，随滚动轻微视差 */}
          <Parallax
            speed={-12}
            className="pointer-events-none absolute inset-x-0 top-7 hidden md:block"
          >
            <div className="mx-auto h-px max-w-4xl bg-gradient-to-r from-transparent via-border to-transparent" />
          </Parallax>

          <Stagger className="grid gap-10 md:grid-cols-3" stagger={0.16}>
            {steps.map((s) => (
              <StaggerItem key={s.step} className="relative text-center md:text-left">
                <span className="relative z-10 mx-auto flex size-14 items-center justify-center rounded-full border border-border bg-card font-serif text-lg font-semibold text-primary shadow-sm md:mx-0">
                  {s.step.replace('第', '').replace('步', '')}
                </span>
                <p className="mt-5 text-xs font-medium tracking-[0.18em] text-accent">
                  {s.step}
                </p>
                <h3 className="mt-2 font-serif text-xl font-semibold text-foreground">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {s.desc}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  )
}
