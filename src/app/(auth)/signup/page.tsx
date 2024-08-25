import SignUpForm from '@/components/auth/signup-form'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Sign Up',
}

export default function Page() {
  return (
    <main className='flex h-screen items-center justify-center p-5'>
      <div className='flex h-full max-h-[40rem] w-full max-w-[64rem] overflow-hidden rounded-2xl bg-card shadow-2xl'>
        <div className='w-full space-y-10 overflow-y-auto md:p-10 p-2 md:w-1/2'>
          <div className='space-y-5'>
            <SignUpForm />
            <Link href='/login' className='block text-center hover:underline'>
              Already have an account? Log in
            </Link>
          </div>
        </div>
        <Image
          src={
            'https://img.freepik.com/free-photo/smiley-businesswoman-posing-outdoors-with-arms-crossed-copy-space_23-2148767055.jpg'
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
