import axios from 'axios'
import { toast } from 'react-toastify'

const apiUrl = process.env.NEXT_PUBLIC_API_HOST || ''

const api = axios.create({
  baseURL: apiUrl,
})

api.interceptors.request.use((config) => {
  config.headers.set('Content-Type', 'application/json')
  return config
})

api.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    const message = `${error.status}: ${error.response.data}`
    toast.error(message)
    throw error
  },
)

export default api
