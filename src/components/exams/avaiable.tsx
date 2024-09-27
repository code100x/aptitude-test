'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, useAnimation } from 'framer-motion'
import { Clock, CreditCard, Loader2 } from 'lucide-react'
import { User } from 'lucia'
import { useRazorpay } from '@/hooks/use-razorpay'

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
  description: string
  duration: number
  price: number
}

export default function AvailableExams({
  exams,
  user,
}: {
  exams: Exam[]
  user: User
}) {
  const controls = useAnimation()
  const router = useRouter()
  const processPayment = useRazorpay()

  const [loadingExamId, setLoadingExamId] = useState<string | null>(null)

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

  const handlePaymentSuccess = (examId: string) => {
    router.push(`/take/${examId}`)
  }

  const handleTakeTestClick = (examId: string, amount: number) => async () => {
    setLoadingExamId(examId)
    await processPayment({
      amount,
      examId,
      successCallback: () => handlePaymentSuccess(examId),
      user,
    })
    setLoadingExamId(null)
  }

  return (
    <div className='min-h-screen'>
      <div className='mx-auto px-4 py-12'>
        <div className='mb-12 flex items-center justify-between'>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className='text-4xl font-bold text-foreground'>
              Available Exams
            </h1>
            <p className='mt-2 max-w-2xl text-lg text-muted-foreground'>
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
                className={`flex h-full flex-col bg-gradient-to-br ${getGradientColor(
                  index
                )} border border-secondary transition-all duration-300 hover:shadow-lg`}
              >
                <CardHeader>
                  <CardTitle className='mb-2 text-xl'>{exam.title}</CardTitle>
                  <CardDescription>{exam.description}</CardDescription>
                </CardHeader>
                <CardContent className='flex-grow'>
                  <div className='mb-4 flex items-center text-muted-foreground'>
                    <Clock className='mr-2 h-4 w-4' />
                    <span>{exam.duration} minutes</span>
                  </div>
                  <div className='flex items-center font-semibold text-foreground'>
                    <CreditCard className='mr-2 h-4 w-4' />
                    <span>INR {exam.price}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className='w-full'
                    disabled={loadingExamId === exam.id}
                    onClick={handleTakeTestClick(exam.id, exam.price)}
                  >
                    {loadingExamId === exam.id ? (
                      <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    ) : (
                      'Pay & Take Test'
                    )}
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
