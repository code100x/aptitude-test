import { getExamResults } from '@/actions/exams'
import ExamResults from '@/components/exams/exam-results'

interface ExamResultsPageProps {
  params: { examId: string }
}

export default async function ExamResultsPage({
  params,
}: ExamResultsPageProps) {
  const result = await getExamResults(params.examId)

  return <ExamResults result={result} />
}
