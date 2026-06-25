'use client'

import { useEffect, useRef, useState } from 'react'
import { Check, Loader2, ShieldCheck } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

const PHONE_RE = /^1[3-9]\d{9}$/
const COUNTDOWN = 60

export function LoginForm() {
  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const [sending, setSending] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState(false)
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)

  const phoneValid = PHONE_RE.test(phone)

  useEffect(() => {
    return () => {
      if (timer.current) clearInterval(timer.current)
    }
  }, [])

  function startCountdown() {
    setCountdown(COUNTDOWN)
    timer.current = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1 && timer.current) {
          clearInterval(timer.current)
          return 0
        }
        return c - 1
      })
    }, 1000)
  }

  async function handleSendCode() {
    setError(null)
    if (!phoneValid) {
      setError('请输入有效的手机号码')
      return
    }
    setSending(true)
    // 模拟发送验证码请求
    await new Promise((r) => setTimeout(r, 800))
    setSending(false)
    startCountdown()
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (!phoneValid) {
      setError('请输入有效的手机号码')
      return
    }
    if (code.trim().length < 4) {
      setError('请输入收到的验证码')
      return
    }
    if (!agreed) {
      setError('请先阅读并同意服务协议与隐私政策')
      return
    }
    setSubmitting(true)
    // 模拟登录请求
    await new Promise((r) => setTimeout(r, 1000))
    setSubmitting(false)
    setDone(true)
  }

  if (done) {
    return (
      <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
        <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-gold/15 text-gold">
          <Check className="size-6" />
        </span>
        <h2 className="mt-5 font-serif text-2xl font-semibold text-foreground">
          登录成功
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          欢迎使用准典 LexPilot，正在为你准备工作台……
        </p>
        <Button className="mt-6 h-11 w-full text-sm" nativeButton={false} render={<a href="/" />}>
          进入首页
        </Button>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
      <h2 className="font-serif text-2xl font-semibold text-foreground">
        登录 / 注册
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        使用手机号验证码登录，未注册的手机号将自动创建账户。
      </p>

      <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-5" noValidate>
        <div className="flex flex-col gap-2">
          <Label htmlFor="phone">手机号码</Label>
          <div className="flex items-center gap-2">
            <span className="flex h-11 items-center rounded-lg border border-input bg-muted/50 px-3 text-sm text-muted-foreground">
              +86
            </span>
            <Input
              id="phone"
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              placeholder="请输入手机号码"
              value={phone}
              maxLength={11}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
              className="h-11"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="code">验证码</Label>
          <div className="flex items-center gap-2">
            <Input
              id="code"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              placeholder="请输入验证码"
              value={code}
              maxLength={6}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
              className="h-11"
            />
            <Button
              type="button"
              variant="outline"
              className="h-11 w-32 shrink-0 text-sm"
              disabled={!phoneValid || countdown > 0 || sending}
              onClick={handleSendCode}
            >
              {sending ? (
                <Loader2 className="size-4 animate-spin" />
              ) : countdown > 0 ? (
                `${countdown}s 后重发`
              ) : (
                '获取验证码'
              )}
            </Button>
          </div>
        </div>

        {/* 协议确认 */}
        <label className="flex cursor-pointer items-start gap-2.5 text-xs leading-relaxed text-muted-foreground">
          <button
            type="button"
            role="checkbox"
            aria-checked={agreed}
            onClick={() => setAgreed((v) => !v)}
            className={cn(
              'mt-0.5 flex size-4 shrink-0 items-center justify-center rounded border transition-colors',
              agreed
                ? 'border-gold bg-gold text-gold-foreground'
                : 'border-input bg-background',
            )}
          >
            {agreed && <Check className="size-3" />}
          </button>
          <span>
            我已阅读并同意
            <a href="#" className="text-foreground underline underline-offset-2 hover:text-gold">
              《服务协议》
            </a>
            和
            <a href="#" className="text-foreground underline underline-offset-2 hover:text-gold">
              《隐私政策》
            </a>
          </span>
        </label>

        {error && (
          <p className="text-sm text-destructive" role="alert">
            {error}
          </p>
        )}

        <Button type="submit" className="h-11 w-full text-sm" disabled={submitting}>
          {submitting ? <Loader2 className="size-4 animate-spin" /> : '登录 / 注册'}
        </Button>

        <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
          <ShieldCheck className="size-3.5 text-gold" />
          登录信息全程加密，仅用于身份验证
        </p>
      </form>
    </div>
  )
}
