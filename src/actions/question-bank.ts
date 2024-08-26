'use server'
import { validateRequest } from '@/auth'
import db from '@/lib/db'
import type { questionFormType } from '@/schemas'

export const getQuestionBankExam = async () => {
  const session = await validateRequest()
  if (!session || !session.user) {
    throw new Error('Unauthorized')
  }
  const questionBankExam = await db.questionBank.findUnique({
    where: {
      userId: session.user.id,
    },
    include: {
      exam: true,
    },
  })
  return questionBankExam?.exam || null
}

export const addQuestionsToBank = async (
  examId: string,
  question: questionFormType
) => {
  const newQuestion = await db.question.create({
    data: {
      examId: examId,
      text: question.text,
      options: question.options,
      correctAnswer: question.correctAnswer,
    },
  })
  return newQuestion
}

export const deleteQuestion = async (questionid: string) => {
  const question = await db.question.delete({
    where: {
      id: questionid,
    },
  })
  return question
}
