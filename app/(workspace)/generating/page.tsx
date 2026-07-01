import type { Metadata } from 'next'

import { GeneratingView } from '@/components/workspace/generating/generating-view'

export const metadata: Metadata = {
  title: '元信息生成中 · 准典 LEXPILOT',
}

export default function GeneratingPage() {
  return <GeneratingView />
}
