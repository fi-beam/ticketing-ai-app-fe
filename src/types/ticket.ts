export type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed'

export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent'

export type TicketCategory = 'technical' | 'billing' | 'general' | 'other'

export interface Ticket {
  id: string
  title: string
  description: string
  status: TicketStatus
  priority: TicketPriority
  category?: TicketCategory
  userId: string
  userName: string
  assignedTo?: string
  assignedToName?: string
  createdAt: string
  updatedAt: string
  hasUnread?: boolean
}

export interface TicketActivity {
  id: string
  ticketId: string
  type: 'status_change' | 'comment' | 'assignment' | 'ai_suggestion'
  content: string
  userId: string
  userName: string
  createdAt: string
  metadata?: Record<string, unknown>
}

export interface CreateTicketData {
  title: string
  description: string
  priority: TicketPriority
  category?: TicketCategory
  attachments?: File[]
}

export interface UpdateTicketData {
  title?: string
  description?: string
  status?: TicketStatus
  priority?: TicketPriority
  assignedTo?: string
}

export interface TicketFilters {
  status?: TicketStatus | 'all'
  priority?: TicketPriority | 'all'
  assignedTo?: string
  search?: string
  sortBy?: 'createdAt' | 'priority' | 'status'
  sortOrder?: 'asc' | 'desc'
  page?: number
  limit?: number
}
