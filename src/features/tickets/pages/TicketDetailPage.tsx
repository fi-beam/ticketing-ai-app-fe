import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Clock, User, Tag, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { ROUTES, STATUS_COLORS, PRIORITY_COLORS } from '@/lib/constants'
import { useTicketDetail, useTicketActivities } from '../hooks/useTicketDetail'
import { useUpdateTicket } from '../hooks/useUpdateTicket'
import { useAddComment } from '../hooks/useAddComment'
import { useAssignTicket } from '../hooks/useAssignTicket'
import { AISuggestionPanel } from '@/features/ai/components/AISuggestionPanel'
import { formatRelativeTime } from '@/lib/utils'
import { useAuth } from '@/features/auth/hooks'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import type { TicketStatus, TicketPriority } from '@/types'

export const TicketDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { hasRole } = useAuth()
  const [comment, setComment] = useState('')

  const { data: ticket, isLoading } = useTicketDetail(id!)
  const { data: activities = [] } = useTicketActivities(id!)
  const { mutate: updateTicket, isPending: isUpdating } = useUpdateTicket(id!)
  const { mutate: addComment, isPending: isAddingComment } = useAddComment(id!)
  const { mutate: assignTicket, isPending: isAssigning } = useAssignTicket(id!)

  const isAgent = hasRole(['admin', 'agent'])

  const handleStatusChange = (status: TicketStatus) => {
    updateTicket({ status })
  }

  const handlePriorityChange = (priority: TicketPriority) => {
    updateTicket({ priority })
  }

  const handleAssignChange = (assignedAgentId: string) => {
    if (assignedAgentId) {
      assignTicket(assignedAgentId)
    }
  }

  const handleAddComment = () => {
    if (comment.trim()) {
      addComment(comment, {
        onSuccess: () => {
          setComment('')
        },
      })
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-64" />
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            <Skeleton className="h-64" />
            <Skeleton className="h-96" />
          </div>
          <Skeleton className="h-96" />
        </div>
      </div>
    )
  }

  if (!ticket) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold">Ticket not found</h2>
        <Button onClick={() => navigate(ROUTES.TICKETS)} className="mt-4">
          Back to Tickets
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Button
          variant="ghost"
          onClick={() => navigate(ROUTES.TICKETS)}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Tickets
        </Button>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold tracking-tight">{ticket.title}</h1>
            <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
              <span>#{ticket.id}</span>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                Created {formatRelativeTime(ticket.createdAt)}
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <User className="h-3 w-3" />
                {ticket.userName}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Badge
              variant="outline"
              className={cn('text-xs', STATUS_COLORS[ticket.status])}
            >
              {ticket.status.replace('_', ' ')}
            </Badge>
            <Badge
              variant="outline"
              className={cn('text-xs', PRIORITY_COLORS[ticket.priority])}
            >
              {ticket.priority}
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Ticket Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap text-sm">{ticket.description}</p>
            </CardContent>
          </Card>

          {/* Activity Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activities.map((activity, index) => (
                  <div key={activity.id} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary">
                        💬
                      </div>
                      {index < activities.length - 1 && (
                        <div className="w-px flex-1 bg-border mt-2" />
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">{activity.userName}</p>
                        <Badge variant="outline" className="text-xs">
                          {activity.type.replace('_', ' ')}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {activity.content}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatRelativeTime(activity.createdAt)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Comment */}
              <div className="mt-6 space-y-3 border-t pt-4">
                <Textarea
                  placeholder="Add a comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={3}
                  disabled={isAddingComment}
                />
                <Button
                  onClick={handleAddComment}
                  disabled={!comment.trim() || isAddingComment}
                >
                  {isAddingComment && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isAddingComment ? 'Adding...' : 'Add Comment'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Actions Card */}
          {isAgent && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <Select
                    value={ticket.status}
                    onChange={(e) => handleStatusChange(e.target.value as TicketStatus)}
                    disabled={isUpdating}
                  >
                    <option value="open">Open</option>
                    <option value="in_progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Priority</label>
                  <Select
                    value={ticket.priority}
                    onChange={(e) => handlePriorityChange(e.target.value as TicketPriority)}
                    disabled={isUpdating}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Assign to</label>
                  <Select
                    value={ticket.assignedTo || ''}
                    onChange={(e) => handleAssignChange(e.target.value)}
                    disabled={isAssigning}
                  >
                    <option value="">Unassigned</option>
                    <option value="agent1">Agent Smith</option>
                    <option value="agent2">Agent Johnson</option>
                  </Select>
                </div>
              </CardContent>
            </Card>
          )}

          {/* AI Suggestion Panel */}
          {isAgent && <AISuggestionPanel ticketId={ticket.id} ticketStatus={ticket.status} />}

          {/* Metadata Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <span className="text-muted-foreground">Category</span>
                <div className="flex items-center gap-1 mt-1">
                  <Tag className="h-3 w-3" />
                  <span className="capitalize">{ticket.category || 'N/A'}</span>
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">Created</span>
                <p className="mt-1">{formatRelativeTime(ticket.createdAt)}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Last Updated</span>
                <p className="mt-1">{formatRelativeTime(ticket.updatedAt)}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
