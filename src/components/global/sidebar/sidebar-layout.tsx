'use client'

import { cn } from '@/lib/utils'
import { useStore } from '@/hooks/use-store'
import { Sidebar } from '@/components/global/sidebar/sidebar'
import { useSidebarToggle } from '@/hooks/use-sidebar-toggle'

export const SidebarLayout = ({ children }: { children: React.ReactNode }) => {
  const sidebar = useStore(useSidebarToggle, (state) => state)

  if (!sidebar) return null

  return (
    <>
      <Sidebar />
      <main
        className={cn(
          'min-h-[calc(100vh_-_56px)]transition-[margin-left] md:px-8 px-2 ease-in-out duration-300',
          sidebar?.isOpen === false ? 'lg:ml-[90px]' : 'lg:ml-72'
        )}
      >
        {children}
      </main>
    </>
  )
}
