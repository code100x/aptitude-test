import React from 'react'
import Examdetail from '../../../../../components/exams/exam-detail'
import { getExamData } from '@/actions/exams'

interface ExamDetailPageProps {
  params: { examId: string }
}
const page = async ({ params }: ExamDetailPageProps) => {
  const result = await getExamData(params.examId)
  //   console.log(result)
  return <Examdetail exam={result} examId={params.examId} />
}

export default page
