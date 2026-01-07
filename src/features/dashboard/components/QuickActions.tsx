import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Filter, TrendingUp } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/lib/constants'
import type { UserRole } from '@/types'

interface QuickActionsProps {
  role: UserRole
}

export const QuickActions = ({ role }: QuickActionsProps) => {
  const navigate = useNavigate()

  const actions = {
    user: [
      {
        label: 'Create Ticket',
        icon: Plus,
        onClick: () => navigate(ROUTES.TICKET_NEW),
        variant: 'default' as const,
      },
      {
        label: 'View My Tickets',
        icon: Filter,
        onClick: () => navigate(ROUTES.TICKETS),
        variant: 'outline' as const,
      },
    ],
    agent: [
      {
        label: 'Create Ticket',
        icon: Plus,
        onClick: () => navigate(ROUTES.TICKET_NEW),
        variant: 'default' as const,
      },
      {
        label: 'My Tickets',
        icon: Filter,
        onClick: () => navigate(ROUTES.TICKETS),
        variant: 'outline' as const,
      },
      {
        label: 'View Performance',
        icon: TrendingUp,
        onClick: () => navigate(ROUTES.AI_INSIGHTS),
        variant: 'outline' as const,
      },
    ],
    admin: [
      {
        label: 'Create Ticket',
        icon: Plus,
        onClick: () => navigate(ROUTES.TICKET_NEW),
        variant: 'default' as const,
      },
      {
        label: 'View All Tickets',
        icon: Filter,
        onClick: () => navigate(ROUTES.TICKETS),
        variant: 'outline' as const,
      },
      {
        label: 'View Analytics',
        icon: TrendingUp,
        onClick: () => navigate(ROUTES.AI_INSIGHTS),
        variant: 'outline' as const,
      },
    ],
  }

  const roleActions = actions[role] || actions.user

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Common tasks and shortcuts</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {roleActions.map((action) => {
            const Icon = action.icon
            return (
              <Button
                key={action.label}
                variant={action.variant}
                onClick={action.onClick}
                className="flex items-center gap-2"
              >
                <Icon className="h-4 w-4" />
                {action.label}
              </Button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
