import { apiClient, extractData } from '@/lib/api'
import type {
  Ticket,
  CreateTicketData,
  UpdateTicketData,
  TicketFilters,
  PaginatedResponse,
  TicketActivity,
} from '@/types'

export const ticketsApi = {
  getAll: async (filters: TicketFilters) => {
    const response = await apiClient.get<{ data: PaginatedResponse<Ticket> }>(
      '/tickets',
      { params: filters }
    )
    return extractData(response)
  },

  getById: async (id: string) => {
    const response = await apiClient.get<{ data: Ticket }>(`/tickets/${id}`)
    return extractData(response)
  },

  create: async (data: CreateTicketData) => {
    const response = await apiClient.post<{ data: Ticket }>('/tickets', data)
    return extractData(response)
  },

  update: async (id: string, data: UpdateTicketData) => {
    const response = await apiClient.patch<{ data: Ticket }>(`/tickets/${id}`, data)
    return extractData(response)
  },

  delete: async (id: string) => {
    await apiClient.delete(`/tickets/${id}`)
  },

  getActivities: async (id: string) => {
    const response = await apiClient.get<{ data: TicketActivity[] }>(
      `/tickets/${id}/activities`
    )
    return extractData(response)
  },

  addComment: async (id: string, content: string) => {
    const response = await apiClient.post<{ data: TicketActivity }>(
      `/tickets/${id}/comments`,
      { content }
    )
    return extractData(response)
  },
}
