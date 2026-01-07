export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  TICKETS: '/tickets',
  TICKET_DETAIL: '/tickets/:id',
  TICKET_NEW: '/tickets/new',
  AI_INSIGHTS: '/ai-insights',
  ADMIN: '/admin',
  ADMIN_USERS: '/admin/users',
  ADMIN_LOGS: '/admin/logs',
  ADMIN_SETTINGS: '/admin/settings',
  PROFILE: '/profile',
  SETTINGS: '/settings',
} as const

export const getTicketDetailRoute = (id: string) => `/tickets/${id}`
