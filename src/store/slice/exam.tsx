import { StateCreator } from 'zustand'
import { GlobalStore } from '..'

interface Exam {
  id: string
  title: string
  description: string
  numQuestions: number
  duration: number
  price: number
}

export interface ExamSlice {
  exams: Exam[]
  setExams: (exams: Exam[]) => void
}

export const createExamSlice: StateCreator<GlobalStore, [], [], ExamSlice> = (
  set,
  get
) => ({
  exams: [],
  setExams: (exams) => set({ exams }),
})
