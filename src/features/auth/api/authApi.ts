import { apiClient, extractData } from '@/lib/api'
import type { AuthResponse, LoginCredentials, RegisterData } from '@/types'

export const authApi = {
  login: async (credentials: LoginCredentials) => {
    const response = await apiClient.post<{ data: AuthResponse }>('/auth/login', credentials)
    return extractData(response)
  },

  register: async (data: RegisterData) => {
    const response = await apiClient.post<{ data: AuthResponse }>('/auth/register', data)
    return extractData(response)
  },

  logout: async () => {
    await apiClient.post('/auth/logout')
  },

  getMe: async () => {
    const response = await apiClient.get<{ data: AuthResponse['user'] }>('/auth/me')
    return extractData(response)
  },
}
