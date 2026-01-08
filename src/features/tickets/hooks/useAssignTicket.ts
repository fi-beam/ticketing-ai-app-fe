import { useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/lib/api'
import type { Ticket } from '@/types'
import { toast } from 'sonner'
import { ticketsApi } from '../api/ticketsApi'

export const useAssignTicket = (ticketId: string) => {
  const queryClient = useQueryClient()

  return useMutation<Ticket, { message: string }, string>({
    mutationFn: (assignedAgentId: string) => ticketsApi.assign(ticketId, assignedAgentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tickets.detail(ticketId) })
      queryClient.invalidateQueries({ queryKey: queryKeys.tickets.all() })
      toast.success('Ticket assigned successfully!')
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to assign ticket')
    },
  })
}
