import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { LogOutIcon, User2 } from 'lucide-react'
import { LogoutButton } from '@/components/global/logout-button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { User } from 'lucia'

export const UserButton = async ({ user }: { user: User }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger aria-label='user profile trigger'>
        <Avatar aria-label='user avatar' className='h-8 w-8'>
          <AvatarImage alt='user-button' src={user.imageUrl ?? 'profile.png'} />
          <AvatarFallback className='bg-primary'>
            <User2 className='text-white dark:text-black' />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-40' align='end'>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <LogoutButton>
          <DropdownMenuItem>
            <LogOutIcon className='h-4 w-4 mr-2' />
            Logout
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
