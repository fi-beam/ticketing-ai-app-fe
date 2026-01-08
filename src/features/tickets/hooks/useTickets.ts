import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/lib/api'
import type { TicketFilters } from '@/types'
import { ticketsApi } from '../api/ticketsApi'

export const useTickets = (filters?: TicketFilters) => {
  return useQuery({
    queryKey: queryKeys.tickets.all(filters as Record<string, unknown>),
    queryFn: () => ticketsApi.getAll(filters || {}),
  })
}
