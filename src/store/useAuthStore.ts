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
  updateCredential: ({ idToken }: { idToken: string }) => void
  signUp: (email: string) => Promise<void>
  login: (email: string) => Promise<any>
  verifyLogin: (code: string) => Promise<void>
  logout: () => void
}

export const AUTH_STORAGE = 'flastnote-auth'

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
        updateCredential: ({ idToken }) => {
          set({ accessToken: idToken })
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
            toast.success(`We sent an authorization code to ${email}`)
            return res
          } catch (err: any) {
            if (err.data && err.data.name === 'UserNotFoundException') {
              return toast.error('User not found')
            }
            toast.error(err.message || err)
          }
        },
        verifyLogin: async (code: string) => {
          const res = await api.post<any, any>('/verify-login', {
            email: get().email,
            session: get().session,
            code,
          })
          const { IdToken, RefreshToken } = res.AuthenticationResult
          set({ accessToken: IdToken, refreshToken: RefreshToken, session: '' })
        },
        logout: () => {
          set({ user: null, email: '', session: '', accessToken: '', refreshToken: '' })
          window.location.href = '/'
        },
      })),
    ),
    {
      name: AUTH_STORAGE,
      partialize: (state) => ({
        user: state.user,
        email: state.email,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
      }),
    },
  ),
)
