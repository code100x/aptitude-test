'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, useAnimation } from 'framer-motion'
import { Clock, CreditCard } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface Exam {
  id: string
  title: string
  duration: number | null
  description: string
  price: number | null
}

export default function AvailableExams({ exams }: { exams: Exam[] }) {
  const controls = useAnimation()

  useEffect(() => {
    controls.start((i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1 },
    }))
  }, [controls])

  const getGradientColor = (index: number) => {
    const colors = [
      'from-blue-500/5 to-blue-500/0',
      'from-green-500/5 to-green-500/0',
      'from-purple-500/5 to-purple-500/0',
      'from-amber-500/5 to-amber-500/0',
    ]
    return colors[index % colors.length]
  }

  return (
    <div className='min-h-screen'>
      <div className='mx-auto px-4 py-12'>
        <div className='mb-12 flex justify-between items-center'>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className='text-4xl font-bold text-foreground'>
              Available Exams
            </h1>
            <p className='mt-2 text-lg text-muted-foreground max-w-2xl'>
              Choose from our selection of professional exams to test and
              certify your skills.
            </p>
          </motion.div>
        </div>

        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {exams.map((exam, index) => (
            <motion.div
              key={exam.id}
              custom={index}
              initial={{ opacity: 0, y: 0 }}
              animate={controls}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <Card
                className={`h-full flex flex-col bg-gradient-to-br ${getGradientColor(
                  index
                )} hover:shadow-lg transition-all duration-300 border border-secondary`}
              >
                <CardHeader>
                  <CardTitle className='text-xl mb-2'>{exam.title}</CardTitle>
                  <CardDescription>{exam.description}</CardDescription>
                </CardHeader>
                <CardContent className='flex-grow'>
                  <div className='flex items-center mb-4 text-muted-foreground'>
                    <Clock className='mr-2 h-4 w-4' />
                    <span>{exam.duration} minutes</span>
                  </div>
                  <div className='flex items-center text-foreground font-semibold'>
                    <CreditCard className='mr-2 h-4 w-4' />
                    <span>
                      {exam.price === 0 ? 'FREE' : `INR ${exam.price}`}
                    </span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className='w-full'>
                    <Link href={`/take/${exam.id}`}>Take Test</Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
