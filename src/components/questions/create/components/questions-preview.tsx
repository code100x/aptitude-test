import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Label } from '@/components/ui/label'
import { useState } from 'react'

interface Question {
  text: string
  options: string[]
  correctAnswer: number
  image?: string | null
}

interface PreviewProps {
  questions: Question[]
}

export default function Preview({ questions }: PreviewProps) {
  return (
    <div className='container min-w-36 md:min-w-[35rem] bg-primary p-6 rounded-lg shadow-md text-white'>
      <div className='flex flex-col text-center mb-4'>
        <h2 className='text-2xl font-semibold'>Preview</h2>
        <p>Your preview will appear here.</p>
      </div>
      {questions?.length === 0 ? (
        <p>Add Questions to preview here.</p>
      ) : (
        questions?.map((question, qIndex) => (
          <div key={qIndex} className='mb-4 p-4'>
            <Card className='h-full w-full flex flex-col shadow-lg'>
              <CardHeader className='bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/50 dark:to-indigo-900/50 rounded-t-md'>
                <CardTitle className='text-xl font-semibold'>
                  Question {qIndex + 1}
                </CardTitle>
              </CardHeader>
              <CardContent className='flex-1 overflow-y-auto p-6'>
                {question.text}
                {question.image !== null && (
                  <div className='flex items-center justify-center w-full p-2'>
                    <Image
                      src={question.image as string}
                      alt={`Preview ${qIndex}`}
                      width={400}
                      height={400}
                      className='rounded-md'
                    />
                  </div>
                )}

                <AnimatePresence>
                  <RadioGroup>
                    {question.options.map((option: string, oIndex: number) => {
                      const isCorrect =
                        oIndex + 1 === question.correctAnswer + 1
                      const bgColor = isCorrect ? 'bg-green-300' : 'bg-red-300'
                      return (
                        <motion.div
                          key={oIndex}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ delay: oIndex * 0.1 }}
                          className={`flex items-center space-x-3  p-2 rounded-sm ${bgColor}`}
                        >
                          <RadioGroupItem
                            value={oIndex.toString()}
                            id={`option-${qIndex}-${oIndex}`}
                            className='border-2 border-white dark:border-gray-600'
                          />
                          <Label
                            htmlFor={`option-${qIndex}-${oIndex}`}
                            className='text-base cursor-pointer dark:text-black'
                          >
                            {option}
                          </Label>
                        </motion.div>
                      )
                    })}
                  </RadioGroup>
                </AnimatePresence>
              </CardContent>
              <CardFooter className='bg-green-50 pt-4 rounded-b-md'>
                <p className='text-sm text-green-600 '>
                  Correct Answer: Option {question.correctAnswer + 1}
                </p>
              </CardFooter>
            </Card>
          </div>
        ))
      )}
    </div>
  )
}
