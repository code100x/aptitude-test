import { cn } from '@/lib/utils'
import { useStore } from '@/hooks/use-store'
import { Button } from '@/components/ui/button'
import { Menu } from '@/components/global/sidebar/menu-options'
import { useSidebarToggle } from '@/hooks/use-sidebar-toggle'
import { SidebarToggle } from '@/components/global/sidebar/sidebar-toggle'
import Image from 'next/image'

export const Sidebar = () => {
  const sidebar = useStore(useSidebarToggle, (state) => state)

  if (!sidebar) return null

  return (
    <aside
      className={cn(
        'fixed top-0 left-0 z-[30] h-screen -translate-x-full border-r border-secondary lg:translate-x-0 transition-[width] ease-in-out duration-300',
        sidebar?.isOpen === false ? 'w-[90px]' : 'w-72'
      )}
    >
      <SidebarToggle isOpen={sidebar?.isOpen} setIsOpen={sidebar?.setIsOpen} />
      <div className='relative h-full flex flex-col px-3 py-4 overflow-y-auto shadow-md'>
        <Button
          className={cn(
            'transition-transform ease-in-out duration-300 mb-1 pointer-events-none',
            sidebar?.isOpen === false ? 'translate-x-1' : 'translate-x-0'
          )}
          variant='ghost'
        >
          <div className=' w-8 h-8 mr-auto'>
            <Image
              src={
                'https://d2szwvl7yo497w.cloudfront.net/courseThumbnails/main.png'
              }
              alt='Sidebar Logo'
              width={100}
              height={100}
            />
          </div>
          <h1
            className={cn(
              'font-bold text-lg whitespace-nowrap transition-[transform,opacity,display] ease-in-out duration-300',
              sidebar?.isOpen === false
                ? '-translate-x-96 opacity-0 hidden'
                : 'translate-x-0 opacity-100'
            )}
          >
            100xDevs
          </h1>
        </Button>
        <Menu isOpen={sidebar?.isOpen} />
      </div>
    </aside>
  )
}
