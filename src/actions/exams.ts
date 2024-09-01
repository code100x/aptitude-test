'use server'

import { validateRequest } from '@/auth'
import db from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { cache } from 'react'

type CreateExamInput = {
  title: string
  description: string
  duration: number
  price: number
  numQuestions: number
}

type UpdateExamInput = {
  id: string
  title?: string
  description?: string
  duration?: number
  price?: number
  numQuestions?: number
}

interface SubmitExamParams {
  examId: string
  answers: Record<string, number>
  timeSpent: number
  warningCount: number
  questions: string[]
}

export const createExam = cache(async (examData: CreateExamInput) => {
  try {
    const createdExam = await db.exam.create({
      data: examData,
    })

    const responseData = {
      id: createdExam.id,
      title: createdExam.title,
      description: createdExam.description,
      duration: createdExam.duration,
      price: createdExam.price,
      numQuestions: createdExam.numQuestions,
    }

    return { succes: true, data: responseData }
  } catch (error) {
    console.error('Error creating exam:', error)
    throw new Error('Failed to create exam')
  }
})

export const updateExam = cache(async (examData: UpdateExamInput) => {
  try {
    const { id, ...updateFields } = examData

    const totalAvailableQuestions = await db.question.findMany()

    if (
      updateFields.numQuestions !== undefined &&
      updateFields.numQuestions > totalAvailableQuestions.length
    ) {
      throw new Error(
        'The number of questions are not available. Try fewer questions'
      )
    }

    const updatedExam = await db.exam.update({
      where: { id },
      data: updateFields,
    })

    return { success: true, data: updatedExam }
  } catch (error) {
    console.error('Error updating exam:', error) // Add more detailed error logging for debugging
    throw new Error('Failed to update exam')
  }
})

export const getExams = async () => {
  try {
    const response = await db.exam.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        duration: true,
        price: true,
        numQuestions: true,
      },
      where: { isDeleted: false },
      orderBy: {
        createdAt: 'desc',
      },
    })
    return { success: true, data: response }
  } catch (error) {
    console.error('Error fetching exam:', error)
    throw new Error('Failed to fetch exam')
  }
}

export const deleteExam = cache(async (examId: string) => {
  try {
    await db.exam.update({
      where: { id: examId },
      data: {
        isDeleted: true,
      },
    })

    return { succes: true }
  } catch (error) {
    console.error('Error deleting exam:', error)
    throw new Error('Failed to delete exam')
  }
})

// Get Random Questions for an Exam
export const getRandomQuestionsForExam = async (examId: string) => {
  try {
    const exam = await db.exam.findUnique({
      where: { id: examId },
      select: { numQuestions: true },
    })

    if (!exam) {
      throw new Error('Exam not found')
    }

    const numQuestions = exam.numQuestions

    // Get all questions from the database
    const allQuestions = await db.question.findMany()

    if (numQuestions > allQuestions.length) {
      throw new Error('Number of questions exceeds available questions')
    }

    const randomQuestions = allQuestions
      .sort(() => 0.5 - Math.random())
      .slice(0, numQuestions)

    return { success: true, questions: randomQuestions }
  } catch (error) {
    console.error('Error fetching random questions for exam:', error)
    return {
      success: false,
      error: 'An unexpected error occurred while fetching questions.',
    }
  }
}

// Get Exam Data - Fetch exam details and random questions
export async function getExamData(examId: string) {
  try {
    const exam = await db.exam.findUnique({
      where: { id: examId },
      select: {
        id: true,
        title: true,
        description: true,
        price: true,
        duration: true,
        numQuestions: true,
      },
    })

    if (!exam) {
      throw new Error('Exam not found')
    }

    const { success, questions, error } =
      await getRandomQuestionsForExam(examId)
    if (!success || !questions) {
      throw new Error(error || 'Failed to fetch questions for the exam.')
    }

    return {
      id: exam.id,
      title: exam.title,
      description: exam.description,
      price: exam.price,
      duration: exam.duration,
      numQuestions: exam.numQuestions,
      questions: questions.map((q) => ({
        id: q.id,
        text: q.text,
        image: q.image,
        options: q.options,
      })),
    }
  } catch (error) {
    console.error('Error fetching exam data:', error)
    throw new Error('Failed to fetch exam data')
  }
}

export async function submitExam({
  examId,
  questions,
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
    select: {
      numQuestions: true,
    },
  })

  if (!exam) {
    throw new Error('Exam not found')
  }

  const examQuestions = await db.question.findMany({
    where: { id: { in: questions } },
  })

  if (
    !examQuestions ||
    examQuestions.length === 0 ||
    examQuestions.length !== exam.numQuestions
  ) {
    throw new Error('No questions found for the exam.')
  }

  let score = 0
  const correctAnswers: string[] = []
  const incorrectAnswers: string[] = []

  examQuestions.forEach((question) => {
    if (answers[question.id] === question.correctAnswer) {
      score += 1
      correctAnswers.push(question.id)
    } else {
      incorrectAnswers.push(question.id)
    }
  })

  const response = await db.examSubmission.create({
    data: {
      examId,
      userId,
      answers: answers,
      score,
      timeSpent,
      warningCount,
      correctAnswers,
      incorrectAnswers,
      questions,
    },
  })

  revalidatePath('/user-results')
  revalidatePath('/exam-results')

  return {
    id: response.id,
    score,
    totalQuestions: exam.numQuestions,
    correctAnswers,
    incorrectAnswers,
  }
}

export async function getExamResults(examId: string) {
  const session = await validateRequest()
  if (!session || !session.user) {
    throw new Error('Unauthorized')
  }

  const submission = await db.examSubmission.findFirst({
    where: {
      examId,
      userId: session.user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  if (!submission) {
    throw new Error('Exam submission not found')
  }

  const exam = await db.exam.findUnique({
    where: {
      id: examId,
    },
    select: {
      numQuestions: true,
    },
  })

  if (!exam) {
    throw new Error('Exam not found')
  }

  return {
    score: submission.score,
    totalQuestions: exam.numQuestions,
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

    // Calculate pagination parameters
    const skip = (page - 1) * pageSize

    try {
      const [submissions, totalCount] = await Promise.all([
        db.examSubmission.findMany({
          where: { userId: session.user.id },
          orderBy: { createdAt: 'desc' },
          skip,
          take: pageSize,
        }),
        db.examSubmission.count({
          where: { userId: session.user.id },
        }),
      ])

      const examIds = submissions
        .map((submission) => submission.examId)
        .filter((value, index, self) => self.indexOf(value) === index)

      const [exams, questions] = await Promise.all([
        db.exam.findMany({
          where: { id: { in: examIds } },
        }),
        db.question.findMany({
          where: {
            id: {
              in: submissions.flatMap((submission) => submission.questions),
            },
          },
        }),
      ])

      const examsMap = new Map(exams.map((exam) => [exam.id, exam]))
      const questionsMap = new Map(
        questions.map((question) => [question.id, question])
      )

      const results = submissions.map((submission) => {
        const exam = examsMap.get(submission.examId)
        if (!exam) {
          throw new Error('Exam not found')
        }

        const examQuestions = submission.questions
          .map((questionId) => questionsMap.get(questionId))
          .filter(Boolean)
        if (!examQuestions.length) {
          throw new Error('Questions not found for the exam')
        }

        return {
          id: submission.id,
          examTitle: exam.title,
          score: submission.score,
          totalQuestions: exam.numQuestions,
          timeSpent: submission.timeSpent,
          date: submission.createdAt.toISOString(),
          examId: submission.examId,
          questions: examQuestions,
        }
      })

      const totalPages = Math.ceil(totalCount / pageSize)

      return {
        results,
        totalPages,
        currentPage: page,
      }
    } catch (error) {
      console.error('Error fetching user results:', error)
      throw new Error('Failed to fetch user results')
    }
  }
)
