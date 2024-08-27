'use client'

import { Button } from '@/components/ui/button'
import { navbarLinks } from '@/config'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const NavbarCenter = () => {
  const pathname = usePathname()
  return (
    <nav className='hidden absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%] flex-shrink-0 lg:flex'>
      <div className='flex items-center justify-center gap-8'>
        {navbarLinks.map((item) => (
          <Button
            key={item.href}
            variant={'ghost'}
            className={cn('font-bold !capitalize', {
              'text-primary  font-bold ': pathname === '/reset-password',
            })}
            asChild
          >
            <Link href={item.href} scroll={false}>
              {item.name}
            </Link>
          </Button>
        ))}
      </div>
    </nav>
  )
}
