import LoginForm from '@/components/auth/login-form'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Login',
}

export default function Page() {
  return (
    <main className='flex h-screen items-center justify-center p-5'>
      <div className='flex h-full max-h-[40rem] w-full max-w-[64rem] overflow-hidden rounded-2xl bg-card shadow-2xl'>
        <div className='w-full space-y-10 overflow-y-auto md:p-10 p-2 md:w-1/2'>
          <div className='space-y-5'>
            <LoginForm />
            <Link href='/signup' className='block text-center hover:underline'>
              Don&apos;t have an account? Sign up
            </Link>
          </div>
        </div>
        <Image
          src={
            'https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg'
          }
          alt=''
          className='hidden w-1/2 object-cover md:block'
          width={500}
          height={500}
        />
      </div>
    </main>
  )
}
