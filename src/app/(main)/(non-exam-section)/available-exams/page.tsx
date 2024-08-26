import { getExams } from '@/actions/exams'
import { getQuestionBankExam } from '@/actions/question-bank'
import AvailableExams from '@/components/exams/avaiable'
import React from 'react'

const Page = async () => {
  const data = await getExams()
  const customExamdata = await getQuestionBankExam()

  const updatedData = customExamdata ? [customExamdata, ...data] : data
  return <AvailableExams exams={updatedData} />
}

export default Page
