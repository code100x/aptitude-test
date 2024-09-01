// components/AvailableExams.tsx

'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, useAnimation } from 'framer-motion'
import {
  Clock,
  CreditCard,
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

export default function AvailableExams() {
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
      if (response.success) {
        setExams(response.exams)
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

  return (
    <div className='min-h-screen w-full'>
      <div className='mx-auto px-4 py-12'>
        <div className='mb-12 mr-16 flex justify-between items-center'>
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
                    <div className='flex justify-between'>
                      <CardTitle className='text-xl mb-2'>
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
                    <div className='flex items-center mb-4 text-muted-foreground'>
                      <Clock className='mr-2 h-4 w-4' />
                      <span>{exam.duration} minutes</span>
                    </div>
                    <div className='flex items-center mb-4 text-muted-foreground'>
                      <FileQuestion className='mr-2 h-4 w-4' />
                      <span>{exam.numQuestions} Questions</span>
                    </div>
                    <div className='flex items-center text-foreground font-semibold'>
                      <CreditCard className='mr-2 h-4 w-4' />
                      <span>INR {exam.price}</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className='w-full'>
                      <Link href={`/take/${exam.id}`}>Take Test</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))
          ) : (
            <div className='flex flex-col h-96 justify-center items-center'>
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
