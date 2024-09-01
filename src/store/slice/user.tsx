import { StateCreator } from 'zustand'
import { GlobalStore } from '..'

interface User {
  id: string
  name: string
  email: string
}

export interface UserSlice {
  user: User | null
  setUser: (user: User | null) => void
}

export const createUserSlice: StateCreator<GlobalStore, [], [], UserSlice> = (
  set,
  get,
  store
) => ({
  user: null,
  setUser: (user) => set({ user }),
})
