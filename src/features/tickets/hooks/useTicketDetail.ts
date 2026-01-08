import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/lib/api'
import { ticketsApi } from '../api/ticketsApi'

export const useTicketDetail = (id: string) => {
  return useQuery({
    queryKey: queryKeys.tickets.detail(id),
    queryFn: () => ticketsApi.getById(id),
    enabled: !!id,
  })
}

export const useTicketActivities = (id: string) => {
  return useQuery({
    queryKey: queryKeys.tickets.activities(id),
    queryFn: () => ticketsApi.getActivities(id),
    enabled: !!id,
  })
}
