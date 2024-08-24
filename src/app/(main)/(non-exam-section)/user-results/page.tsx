import { getUserResults } from '@/actions/exams'
import UserResults  from '@/components/exams/user-results'

export default async function UserResultsPage() {
  const results = await getUserResults()

  return <UserResults results={results} />
}
