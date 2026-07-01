'use client'

import { useState } from 'react'
import {
  BadgeCheck,
  ChevronRight,
  FileText,
  LogOut,
  Pencil,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'

import { Button } from '@/components/ui/button'

function SectionCard({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="px-6 pt-5 pb-1">
        <h2 className="font-serif text-base font-semibold text-foreground">{title}</h2>
      </div>
      <div className="divide-y divide-border/70">{children}</div>
    </section>
  )
}

function Row({
  label,
  hint,
  children,
}: {
  label: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex items-center justify-between gap-4 px-6 py-4">
      <div className="flex flex-col">
        <span className="text-sm text-foreground">{label}</span>
        {hint && <span className="mt-0.5 text-xs text-muted-foreground">{hint}</span>}
      </div>
      <div className="flex items-center gap-3">{children}</div>
    </div>
  )
}

function LinkRow({ label, icon: Icon }: { label: string; icon: React.ElementType }) {
  return (
    <button
      type="button"
      className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left transition-colors hover:bg-secondary/50"
    >
      <span className="flex items-center gap-3 text-sm text-foreground">
        <Icon className="size-4 text-muted-foreground" strokeWidth={1.75} />
        {label}
      </span>
      <ChevronRight className="size-4 text-muted-foreground" />
    </button>
  )
}

export function SettingsView() {
  const [wechatBound, setWechatBound] = useState(false)

  return (
    <div className="mx-auto w-full max-w-2xl px-6 py-10">
      <header className="mb-8">
        <h1 className="font-serif text-2xl font-semibold text-foreground">用户设置</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">管理您的个人信息与账号安全</p>
      </header>

      <div className="flex flex-col gap-6">
        {/* 账户概览 */}
        <section className="flex items-center gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-primary text-2xl font-medium text-primary-foreground">
            Z
          </div>
          <div className="flex min-w-0 flex-1 flex-col">
            <div className="flex items-center gap-2">
              <span className="font-serif text-lg font-semibold text-foreground">ZD0614</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-gold/15 px-2 py-0.5 text-xs font-medium text-foreground">
                <BadgeCheck className="size-3 text-gold" />
                专业版
              </span>
            </div>
            <span className="mt-0.5 truncate text-sm text-muted-foreground">
              157****0614
            </span>
          </div>
          <Button variant="outline" size="sm" className="gap-1.5">
            <Pencil className="size-3.5" />
            更换头像
          </Button>
        </section>

        {/* 基本信息 */}
        <SectionCard title="基本信息">
          <Row label="用户昵称" hint="用于身份展示，注册后不可更改">
            <span className="text-sm text-foreground">ZD0614</span>
            <span className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">
              不可更改
            </span>
          </Row>
          <Row label="手机号" hint="用于登录与安全验证">
            <span className="text-sm text-foreground">157****0614</span>
            <button
              type="button"
              className="flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-gold"
            >
              <Pencil className="size-3.5" />
              更换
            </button>
          </Row>
          <Row label="微信" hint={wechatBound ? '已绑定，可用于快捷登录' : '绑定后可使用微信快捷登录'}>
            {wechatBound ? (
              <span className="flex items-center gap-1.5 text-sm text-[#07c160]">
                <BadgeCheck className="size-4" />
                已绑定
              </span>
            ) : (
              <>
                <span className="text-sm text-muted-foreground">未绑定</span>
                <button
                  type="button"
                  onClick={() => setWechatBound(true)}
                  className="text-sm font-medium text-primary transition-colors hover:text-gold"
                >
                  立即绑定
                </button>
              </>
            )}
          </Row>
        </SectionCard>

        {/* 账号安全 */}
        <SectionCard title="账号安全">
          <LinkRow label="登录设备管理" icon={ShieldCheck} />
          <LinkRow label="消息通知偏好" icon={Sparkles} />
        </SectionCard>

        {/* 其他 */}
        <SectionCard title="其他">
          <LinkRow label="用户协议" icon={FileText} />
          <LinkRow label="隐私政策" icon={ShieldCheck} />
        </SectionCard>

        {/* 操作 */}
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <Button
            variant="outline"
            className="flex-1 border-destructive/40 text-destructive hover:bg-destructive/5 hover:text-destructive"
          >
            注销账号
          </Button>
          <Button variant="secondary" className="flex-1 gap-1.5">
            <LogOut className="size-4" />
            退出登录
          </Button>
        </div>
      </div>
    </div>
  )
}
