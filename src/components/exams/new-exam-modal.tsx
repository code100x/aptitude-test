'use client'

import * as React from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createExamSchema, CreateExamValues } from '@/schemas'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { X } from 'lucide-react'
import { createExam, getExams, updateExam } from '@/actions/exams'
import { useGlobalStore } from '@/store'

type DefaultValues = {
  id?: string
  title: string
  description: string
  duration: number
  price: number
  numQuestions: number
}

interface NewExamModalProps {
  defaultValues?: DefaultValues | null
  onClose: () => void
  open: boolean
  trigger?: React.ReactNode
  fetchExams: () => void
}

export const NewExamModal = ({
  defaultValues,
  onClose,
  open,
  trigger,
  fetchExams,
}: NewExamModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<CreateExamValues>({
    resolver: zodResolver(createExamSchema),
    defaultValues: defaultValues || {
      title: '',
      description: '',
      duration: undefined,
      price: undefined,
      numQuestions: undefined,
    },
  })

  React.useEffect(() => {
    if (defaultValues) {
      reset({ ...defaultValues })
    } else {
      reset()
    }
  }, [defaultValues, setValue, reset])

  const handleCreateOrUpdateExam = async (data: CreateExamValues) => {
    try {
      let response
      if (defaultValues) {
        if (!defaultValues.id) {
          console.error('Error: Exam ID is missing for update.')
          toast.error('Exam ID is missing. Cannot update exam.')
          return
        }
        const examData = { id: defaultValues?.id, ...data }

        const response = await updateExam(examData)

        if (response.success) {
          toast.success('Exam updated successfully!')
        }
      } else {
        response = await createExam(data)
        if (response.succes) {
          toast.success('Exam created successfully!')
        }
      }

      if (response?.succes) {
        fetchExams()
        onClose()
        reset()
      }
    } catch (error) {
      console.error('Error handling exam:', error)
      toast.error('An error occurred. Please try again.')
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}
      <Dialog.Content className='fixed inset-0 z-50 overflow-y-auto'>
        <div className='flex items-center justify-center min-h-screen'>
          <Dialog.DialogOverlay className='fixed inset-0 bg-black opacity-30' />
          <div className='relative bg-white rounded-lg w-96 max-w-full p-6'>
            <Dialog.Close
              onClick={onClose}
              className='absolute top-3 right-3 text-black hover:text-gray-700 focus:outline-none'
            >
              <X size={20} />
            </Dialog.Close>
            <form
              className='space-y-4'
              onSubmit={handleSubmit(handleCreateOrUpdateExam)}
            >
              <div>
                <label
                  htmlFor='title'
                  className='block text-md font-medium text-gray-700'
                >
                  Title
                </label>
                <input
                  id='title'
                  type='text'
                  {...register('title')}
                  className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary sm:text-sm'
                />
                {errors.title && (
                  <p className='text-red-600 text-sm'>{errors.title.message}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor='description'
                  className='block text-md font-medium text-gray-700'
                >
                  Description
                </label>
                <textarea
                  id='description'
                  {...register('description')}
                  className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary sm:text-sm max-h-28'
                  rows={4}
                />
                {errors.description && (
                  <p className='text-red-600 text-sm'>
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor='numQuestions'
                  className='block text-md font-medium text-gray-700'
                >
                  Number of Questions
                </label>
                <input
                  id='numQuestions'
                  type='number'
                  {...register('numQuestions', { valueAsNumber: true })}
                  className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary sm:text-sm'
                />
                {errors.numQuestions && (
                  <p className='text-red-600 text-sm'>
                    {errors.numQuestions.message}
                  </p>
                )}
              </div>
              <div className='flex gap-2 items-center'>
                <div>
                  <label
                    htmlFor='duration'
                    className='block text-md font-medium text-gray-700'
                  >
                    Duration (in minutes)
                  </label>
                  <input
                    id='duration'
                    type='number'
                    {...register('duration', { valueAsNumber: true })}
                    className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary sm:text-sm'
                  />
                  {errors.duration && (
                    <p className='text-red-600 text-sm'>
                      {errors.duration.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor='price'
                    className='block text-md font-medium text-gray-700'
                  >
                    Price
                  </label>
                  <input
                    id='price'
                    type='number'
                    {...register('price', { valueAsNumber: true })}
                    className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary sm:text-sm'
                  />
                  {errors.price && (
                    <p className='text-red-600 text-sm'>
                      {errors.price.message}
                    </p>
                  )}
                </div>
              </div>

              <div className='mt-4 flex justify-end gap-4'>
                <Button
                  variant='outline'
                  onClick={() => {
                    onClose()
                    reset()
                  }}
                >
                  Cancel
                </Button>
                <Button type='submit'>
                  {defaultValues ? 'Update Exam' : 'Create Exam'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  )
}
