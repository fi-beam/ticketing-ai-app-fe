import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { queryKeys } from '@/lib/api'
import { getTicketDetailRoute } from '@/lib/constants'
import type { CreateTicketData } from '@/types'
import { toast } from 'sonner'

export const useCreateTicket = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async (data: CreateTicketData) => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800))
      return {
        id: Math.random().toString(36).substring(7),
        ...data,
        status: 'open' as const,
        userId: 'current-user',
        userName: 'Current User',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    },
    onSuccess: (ticket) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tickets.all() })
      toast.success('Ticket created successfully!')
      navigate(getTicketDetailRoute(ticket.id))
    },
    onError: (error: { message: string }) => {
      toast.error(error.message || 'Failed to create ticket')
    },
  })
}
