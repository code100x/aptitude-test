'use client'

import React, { useEffect, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCountdown } from 'usehooks-ts'
import { toast } from 'sonner'
import { signUp } from '@/actions/auth-actions'
import { resendVerificationEmail } from '@/actions/email'
import {
  onDiscordSignInClicked,
  onGithubSignInClicked,
  onGoogleSignInClicked,
} from '@/queries'
import { signUpSchema, signUpValues } from '@/schemas'
import LoadingButton from '@/components/global/loading-button'
import { PasswordInput } from '@/components/global/password-input'
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
import { GithubIcon } from '@/components/icons/github'
import { GoogleIcon } from '@/components/icons/google'
import { DiscordIcon } from '@/components/icons/discord'
import { Mail, UserPlus } from 'lucide-react'
import Link from 'next/link'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function SignUpForm() {
  const [count, { startCountdown, stopCountdown, resetCountdown }] =
    useCountdown({
      countStart: 60,
      intervalMs: 1000,
    })
  const [showSendEmail, setShowSendEmail] = useState(false)
  const [isPending, startTransition] = useTransition()

  const form = useForm<signUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      displayName: '',
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    },
  })

  useEffect(() => {
    if (count === 0) {
      stopCountdown()
      resetCountdown()
    }
  }, [count, resetCountdown, stopCountdown])

  async function onSubmit(values: signUpValues) {
    startTransition(() => {
      signUp(values).then((response) => {
        if (response && response?.error) {
          toast.error(response.error)
          return
        }
        toast.success('Account created successfully, Email verification sent!')
        form.reset()
        setShowSendEmail(true)
      })
    })
  }

  const onResendVerificationEmail = async () => {
    const res = await resendVerificationEmail(form.getValues('email'))
    if (res.error) {
      toast.error(res.error)
    } else if (res.success) {
      toast.success(res.success)
      startCountdown()
    }
  }

  return (
    <Card className='w-full max-w-md mx-auto'>
      <CardHeader>
        <div className='flex items-center space-x-2'>
          <UserPlus className='w-6 h-6 text-primary' />
          <CardTitle>Sign Up</CardTitle>
        </div>
        <CardDescription>
          Create a new account or sign up using your preferred method
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue='email'>
          <TabsList className='grid w-full grid-cols-2'>
            <TabsTrigger value='email'>Email</TabsTrigger>
            <TabsTrigger value='social'>Social</TabsTrigger>
          </TabsList>
          <TabsContent value='email'>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-4'
              >
                {[
                  'displayName',
                  'username',
                  'email',
                  'password',
                  'confirmPassword',
                ].map((fieldName) => (
                  <FormField
                    key={fieldName}
                    control={form.control}
                    name={fieldName as keyof signUpValues}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {fieldName === 'displayName'
                            ? 'Display Name'
                            : fieldName === 'confirmPassword'
                              ? 'Confirm Password'
                              : fieldName.charAt(0).toUpperCase() +
                                fieldName.slice(1)}
                        </FormLabel>
                        <FormControl>
                          {fieldName.includes('password') ? (
                            <PasswordInput placeholder='********' {...field} />
                          ) : (
                            <Input
                              placeholder={
                                fieldName === 'displayName'
                                  ? 'John Doe'
                                  : fieldName === 'email'
                                    ? 'example@gmail.com'
                                    : fieldName
                              }
                              {...field}
                            />
                          )}
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
                {showSendEmail && (
                  <Button
                    type='button'
                    disabled={count > 0 && count < 60}
                    onClick={onResendVerificationEmail}
                    variant='link'
                    className='p-0 h-auto font-normal text-xs'
                  >
                    Send verification email{' '}
                    {count > 0 && count < 60 && `in ${count}s`}
                  </Button>
                )}
                <LoadingButton
                  loading={isPending}
                  type='submit'
                  className='w-full'
                >
                  Create account
                </LoadingButton>
              </form>
            </Form>
          </TabsContent>
          <TabsContent value='social'>
            <div className='space-y-4'>
              <Button
                onClick={onDiscordSignInClicked}
                variant='secondary'
                className='w-full flex items-center justify-center gap-2'
              >
                <DiscordIcon className='w-5 h-5' />
                Sign up with Discord
              </Button>
              <Button
                onClick={onGithubSignInClicked}
                variant='secondary'
                className='w-full flex items-center justify-center gap-2'
              >
                <GithubIcon className='w-5 h-5' />
                Sign up with GitHub
              </Button>
              <Button
                onClick={onGoogleSignInClicked}
                variant='secondary'
                className='w-full flex items-center justify-center gap-2'
              >
                <GoogleIcon className='w-5 h-5' />
                Sign up with Google
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
