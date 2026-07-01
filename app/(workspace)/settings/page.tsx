import type { Metadata } from 'next'

import { SettingsView } from '@/components/workspace/settings-view'

export const metadata: Metadata = {
  title: '用户设置 · 准典 LexPilot',
  description: '管理您的个人信息与账号安全。',
}

export default function SettingsPage() {
  return <SettingsView />
}
