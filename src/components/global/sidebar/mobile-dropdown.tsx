import { MenuIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Menu } from '@/components/global/sidebar/menu-options'
import {
  Sheet,
  SheetHeader,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import Image from 'next/image'

type SheetMenuProps = {
  className?: string
}

export const SheetMenu = ({ className }: SheetMenuProps) => {
  return (
    <Sheet>
      <SheetTrigger
        aria-label='sidebar trigger'
        asChild
        className={cn(
          'left-2 top-2 z-[100] lg:!hidden flex fixed rounded-full',
          className
        )}
      >
        <Button
          aria-label='menu icon'
          className='rounded-full'
          variant='outline'
          size={'icon'}
        >
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent
        showX
        className='w-[300px] z-[101] px-3 h-full flex flex-col'
        side='left'
      >
        <SheetHeader>
          <AspectRatio ratio={16 / 5} className=' mb-3 md:mb-5 rounded-full'>
            <Image
              src={
                'https://d2szwvl7yo497w.cloudfront.net/courseThumbnails/main.png'
              }
              alt='Sidebar Logo'
              fill
              className='object-contain rounded-full'
            />
          </AspectRatio>
          <p className='text-center items-center flex flex-col justify-center lg:mb-4 md:mb-2 mb-1'>
            100xDevs
          </p>
        </SheetHeader>
        <Menu isOpen />
      </SheetContent>
    </Sheet>
  )
}
