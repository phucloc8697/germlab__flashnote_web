import axios from 'axios'

const apiUrl = process.env.NEXT_PUBLIC_API_HOST || ''

const api = axios.create({
  baseURL: apiUrl,
})

api.interceptors.request.use((config) => {
  config.headers.set('Content-Type', 'application/json')
  return config
})

api.interceptors.response.use((response) => {
  return response.data
})

export default api
