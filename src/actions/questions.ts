'use server'

import db from '@/lib/db'
import { z } from 'zod'
import {
  createQuestionsSchema,
  createQuestionsValues,
  updateQuestionsSchema,
  updateQuestionsValues,
} from '@/schemas'

export const createQuestions = async (values: createQuestionsValues) => {
  try {
    const validatedData = createQuestionsSchema.safeParse(values)
    if (!validatedData.success) {
      return { error: validatedData.error.errors[0].message }
    }

    const { questions } = validatedData.data

    const createdQuestions = await db.$transaction(
      questions.map((question) =>
        db.question.create({
          data: {
            text: question.text,
            options: question.options,
            correctAnswer: question.correctAnswer,
            image: question.image || null,
          },
        })
      )
    )
    return { success: true, questions: createdQuestions }
  } catch (error) {
    console.error('Error creating questions:', error)
    return { error: 'An unexpected error occurred while creating questions.' }
  }
}

export const getAllQuestions = async () => {
  try {
    const questions = await db.question.findMany({
      select: {
        id: true,
        text: true,
        options: true,
        correctAnswer: true,
        image: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    return { success: true, questions }
  } catch (error) {
    console.error('Error fetching questions:', error)
    return { error: 'An unexpected error occurred while fetching questions.' }
  }
}

export const updateQuestions = async (
  questions: updateQuestionsValues['questions']
) => {
  try {
    const validatedData = updateQuestionsSchema.safeParse({ questions })
    if (!validatedData.success) {
      return { error: validatedData.error.errors[0].message }
    }

    const { questions: validQuestions } = validatedData.data

    const updateResults = await Promise.all(
      validQuestions.map(async (question) => {
        try {

          const updatedQuestion = await db.question.update({
            where: { id: question.id },
            data: {
              text: question.text,
              options: question.options,
              correctAnswer: question.correctAnswer,
              image: question.image || null,
            },
          })
          return { success: true, question: updatedQuestion }
        } catch (error) {
          console.error('Error updating question:', error)
          return {
            error: `Failed to update question with ID ${question.id}`,
          }
        }
      })
    )

    const errors = updateResults.filter((result) => result.error)
    if (errors.length > 0) {
      return { success: false, errors }
    }

    return { success: true, results: updateResults }
  } catch (error) {
    console.error('Error updating questions:', error)
    return {
      error: 'An unexpected error occurred while updating questions.',
    }
  }
}

export const deleteQuestion = async (id: string) => {
  try {
    await db.question.delete({
      where: { id },
    })
    return { success: true, message: 'Question deleted successfully.' }
  } catch (error) {
    console.error('Error deleting question:', error)
    return {
      error: 'An unexpected error occurred while deleting the question.',
    }
  }
}
