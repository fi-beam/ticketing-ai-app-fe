import { useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/lib/api'
import type { TicketActivity } from '@/types'
import { toast } from 'sonner'
import { ticketsApi } from '../api/ticketsApi'

export const useAddComment = (ticketId: string) => {
  const queryClient = useQueryClient()

  return useMutation<TicketActivity, { message: string }, string>({
    mutationFn: (content: string) => ticketsApi.addComment(ticketId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tickets.activities(ticketId) })
      queryClient.invalidateQueries({ queryKey: queryKeys.tickets.detail(ticketId) })
      toast.success('Comment added successfully!')
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to add comment')
    },
  })
}
