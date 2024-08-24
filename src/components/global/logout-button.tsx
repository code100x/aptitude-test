'use client'

import { logout } from '@/actions/auth-actions'
import { ReactNode } from 'react'

interface LogoutButtonProps {
  children: ReactNode
}

export const LogoutButton = ({ children }: LogoutButtonProps) => {
  const onClick = async () => {
    await logout()
    window.location.reload()
  }
  return (
    <span onClick={onClick} className='cursor-pointer'>
      {children}
    </span>
  )
}
