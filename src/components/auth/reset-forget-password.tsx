'use client'

import React, { useState, useTransition, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { toast } from 'sonner'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
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
import { ResetSchema } from '@/schemas'
import { reset } from '@/actions/reset-forget'

export const ResetForm = () => {
  const [isPending, startTransition] = useTransition()
  const [countdown, setCountdown] = useState(0)

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: '',
    },
  })

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    if (countdown > 0) {
      toast.error(
        `Please wait ${countdown} seconds before requesting another reset.`
      )
      return
    }

    startTransition(() => {
      reset(values).then((data) => {
        if (data?.error) {
          toast.error(data.error)
        }
        if (data?.success) {
          toast.success(data.success)
          setCountdown(60) // Start 60-second countdown
        }
      })
    })
  }

  return (
    <Card className='w-full max-w-md mx-auto mt-24'>
      <CardHeader>
        <div className='flex items-center space-x-2'>
          <LockKeyhole className='w-6 h-6 text-primary' />
          <CardTitle>Reset Password</CardTitle>
        </div>
        <CardDescription>
          Enter your email address to receive a password reset link.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending || countdown > 0}
                      placeholder='john.doe@example.com'
                      type='email'
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
          disabled={isPending || countdown > 0}
          className='w-full'
        >
          {countdown > 0 ? `Resend in ${countdown}s` : 'Send reset email'}
        </Button>
      </CardFooter>
    </Card>
  )
}

export default ResetForm
