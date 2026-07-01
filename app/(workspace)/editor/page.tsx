import type { Metadata } from 'next'

import { EditorView } from '@/components/workspace/editor/editor-view'

export const metadata: Metadata = {
  title: '审核合同处理 · 准典 LexPilot',
  description: '合同正文编辑与智能修订建议。',
}

export default function EditorPage() {
  return <EditorView />
}
