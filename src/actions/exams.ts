'use server'

import { validateRequest } from '@/auth'
import db from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { cache } from 'react'

export const getExams = cache(async () => {
  const response = await db.exam.findMany({
    where: {
      published: true,
    },
    select: {
      id: true,
      title: true,
      description: true,
      duration: true,
      price: true,
    },
  })
  return response
})
export const getExamsQues = cache(async (examId: string) => {
  const response = await db.exam.findUnique({
    where: {
      id: examId,
    },
    select: {
      questions: {
        select: {
          id: true,
          text: true,
          correctAnswer: true,
          options: true,
        },
      },
    },
  })

  return response
})

interface SubmitExamParams {
  examId: string
  answers: Record<string, number>
  timeSpent: number
  warningCount: number
}

export async function submitExam({
  examId,
  answers,
  timeSpent,
  warningCount,
}: SubmitExamParams) {
  const session = await validateRequest()

  if (!session || !session.user) {
    throw new Error('Unauthorized')
  }

  const userId = session.user.id

  const exam = await db.exam.findUnique({
    where: { id: examId },
    include: { questions: true },
  })

  if (!exam) {
    throw new Error('Exam not found')
  }

  let score = 0
  const correctAnswers: number[] = []
  const incorrectAnswers: number[] = []

  exam.questions.forEach((question, index) => {
    if (answers[question.id] === question.correctAnswer) {
      score += 1
      correctAnswers.push(index)
    } else {
      incorrectAnswers.push(index)
    }
  })

  const response = await db.examSubmission.create({
    data: {
      examId,
      userId: userId,
      answers: answers,
      score,
      timeSpent,
      warningCount,
      correctAnswers,
      incorrectAnswers,
    },
  })
  revalidatePath('/user-results')
  revalidatePath('/exam-results')

  return {
    id: response.id,
    score,
    totalQuestions: exam.questions.length,
    correctAnswers,
    incorrectAnswers,
  }
}

export async function getExamData(examId: string) {
  try {
    const exam = await db.exam.findUnique({
      where: { id: examId },
      include: {
        questions: {
          select: {
            id: true,
            text: true,
            options: true,
          },
        },
      },
    })

    if (!exam) {
      throw new Error('Exam not found')
    }

    return {
      id: exam.id,
      title: exam.title,
      description: exam.description,
      price: exam.price,
      duration: exam.duration,
      questions: exam.questions.map((q) => ({
        id: q.id,
        text: q.text,
        options: q.options,
      })),
    }
  } catch (error) {
    console.error('Error fetching exam data:', error)
    throw new Error('Failed to fetch exam data')
  }
}

export async function getExamResults(examId: string) {
  const session = await validateRequest()

  if (!session || !session.user) {
    throw new Error('Unauthorized')
  }

  const submission = await db.examSubmission.findFirst({
    where: { id: examId, userId: session.user.id },
    include: { exam: { include: { questions: true } } },
    orderBy: { createdAt: 'desc' },
  })

  if (!submission) {
    throw new Error('Exam submission not found')
  }

  return {
    score: submission.score,
    totalQuestions: submission.exam.questions.length,
    timeSpent: submission.timeSpent,
    warningCount: submission.warningCount,
    correctAnswers: submission.correctAnswers,
    incorrectAnswers: submission.incorrectAnswers,
  }
}

export const getUserResults = cache(
  async (page: number = 1, pageSize: number = 10) => {
    const session = await validateRequest()

    if (!session || !session.user) {
      throw new Error('Unauthorized')
    }

    const skip = (page - 1) * pageSize

    const [results, totalCount] = await Promise.all([
      db.examSubmission.findMany({
        where: { userId: session.user.id },
        include: {
          exam: {
            include: { questions: true },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: pageSize,
      }),
      db.examSubmission.count({
        where: { userId: session.user.id },
      }),
    ])

    const totalPages = Math.ceil(totalCount / pageSize)

    return {
      results: results.map((result) => ({
        id: result.id,
        examTitle: result.exam.title,
        score: result.score,
        totalQuestions: result.exam.questions.length,
        timeSpent: result.timeSpent,
        date: result.createdAt.toISOString(),
        examId: result.examId,
      })),
      totalPages,
      currentPage: page,
    }
  }
)
