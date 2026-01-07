import { TicketIcon, CheckCircle2, Sparkles, AlertCircle } from 'lucide-react'
import { MetricCard } from '../components/MetricCard'
import { QuickActions } from '../components/QuickActions'
import { RecentActivity } from '../components/RecentActivity'
import { useDashboardMetrics } from '../hooks/useDashboardMetrics'
import { useAuth } from '@/features/auth/hooks'
import { MetricCardSkeleton } from '@/components/shared/LoadingSkeleton'

// Mock recent activity
const mockActivities = [
  {
    id: '1',
    type: 'Ticket',
    message: 'Created new ticket: Login issue',
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    user: 'You',
  },
  {
    id: '2',
    type: 'AI',
    message: 'AI suggestion approved for ticket #123',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    user: 'Agent Smith',
  },
  {
    id: '3',
    type: 'Status',
    message: 'Ticket #122 marked as resolved',
    timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    user: 'Agent Johnson',
  },
  {
    id: '4',
    type: 'Assignment',
    message: 'Ticket #124 assigned to you',
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    user: 'Admin',
  },
]

export const DashboardPage = () => {
  const { user } = useAuth()
  const { data: metrics, isLoading } = useDashboardMetrics(user?.role || 'user')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user?.name}! Here's what's happening today.
        </p>
      </div>

      {/* Metrics Grid */}
      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <MetricCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Total Tickets"
            value={metrics?.totalTickets || 0}
            icon={TicketIcon}
            description="All time tickets"
          />
          <MetricCard
            title="Open Tickets"
            value={metrics?.openTickets || 0}
            icon={AlertCircle}
            description={`${metrics?.openTicketsPercentage}% of total`}
          />
          <MetricCard
            title="Resolved Tickets"
            value={metrics?.resolvedTickets || 0}
            icon={CheckCircle2}
            trend={{
              value: metrics?.resolvedComparison || 0,
              isPositive: (metrics?.resolvedComparison || 0) > 0,
            }}
          />
          <MetricCard
            title="AI Suggestions"
            value={metrics?.aiSuggestionsGenerated || 0}
            icon={Sparkles}
            description="Generated this month"
            className="ai-gradient"
          />
        </div>
      )}

      {/* Quick Actions */}
      {user && <QuickActions role={user.role} />}

      {/* Recent Activity */}
      <div className="grid gap-4 md:grid-cols-2">
        <RecentActivity activities={mockActivities} />

        {/* Placeholder for chart */}
        <div className="rounded-lg border bg-card p-6">
          <h3 className="font-semibold mb-4">Ticket Trends</h3>
          <div className="flex items-center justify-center h-64 text-muted-foreground">
            <p>Chart visualization coming soon</p>
          </div>
        </div>
      </div>
    </div>
  )
}
