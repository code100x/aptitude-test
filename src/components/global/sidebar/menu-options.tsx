'use client'

import Link from 'next/link'
import { Ellipsis } from 'lucide-react'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { CollapseMenuButton } from '@/components/global/sidebar/collapse-menu-button'
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from '@/components/ui/tooltip'
import { getMenuList } from '@/config'

interface MenuProps {
  isOpen: boolean | undefined
}

export const Menu = ({ isOpen }: MenuProps) => {
  const pathname = usePathname()
  const menuList = getMenuList(pathname)

  return (
    <nav className='mt-8 h-full w-full overflow-scroll overflow-x-hidden sidebar z-[30]'>
      <ul className='flex flex-col min-h-[calc(100vh-48px-36px-16px-32px)] lg:min-h-[calc(100vh-32px-40px-32px)] items-start space-y-1 px-2'>
        {menuList.map(({ groupLabel, menus }, index) => (
          <li className={cn('w-full space-y-4', groupLabel ? 'pt-5' : '')} key={index}>
            {(isOpen && groupLabel) || isOpen === undefined ? (
              <p className='text-sm font-medium text-muted-foreground px-4 pb-2 max-w-[248px] truncate'>
                {groupLabel}
              </p>
            ) : !isOpen && isOpen !== undefined && groupLabel ? (
              <TooltipProvider>
                <Tooltip delayDuration={100}>
                  <TooltipTrigger className='w-full'>
                    <div className='w-full flex justify-center items-center'>
                      <Ellipsis className='h-5 w-5' />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side='right'>
                    <p>{groupLabel}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              <p className='pb-2'></p>
            )}
            {menus.map(
              ({ href, label, icon: Icon, active, submenus }, index) =>
                submenus.length === 0 ? (
                  <div key={index} className='w-full'>
                    <TooltipProvider disableHoverableContent>
                      <Tooltip delayDuration={100}>
                        <TooltipTrigger asChild>
                          <Button
                            variant={active ? 'default' : 'ghost'}
                            className={`w-full justify-start rounded-full border-0 active:border-0 h-10 mb-1 ${active ? 'text-white dark:text-white' : ''}`}
                            asChild
                          >
                            <Link href={href}>
                              <span
                                className={cn(isOpen === false ? '' : 'mr-4')}
                              >
                                <Icon size={18} />
                              </span>
                              <p
                                className={cn(
                                  'max-w-[200px] truncate',
                                  isOpen === false
                                    ? '-translate-x-96 opacity-0'
                                    : 'translate-x-0 opacity-100'
                                )}
                              >
                                {label}
                              </p>
                            </Link>
                          </Button>
                        </TooltipTrigger>
                        {isOpen === false && (
                          <TooltipContent side='right'>{label}</TooltipContent>
                        )}
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                ) : (
                  <div className='w-full' key={index}>
                    <CollapseMenuButton
                      icon={Icon}
                      label={label}
                      active={active}
                      submenus={submenus}
                      isOpen={isOpen}
                    />
                  </div>
                )
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}
