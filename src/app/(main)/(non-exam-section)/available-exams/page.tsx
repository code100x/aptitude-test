import { getExams } from '@/actions/exams'
import AvailableExams from '@/components/exams/avaiable'
import React from 'react'

const Page = async () => {
  const data = await getExams()
  return <AvailableExams exams={data} />
}

export default Page
