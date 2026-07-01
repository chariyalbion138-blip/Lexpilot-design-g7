'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  Columns2,
  Download,
  FileDown,
  PanelRightClose,
  PanelRightOpen,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

import { EditorToolbar } from './editor-toolbar'
import { RevisionPanel } from './revision-panel'

function Mark({ children }: { children: React.ReactNode }) {
  return <span className="text-primary underline decoration-primary/30 underline-offset-2">{children}</span>
}

export function EditorView() {
  const [panelOpen, setPanelOpen] = useState(true)

  return (
    <div className="flex h-svh flex-col">
      {/* 顶部操作栏 */}
      <header className="flex h-16 shrink-0 items-center justify-between gap-4 border-b border-border bg-card px-5">
        <div className="flex min-w-0 items-center gap-3">
          <Button variant="ghost" size="icon-sm" nativeButton={false} render={<Link href="/editor" />}>
            <ArrowLeft className="size-4" />
          </Button>
          <div className="flex min-w-0 flex-col">
            <h1 className="truncate font-serif text-base font-semibold text-foreground">
              审核合同处理
            </h1>
            <span className="truncate text-xs text-muted-foreground">
              合同文件：YHSC2605270003电子合同.pdf
            </span>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <Button variant="ghost" size="sm" className="hidden gap-1.5 sm:inline-flex">
            <Columns2 className="size-4" />
            视图布局
          </Button>
          <Button variant="ghost" size="sm" className="hidden gap-1.5 md:inline-flex">
            <Download className="size-4" />
            下载
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5">
            <FileDown className="size-4" />
            <span className="hidden sm:inline">导出修订条目</span>
          </Button>
          <Button size="sm">保存正文</Button>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setPanelOpen((v) => !v)}
            title={panelOpen ? '收起修订面板' : '展开修订面板'}
          >
            {panelOpen ? (
              <PanelRightClose className="size-4" />
            ) : (
              <PanelRightOpen className="size-4" />
            )}
          </Button>
        </div>
      </header>

      {/* 主体 */}
      <div className="flex min-h-0 flex-1">
        {/* 编辑区 */}
        <div className="min-w-0 flex-1 overflow-y-auto bg-muted/40 px-6 py-6">
          <div className="mx-auto max-w-3xl">
            {/* 工具条与纸面同为一体 */}
            <div className="overflow-hidden rounded-2xl bg-card shadow-sm ring-1 ring-foreground/10">
              <EditorToolbar />
              <article className="px-10 py-10 leading-loose text-foreground [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:font-serif [&_h2]:text-lg [&_h2]:font-semibold [&_p]:mb-4 [&_p]:text-[15px] [&_p]:leading-8">
                <h1 className="mb-6 font-serif text-2xl font-bold">房屋租赁合同测试</h1>
                <p>
                  出租人（也称甲方）：<Mark>杭州方家埭股份经济合作社</Mark>
                </p>
                <p>
                  法定代表人/负责人：<Mark>李国云</Mark> 联系地址：
                  <Mark>申花路99号运河财富中心9幢招商服务中心</Mark>
                </p>
                <p>
                  承租人（也称乙方）：<Mark>杭州千替智能科技有限公司</Mark>
                </p>
                <p>
                  法定代表人/负责人：姜易言 联系地址：申花路99号运河财富中心7幢1207室
                  联系电话：15010859125 根据《中华人民共和国民法典》等有关法律法规，在平等、自愿、诚实信用的基础上，就乙方承租甲方有权出租的房屋事项，经双方协商一致，订立本合同，以供双方共同遵守。
                </p>

                <h2>1. 租赁物基本情况</h2>
                <p>
                  1.1、甲方出租给乙方的租赁物是位于
                  <Mark>浙江省杭州市拱墅区祥符街道运河财富中心7幢1207</Mark>
                  的房屋。该房屋建筑面积为<Mark>137.00平方米</Mark>
                  。双方确认，如该约定面积与实测绘面积存在误差的，不论是约定面积大于实测绘面积还是约定面积小于实测绘面积，双方均同意按该约定面积计出租面积，不再变更本合同中包括租金总额在内的权利义务。
                </p>
                <p>
                  1.2、乙方在签署本合同前，已经现场勘查了租赁物，已经查阅了本项目的房屋不动产权证书，对租赁物的土地性质、权属情况、位置、证照中载明的房屋用途、功能、大小、可使用部位、朝向、目前的周边环境及将来可能的周边环境、装饰装修物的损坏等情况均已充分了解，同时也已经清楚的知道租赁物存在或可能存在的缺陷等不利因素，乙方对这些情况和不利因素均无异议。
                </p>

                <h2>2. 租赁期限与租赁物交付</h2>
                <p>
                  2.1、双方约定租赁期限为<Mark>2026年05月30日</Mark>起至
                  <Mark>2027年05月29日</Mark>止，共计<Mark>12</Mark>
                  个月。双方约定免租期：第1期自2026年11月30日起至2027年01月08日止，为40天；免租期内，乙方无需承担租金。
                </p>
              </article>
            </div>
            <p className="mt-4 text-center text-xs text-muted-foreground">— 正文内容已省略，共约 8 页 —</p>
          </div>
        </div>

        {/* 待修订面板 */}
        <aside
          className={cn(
            'shrink-0 overflow-hidden border-l border-border bg-card transition-[width] duration-300',
            panelOpen ? 'w-[380px]' : 'w-0',
          )}
        >
          <div className="h-full w-[380px]">
            <RevisionPanel />
          </div>
        </aside>
      </div>
    </div>
  )
}
