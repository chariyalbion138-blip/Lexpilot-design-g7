import type { ReactNode } from 'react'

import { WorkspaceSidebar } from '@/components/workspace/workspace-sidebar'

export default function WorkspaceLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-svh bg-background">
      <WorkspaceSidebar />
      <div className="flex min-w-0 flex-1 flex-col">{children}</div>
    </div>
  )
}
