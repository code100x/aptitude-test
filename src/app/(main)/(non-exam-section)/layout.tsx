import { SidebarLayout } from '@/components/global/sidebar/sidebar-layout'
import { InfoBar } from '@/components/global/info-bar'
import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarLayout>
      <InfoBar />
      {children}
    </SidebarLayout>
  )
}

export default Layout
