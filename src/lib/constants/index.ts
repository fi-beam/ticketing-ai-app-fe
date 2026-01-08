export * from './routes'

export const STATUS_COLORS = {
  open: 'bg-blue-100 text-blue-900 dark:bg-blue-900/30 dark:text-blue-200 dark:border-blue-700',
  in_progress: 'bg-yellow-100 text-yellow-900 dark:bg-yellow-900/30 dark:text-yellow-200 dark:border-yellow-700',
  resolved: 'bg-green-100 text-green-900 dark:bg-green-900/30 dark:text-green-200 dark:border-green-700',
  closed: 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600',
} as const

export const PRIORITY_COLORS = {
  low: 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-600',
  medium: 'bg-blue-100 text-blue-900 dark:bg-blue-900/30 dark:text-blue-200 dark:border-blue-700',
  high: 'bg-orange-100 text-orange-900 dark:bg-orange-900/30 dark:text-orange-200 dark:border-orange-700',
  urgent: 'bg-red-100 text-red-900 dark:bg-red-900/30 dark:text-red-200 dark:border-red-700',
} as const

export const ROLE_COLORS = {
  admin: 'bg-purple-100 text-purple-900 dark:bg-purple-900/30 dark:text-purple-200 dark:border-purple-700',
  agent: 'bg-blue-100 text-blue-900 dark:bg-blue-900/30 dark:text-blue-200 dark:border-blue-700',
  user: 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-600',
} as const

export const CONFIDENCE_COLORS = {
  high: 'text-green-600 dark:text-green-400',
  medium: 'text-yellow-600 dark:text-yellow-400',
  low: 'text-red-600 dark:text-red-400',
} as const
