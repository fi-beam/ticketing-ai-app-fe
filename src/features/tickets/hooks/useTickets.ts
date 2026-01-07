import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/lib/api'
import type { TicketFilters, Ticket } from '@/types'

// Mock data for development
const mockTickets: Ticket[] = [
  {
    id: '1',
    title: 'Login page not loading',
    description: 'The login page shows a blank screen after clicking the login button.',
    status: 'open',
    priority: 'high',
    category: 'technical',
    userId: 'user1',
    userName: 'John Doe',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    hasUnread: true,
  },
  {
    id: '2',
    title: 'Billing issue - double charge',
    description: 'I was charged twice for my subscription this month.',
    status: 'in_progress',
    priority: 'urgent',
    category: 'billing',
    userId: 'user2',
    userName: 'Jane Smith',
    assignedTo: 'agent1',
    assignedToName: 'Agent Johnson',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
  },
  {
    id: '3',
    title: 'Feature request: Dark mode',
    description: 'Would love to have a dark mode option for the dashboard.',
    status: 'resolved',
    priority: 'low',
    category: 'general',
    userId: 'user3',
    userName: 'Bob Wilson',
    assignedTo: 'agent2',
    assignedToName: 'Agent Smith',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
  },
]

export const useTickets = (filters?: TicketFilters) => {
  return useQuery({
    queryKey: queryKeys.tickets.all(filters as any),
    queryFn: async () => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      let filtered = [...mockTickets]

      if (filters?.status && filters.status !== 'all') {
        filtered = filtered.filter((t) => t.status === filters.status)
      }

      if (filters?.priority && filters.priority !== 'all') {
        filtered = filtered.filter((t) => t.priority === filters.priority)
      }

      if (filters?.search) {
        const search = filters.search.toLowerCase()
        filtered = filtered.filter(
          (t) =>
            t.title.toLowerCase().includes(search) ||
            t.description.toLowerCase().includes(search)
        )
      }

      return {
        data: filtered,
        total: filtered.length,
        page: 1,
        limit: 20,
        totalPages: 1,
      }
    },
  })
}
