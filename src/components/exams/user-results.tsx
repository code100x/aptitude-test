'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { motion } from 'framer-motion'

interface UserResult {
  id: string
  examTitle: string
  score: number
  totalQuestions: number
  timeSpent: number
  date: string
  examId: string
}

export interface UserResultsProps {
  results: UserResult[]
}

export default function UserResults({ results }: UserResultsProps) {
  const router = useRouter()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className='mx-auto mt-8 px-4'
    >
      <Card className='w-full overflow-hidden'>
        <CardHeader className='bg-gradient-to-r from-cyan-500 to-blue-500 text-white'>
          <CardTitle className='text-2xl font-bold'>
            Your Exam Results
          </CardTitle>
        </CardHeader>
        <CardContent className='p-0'>
          <div className='overflow-x-auto'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className='font-semibold'>Exam</TableHead>
                  <TableHead className='font-semibold'>Score</TableHead>
                  <TableHead className='font-semibold'>Time Spent</TableHead>
                  <TableHead className='font-semibold'>Date</TableHead>
                  <TableHead className='font-semibold'>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {results.map((result, index) => (
                  <motion.tr
                    key={result.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <TableCell className='font-medium'>
                      {result.examTitle}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`font-semibold ${
                          (result.score / result.totalQuestions) * 100 >= 70
                            ? 'text-green-600'
                            : 'text-red-600'
                        }`}
                      >
                        {result.score}/{result.totalQuestions}
                      </span>
                    </TableCell>
                    <TableCell>
                      {Math.floor(result.timeSpent / 60)}m{' '}
                      {result.timeSpent % 60}s
                    </TableCell>
                    <TableCell>
                      {new Date(result.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Button
                        size='sm'
                        className='bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white'
                        onClick={() =>
                          router.push(`/exam-results/${result.id}`)
                        }
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
