'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'motion/react'
import {
  ArrowLeft,
  Check,
  ChevronDown,
  FileSearch,
  Loader2,
  Search,
  Sparkles,
  Terminal,
  Wand2,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type LogEntry = { time: string; text: string; tool?: boolean }

const LOG_SCRIPT: Omit<LogEntry, 'time'>[] = [
  { text: '开始生成补充问题列表…' },
  { text: '正在生成需求分析报告（调用模型）…' },
  { text: '模型调用开始' },
  { text: '调用工具：rag_search_tool', tool: true },
  { text: '正在检索用户文档（向量检索）…' },
  { text: '用户文档向量检索完成' },
  { text: '工具完成：rag_search_tool', tool: true },
  { text: '调用工具：rag_search_tool', tool: true },
  { text: '正在检索用户文档（向量检索）…' },
  { text: '用户文档向量检索完成' },
  { text: '正在汇总补充问题列表…' },
  { text: '补充列表生成完成', tool: true },
]

const STAGES = [
  { label: '初始化生成任务', icon: Sparkles },
  { label: '生成需求分析报告', icon: Wand2 },
  { label: '调用检索工具', icon: Search },
  { label: '用户文档向量检索', icon: FileSearch },
  { label: '汇总补充问题列表', icon: Terminal },
]

function stamp(base: number, offset: number) {
  const d = new Date(base + offset * 1000)
  const p = (n: number) => n.toString().padStart(2, '0')
  return `${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`
}

function ProgressRing({ progress, done }: { progress: number; done: boolean }) {
  const R = 66
  const C = 2 * Math.PI * R
  return (
    <div className="relative flex size-44 items-center justify-center">
      {/* 光晕 */}
      {!done && (
        <motion.span
          aria-hidden
          className="absolute inset-3 rounded-full bg-primary/15 blur-2xl"
          animate={{ opacity: [0.35, 0.7, 0.35], scale: [0.9, 1.05, 0.9] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
      <svg viewBox="0 0 160 160" className="size-44 -rotate-90">
        <circle
          cx="80"
          cy="80"
          r={R}
          fill="none"
          strokeWidth="10"
          className="stroke-secondary"
        />
        <motion.circle
          cx="80"
          cy="80"
          r={R}
          fill="none"
          strokeWidth="10"
          strokeLinecap="round"
          className={done ? 'stroke-primary' : 'stroke-primary'}
          strokeDasharray={C}
          animate={{ strokeDashoffset: C * (1 - progress / 100) }}
          initial={{ strokeDashoffset: C }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <AnimatePresence mode="popLayout">
          {done ? (
            <motion.span
              key="done"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 18 }}
              className="flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground"
            >
              <Check className="size-7" strokeWidth={3} />
            </motion.span>
          ) : (
            <motion.div key="num" className="flex flex-col items-center">
              <span className="font-serif text-4xl font-bold tabular-nums text-foreground">
                {progress}
                <span className="text-xl text-muted-foreground">%</span>
              </span>
              <span className="mt-0.5 text-xs text-muted-foreground">生成进度</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export function GeneratingView() {
  const [progress, setProgress] = useState(4)
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [logsOpen, setLogsOpen] = useState(true)
  const [done, setDone] = useState(false)
  const baseTime = useRef(Date.now())
  const logRef = useRef<HTMLDivElement>(null)

  const activeStage = useMemo(
    () => Math.min(STAGES.length - 1, Math.floor((progress / 100) * STAGES.length)),
    [progress],
  )

  // 进度推进
  useEffect(() => {
    if (done) return
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(timer)
          return 100
        }
        return Math.round(Math.min(100, p + Math.random() * 6 + 2))
      })
    }, 700)
    return () => clearInterval(timer)
  }, [done])

  // 日志流入
  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      if (i >= LOG_SCRIPT.length) {
        clearInterval(timer)
        return
      }
      const entry = LOG_SCRIPT[i]
      setLogs((prev) => [...prev, { ...entry, time: stamp(baseTime.current, i) }])
      i += 1
    }, 760)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (progress >= 100) setDone(true)
  }, [progress])

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight
  }, [logs])

  return (
    <div className="flex h-svh flex-col">
      {/* 顶部栏 */}
      <header className="flex h-16 shrink-0 items-center gap-3 border-b border-border bg-card px-5">
        <Button variant="ghost" size="icon-sm" nativeButton={false} render={<Link href="/editor" />}>
          <ArrowLeft className="size-4" />
        </Button>
        <div className="flex min-w-0 flex-col">
          <h1 className="truncate font-serif text-base font-semibold text-foreground">
            {done ? '元信息生成完成' : '元信息生成中'}
          </h1>
          <span className="truncate text-xs text-muted-foreground">
            {done
              ? 'AI 已完成文件信息查询与补充列表生成。'
              : 'AI 正在查询文件信息并生成补充列表，请稍候。'}
          </span>
        </div>
      </header>

      {/* 主体 */}
      <div className="min-h-0 flex-1 overflow-y-auto bg-muted/40 px-6 py-8">
        <div className="mx-auto flex max-w-4xl flex-col gap-6">
          {/* 顶部：进度环 + 阶段流水线 */}
          <div className="grid gap-6 lg:grid-cols-[minmax(0,320px)_1fr]">
            {/* 进度环卡片 */}
            <motion.section
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="flex flex-col items-center justify-center gap-3 rounded-2xl bg-card p-7 shadow-sm ring-1 ring-foreground/10"
            >
              <ProgressRing progress={progress} done={done} />
              <div className="flex items-center gap-2 text-center">
                {!done && <Loader2 className="size-4 shrink-0 animate-spin text-primary" />}
                <p className="text-[15px] font-medium text-foreground">
                  {done ? '全部任务已完成' : STAGES[activeStage].label}
                </p>
              </div>
            </motion.section>

            {/* 阶段流水线 */}
            <motion.section
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08, ease: 'easeOut' }}
              className="rounded-2xl bg-card p-6 shadow-sm ring-1 ring-foreground/10"
            >
              <h2 className="font-serif text-base font-semibold text-foreground">生成流程</h2>
              <ol className="mt-4 flex flex-col">
                {STAGES.map((s, i) => {
                  const stageDone = done || i < activeStage
                  const stageActive = !done && i === activeStage
                  const Icon = s.icon
                  return (
                    <li key={s.label} className="relative flex gap-3.5 pb-5 last:pb-0">
                      {/* 连接线 */}
                      {i < STAGES.length - 1 && (
                        <span
                          className={cn(
                            'absolute left-[15px] top-8 h-[calc(100%-1rem)] w-px',
                            stageDone ? 'bg-primary/40' : 'bg-border',
                          )}
                        />
                      )}
                      <span
                        className={cn(
                          'relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border transition-colors',
                          stageDone
                            ? 'border-primary bg-primary text-primary-foreground'
                            : stageActive
                              ? 'border-primary bg-primary/10 text-primary'
                              : 'border-border bg-card text-muted-foreground',
                        )}
                      >
                        {stageActive && (
                          <motion.span
                            aria-hidden
                            className="absolute inset-0 rounded-full ring-2 ring-primary/40"
                            animate={{ scale: [1, 1.35], opacity: [0.6, 0] }}
                            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeOut' }}
                          />
                        )}
                        {stageDone ? (
                          <Check className="size-4" strokeWidth={3} />
                        ) : (
                          <Icon className="size-4" strokeWidth={2} />
                        )}
                      </span>
                      <div className="flex min-w-0 flex-col pt-1">
                        <span
                          className={cn(
                            'text-sm font-medium',
                            stageActive || stageDone ? 'text-foreground' : 'text-muted-foreground',
                          )}
                        >
                          {s.label}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {stageDone ? '已完成' : stageActive ? '进行中…' : '等待中'}
                        </span>
                      </div>
                    </li>
                  )
                })}
              </ol>
            </motion.section>
          </div>

          {/* 详细日志 */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16, ease: 'easeOut' }}
            className="overflow-hidden rounded-2xl bg-card shadow-sm ring-1 ring-foreground/10"
          >
            <button
              type="button"
              onClick={() => setLogsOpen((v) => !v)}
              className="flex w-full items-center justify-between px-6 py-4"
            >
              <span className="flex items-center gap-2 font-serif text-base font-semibold text-foreground">
                <Terminal className="size-4 text-muted-foreground" />
                详细日志（{logs.length}）
              </span>
              <ChevronDown
                className={cn(
                  'size-4 text-muted-foreground transition-transform',
                  logsOpen && 'rotate-180',
                )}
              />
            </button>
            <AnimatePresence initial={false}>
              {logsOpen && (
                <motion.div
                  key="logbody"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4">
                    <div
                      ref={logRef}
                      className="max-h-[320px] overflow-y-auto rounded-xl bg-[oklch(0.22_0.02_260)] p-3 font-mono text-[13px]"
                    >
                      {logs.length === 0 ? (
                        <p className="px-2 py-6 text-center text-muted-foreground">
                          等待日志输出…
                        </p>
                      ) : (
                        <ul className="flex flex-col gap-0.5">
                          <AnimatePresence initial={false}>
                            {logs.map((log, i) => (
                              <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -8 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.25, ease: 'easeOut' }}
                                className="flex items-baseline gap-3 rounded px-2 py-1 leading-relaxed"
                              >
                                <span className="shrink-0 tabular-nums text-white/35">
                                  [{log.time}]
                                </span>
                                <span
                                  className={cn(
                                    'min-w-0',
                                    log.tool ? 'text-[oklch(0.8_0.13_160)]' : 'text-white/80',
                                  )}
                                >
                                  {log.text}
                                </span>
                              </motion.li>
                            ))}
                          </AnimatePresence>
                          {!done && (
                            <li className="flex items-center gap-2 px-2 py-1 text-white/40">
                              <motion.span
                                className="inline-block h-3.5 w-1.5 bg-[oklch(0.8_0.13_160)]"
                                animate={{ opacity: [1, 0.2, 1] }}
                                transition={{ duration: 1, repeat: Infinity }}
                              />
                            </li>
                          )}
                        </ul>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.section>

          <AnimatePresence>
            {done && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="flex justify-end"
              >
                <Button nativeButton={false} render={<Link href="/editor" />}>
                  查看生成结果
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
