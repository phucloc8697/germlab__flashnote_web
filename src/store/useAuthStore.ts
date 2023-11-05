import api from '@/services/axios'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { devtools, persist } from 'zustand/middleware'
import { toast } from 'react-toastify'

interface UseAuthStore {
  user: object | null | undefined
  session: string
  email: string
  accessToken: string
  refreshToken: string
  isAuth: () => boolean
  signUp: (email: string) => Promise<void>
  login: (email: string) => Promise<any>
  verifyLogin: (code: string) => Promise<void>
  logout: () => void
}

export const useAuthStore = create<UseAuthStore>()(
  persist(
    devtools(
      immer((set, get) => ({
        user: null,
        email: '',
        session: '',
        accessToken: '',
        refreshToken: '',
        isAuth: () => {
          return !!get().accessToken
        },
        signUp: async (email: string) => {
          const res = await api.post<any, any>('/sign-up', { email })
          const session = res.Session
          set({ session, email })
        },
        login: async (email: string) => {
          try {
            const res = await api.post<any, any>('/login', { email })
            const session = res.Session
            set({ session, email })
            return res
          } catch (err: any) {
            toast.error(err)
          }
        },
        verifyLogin: async (code: string) => {
          const res = await api.post<any, any>('/verify-login', {
            email: get().email,
            session: get().session,
            code,
          })
          const { AccessToken, IdToken, RefreshToken } = res.AuthenticationResult
          set({ accessToken: AccessToken, refreshToken: RefreshToken, session: '' })
        },
        logout: () => {
          set({ user: null, email: '', session: '', accessToken: '', refreshToken: '' })
        },
      })),
    ),
    {
      name: 'flastnote-auth',
      partialize: (state) => ({
        user: state.user,
        email: state.email,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
      }),
    },
  ),
)
