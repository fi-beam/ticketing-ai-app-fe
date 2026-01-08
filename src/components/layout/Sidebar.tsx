import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Ticket,
  Sparkles,
  Users,
  Activity,
  Settings,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { ROUTES } from '@/lib/constants'
import { useAuth } from '@/features/auth/hooks'
import { useUIStore } from '@/stores'
import { useEffect } from 'react'

interface NavItem {
  label: string
  icon: React.ElementType
  href: string
  roles?: string[]
}

const navItems: NavItem[] = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: ROUTES.DASHBOARD,
  },
  {
    label: 'Tickets',
    icon: Ticket,
    href: ROUTES.TICKETS,
  },
  {
    label: 'AI Insights',
    icon: Sparkles,
    href: ROUTES.AI_INSIGHTS,
    roles: ['admin', 'agent'],
  },
  {
    label: 'Users',
    icon: Users,
    href: ROUTES.ADMIN_USERS,
    roles: ['admin'],
  },
  {
    label: 'Activity Logs',
    icon: Activity,
    href: ROUTES.ADMIN_LOGS,
    roles: ['admin'],
  },
  {
    label: 'Settings',
    icon: Settings,
    href: ROUTES.SETTINGS,
  },
]

export const Sidebar = () => {
  const location = useLocation()
  const { hasRole } = useAuth()
  const { sidebarCollapsed, setSidebarCollapsed } = useUIStore()

  // Close sidebar on mobile when route changes
  useEffect(() => {
    if (window.innerWidth < 768) {
      setSidebarCollapsed(true)
    }
  }, [location.pathname, setSidebarCollapsed])

  const filteredNavItems = navItems.filter(
    (item) => !item.roles || hasRole(item.roles as any)
  )

  return (
    <>
      {/* Mobile overlay */}
      {!sidebarCollapsed && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={() => setSidebarCollapsed(true)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-64 border-r bg-background transition-transform duration-200 md:relative md:top-0 md:h-screen',
          sidebarCollapsed && '-translate-x-full md:translate-x-0'
        )}
      >
        <div className="flex h-full flex-col">
          {/* Mobile close button */}
          <div className="flex items-center justify-between p-4 md:hidden">
            <span className="font-semibold">Menu</span>
            <button
              onClick={() => setSidebarCollapsed(true)}
              className="rounded-md p-2 hover:bg-accent"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4">
            {filteredNavItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.href

              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary text-white'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* Footer */}
          <div className="border-t p-4">
            <p className="text-xs text-muted-foreground">
              v1.0.0 • TicketFlow AI
            </p>
          </div>
        </div>
      </aside>
    </>
  )
}
