import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PreviewQuestion } from '@/components/question-bank/preview_question'
import { AddQuesitons } from '@/components/question-bank/add-question'
import { getQuestionBankExam } from '@/actions/question-bank'

export default async function Home() {
  const customExam = await getQuestionBankExam()
  return customExam ? (
    <div className='space-y-4 flex flex-col min-w-screen'>
      <h1 className='text-4xl font-bold text-foreground'>Question Bank</h1>
      <Tabs defaultValue='preview' className='w-[400px]'>
        <TabsList className='w-96 flex justify-between '>
          <TabsTrigger value='preview' className='flex-1'>
            Question Bank
          </TabsTrigger>
          <TabsTrigger value='add' className='flex-1'>
            Add Questions
          </TabsTrigger>
        </TabsList>
        <TabsContent value='preview'>
          <PreviewQuestion examId={customExam.id} />
        </TabsContent>
        <TabsContent value='add'>
          <AddQuesitons examId={customExam.id} />
        </TabsContent>
      </Tabs>
    </div>
  ) : (
    'Can not fetch Question Bank!!'
  )
}
