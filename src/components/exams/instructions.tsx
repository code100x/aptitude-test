import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { motion } from 'framer-motion'

interface ExamData {
  id: string
  title: string
  description: string
  price: number
  duration: number
  numQuestions: number
}

interface ExamInstructionsProps {
  examData: ExamData
  onStart: () => void
  onCancel: () => void
}

export default function ExamInstructions({
  examData,
  onStart,
  onCancel,
}: ExamInstructionsProps) {
  const [agreed, setAgreed] = useState(false)
  const { id, title, description, price, duration, numQuestions } = examData
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='flex justify-center items-center min-h-screen'
    >
      <Card className='w-full  mx-4 md:mx-0'>
        <CardHeader className='bg-primary text-white rounded-t-md'>
          <CardTitle className='text-lg font-semibold'>{title}</CardTitle>
          <p className='text-sm'>{description}</p>
        </CardHeader>
        <CardContent>
          <div className='my-6 p-4 border rounded-md border-gray-200'>
            <p className='mb-1'>
              <strong>Price:</strong> INR {price}
            </p>
            <p>
              <strong>Duration:</strong> {duration} minutes
            </p>
            <p>
              <strong>Questions:</strong> {numQuestions}
            </p>
          </div>
          <div className='mb-6 p-4 border rounded-md border-gray-200'>
            <p className='font-medium mb-2'>Instructions</p>
            <ul className='list-disc pl-5 space-y-2 text-gray-600'>
              <li>This exam must be taken in full-screen mode.</li>
              <li>
                You will be prompted to enter full-screen mode before the exam
                starts.
              </li>
              <li>
                If you exit full-screen mode during the exam, you will be
                prompted to return to full-screen.
              </li>
              <li>
                Failure to return to full-screen mode will result in automatic
                submission of your exam.
              </li>
              <li>
                Changing tabs or windows during the exam will result in
                automatic submission.
              </li>
              <li>
                Ensure you have a stable internet connection before starting the
                exam.
              </li>
              <li>
                Once you start the exam, the timer will begin and cannot be
                paused.
              </li>
            </ul>
          </div>
          <div className='flex items-center space-x-2 '>
            <Checkbox
              id='agree'
              checked={agreed}
              onCheckedChange={(checked) => setAgreed(checked as boolean)}
              className='h-5 w-5'
            />
            <label htmlFor='agree' className='text-gray-700'>
              I have read and agree to the exam instructions and conditions.
            </label>
          </div>
        </CardContent>
        <CardFooter className='flex justify-between'>
          <Button onClick={onCancel} variant='outline'>
            Cancel
          </Button>
          <Button onClick={onStart} disabled={!agreed}>
            Start Exam
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
