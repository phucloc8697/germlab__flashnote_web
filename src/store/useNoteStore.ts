import api from '@/services/axios'
import { Note } from '@/types'
import { toast } from 'react-toastify'
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
  immer((set) => ({
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
        set({ sidebarNotes: response.reverse() })
        return response
      } catch (err) {
        throw err
      } finally {
        set({ fetching: false })
      }
    },
    createNote: (data: CreateNote) =>
      set(async (state) => {
        state.saving = true
        set({ saving: true })
        try {
          const response = await api.post<any, Note>('/notes', {
            title: data.title,
            content: data.content,
          })
          state.currentNote = response
          state.getNotes()
        } catch (err: any) {
          toast.error(err)
        } finally {
          state.saving = false
        }
      }),
    updateNote: async (id: string, data: UpdateNote) => {
      set({ saving: true })
      try {
        await api.patch<any, boolean>(`/notes/${id}`, {
          title: data.title,
          content: data.content,
        })
      } finally {
        set({ saving: false })
      }
    },
    deleteNote: (id: string) =>
      set(async (state) => {
        state.deleting = true
        try {
          await api.delete<any, boolean>(`/notes/${id}`)
          if (state.currentNote?.id === id) state.currentNote = undefined
          state.getNotes()
        } finally {
          state.deleting = false
        }
      }),
  })),
)
