import { getExamData } from '@/actions/exams'
import MultiStepExamPage from '@/components/exams/mutipage-form'

interface ExamPageProps {
  params: { examId: string }
}

export default async function ExamPage({ params }: ExamPageProps) {
  try {
    console.log('Fetching exam data for ID:', params.examId)
    const examData = await getExamData(params.examId)
    console.log('Exam data fetched successfully')
    return <MultiStepExamPage examData={examData} />
  } catch (error) {
    console.error('Error loading exam:', error)
    return <div>Error loading exam: {(error as Error).message}</div>
  }
}
