'use client'

import React, { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import { updateUserDetailsSchema, UpdateUserDetailsValues } from '@/schemas'
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
import { updateUserDetails } from '@/actions/auth-actions'

export default function UpdateUserDetailsForm() {
  const [isPending, startTransition] = useTransition()

  const form = useForm<UpdateUserDetailsValues>({
    resolver: zodResolver(updateUserDetailsSchema),
    defaultValues: {
      username: '',
      displayName: '',
    },
  })

  const onSubmit = (values: UpdateUserDetailsValues) => {
    startTransition(async () => {
      try {
        const result = await updateUserDetails(values)
        if (result.error) {
          toast.error(result.error)
        } else {
          toast.success('User details updated successfully!')
          form.reset(values)
        }
      } catch (error) {
        toast.error('An error occurred while updating user details')
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 pt-24'>
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder='johndoe' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='displayName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display Name</FormLabel>
              <FormControl>
                <Input placeholder='John Doe' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' className='w-full' disabled={isPending}>
          {isPending ? 'Updating...' : 'Update Details'}
        </Button>
      </form>
    </Form>
  )
}
