'use client'

import React, { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams, useRouter } from 'next/navigation'
import { toast } from 'sonner'
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { LockKeyhole } from 'lucide-react'
import { PasswordInput } from '@/components/global/password-input'
import { newPasswordSchema, newPasswordValues } from '@/schemas'
import { NewPassword } from '@/actions/new-password'

export const NewPasswordForm = () => {
  const [isPending, startTransition] = useTransition()
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get('token')

  const form = useForm<newPasswordValues>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: '',
    },
  })

  const onSubmit = (values: newPasswordValues) => {
    startTransition(() => {
      NewPassword(values, token).then((data) => {
        if (data?.error) {
          toast.error(data.error)
        }
        if (data?.success) {
          toast.success(data.success)
          router.push('/login') // Redirect to login page after successful password reset
        }
      })
    })
  }

  return (
    <Card className='w-full max-w-md mx-auto mt-24'>
      <CardHeader>
        <div className='flex items-center space-x-2'>
          <LockKeyhole className='w-6 h-6 text-primary' />
          <CardTitle>Set New Password</CardTitle>
        </div>
        <CardDescription>
          Enter your new password to complete the reset process.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-4'
            noValidate
          >
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      {...field}
                      disabled={isPending}
                      placeholder='*****'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <Button
          onClick={form.handleSubmit(onSubmit)}
          disabled={isPending}
          className='w-full'
        >
          {isPending ? 'Resetting...' : 'Reset Password'}
        </Button>
      </CardFooter>
    </Card>
  )
}

export default NewPasswordForm
