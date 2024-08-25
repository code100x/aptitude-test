import ModeToggler from '@/components/global/mode-toggle'
import { UserButton } from '@/components/global/user-button'
import { LoginButton } from '../login-button'
import { validateRequest } from '@/auth'

export const NavbarEnd = async () => {
  const session = await validateRequest()
  const user = session?.user
  return (
    <aside className='flex gap-2 items-center'>
      {user ? <UserButton user={user} /> : <LoginButton />}
      <ModeToggler />
    </aside>
  )
}
