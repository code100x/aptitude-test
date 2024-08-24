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

interface ExamInstructionsProps {
  examId: string
  examTitle: string
  examDescription: string
  examPrice: number
  examDuration: number
  onStart: () => void
  onCancel: () => void
}

export default function ExamInstructions({
  examId,
  examTitle,
  examDescription,
  examPrice,
  examDuration,
  onStart,
  onCancel,
}: ExamInstructionsProps) {
  const [agreed, setAgreed] = useState(false)

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className='mt-12 w-full mx-auto'>
        <CardHeader>
          <CardTitle>{examTitle} - Instructions</CardTitle>
        </CardHeader>
        <CardContent>
          <p className='mb-4'>{examDescription}</p>
          <p className='mb-4'>Price: INR {examPrice}</p>
          <p className='mb-4'>Duration: {examDuration} minutes</p>
          <ul className='list-disc pl-5 space-y-2'>
            <li>This exam must be taken in full-screen mode.</li>
            <li>
              You will be prompted to enter full-screen mode before the exam
              starts.
            </li>
            <li>
              If you exit full-screen mode during the exam, you will be prompted
              to return to full-screen.
            </li>
            <li>
              Failure to return to full-screen mode will result in automatic
              submission of your exam.
            </li>
            <li>
              Changing tabs or windows during the exam will result in automatic
              submission.
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
          <div className='flex items-center space-x-2 mt-4'>
            <Checkbox
              id='agree'
              checked={agreed}
              onCheckedChange={(checked) => setAgreed(checked as boolean)}
            />
            <label htmlFor='agree'>
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
