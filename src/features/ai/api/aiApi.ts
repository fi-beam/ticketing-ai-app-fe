import { apiClient } from '@/lib/api'
import type { AISuggestion } from '@/types'

export const aiApi = {
  generateSuggestion: async (ticketId: string, context?: string) => {
    const response = await apiClient.post<{ suggestion: string; confidence: number; generatedAt: string }>(
      '/ai/suggest-response',
      { ticketId, context }
    )
    return response.data
  },

  getSuggestions: async (ticketId: string) => {
    const response = await apiClient.get<AISuggestion[]>(
      `/ai/responses/${ticketId}`
    )
    return response.data
  },

  approveSuggestion: async (id: string, status: 'approved' | 'rejected') => {
    const response = await apiClient.patch<AISuggestion>(
      `/ai/responses/${id}/approve`,
      { status }
    )
    return response.data
  },

  rejectSuggestion: async (id: string) => {
    return aiApi.approveSuggestion(id, 'rejected')
  },
}
