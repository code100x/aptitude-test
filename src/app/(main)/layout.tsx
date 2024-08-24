import { validateRequest } from '@/auth'
import { redirect } from 'next/navigation'
import SessionProvider from '@/components/providers/session-provider'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await validateRequest()
  if (!session.user) redirect('/login')

  return (
    <SessionProvider value={session}>
      <div className='flex min-h-screen flex-col'>
        <div className='mx-auto mt-12 p-5'>{children}</div>
      </div>
    </SessionProvider>
  )
}
