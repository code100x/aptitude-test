'use client'

import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import throttle from 'lodash.throttle'

type NavbarWrapperProps = {
  children: React.ReactNode
  className: string
}

export const NavbarWrapper = ({ children, className }: NavbarWrapperProps) => {
  const [prevScrollPos, setPrevScrollPos] = useState<number>(0)
  const [visible, setVisible] = useState<boolean>(true)

  useEffect(() => {
    const handleScroll = throttle(() => {
      const currentScrollPos = window.pageYOffset

      setVisible(prevScrollPos > currentScrollPos || currentScrollPos === 0)
      setPrevScrollPos(currentScrollPos)
    }, 100)

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [prevScrollPos])

  return (
    <div
      id='navbar'
      style={{
        top: visible ? '0' : '-100px',
        transition: 'top 0.3s ease-in-out',
      }}
      className={cn(className, 'fixed w-full')}
      role='navigation'
      aria-label='main navigation'
    >
      {children}
    </div>
  )
}
