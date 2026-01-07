import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/lib/api'
import type { DashboardMetrics } from '@/types'

// Mock data for development
const mockMetrics: DashboardMetrics = {
  totalTickets: 156,
  openTickets: 42,
  resolvedTickets: 98,
  aiSuggestionsGenerated: 234,
  openTicketsPercentage: 27,
  resolvedComparison: 12,
  ticketsTrend: [
    { date: '2024-01-01', count: 12 },
    { date: '2024-01-02', count: 18 },
    { date: '2024-01-03', count: 24 },
    { date: '2024-01-04', count: 32 },
    { date: '2024-01-05', count: 28 },
    { date: '2024-01-06', count: 35 },
    { date: '2024-01-07', count: 42 },
  ],
}

export const useDashboardMetrics = (role: string) => {
  return useQuery({
    queryKey: queryKeys.dashboard.metrics(role),
    queryFn: async () => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))
      return mockMetrics
    },
  })
}
