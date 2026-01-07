import { Link } from 'react-router-dom'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, User } from 'lucide-react'
import type { Ticket } from '@/types'
import { STATUS_COLORS, PRIORITY_COLORS } from '@/lib/constants'
import { getTicketDetailRoute } from '@/lib/constants'
import { formatRelativeTime, truncateText } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface TicketCardProps {
  ticket: Ticket
}

export const TicketCard = ({ ticket }: TicketCardProps) => {
  return (
    <Link to={getTicketDetailRoute(ticket.id)}>
      <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer relative">
        {ticket.hasUnread && (
          <div className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary" />
        )}

        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold line-clamp-1">{ticket.title}</h3>
            <div className="flex gap-1 shrink-0">
              <Badge
                variant="outline"
                className={cn('text-xs', STATUS_COLORS[ticket.status])}
              >
                {ticket.status.replace('_', ' ')}
              </Badge>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground line-clamp-2">
            {truncateText(ticket.description, 120)}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-4">
              <Badge
                variant="outline"
                className={cn('text-xs', PRIORITY_COLORS[ticket.priority])}
              >
                {ticket.priority}
              </Badge>

              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {formatRelativeTime(ticket.createdAt)}
              </div>

              {ticket.assignedToName && (
                <div className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  {ticket.assignedToName}
                </div>
              )}
            </div>

            <span className="text-xs">#{ticket.id}</span>
          </div>
        </div>
      </Card>
    </Link>
  )
}
