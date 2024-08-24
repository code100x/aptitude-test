'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogAction,
} from '@/components/ui/alert-dialog'
import { PasswordInput } from '@/components/global/password-input'
import { resetPasswordSchema, ResetPasswordValues } from '@/schemas'
import { resetPassword } from '@/actions/reset-password'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { LockKeyhole } from 'lucide-react'

export const ResetPasswordForm = () => {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  })

  const onSubmit = (values: ResetPasswordValues) => {
    setOpen(true)
  }

  const onContinue = async () => {
    setIsSubmitting(true)
    try {
      const res = await resetPassword(form.getValues())
      if (res.success) {
        toast.success(res.message)
        form.reset()
        setOpen(false)
      } else {
        toast.error(res.message)
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Update Password</AlertDialogTitle>
            <AlertDialogDescription>
              This will update your password and log you out from all devices.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onContinue} disabled={isSubmitting}>
              {isSubmitting ? 'Updating...' : 'Continue'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Card className='w-full max-w-md mx-auto mt-24'>
        <CardHeader>
          <div className='flex items-center space-x-2'>
            <LockKeyhole className='w-6 h-6 text-primary' />
            <CardTitle>Reset Password</CardTitle>
          </div>
          <CardDescription>
            Enter your current password and choose a new one to update your
            account security.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              {['password', 'newPassword', 'confirmNewPassword'].map(
                (fieldName) => (
                  <FormField
                    key={fieldName}
                    control={form.control}
                    name={fieldName as keyof ResetPasswordValues}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {fieldName === 'password'
                            ? 'Current Password'
                            : fieldName === 'newPassword'
                              ? 'New Password'
                              : 'Confirm New Password'}
                        </FormLabel>
                        <FormControl>
                          <PasswordInput {...field} className='w-full' />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )
              )}
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <Button
            type='submit'
            className='w-full'
            onClick={form.handleSubmit(onSubmit)}
          >
            Update Password
          </Button>
        </CardFooter>
      </Card>
    </>
  )
}

export default ResetPasswordForm
