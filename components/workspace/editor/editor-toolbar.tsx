'use client'

import { useState } from 'react'
import {
  Bold,
  ChevronDown,
  Highlighter,
  Italic,
  List,
  ListOrdered,
  Palette,
  Redo2,
  Strikethrough,
  Underline,
  Undo2,
} from 'lucide-react'

import { cn } from '@/lib/utils'

function ToolButton({
  label,
  active,
  onClick,
  children,
}: {
  label: string
  active?: boolean
  onClick?: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        'flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground',
        active && 'bg-secondary text-foreground',
      )}
    >
      {children}
    </button>
  )
}

function Divider() {
  return <span className="mx-1 h-5 w-px bg-border" />
}

const headings = ['正文', '一级标题', '二级标题', '三级标题']

export function EditorToolbar() {
  const [marks, setMarks] = useState<Record<string, boolean>>({ underline: true })
  const [heading, setHeading] = useState('一级标题')
  const [open, setOpen] = useState(false)

  const toggle = (key: string) => setMarks((m) => ({ ...m, [key]: !m[key] }))

  return (
    <div className="sticky top-0 z-20 flex flex-wrap items-center gap-0.5 rounded-t-2xl border-b border-border bg-card/95 px-3 py-2 backdrop-blur">
      <ToolButton label="撤销">
        <Undo2 className="size-4" />
      </ToolButton>
      <ToolButton label="重做">
        <Redo2 className="size-4" />
      </ToolButton>

      <Divider />

      <ToolButton label="加粗" active={marks.bold} onClick={() => toggle('bold')}>
        <Bold className="size-4" />
      </ToolButton>
      <ToolButton label="斜体" active={marks.italic} onClick={() => toggle('italic')}>
        <Italic className="size-4" />
      </ToolButton>
      <ToolButton label="下划线" active={marks.underline} onClick={() => toggle('underline')}>
        <Underline className="size-4" />
      </ToolButton>
      <ToolButton label="删除线" active={marks.strike} onClick={() => toggle('strike')}>
        <Strikethrough className="size-4" />
      </ToolButton>

      <Divider />

      <ToolButton label="字体颜色" active={marks.color} onClick={() => toggle('color')}>
        <Palette className="size-4" />
      </ToolButton>
      <ToolButton label="高亮" active={marks.highlight} onClick={() => toggle('highlight')}>
        <Highlighter className="size-4" />
      </ToolButton>

      <Divider />

      <ToolButton label="无序列表">
        <List className="size-4" />
      </ToolButton>
      <ToolButton label="有序列表">
        <ListOrdered className="size-4" />
      </ToolButton>

      <Divider />

      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          onBlur={() => setTimeout(() => setOpen(false), 120)}
          className="flex h-8 items-center gap-1.5 rounded-md px-2.5 text-sm text-foreground transition-colors hover:bg-secondary"
        >
          {heading}
          <ChevronDown className="size-3.5 text-muted-foreground" />
        </button>
        {open && (
          <div className="absolute left-0 top-9 z-30 w-32 overflow-hidden rounded-lg border border-border bg-popover py-1 shadow-lg">
            {headings.map((h) => (
              <button
                key={h}
                type="button"
                onMouseDown={() => {
                  setHeading(h)
                  setOpen(false)
                }}
                className={cn(
                  'block w-full px-3 py-1.5 text-left text-sm transition-colors hover:bg-secondary',
                  h === heading ? 'text-foreground' : 'text-muted-foreground',
                )}
              >
                {h}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
