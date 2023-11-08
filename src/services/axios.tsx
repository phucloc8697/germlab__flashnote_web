import { AUTH_STORAGE, useAuthStore } from '@/store/useAuthStore'
import axios, { AxiosRequestConfig } from 'axios'

const apiUrl = process.env.NEXT_PUBLIC_API_HOST || ''

const api = axios.create({
  baseURL: apiUrl,
})

let retryCount = 0

const retry = (config: AxiosRequestConfig) => {
  const token = useAuthStore.getState().accessToken
  console.log('🚀 ~ file: axios.tsx:14 ~ retry ~ token:', token)
  return api(config)
}

api.interceptors.request.use((config) => {
  config.headers.set('Content-Type', 'application/json')
  const token = useAuthStore.getState().accessToken
  if (token) {
    config.headers.set('Authorization', `Bearer ${token}`)
  }
  return config
})

api.interceptors.response.use(
  (response) => {
    return response.data
  },
  async (error) => {
    if (error && error.response) {
      if (error.config.url !== '/login' && error.response.status === 401) {
        if (retryCount === 0) {
          retryCount++
          const refreshToken = useAuthStore.getState().refreshToken
          try {
            const res = await api.post<any, any>('/refresh-token', { refreshToken })
            useAuthStore.getState().updateCredential({ idToken: res.AuthenticationResult.IdToken })
            return await retry(error.config)
          } catch (err) {
            useAuthStore.getState().logout()
          }
        } else {
          retryCount = 0
        }
      }
      throw { data: error.response.data, status: error.response.status }
    }
    throw error
  },
)

export default api
