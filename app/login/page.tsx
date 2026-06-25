import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Quote } from 'lucide-react'

import { LoginForm } from '@/components/auth/login-form'
import { Reveal } from '@/components/motion-primitives'

export const metadata: Metadata = {
  title: '登录 / 注册 · 准典 LexPilot',
  description: '使用手机号验证码登录准典 LexPilot 智能法律助手。',
}

const highlights = [
  '合同生成、修订、诉讼与法律研究一体协同',
  '可溯源的专业输出，条款风险实时提示',
  '面向律所与法务团队的安全与协作保障',
]

export default function LoginPage() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* 左：品牌叙事 */}
      <aside className="relative hidden flex-col justify-between overflow-hidden bg-primary p-12 text-primary-foreground lg:flex">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.15] [background-image:linear-gradient(to_right,rgba(255,255,255,0.4)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.4)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_70%)]"
        />

        <Link href="/" className="relative flex items-center gap-2.5">
          <Image
            src="/app-icon.png"
            alt="准典 LexPilot 图标"
            width={32}
            height={32}
            className="size-8 rounded-md"
          />
          <span className="flex items-baseline gap-1.5">
            <span className="font-serif text-lg font-semibold tracking-tight">准典</span>
            <span className="text-xs font-medium tracking-[0.2em] text-primary-foreground/70">
              LEXPILOT
            </span>
          </span>
        </Link>

        <div className="relative">
          <Quote className="size-8 text-gold" />
          <p className="mt-5 max-w-md font-serif text-2xl leading-relaxed text-balance">
            以严谨为尺，让每一份法律工作更稳健。
          </p>
          <ul className="mt-8 flex flex-col gap-3">
            {highlights.map((h) => (
              <li
                key={h}
                className="flex items-start gap-3 text-sm leading-relaxed text-primary-foreground/80"
              >
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-gold" />
                {h}
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-xs text-primary-foreground/60">
          © {new Date().getFullYear()} 准典 LexPilot · 智能法律助手
        </p>
      </aside>

      {/* 右：登录表单 */}
      <main className="flex flex-col items-center justify-center bg-background px-6 py-16">
        <div className="w-full max-w-sm">
          <Link
            href="/"
            className="mb-8 flex items-center justify-center gap-2.5 lg:hidden"
          >
            <Image
              src="/app-icon.png"
              alt="准典 LexPilot 图标"
              width={32}
              height={32}
              className="size-8 rounded-md"
            />
            <span className="font-serif text-lg font-semibold tracking-tight text-foreground">
              准典 LexPilot
            </span>
          </Link>

          <Reveal>
            <LoginForm />
          </Reveal>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            遇到问题？
            <Link href="/contact" className="text-foreground underline underline-offset-2 hover:text-gold">
              联系我们
            </Link>
          </p>
        </div>
      </main>
    </div>
  )
}
