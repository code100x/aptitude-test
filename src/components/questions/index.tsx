'use client'

import React, { useEffect, useState } from 'react'
import { FilePenLine, FilePlus } from 'lucide-react'
import { Button } from '../ui/button'
import Link from 'next/link'

import QuestionsTable from './components/all-questions-table'
import { useGlobalStore } from '@/store'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

export function QuestionsPage() {
  const { selectedQuestions } = useGlobalStore()
  const pathname = usePathname()
  const router = useRouter()
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className='container flex flex-col justify-center py-8 px-4'>
        <div className='flex items-center justify-between mb-12'>
          <div className='flex-1 flex flex-col items-center text-primary'>
            <h1 className='text-5xl font-bold'>Questions Bank</h1>
            <p className='text-muted-foreground'>
              View and manage all your questions from the questions bank.
            </p>
          </div>
          <div className='flex  gap-2'>
            {selectedQuestions?.length > 0 &&
              pathname !== '/available-exams' && (
                <Button
                  variant={'outline'}
                  className='gap-2 mb-2'
                  onClick={() => router.push('/questions/edit')}
                >
                  <FilePenLine size={15} /> Edit
                </Button>
              )}
            <Link href='/questions/create'>
              <Button className='gap-2'>
                <FilePlus size={18} />
                Add Questions
              </Button>
            </Link>
          </div>
        </div>

        <QuestionsTable />
      </div>
    </motion.div>
  )
}
