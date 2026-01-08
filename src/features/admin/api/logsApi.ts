import { apiClient, extractData } from '@/lib/api'
import type { ActivityLog, PaginatedResponse } from '@/types'

export const logsApi = {
  getAll: async (page = 1, limit = 10) => {
    const response = await apiClient.get<PaginatedResponse<ActivityLog>>(
      '/logs',
      { params: { page, limit } }
    )
    return response.data
  },

  getStats: async () => {
    const response = await apiClient.get<{ data: any }>('/logs/stats')
    return extractData(response)
  },
}
