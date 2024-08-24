import { NavbarStart } from '@/components/global/navbar/navbar-start'
import { NavbarCenter } from '@/components/global/navbar/navbar-center'
import { NavbarEnd } from '@/components/global/navbar/navbar-end'
import { NavbarWrapper } from '@/components/global/navbar/navbar-wrapper'

export const Navbar = () => {
  return (
    <NavbarWrapper className='fixed h-14 inset-x-0 w-full backdrop-blur-lg transition-all top-0 right-0 left-0 p-4 flex items-center justify-between z-[100]'>
      <NavbarStart />
      <NavbarCenter />
      <NavbarEnd />
    </NavbarWrapper>
  )
}
