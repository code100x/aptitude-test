import React from 'react'

import { getExams } from '@/actions/exams'
import { validateRequest } from '@/auth'
import AvailableExams from '@/components/exams/avaiable'

const Page = async () => {
  const data = await getExams()
  const session = await validateRequest()
  const user = session?.user

  return user && <AvailableExams exams={data} user={user} />
}

export default Page
