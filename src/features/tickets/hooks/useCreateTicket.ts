import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { queryKeys } from '@/lib/api'
import { getTicketDetailRoute } from '@/lib/constants'
import type { CreateTicketData, Ticket } from '@/types'
import { toast } from 'sonner'
import { ticketsApi } from '../api/ticketsApi'

export const useCreateTicket = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation<Ticket, { message: string }, CreateTicketData>({
    mutationFn: (data: CreateTicketData) => ticketsApi.create(data),
    onSuccess: (ticket) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tickets.all() })
      toast.success('Ticket created successfully!')
      navigate(getTicketDetailRoute(ticket.id))
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to create ticket')
    },
  })
}
