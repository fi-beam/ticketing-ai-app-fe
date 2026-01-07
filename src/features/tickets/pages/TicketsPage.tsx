import { useState } from 'react'
import { Plus, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/lib/constants'
import { useTickets } from '../hooks/useTickets'
import { TicketCard } from '../components/TicketCard'
import { LoadingSkeleton } from '@/components/shared/LoadingSkeleton'
import { EmptyState } from '@/components/shared/EmptyState'
import type { TicketFilters } from '@/types'

export const TicketsPage = () => {
  const navigate = useNavigate()
  const [filters, setFilters] = useState<TicketFilters>({
    status: 'all',
    priority: 'all',
    search: '',
  })

  const { data, isLoading } = useTickets(filters)

  const handleFilterChange = (key: keyof TicketFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tickets</h1>
          <p className="text-muted-foreground">
            Manage and track all support tickets
          </p>
        </div>
        <Button onClick={() => navigate(ROUTES.TICKET_NEW)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Ticket
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search tickets..."
            className="pl-10"
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
          />
        </div>

        <Select
          value={filters.status}
          onChange={(e) => handleFilterChange('status', e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="open">Open</option>
          <option value="in_progress">In Progress</option>
          <option value="resolved">Resolved</option>
          <option value="closed">Closed</option>
        </Select>

        <Select
          value={filters.priority}
          onChange={(e) => handleFilterChange('priority', e.target.value)}
        >
          <option value="all">All Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="urgent">Urgent</option>
        </Select>
      </div>

      {/* Ticket List */}
      {isLoading ? (
        <LoadingSkeleton />
      ) : data && data.data.length > 0 ? (
        <div className="space-y-4">
          {data.data.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No tickets found"
          description="Try adjusting your filters or create a new ticket"
          actionLabel="Create Ticket"
          onAction={() => navigate(ROUTES.TICKET_NEW)}
        />
      )}
    </div>
  )
}
