'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Clock, AlertTriangle, Maximize } from 'lucide-react'
import { toast } from 'sonner'
import { submitExam } from '@/actions/exams'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
interface Question {
  id: string
  text: string
  options: string[]
  image?: string
}

interface ExamComponentProps {
  examId: string
  questions: Question[]
  duration: number
  onExitFullscreen: () => void
}

export default function ExamComponent({
  examId,
  questions,
  duration,
  onExitFullscreen,
}: ExamComponentProps) {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [markedQuestions, setMarkedQuestions] = useState<Set<string>>(new Set())
  const [timeRemaining, setTimeRemaining] = useState(duration * 60)
  const [showExitDialog, setShowExitDialog] = useState(false)
  const [showTabWarning, setShowTabWarning] = useState(false)
  const [showFullscreenWarning, setShowFullscreenWarning] = useState(false)
  const [warningCount, setWarningCount] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(true)

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setShowTabWarning(true)
        setWarningCount((prev) => prev + 1)
      }
    }

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setIsFullscreen(false)
        setShowFullscreenWarning(true)
        setWarningCount((prev) => prev + 1)
      } else {
        setIsFullscreen(true)
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    document.addEventListener('fullscreenchange', handleFullscreenChange)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          handleSubmit()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleAnswer = useCallback(
    (optionIndex: number) => {
      setAnswers((prev) => ({
        ...prev,
        [questions[currentQuestion].id]: optionIndex,
      }))
    },
    [currentQuestion, questions]
  )

  const handleMarkForReview = useCallback(() => {
    setMarkedQuestions((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(questions[currentQuestion].id)) {
        newSet.delete(questions[currentQuestion].id)
      } else {
        newSet.add(questions[currentQuestion].id)
      }
      return newSet
    })
  }, [currentQuestion, questions])

  const getQuestionStatus = useCallback(
    (questionId: string): 'unattempted' | 'attempted' | 'marked' => {
      if (markedQuestions.has(questionId)) return 'marked'
      if (answers[questionId] !== undefined) return 'attempted'
      return 'unattempted'
    },
    [markedQuestions, answers]
  )

  const handleSubmit = useCallback(async () => {
    try {
      onExitFullscreen()
      const timeSpent = duration * 60 - timeRemaining
      const examQuestions = questions.map((q) => q.id)
      const result = await submitExam({
        examId,
        answers,
        timeSpent,
        warningCount,
        questions: examQuestions,
      })

      toast.success('Exam Submitted', {
        description: `Your exam has been successfully submitted. Your score: ${result.score}/${questions.length}`,
      })

      router.push(`/exam-results/${examId}`)
    } catch (error) {
      console.error('Error submitting exam:', error)
      toast.error('Error', {
        description: 'Failed to submit exam. Please try again.',
      })
    }
  }, [
    onExitFullscreen,
    duration,
    timeRemaining,
    examId,
    answers,
    questions.length,
    router,
    warningCount,
    questions,
  ])

  const formatTime = useCallback((seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }, [])

  const enterFullscreen = useCallback(() => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen()
    }
    setIsFullscreen(true)
    setShowFullscreenWarning(false)
  }, [])

  const handleNextQuestion = useCallback(() => {
    if (currentQuestion === questions.length - 1) {
      setShowExitDialog(true)
    } else {
      setCurrentQuestion((prev) => Math.min(questions.length - 1, prev + 1))
    }
  }, [currentQuestion, questions.length])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='grid grid-cols-1 lg:grid-cols-4 gap-4 w-full mt-8 bg-background'
    >
      <div className='lg:col-span-3 w-full'>
        <Card className='h-full w-full flex flex-col shadow-lg'>
          <CardHeader className='bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/50 dark:to-indigo-900/50'>
            <CardTitle className='text-xl font-semibold'>
              Question {currentQuestion + 1}
            </CardTitle>
          </CardHeader>
          <CardContent className='flex-1 overflow-y-auto p-6'>
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className='mb-6 text-lg'
            >
              {questions[currentQuestion].text}

              {questions[currentQuestion].image && (
                <Image
                  alt='question-image'
                  src={questions[currentQuestion].image}
                  height={300}
                  width={300}
                />
              )}
            </motion.div>
            <RadioGroup
              value={answers[questions[currentQuestion].id]?.toString() || ''}
              onValueChange={(value) => handleAnswer(parseInt(value))}
            >
              <AnimatePresence>
                {questions[currentQuestion].options.map(
                  (option: string, index: number) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.1 }}
                      className='flex items-center space-x-3 mb-4'
                    >
                      <RadioGroupItem
                        value={index.toString()}
                        id={`option-${index}`}
                        className='border-2 border-gray-300 dark:border-gray-600'
                      />
                      <Label
                        htmlFor={`option-${index}`}
                        className='text-base cursor-pointer'
                      >
                        {option}
                      </Label>
                    </motion.div>
                  )
                )}
              </AnimatePresence>
            </RadioGroup>
          </CardContent>
          <CardFooter className='flex justify-between p-4 bg-gray-50 dark:bg-gray-800/50'>
            <Button
              onClick={() =>
                setCurrentQuestion((prev) => Math.max(0, prev - 1))
              }
              disabled={currentQuestion === 0}
              className='bg-blue-500 hover:bg-blue-600 text-white'
            >
              Previous
            </Button>
            <Button
              onClick={handleMarkForReview}
              variant='outline'
              className='border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white'
            >
              {markedQuestions.has(questions[currentQuestion].id)
                ? 'Unmark for Review'
                : 'Mark for Review'}
            </Button>
            <Button
              onClick={handleNextQuestion}
              className='bg-blue-500 hover:bg-blue-600 text-white'
            >
              {currentQuestion === questions.length - 1
                ? 'Submit Test'
                : 'Next'}
            </Button>
          </CardFooter>
        </Card>
      </div>
      <div className='lg:col-span-1 w-full'>
        <Card className='h-full flex flex-col shadow-lg'>
          <CardHeader className='bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50'>
            <CardTitle className='text-lg font-semibold flex justify-between items-center'>
              <div className='flex items-center'>
                <Clock className='mr-2 text-blue-500' size={20} />
                <span>{formatTime(timeRemaining)}</span>
              </div>
              {warningCount > 0 && (
                <div className='flex items-center text-yellow-500'>
                  <AlertTriangle size={20} className='mr-1' />
                  <span>{warningCount}</span>
                </div>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className='flex-1 overflow-hidden p-4'>
            <ScrollArea className='h-full'>
              <div className='grid grid-cols-5 gap-2'>
                {questions.map((question, index: number) => (
                  <motion.button
                    key={question.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                      getQuestionStatus(question.id) === 'unattempted'
                        ? 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-100'
                        : getQuestionStatus(question.id) === 'attempted'
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-100'
                          : 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-100'
                    }`}
                    onClick={() => setCurrentQuestion(index)}
                  >
                    {index + 1}
                  </motion.button>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
          <CardFooter className='p-4'>
            <Button
              className='w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white'
              onClick={() => setShowExitDialog(true)}
            >
              Submit Test
            </Button>
          </CardFooter>
        </Card>
      </div>
      <AlertDialog open={showExitDialog} onOpenChange={setShowExitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to submit?
            </AlertDialogTitle>
            <AlertDialogDescription>
              You have {questions.length - Object.keys(answers).length}{' '}
              unattempted questions. Your progress will be saved, but you
              won&apos;t be able to continue the test after submission.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleSubmit}>
              Confirm Submission
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog open={showTabWarning} onOpenChange={setShowTabWarning}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Warning: Tab Change Detected</AlertDialogTitle>
            <AlertDialogDescription>
              You have switched tabs or windows. This action is not allowed
              during the exam. Further violations may result in automatic
              submission of your exam.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowTabWarning(false)}>
              Understood
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog
        open={showFullscreenWarning}
        onOpenChange={setShowFullscreenWarning}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Warning: Fullscreen Mode Exited</AlertDialogTitle>
            <AlertDialogDescription>
              You have exited fullscreen mode. This action is not allowed during
              the exam. Please return to fullscreen mode to continue the exam.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={enterFullscreen}>
              <Maximize className='mr-2 h-4 w-4' />
              Return to Fullscreen
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  )
}
