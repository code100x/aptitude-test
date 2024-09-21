'use client'

import { motion } from 'framer-motion'
import QuestionsForm from './components/questions-form'
import Preview from './components/questions-preview'
import {
  createQuestionsSchema,
  createQuestionsValues,
  updateQuestionsValues,
} from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useFieldArray } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { convertImagePathToDataURL } from '@/lib/imagePathToUrl'
import { createQuestions, updateQuestions } from '@/actions/questions'
import { toast } from 'sonner'
import { usePathname, useRouter } from 'next/navigation'
import { useGlobalStore } from '@/store'

type DefaultValues = {
  questions: {
    text: string
    options: string[]
    correctAnswer: number
    image: File | string | null
  }[]
}

export default function QuestionsBank() {
  const { selectedQuestions, setSelectedQuestions } = useGlobalStore()
  const router = useRouter()
  const pathname = usePathname()

  let defaultValues: DefaultValues = {
    questions: [
      {
        text: 'What will be the output ?',
        options: ['5', 'undefined', '2', '(2,4,5)'],
        image: '/mcq/q1.png',
        correctAnswer: 0,
      },
      {
        text: 'What is the correct JavaScript syntax to change the content of the HTML element? <p id="demo">This is a demonstration.</p> ',
        options: [
          'document.getElement("p").innerHTML = "Hello World!";',
          '#demo.innerHTML = "Hello World!";',
          'document.getElementById("demo").innerHTML = "Hello World!";',
          'document.getElementByName("p").innerHTML = "Hello World!";',
        ],
        image: null,
        correctAnswer: 2,
      },
    ],
  }
  const {
    control,
    handleSubmit,
    register,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<createQuestionsValues>({
    resolver: zodResolver(createQuestionsSchema),
    defaultValues:
      pathname === '/questions/edit' && selectedQuestions.length > 0
        ? { questions: selectedQuestions }
        : defaultValues,
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions',
  })

  const questions = watch('questions')

  const onSubmit = async (data: createQuestionsValues) => {
    let response

    // Case 1: Updating existing questions
    if (pathname === '/questions/edit') {
      
      const questionsWithId = data.questions.map((question, index) => {
        if (index >= selectedQuestions.length) {
          return { ...question, id: null }
        }

        return { ...question, id: selectedQuestions[index].id }
      })
      if (!questionsWithId.every((q) => q.id)) {
        return { error: 'Each question must have an ID for updating.' }
      }
      response = await updateQuestions(
        questionsWithId as updateQuestionsValues['questions']
      )
    } else {
      // Case 1: Creating new questions
      response = await createQuestions(data)
    }

    if (response.success) {
      toast.success('Questions created successfully')
      router.push('/questions')
      reset()
      setSelectedQuestions([])
    } else {
      toast.error('An error occurred while creating questions.')
    }
  }

  return (
    <div className='container py-8 px-4 relative w-full'>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className='flex flex-col justify-center'>
          <h1 className='text-center text-4xl font-bold text-primary'>
            {pathname === '/questions/edit'
              ? 'Edit Questions'
              : 'New Questions'}
          </h1>
          <p className='text-center mt-2 text-lg text-muted-foreground max-w-2xl mx-auto'>
            {pathname === '/questions/edit'
              ? 'Edit your questions below.'
              : 'Create and preview your questions in real-time.'}
          </p>
        </div>

        <div className='flex flex-col md:flex-row  justify-center items-start mt-8'>
          <QuestionsForm
            control={control}
            handleSubmit={handleSubmit}
            register={register}
            errors={errors}
            fields={fields}
            append={append}
            remove={remove}
            onSubmit={onSubmit}
            setValue={setValue}
            reset={reset}
          />
          <div className='border-l-2 border-gray-200 mx-8 h-auto'></div>
          <Preview questions={questions} />
        </div>
      </motion.div>
    </div>
  )
}
