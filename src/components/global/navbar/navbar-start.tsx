'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { SheetMenu } from '@/components/global/sidebar/mobile-dropdown'

export const NavbarStart = () => {
  const pathname = usePathname()
  return (
    <aside className='flex items-center gap-2'>
      <SheetMenu />

      <Link
        href={'/'}
        className={
          (cn(
            buttonVariants({
              variant: 'ghost',
            })
          ),
          'hidden lg:flex lg:items-center')
        }
      >
        <Image
          unoptimized
          src='/logo.png'
          alt='logo'
          width={40}
          height={40}
        />
        <p
          className={cn('ml-2 font-bold flex', {
            'text-primary': pathname === '/',
          })}
        >
          100xDevs
        </p>
      </Link>
    </aside>
  )
}
