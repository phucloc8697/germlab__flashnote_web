import api from '@/services/axios'
import { Note } from '@/types'
import { toast } from 'react-toastify'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { devtools } from 'zustand/middleware'

interface CreateNote {
  title: string
  content: string
}

interface UpdateNote {
  title?: string
  content?: string
}

interface UseNoteStore {
  sidebarNotes: Note[]
  currentNote?: Note
  saving: boolean
  fetching: boolean
  deleting: boolean
  setCurrentNote: (note: Note) => void
  getNotes: () => Promise<any>
  createNote: (data: CreateNote) => void
  updateNote: (id: string, data: UpdateNote) => Promise<void>
  deleteNote: (id: string) => void
}

export const useNoteStore = create<UseNoteStore>()(
  devtools(
    immer((set, get) => ({
      sidebarNotes: [],
      currentNote: undefined,
      saving: false,
      fetching: false,
      deleting: false,
      setCurrentNote: (note: Note) =>
        set((state) => {
          state.currentNote = note
        }),
      getNotes: async () => {
        set({ fetching: true })
        try {
          const response = await api.get<any, Note[]>('/notes')
          set({ sidebarNotes: response })
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
          const response = await api.post<any, Note>('/notes', {
            title: data.title,
            content: data.content,
          })
          set({ currentNote: response })
          get().getNotes()
        } catch (err: any) {
          toast.error(err)
        } finally {
          set({ saving: false })
        }
      },
      updateNote: async (id: string, data: UpdateNote) => {
        set({ saving: true })
        try {
          await api.patch<any, boolean>(`/notes/${id}`, {
            title: data.title,
            content: data.content,
          })
          get().getNotes()
        } finally {
          set({ saving: false })
        }
      },
      deleteNote: async (id: string) => {
        set({ deleting: true })
        try {
          await api.delete<any, boolean>(`/notes/${id}`)
          if (get().currentNote?.id === id) set({ currentNote: undefined })
          get().getNotes()
        } finally {
          set({ deleting: false })
        }
      },
    })),
  ),
)
