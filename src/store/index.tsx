import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

// Import slices
import { createQuestionsSlice, QuestionsSlice } from './slice/questions'
import { createUserSlice, UserSlice } from './slice/user'
import { createExamSlice, ExamSlice } from './slice/exam'

export type GlobalStore = QuestionsSlice & UserSlice & ExamSlice

export const useGlobalStore = create<GlobalStore>()(
  devtools(
    persist(
      (set, get, store) => ({
        ...createUserSlice(set, get, store),
        ...createQuestionsSlice(set, get, store),
        ...createExamSlice(set, get, store),
      }),
      {
        name: 'global-store',
        partialize: (state) => ({
          user: state.user,
          questions: state.questions,
          exams: state.exams,
        }),
      }
    )
  )
)
