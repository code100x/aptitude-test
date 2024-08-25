import { validateRequest } from '@/auth'

import Link from 'next/link'
import ShimmerButton from '@/components/ui/shimmer-button'

export const LoginButton = async () => {
  const session = await validateRequest()
  const user = session?.user

  return (
    <>
      {!user && (
        <Link href={'/login'}>
          <ShimmerButton className='shadow-2xl bg-primary w-full'>
            <span className='whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg'>
              Get Started
            </span>
          </ShimmerButton>
        </Link>
      )}
    </>
  )
}
