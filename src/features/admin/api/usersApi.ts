import { apiClient, extractData } from '@/lib/api'
import type { User, PaginatedResponse } from '@/types'

export const usersApi = {
  getAll: async (page = 1, limit = 10) => {
    const response = await apiClient.get<{ data: PaginatedResponse<User> }>(
      '/users',
      { params: { page, limit } }
    )
    return extractData(response)
  },

  updateRole: async (id: string, role: 'admin' | 'agent' | 'user') => {
    const response = await apiClient.patch<{ data: User }>(
      `/users/${id}/role`,
      { role }
    )
    return extractData(response)
  },

  updateStatus: async (id: string, isActive: boolean) => {
    const response = await apiClient.patch<{ data: User }>(
      `/users/${id}/status`,
      { isActive }
    )
    return extractData(response)
  },
}
