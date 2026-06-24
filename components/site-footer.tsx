import Image from 'next/image'

const groups = [
  {
    title: '能力',
    links: ['合同生成', '合同修订', '诉讼助手', '法律研究'],
  },
  {
    title: '产品',
    links: ['使用流程', '客户口碑', '常见问题', '预约演示'],
  },
  {
    title: '关于',
    links: ['企业介绍', '安全与合规', '联系我们', '加入我们'],
  },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <Image
                src="/app-icon.png"
                alt="准典 LexPilot 图标"
                width={32}
                height={32}
                className="size-8 rounded-md"
              />
              <span className="flex items-baseline gap-1.5">
                <span className="font-serif text-lg font-semibold tracking-tight text-foreground">
                  准典
                </span>
                <span className="text-xs font-medium tracking-[0.2em] text-muted-foreground">
                  LEXPILOT
                </span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              面向高端律师与法务团队的智能法律助手，以专业、严谨、可信赖为本。
            </p>
          </div>

          {groups.map((g) => (
            <div key={g.title}>
              <h3 className="text-sm font-semibold text-foreground">{g.title}</h3>
              <ul className="mt-4 space-y-3">
                {g.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border/70 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© 2026 准典 LexPilot · 智能法律助手</p>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-foreground">
              隐私政策
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              服务条款
            </a>
            <p>本产品提供专业辅助，不构成法律意见</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
