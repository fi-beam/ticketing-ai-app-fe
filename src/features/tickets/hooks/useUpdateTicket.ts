import { useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/lib/api'
import type { UpdateTicketData, Ticket } from '@/types'
import { toast } from 'sonner'
import { ticketsApi } from '../api/ticketsApi'

export const useUpdateTicket = (ticketId: string) => {
  const queryClient = useQueryClient()

  return useMutation<Ticket, { message: string }, UpdateTicketData>({
    mutationFn: (data: UpdateTicketData) => ticketsApi.update(ticketId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tickets.detail(ticketId) })
      queryClient.invalidateQueries({ queryKey: queryKeys.tickets.all() })
      toast.success('Ticket updated successfully!')
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update ticket')
    },
  })
}
