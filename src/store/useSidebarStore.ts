import api from '@/services/axios'
import { Note } from '@/types'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

interface UseSidebarStore {
  open: boolean
  toggleSidebar: () => void
}

export const useSidebarStore = create<UseSidebarStore>()(
  immer((set) => ({
    open: false,
    toggleSidebar: () =>
      set((state) => {
        state.open = !state.open
      }),
  })),
)
