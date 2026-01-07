import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: true,
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
    mutations: {
      retry: 1,
    },
  },
})

// Query keys factory
export const queryKeys = {
  auth: {
    me: ['auth', 'me'] as const,
  },
  tickets: {
    all: (filters?: Record<string, unknown>) => ['tickets', filters] as const,
    detail: (id: string) => ['tickets', id] as const,
    activities: (id: string) => ['tickets', id, 'activities'] as const,
  },
  ai: {
    suggestions: (ticketId: string) => ['ai', 'suggestions', ticketId] as const,
    stats: ['ai', 'stats'] as const,
  },
  dashboard: {
    metrics: (role: string) => ['dashboard', 'metrics', role] as const,
  },
  admin: {
    users: (filters?: Record<string, unknown>) => ['admin', 'users', filters] as const,
    logs: (filters?: Record<string, unknown>) => ['admin', 'logs', filters] as const,
  },
} as const
