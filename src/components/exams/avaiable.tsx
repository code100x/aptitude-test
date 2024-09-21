'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, useAnimation } from 'framer-motion'
import { User } from 'lucia'
import { useRazorpay } from '@/hooks/use-razorpay'
import {
  Clock,
  CreditCard,
  Loader2,
  FilePlus2,
  FileQuestion,
  Pencil,
  Trash2,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { NewExamModal } from './new-exam-modal'
import { useGlobalStore } from '@/store'
import Loader from '../ui/loader'
import { deleteExam, getExams } from '@/actions/exams'
import { toast } from 'sonner'
import { ConfirmDeleteModal } from '../ui/confirm-delete-modal'

type Exam = {
  id: string
  title: string
  description: string
  numQuestions: number
  duration: number
  price: number
}

export default function AvailableExams({ user }: { user: User }) {
  const { exams, setExams } = useGlobalStore((state) => ({
    exams: state.exams,
    setExams: state.setExams,
  }))

  const [selectedExam, setSelectedExam] = useState<Exam | null>(null)
  const [isCreateModalOpen, setCreateModalOpen] = useState(false)
  const [isEditModalOpen, setEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [examToDelete, setExamToDelete] = useState<string | null>(null)

  const controls = useAnimation()
  const router = useRouter()
  const processPayment = useRazorpay()

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    controls.start((i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1 },
    }))
  }, [controls])

  useEffect(() => {
    fetchExams()
  }, [])

  const fetchExams = async () => {
    try {
      const response = await getExams()
      console.log('Response=> ', response)
      if (response.success && response.data) {
        setExams(response.data)
      } else {
        console.error('Failed to fetch exams')
      }
    } catch (error) {
      console.error('Error fetching exams:', error)
    }
  }

  const handleDeleteClick = (examId: string) => {
    setExamToDelete(examId)
    setDeleteModalOpen(true)
  }

  const handleDelete = async () => {
    if (!examToDelete) return

    setIsDeleting(true)
    try {
      await deleteExam(examToDelete)
      toast.success('Exam Deleted Successfully.')
      setDeleteModalOpen(false)
      fetchExams()
    } catch (error) {
      toast.error(`Failed to delete exam`)
    } finally {
      setIsDeleting(false)
    }
  }

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
    setIsLoading(true)
    await processPayment({
      amount,
      examId,
      successCallback: () => handlePaymentSuccess(examId),
      user,
    })
    setIsLoading(false)
  }

  return (
    <div className='min-h-screen w-full'>
      <div className='mx-auto px-4 py-12'>
        <div className='mb-12 flex justify-start md:mr-16 md:justify-between'>
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
          <div className='flex gap-2'>
            <Button onClick={() => setCreateModalOpen(true)}>
              <FilePlus2 className='mr-2 h-4 w-4' /> New Exam
            </Button>
          </div>
        </div>

        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {exams.length > 0 ? (
            exams.map((exam, index) => (
              <motion.div
                key={exam.id}
                custom={index}
                initial={{ opacity: 1, y: 1 }}
                animate={controls}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <Card
                  className={`flex h-full flex-col bg-gradient-to-br ${getGradientColor(
                    index
                  )} border border-secondary transition-all duration-300 hover:shadow-lg`}
                >
                  <CardHeader>
                    <div className='flex justify-between'>
                      <CardTitle className='mb-2 text-xl'>
                        {exam.title}
                      </CardTitle>
                      <div className='flex gap-2'>
                        <Pencil
                          size={20}
                          className='cursor-pointer'
                          onClick={() => {
                            setSelectedExam(exam)
                            setEditModalOpen(true)
                          }}
                        />
                        <Trash2
                          size={20}
                          className='cursor-pointer text-red-600'
                          onClick={() => handleDeleteClick(exam.id)}
                        />
                      </div>
                    </div>
                    <CardDescription>{exam.description}</CardDescription>
                  </CardHeader>
                  <CardContent className='flex-grow'>
                    <div className='mb-4 flex items-center text-muted-foreground'>
                      <Clock className='mr-2 h-4 w-4' />
                      <span>{exam.duration} minutes</span>
                    </div>
                    <div className='mb-4 flex items-center text-muted-foreground'>
                      <FileQuestion className='mr-2 h-4 w-4' />
                      <span>{exam.numQuestions} Questions</span>
                    </div>
                    <div className='flex items-center font-semibold text-foreground'>
                      <CreditCard className='mr-2 h-4 w-4' />
                      <span>INR {exam.price}</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className='w-full'
                      disabled={isLoading}
                      onClick={handleTakeTestClick(exam.id, exam.price)}
                    >
                      {isLoading ? (
                        <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                      ) : (
                        'Pay & Take Test'
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))
          ) : (
            <div className='flex h-96 flex-col items-center justify-center'>
              <Loader />
              Loading Exams...
            </div>
          )}
        </div>
      </div>

      <NewExamModal
        open={isCreateModalOpen}
        onClose={() => setCreateModalOpen(false)}
        fetchExams={fetchExams}
      />
      {isEditModalOpen && selectedExam && (
        <NewExamModal
          open={isEditModalOpen}
          defaultValues={selectedExam}
          onClose={() => setEditModalOpen(false)}
          fetchExams={fetchExams}
        />
      )}

      {isDeleteModalOpen && examToDelete && (
        <ConfirmDeleteModal
          open={isDeleteModalOpen}
          isDeleting={isDeleting}
          customText='exam'
          handleDelete={handleDelete}
          onClose={() => setDeleteModalOpen(false)}
          examId={examToDelete}
        />
      )}
    </div>
  )
}
