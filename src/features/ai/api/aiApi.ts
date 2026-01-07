import { apiClient, extractData } from '@/lib/api'
import type { AISuggestion, GenerateAISuggestionRequest, UpdateAISuggestionRequest } from '@/types'

export const aiApi = {
  generateSuggestion: async (data: GenerateAISuggestionRequest) => {
    const response = await apiClient.post<{ data: AISuggestion }>(
      '/ai/suggestions',
      data
    )
    return extractData(response)
  },

  getSuggestions: async (ticketId: string) => {
    const response = await apiClient.get<{ data: AISuggestion[] }>(
      `/ai/suggestions/${ticketId}`
    )
    return extractData(response)
  },

  updateSuggestion: async (id: string, data: UpdateAISuggestionRequest) => {
    const response = await apiClient.patch<{ data: AISuggestion }>(
      `/ai/suggestions/${id}`,
      data
    )
    return extractData(response)
  },

  approveSuggestion: async (id: string, editedContent?: string) => {
    return aiApi.updateSuggestion(id, {
      status: 'approved',
      editedContent,
    })
  },

  rejectSuggestion: async (id: string) => {
    return aiApi.updateSuggestion(id, {
      status: 'rejected',
    })
  },
}
