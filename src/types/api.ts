export interface ApiResponse<T> {
  data: T
  message?: string
  success: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface ApiError {
  message: string
  code?: string
  details?: Record<string, unknown>
}

export interface DashboardMetrics {
  totalTickets: number
  openTickets: number
  resolvedTickets: number
  aiSuggestionsGenerated: number
  ticketsTrend?: {
    date: string
    count: number
  }[]
  openTicketsPercentage?: number
  resolvedComparison?: number
}

export interface ActivityLog {
  id: string
  userId: string
  userName: string
  userAvatar?: string
  action: string
  actionType: 'authentication' | 'tickets' | 'ai' | 'users' | 'other'
  resource?: string
  details?: string
  ipAddress?: string
  createdAt: string
}
