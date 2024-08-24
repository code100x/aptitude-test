'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import {
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from 'lucide-react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import useSound from 'use-sound'

interface ExamResultsProps {
  result: {
    score: number
    totalQuestions: number
    timeSpent: number
    warningCount: number
    correctAnswers: number[]
    incorrectAnswers: number[]
  }
}

export default function ExamResults({ result }: ExamResultsProps) {
  const router = useRouter()
  const percentage = (result.score / result.totalQuestions) * 100
  const [playWinSound] = useSound('/sounds/success.wav')

  useEffect(() => {
    if (percentage >= 70) {
      playWinSound()
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })
    } 
  }, [percentage, playWinSound])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className='mx-auto mt-12 px-4'
    >
      <Card className='w-full overflow-hidden shadow-lg'>
        <CardHeader className='bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900 dark:to-indigo-900 p-6'>
          <CardTitle className='text-3xl font-bold text-center'>
            Exam Results
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-8 p-6'>
          <motion.div
            className='text-center'
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
          >
            <h2 className='text-5xl font-bold mb-4 text-blue-600 dark:text-blue-400'>
              {percentage.toFixed(1)}%
            </h2>
            <Progress value={percentage} className='w-full h-3 rounded-full' />
          </motion.div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className='bg-green-50 dark:bg-green-900 p-4 rounded-lg text-center'
            >
              <p className='text-sm text-green-600 dark:text-green-400 mb-1'>
                Score
              </p>
              <p className='text-2xl font-semibold text-green-700 dark:text-green-300'>
                {result.score}/{result.totalQuestions}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className='bg-blue-50 dark:bg-blue-900 p-4 rounded-lg text-center'
            >
              <p className='text-sm text-blue-600 dark:text-blue-400 mb-1'>
                Time Taken
              </p>
              <p className='text-2xl font-semibold text-blue-700 dark:text-blue-300 flex items-center justify-center'>
                <Clock className='mr-2 h-5 w-5' />
                {Math.floor(result.timeSpent / 60)}m {result.timeSpent % 60}s
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className='bg-yellow-50 dark:bg-yellow-900 p-4 rounded-lg text-center'
            >
              <p className='text-sm text-yellow-600 dark:text-yellow-400 mb-1'>
                Warnings
              </p>
              <Badge
                variant={result.warningCount > 0 ? 'destructive' : 'secondary'}
                className='text-lg py-1 px-3'
              >
                <AlertTriangle className='mr-2 h-4 w-4' />
                {result.warningCount}
              </Badge>
            </motion.div>
          </div>

          <motion.div
            className='space-y-4'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <h3 className='text-xl font-semibold'>Question Analysis</h3>
            <div className='flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8'>
              <div className='flex items-center bg-green-100 dark:bg-green-800 rounded-full px-6 py-3'>
                <CheckCircle className='text-green-500 mr-3 h-6 w-6' />
                <span className='text-lg font-medium'>
                  {result.correctAnswers.length} Correct
                </span>
              </div>
              <div className='flex items-center bg-red-100 dark:bg-red-800 rounded-full px-6 py-3'>
                <XCircle className='text-red-500 mr-3 h-6 w-6' />
                <span className='text-lg font-medium'>
                  {result.incorrectAnswers.length} Incorrect
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <Button
              className='w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white py-3 text-lg'
              onClick={() => router.push(`/user-results`)}
            >
              View All My Results
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
