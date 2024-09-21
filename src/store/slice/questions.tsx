import { StateCreator } from 'zustand'
import { GlobalStore } from '..'

export interface Question {
  id: string
  text: string
  options: string[]
  correctAnswer: number
  image?: string | null
  createdAt: Date
  updatedAt: Date
}

export interface QuestionsSlice {
  questions: Question[]
  selectedQuestions: Question[]
  setQuestions: (questions: Question[]) => void
   setSelectedQuestions: (questions: Question[] | ((prev: Question[]) => Question[])) => void;
}

export const createQuestionsSlice: StateCreator<
  GlobalStore,
  [],
  [],
  QuestionsSlice
> = (set, get) => ({
  questions: [],
  setQuestions: (questions) => set({ questions }),

  selectedQuestions: [],
  setSelectedQuestions: (selectedQuestions) =>
    set((state) => ({
      selectedQuestions:
        typeof selectedQuestions === 'function'
          ? selectedQuestions(state.selectedQuestions)
          : selectedQuestions,
    })),
})
