import { ResetForm } from '@/components/auth/reset-forget-password'
import Image from 'next/image'

const ResetPasswordPage = () => {
  return (
    <main className='flex h-screen items-center justify-center p-5'>
      <div className='flex h-full max-h-[40rem] w-full max-w-[64rem] overflow-hidden rounded-2xl bg-card shadow-2xl'>
        <div className='w-full space-y-10 overflow-y-auto md:p-10 p-2 md:w-1/2'>
          <div className='space-y-1 text-center'>
            <h1 className='text-3xl font-bold'>New Password Form</h1>
            <p className='text-muted-foreground'>Welcome vansh!</p>
          </div>
          <div className='space-y-5'>
            <ResetForm />
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

export default ResetPasswordPage
