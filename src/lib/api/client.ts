import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'
import type { ApiError } from '@/types'

const API_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:8000/api'

export const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('accessToken')
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  async (error: AxiosError<ApiError>) => {
    if (error.response?.status === 401) {
      // Handle unauthorized - logout user
      localStorage.removeItem('accessToken')
      localStorage.removeItem('user')

      // Only redirect if not already on login page
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login'
      }
    }

    // Format error message
    const message = error.response?.data?.message || error.message || 'An error occurred'

    return Promise.reject({
      message,
      code: error.response?.data?.code,
      details: error.response?.data?.details,
    } as ApiError)
  }
)

// Helper function to extract data from API response
export const extractData = <T>(response: { data: any }): T => {
  // Support both wrapped (ApiResponse) and direct data
  if (response.data.data !== undefined) {
    return response.data.data
  }
  return response.data
}

export default apiClient
