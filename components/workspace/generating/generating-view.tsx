'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ChevronDown, Loader2, Sparkles } from 'lucide-react'

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
]

const STAGES = [
  '正在初始化生成任务',
  '正在生成需求分析报告',
  '正在调用检索工具',
  '用户文档向量检索完成',
  '正在汇总补充问题列表',
]

function stamp(base: number, offset: number) {
  const d = new Date(base + offset * 1000)
  const p = (n: number) => n.toString().padStart(2, '0')
  return `${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`
}

export function GeneratingView() {
  const [progress, setProgress] = useState(6)
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [logsOpen, setLogsOpen] = useState(true)
  const [stage, setStage] = useState(STAGES[0])
  const [done, setDone] = useState(false)
  const baseTime = useRef(Date.now())
  const logRef = useRef<HTMLDivElement>(null)

  // 进度推进
  useEffect(() => {
    if (done) return
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(timer)
          return 100
        }
        const next = Math.min(100, p + Math.random() * 7 + 2)
        return Math.round(next)
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
    }, 800)
    return () => clearInterval(timer)
  }, [])

  // 阶段文案随进度变化
  useEffect(() => {
    const idx = Math.min(STAGES.length - 1, Math.floor((progress / 100) * STAGES.length))
    setStage(STAGES[idx])
    if (progress >= 100) setDone(true)
  }, [progress])

  // 日志自动滚动到底部
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
            {done ? 'AI 已完成文件信息查询与补充列表生成。' : 'AI 正在查询文件信息并生成补充列表，请稍候。'}
          </span>
        </div>
      </header>

      {/* 主体 */}
      <div className="min-h-0 flex-1 overflow-y-auto bg-muted/40 px-6 py-8">
        <div className="mx-auto flex max-w-3xl flex-col gap-6">
          {/* 进度卡片 */}
          <section className="rounded-2xl bg-card p-7 shadow-sm ring-1 ring-foreground/10">
            <div className="flex items-start gap-3">
              <span
                className={cn(
                  'flex size-10 shrink-0 items-center justify-center rounded-xl',
                  done ? 'bg-primary/10 text-primary' : 'bg-gold/15 text-gold',
                )}
              >
                <Sparkles className="size-5" />
              </span>
              <div className="min-w-0">
                <h2 className="font-serif text-lg font-semibold text-foreground">智能生成补充列表</h2>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {done ? '任务已完成，可继续下一步' : '正在实时同步任务进度'}
                </p>
              </div>
            </div>

            {/* 进度条 */}
            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">进度</span>
                <span className="font-serif text-lg font-bold tabular-nums text-foreground">
                  {progress}%
                </span>
              </div>
              <div
                className="h-2.5 w-full overflow-hidden rounded-full bg-secondary"
                role="progressbar"
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div
                  className="h-full rounded-full bg-primary transition-[width] duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* 当前进度 */}
            <div className="mt-5 rounded-xl border border-border bg-muted/40 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                当前进度
              </p>
              <div className="mt-1.5 flex items-center gap-2">
                {!done && <Loader2 className="size-4 shrink-0 animate-spin text-primary" />}
                <p className="text-[15px] font-medium text-foreground">{stage}</p>
              </div>
            </div>
          </section>

          {/* 详细日志 */}
          <section className="overflow-hidden rounded-2xl bg-card shadow-sm ring-1 ring-foreground/10">
            <button
              type="button"
              onClick={() => setLogsOpen((v) => !v)}
              className="flex w-full items-center justify-between px-6 py-4"
            >
              <span className="font-serif text-base font-semibold text-foreground">
                详细日志（{logs.length}）
              </span>
              <ChevronDown
                className={cn(
                  'size-4 text-muted-foreground transition-transform',
                  logsOpen && 'rotate-180',
                )}
              />
            </button>
            {logsOpen && (
              <div className="px-4 pb-4">
                <div
                  ref={logRef}
                  className="max-h-[360px] overflow-y-auto rounded-xl bg-muted/40 p-2"
                >
                  {logs.length === 0 ? (
                    <p className="px-3 py-6 text-center text-sm text-muted-foreground">
                      等待日志输出…
                    </p>
                  ) : (
                    <ul className="flex flex-col">
                      {logs.map((log, i) => (
                        <li
                          key={i}
                          className="flex items-baseline gap-3 rounded-lg px-3 py-2.5 text-sm"
                        >
                          <span className="shrink-0 font-mono text-xs tabular-nums text-muted-foreground">
                            [{log.time}]
                          </span>
                          <span
                            className={cn(
                              'min-w-0 leading-relaxed',
                              log.tool ? 'text-primary' : 'text-foreground',
                            )}
                          >
                            {log.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )}
          </section>

          {done && (
            <div className="flex justify-end">
              <Button nativeButton={false} render={<Link href="/editor" />}>
                查看生成结果
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
