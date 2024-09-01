'use client'

import { useState, useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import ExamComponent from '@/components/exams/exam-component'
import ExamInstructions from '@/components/exams/instructions'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'

interface ExamData {
  id: string
  title: string
  description: string
  price: number
  duration: number
  numQuestions: number
  questions: Question[]
}

interface Question {
  id: string
  text: string
  options: string[]
}

interface MultiStepExamPageProps {
  examData: ExamData
}

export default function MultiStepExamPage({
  examData,
}: MultiStepExamPageProps) {
  const [step, setStep] = useState<'instructions' | 'exam'>('instructions')
  const [isFullscreen, setIsFullscreen] = useState(false)
  const router = useRouter()

  const handleStartExam = useCallback(() => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement
        .requestFullscreen()
        .then(() => {
          setIsFullscreen(true)
          setStep('exam')
        })
        .catch((err) => {
          console.error(
            'Error attempting to enable full-screen mode:',
            err.message
          )
          toast.error('Failed to enter full-screen mode. Please try again.')
        })
    } else {
      toast.error('Full-screen mode is not supported on this device.')
    }
  }, [])

  const handleExitFullscreen = useCallback(() => {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    }
  }, [])

  const handleFullscreenChange = useCallback(() => {
    setIsFullscreen(!!document.fullscreenElement)
  }, [])

  useEffect(() => {
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }
  }, [handleFullscreenChange])

  const handleCancelExam = useCallback(() => {
    handleExitFullscreen()
    router.push('/available-exams')
  }, [handleExitFullscreen, router])

  return (
    <AnimatePresence mode='wait'>
      {step === 'instructions' && (
        <motion.div
          key='instructions'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <ExamInstructions
            examData={examData}
            onStart={handleStartExam}
            onCancel={handleCancelExam}
          />
        </motion.div>
      )}
      {step === 'exam' && isFullscreen && (
        <motion.div
          key='exam'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <ExamComponent
            examId={examData.id}
            questions={examData.questions}
            duration={examData.duration}
            onExitFullscreen={handleExitFullscreen}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
