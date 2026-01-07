import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Search, Download, RefreshCw, Sparkles } from 'lucide-react'
import { ROLE_COLORS } from '@/lib/constants'
import { formatRelativeTime, getInitials } from '@/lib/utils'
import { cn } from '@/lib/utils'
import { useLocation } from 'react-router-dom'

// Mock data
const mockUsers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user' as const,
    status: 'active' as const,
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'Agent Smith',
    email: 'smith@example.com',
    role: 'agent' as const,
    status: 'active' as const,
    createdAt: '2024-01-15T00:00:00Z',
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin' as const,
    status: 'active' as const,
    createdAt: '2024-01-01T00:00:00Z',
  },
]

const mockLogs = [
  {
    id: '1',
    userId: '1',
    userName: 'John Doe',
    action: 'Created ticket #123',
    actionType: 'tickets' as const,
    details: 'Login page not loading',
    ipAddress: '192.168.1.1',
    createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
  },
  {
    id: '2',
    userId: '2',
    userName: 'Agent Smith',
    action: 'Generated AI suggestion',
    actionType: 'ai' as const,
    details: 'For ticket #123',
    ipAddress: '192.168.1.2',
    createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
  },
  {
    id: '3',
    userId: '3',
    userName: 'Admin User',
    action: 'Updated user role',
    actionType: 'users' as const,
    details: 'Changed role from user to agent',
    ipAddress: '192.168.1.3',
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
]

const actionTypeColors = {
  authentication: 'bg-blue-100 text-blue-800',
  tickets: 'bg-green-100 text-green-800',
  ai: 'bg-purple-100 text-purple-800',
  users: 'bg-orange-100 text-orange-800',
  other: 'bg-gray-100 text-gray-800',
}

export const AdminPage = () => {
  const location = useLocation()
  const [activeTab, setActiveTab] = useState<'users' | 'logs' | 'settings'>(
    location.pathname.includes('logs')
      ? 'logs'
      : location.pathname.includes('settings')
      ? 'settings'
      : 'users'
  )
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Panel</h1>
        <p className="text-muted-foreground">
          Manage users, view activity logs, and configure system settings
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b">
        <button
          onClick={() => setActiveTab('users')}
          className={cn(
            'px-4 py-2 text-sm font-medium border-b-2 transition-colors',
            activeTab === 'users'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          )}
        >
          Users
        </button>
        <button
          onClick={() => setActiveTab('logs')}
          className={cn(
            'px-4 py-2 text-sm font-medium border-b-2 transition-colors',
            activeTab === 'logs'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          )}
        >
          Activity Logs
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={cn(
            'px-4 py-2 text-sm font-medium border-b-2 transition-colors',
            activeTab === 'settings'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          )}
        >
          Settings
        </button>
      </div>

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div className="space-y-4">
          {/* Filters */}
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select defaultValue="all">
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="agent">Agent</option>
              <option value="user">User</option>
            </Select>
            <Select defaultValue="active">
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </Select>
          </div>

          {/* Users Table */}
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b bg-muted/50">
                    <tr>
                      <th className="text-left p-4 font-medium">User</th>
                      <th className="text-left p-4 font-medium">Role</th>
                      <th className="text-left p-4 font-medium">Status</th>
                      <th className="text-left p-4 font-medium">Created</th>
                      <th className="text-left p-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockUsers.map((user) => (
                      <tr key={user.id} className="border-b last:border-0">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
                              {getInitials(user.name)}
                            </div>
                            <div>
                              <div className="font-medium">{user.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {user.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge
                            variant="outline"
                            className={cn('capitalize', ROLE_COLORS[user.role])}
                          >
                            {user.role}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <Badge
                            variant="outline"
                            className={
                              user.status === 'active'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                            }
                          >
                            {user.status}
                          </Badge>
                        </td>
                        <td className="p-4 text-sm text-muted-foreground">
                          {formatRelativeTime(user.createdAt)}
                        </td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <Select
                              defaultValue={user.role}
                              className="w-auto text-xs"
                            >
                              <option value="admin">Admin</option>
                              <option value="agent">Agent</option>
                              <option value="user">User</option>
                            </Select>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Activity Logs Tab */}
      {activeTab === 'logs' && (
        <div className="space-y-4">
          {/* Filters */}
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search logs..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select defaultValue="all">
              <option value="all">All Actions</option>
              <option value="authentication">Authentication</option>
              <option value="tickets">Tickets</option>
              <option value="ai">AI</option>
              <option value="users">Users</option>
            </Select>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
          </div>

          {/* Logs Table */}
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b bg-muted/50">
                    <tr>
                      <th className="text-left p-4 font-medium">Timestamp</th>
                      <th className="text-left p-4 font-medium">User</th>
                      <th className="text-left p-4 font-medium">Action</th>
                      <th className="text-left p-4 font-medium">Details</th>
                      <th className="text-left p-4 font-medium">IP Address</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockLogs.map((log) => (
                      <tr key={log.id} className="border-b last:border-0">
                        <td className="p-4 text-sm text-muted-foreground">
                          {formatRelativeTime(log.createdAt)}
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-medium">
                              {getInitials(log.userName)}
                            </div>
                            <span className="text-sm">{log.userName}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge
                            variant="outline"
                            className={cn(
                              'text-xs',
                              actionTypeColors[log.actionType]
                            )}
                          >
                            {log.action}
                          </Badge>
                        </td>
                        <td className="p-4 text-sm">{log.details}</td>
                        <td className="p-4 text-sm text-muted-foreground">
                          {log.ipAddress}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className="grid gap-6 max-w-2xl">
          {/* AI Configuration */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-secondary" />
                <CardTitle>AI Configuration</CardTitle>
              </div>
              <CardDescription>
                Manage AI-powered features and settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Enable AI Suggestions</p>
                  <p className="text-sm text-muted-foreground">
                    Allow agents to generate AI-powered responses
                  </p>
                </div>
                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary">
                  <span className="inline-block h-4 w-4 translate-x-6 transform rounded-full bg-white transition" />
                </button>
              </div>

              <div className="pt-4 border-t space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">API Status</span>
                  <Badge className="bg-green-600">Connected</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Usage Today</span>
                  <span className="text-sm">234 suggestions</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Rate Limit</span>
                  <span className="text-sm">1000/day</span>
                </div>
              </div>

              <Button variant="outline" className="w-full">
                <RefreshCw className="mr-2 h-4 w-4" />
                Test AI Connection
              </Button>
            </CardContent>
          </Card>

          {/* General Settings */}
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Application preferences and defaults</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Default Ticket Priority</label>
                <Select defaultValue="medium">
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Auto-assign Tickets</label>
                <Select defaultValue="disabled">
                  <option value="disabled">Disabled</option>
                  <option value="round-robin">Round Robin</option>
                  <option value="least-loaded">Least Loaded Agent</option>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
