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
  ArrowLeft,
} from 'lucide-react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import useSound from 'use-sound'
import Loader from '../ui/loader'
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts'

interface ExamResultsProps {
  result: {
    score: number
    totalQuestions: number
    timeSpent: number
    warningCount: number
    correctAnswers: string[]
    incorrectAnswers: string[]
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

  const pieData = [
    { name: 'Correct', value: result.correctAnswers.length },
    { name: 'Incorrect', value: result.incorrectAnswers.length },
  ]

  const COLORS = ['#10B981', '#EF4444']

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className='container mx-auto px-4 py-8'
    >
      {result ? (
        <Card className='w-full overflow-hidden shadow-lg'>
          <CardHeader className='bg-gradient-to-r from-blue-500 to-indigo-600 p-6'>
            <CardTitle className='text-3xl font-bold text-white text-center'>
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
              <h2 className='text-6xl font-bold mb-4 text-blue-600 dark:text-blue-400'>
                {percentage.toFixed(1)}%
              </h2>
              <Progress
                value={percentage}
                className='w-full h-4 rounded-full'
              />
            </motion.div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className='bg-green-50 dark:bg-green-900 p-6 rounded-lg text-center shadow-md'
              >
                <p className='text-sm text-green-600 dark:text-green-400 mb-2'>
                  Score
                </p>
                <p className='text-3xl font-semibold text-green-700 dark:text-green-300'>
                  {result.score}/{result.totalQuestions}
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className='bg-blue-50 dark:bg-blue-900 p-6 rounded-lg text-center shadow-md'
              >
                <p className='text-sm text-blue-600 dark:text-blue-400 mb-2'>
                  Time Taken
                </p>
                <p className='text-3xl font-semibold text-blue-700 dark:text-blue-300 flex items-center justify-center'>
                  <Clock className='mr-2 h-6 w-6' />
                  {Math.floor(result.timeSpent / 60)}m {result.timeSpent % 60}s
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className='bg-yellow-50 dark:bg-yellow-900 p-6 rounded-lg text-center shadow-md'
              >
                <p className='text-sm text-yellow-600 dark:text-yellow-400 mb-2'>
                  Warnings
                </p>
                <Badge
                  variant={
                    result.warningCount > 0 ? 'destructive' : 'secondary'
                  }
                  className='text-2xl py-2 px-4'
                >
                  <AlertTriangle className='mr-2 h-5 w-5' />
                  {result.warningCount}
                </Badge>
              </motion.div>
            </div>

            <motion.div
              className='space-y-6'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <h3 className='text-2xl font-semibold text-center'>
                Question Analysis
              </h3>
              <div className='flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-12'>
                <div className='w-64 h-64'>
                  <ResponsiveContainer width='100%' height='100%'>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx='50%'
                        cy='50%'
                        labelLine={false}
                        outerRadius={80}
                        fill='#8884d8'
                        dataKey='value'
                      >
                        {pieData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className='space-y-6'>
                  <div className='flex items-center bg-green-100 dark:bg-green-800 rounded-full px-8 py-4 shadow-md'>
                    <CheckCircle className='text-green-500 mr-4 h-8 w-8' />
                    <span className='text-2xl font-medium'>
                      {result.correctAnswers.length} Correct
                    </span>
                  </div>
                  <div className='flex items-center bg-red-100 dark:bg-red-800 rounded-full px-8 py-4 shadow-md'>
                    <XCircle className='text-red-500 mr-4 h-8 w-8' />
                    <span className='text-2xl font-medium'>
                      {result.incorrectAnswers.length} Incorrect
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className='flex justify-center'
            >
              <Button
                className='bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white py-3 px-6 text-lg rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105'
                onClick={() => router.push(`/user-results`)}
              >
                <ArrowLeft className='mr-2 h-5 w-5' />
                View All My Results
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      ) : (
        <div className='flex flex-col h-96 justify-center items-center'>
          <Loader />
          Loading Exams...
        </div>
      )}
    </motion.div>
  )
}
