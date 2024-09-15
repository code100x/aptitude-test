import AvailableExams from '@/components/exams/avaiable'
import React, { useEffect } from 'react'
import { validateRequest } from '@/auth'


const Page = async () => {
  const session = await validateRequest()
  const user = session?.user

  if (!user) return null

  return <AvailableExams user={user} />
}

export default Page
