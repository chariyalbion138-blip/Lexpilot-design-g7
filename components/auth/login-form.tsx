'use client'

import { useEffect, useRef, useState } from 'react'
import { Check, Loader2, QrCode, Smartphone, ShieldCheck } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

const PHONE_RE = /^1[3-9]\d{9}$/
const COUNTDOWN = 60

type LoginMethod = 'phone' | 'wechat'

function WechatIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M8.69 4C4.62 4 1.32 6.74 1.32 10.12c0 1.94 1.1 3.67 2.82 4.8l-.7 2.13 2.48-1.25c.88.24 1.8.37 2.77.37.24 0 .48-.01.72-.03a4.6 4.6 0 0 1-.2-1.34c0-2.94 2.84-5.32 6.34-5.32.23 0 .46.01.69.03C15.5 5.92 12.42 4 8.69 4Zm-2.4 3.2a.92.92 0 1 1 0 1.84.92.92 0 0 1 0-1.84Zm4.8 0a.92.92 0 1 1 0 1.84.92.92 0 0 1 0-1.84Z" />
      <path d="M22.68 14.77c0-2.83-2.78-5.13-6.2-5.13s-6.2 2.3-6.2 5.13c0 2.84 2.78 5.13 6.2 5.13.74 0 1.46-.11 2.13-.31l1.95.98-.55-1.66c1.62-.94 2.67-2.45 2.67-4.14Zm-8.16-1.18a.77.77 0 1 1 0 1.54.77.77 0 0 1 0-1.54Zm3.92 0a.77.77 0 1 1 0 1.54.77.77 0 0 1 0-1.54Z" />
    </svg>
  )
}

export function LoginForm() {
  const [method, setMethod] = useState<LoginMethod>('phone')
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

  const agreementCheckbox = (
    <label className="flex cursor-pointer items-start gap-2.5 text-xs leading-relaxed text-muted-foreground">
      <button
        type="button"
        role="checkbox"
        aria-checked={agreed}
        onClick={() => setAgreed((v) => !v)}
        className={cn(
          'mt-0.5 flex size-4 shrink-0 items-center justify-center rounded border transition-colors',
          agreed ? 'border-gold bg-gold text-gold-foreground' : 'border-input bg-background',
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
  )

  if (method === 'wechat') {
    return (
      <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
        <h2 className="font-serif text-2xl font-semibold text-foreground">微信登录</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          打开微信扫一扫，扫描下方二维码完成登录。
        </p>

        <div className="mt-7 flex flex-col items-center">
          <div className="relative flex size-48 items-center justify-center rounded-xl border border-border bg-muted/40">
            <QrCode className="size-32 text-foreground/80" strokeWidth={1.2} />
            <span className="absolute -bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-[#07c160] px-3 py-1 text-xs font-medium text-white">
              <WechatIcon className="size-3.5" />
              微信扫码
            </span>
          </div>
          <p className="mt-6 text-xs text-muted-foreground">二维码 5 分钟内有效，请尽快扫码</p>
        </div>

        <div className="mt-7 flex flex-col gap-4">
          {agreementCheckbox}
          {error && (
            <p className="text-sm text-destructive" role="alert">
              {error}
            </p>
          )}
          <Button
            type="button"
            variant="outline"
            className="h-11 w-full gap-2 text-sm"
            onClick={() => {
              setError(null)
              setMethod('phone')
            }}
          >
            <Smartphone className="size-4" />
            使用手机号登录
          </Button>
        </div>
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
        {agreementCheckbox}

        {error && (
          <p className="text-sm text-destructive" role="alert">
            {error}
          </p>
        )}

        <Button type="submit" className="h-11 w-full text-sm" disabled={submitting}>
          {submitting ? <Loader2 className="size-4 animate-spin" /> : '登录 / 注册'}
        </Button>

        <div className="flex items-center gap-3">
          <span className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted-foreground">其他登录方式</span>
          <span className="h-px flex-1 bg-border" />
        </div>

        <Button
          type="button"
          variant="outline"
          className="h-11 w-full gap-2 text-sm"
          onClick={() => {
            setError(null)
            setMethod('wechat')
          }}
        >
          <WechatIcon className="size-4 text-[#07c160]" />
          微信登录
        </Button>

        <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
          <ShieldCheck className="size-3.5 text-gold" />
          登录信息全程加密，仅用于身份验证
        </p>
      </form>
    </div>
  )
}
