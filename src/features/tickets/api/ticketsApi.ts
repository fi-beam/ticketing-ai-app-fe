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
  getAll: async (filters: TicketFilters): Promise<PaginatedResponse<Ticket>> => {
    const cleanFilters: Record<string, string | number | undefined> = {}

    if (filters.status && filters.status !== 'all') {
      cleanFilters.status = filters.status
    }

    if (filters.priority && filters.priority !== 'all') {
      cleanFilters.priority = filters.priority
    }

    if (filters.page) cleanFilters.page = filters.page
    if (filters.limit) cleanFilters.limit = filters.limit
    if (filters.sortBy) cleanFilters.sortBy = filters.sortBy
    if (filters.sortOrder) cleanFilters.order = filters.sortOrder

    const response = await apiClient.get<PaginatedResponse<Ticket>>(
      '/tickets',
      { params: cleanFilters }
    )
    return response.data
  },

  getById: async (id: string): Promise<Ticket> => {
    const response = await apiClient.get<{ data: Ticket }>(`/tickets/${id}`)
    return extractData<Ticket>(response)
  },

  create: async (data: CreateTicketData): Promise<Ticket> => {
    const response = await apiClient.post<{ data: Ticket }>('/tickets', data)
    return extractData<Ticket>(response)
  },

  update: async (id: string, data: UpdateTicketData): Promise<Ticket> => {
    const response = await apiClient.patch<{ data: Ticket }>(`/tickets/${id}`, data)
    return extractData<Ticket>(response)
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/tickets/${id}`)
  },

  getActivities: async (id: string): Promise<TicketActivity[]> => {
    const response = await apiClient.get<{ data: TicketActivity[] }>(
      `/tickets/${id}/activities`
    )
    return extractData<TicketActivity[]>(response)
  },

  addComment: async (id: string, content: string): Promise<TicketActivity> => {
    const response = await apiClient.post<{ data: TicketActivity }>(
      `/tickets/${id}/comments`,
      { content }
    )
    return extractData<TicketActivity>(response)
  },

  assign: async (id: string, assignedAgentId: string): Promise<Ticket> => {
    const response = await apiClient.patch<{ data: Ticket }>(
      `/tickets/${id}/assign`,
      { assignedAgentId }
    )
    return extractData<Ticket>(response)
  },
}
