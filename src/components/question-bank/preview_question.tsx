'use client'
import { getExamsQues } from '@/actions/exams'
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { RefreshCcw } from 'lucide-react'
import { Card } from '../ui/card'
import { toast } from 'sonner'
import { deleteQuestion } from '@/actions/question-bank'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

export function PreviewQuestion({ examId }: { examId: string }) {
  interface Questions {
    questions: {
      id: string
      text: string
      correctAnswer: number
      options: string[]
    }[]
  }
  const [isloading, setIsLoading] = useState(true)
  const [Exam, setExam] = useState<Questions | null>()
  useEffect(() => {
    async function getExams() {
      const ques = await getExamsQues(examId)
      setExam(ques)
      setIsLoading(false)
    }
    getExams()
  }, [examId])
  const Delete = async (questionId: string) => {
    try {
      const ques = await deleteQuestion(questionId)
      toast.success('Question Deleted SuccessFully')
      return ques
    } catch (err) {
      toast.error('Cannot Delete Now')
    }
    return
  }
  return isloading ? (
    <div className='flex justify-center'>
      <Button disabled>
        <RefreshCcw className='mr-2 h-4 w-4 animate-spin ' />
        Please wait
      </Button>
    </div>
  ) : Exam ? (
    <div>
      <ScrollArea>
        <p className='text-base font-bold text-center text-blue-900 dark:text-purple-900'>
          Please Relode to see the Latest Changes!
        </p>
        {Exam.questions.map((p) => (
          <Card key={p.id} className='p-4 m-4'>
            <div className='flex justify-end'>
              <AlertDialog>
                <AlertDialogTrigger className='border  '>
                  <div className='bg-red-500 text-xs font-thin dark:bg-red-900 p-1'>
                    Delete
                  </div>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure you want to Delete this question?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your Question and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => Delete(p.id)}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            <h1>{p.text}</h1>
            <p>
              {p.options.map((o, index) => (
                <ul key={o[index]}>
                  <li
                    className={
                      index === p.correctAnswer
                        ? 'bg-green-100 dark:bg-green-800'
                        : ''
                    }
                  >
                    {index + 1}: {o}
                  </li>
                </ul>
              ))}
            </p>
          </Card>
        ))}
      </ScrollArea>
    </div>
  ) : (
    <div>Please Add some Questions First</div>
  )
}
