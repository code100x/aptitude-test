import ModeToggler from '@/components/global/mode-toggle'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { SheetMenu } from '@/components/global/sidebar/mobile-dropdown'
import { NavbarWrapper } from '@/components/global/navbar/navbar-wrapper'
import { UserButton } from '@/components/global/user-button'
import { validateRequest } from '@/auth'

type InfoBarProps = {
  className?: string
}

export const InfoBar = async ({ className }: InfoBarProps) => {
  const session = await validateRequest()
  const user = session?.user

  return (
    <NavbarWrapper
      className={cn(
        'fixed left-0 right-0 top-0 p-4 bg-background/80 backdrop-blur-md flex  gap-4 items-center',
        className
      )}
    >
      <aside className='flex lg:hidden items-center gap-2'>
        <SheetMenu />
        <Link
          href={'/'}
          className={cn(
            buttonVariants({
              variant: 'ghost',
            }),
            'ml-10 hidden lg:flex'
          )}
        >
          <Image
            src='/logo.png'
            alt='logo'
            width={40}
            height={40}
          />
        </Link>
      </aside>
      <div className='flex items-center gap-2 ml-auto'>
        {user && <UserButton user={user} />}
        <ModeToggler />
      </div>
    </NavbarWrapper>
  )
}
