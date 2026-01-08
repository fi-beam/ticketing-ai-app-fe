import { apiClient, extractData } from '@/lib/api'
import type { ActivityLog, PaginatedResponse } from '@/types'

export const logsApi = {
  getAll: async (page = 1, limit = 10) => {
    const response = await apiClient.get<{ data: PaginatedResponse<ActivityLog> }>(
      '/logs',
      { params: { page, limit } }
    )
    return extractData(response)
  },

  getStats: async () => {
    const response = await apiClient.get<{ data: any }>('/logs/stats')
    return extractData(response)
  },
}
