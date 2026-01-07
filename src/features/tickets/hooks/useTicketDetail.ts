import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/lib/api'

const mockTicket = {
  id: '1',
  title: 'Login page not loading',
  description: 'The login page shows a blank screen after clicking the login button. I have tried clearing my cache and cookies but the issue persists.',
  status: 'open' as const,
  priority: 'high' as const,
  category: 'technical' as const,
  userId: 'user1',
  userName: 'John Doe',
  createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  updatedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
}

const mockActivities = [
  {
    id: '1',
    ticketId: '1',
    type: 'status_change' as const,
    content: 'Ticket created',
    userId: 'user1',
    userName: 'John Doe',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: '2',
    ticketId: '1',
    type: 'comment' as const,
    content: 'Thank you for reporting this issue. We are looking into it.',
    userId: 'agent1',
    userName: 'Agent Smith',
    createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
  },
]

export const useTicketDetail = (id: string) => {
  return useQuery({
    queryKey: queryKeys.tickets.detail(id),
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 400))
      return { ...mockTicket, id }
    },
  })
}

export const useTicketActivities = (id: string) => {
  return useQuery({
    queryKey: queryKeys.tickets.activities(id),
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 300))
      return mockActivities
    },
  })
}
