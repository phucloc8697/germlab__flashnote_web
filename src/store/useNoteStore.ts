import api from '@/services/axios'
import { Note } from '@/types'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

interface CreateNote {
  title: string
  content: string
}

interface UpdateNote {
  title?: string
  content?: string
}

interface UseNoteStore {
  currentNote?: Note
  saving: boolean
  fetching: boolean
  setCurrentNote: (note: Note) => void
  getNotes: () => Promise<any>
  createNote: (data: CreateNote) => Promise<void>
  updateNote: (id: string, data: UpdateNote) => Promise<void>
}

export const useNoteStore = create<UseNoteStore>()(
  immer((set) => ({
    currentNote: undefined,
    saving: false,
    fetching: false,
    setCurrentNote: (note: Note) =>
      set((state) => {
        state.currentNote = note
      }),
    getNotes: async () => {
      set({ fetching: true })
      try {
        const response = await api.get('/notes')
        return response
      } catch (err) {
        throw err
      } finally {
        set({ fetching: false })
      }
    },
    createNote: async (data: CreateNote) => {
      set({ saving: true })
      try {
        const response = await api.post('/notes', { title: data.title, content: data.content })
        set({ currentNote: response.data })
      } finally {
        set({ saving: false })
      }
    },
    updateNote: async (id: string, data: UpdateNote) => {
      set({ saving: true })
      try {
        const response = await api.patch(`/notes/${id}`, {
          title: data.title,
          content: data.content,
        })
        set({ currentNote: response.data })
      } finally {
        set({ saving: false })
      }
    },
  })),
)
