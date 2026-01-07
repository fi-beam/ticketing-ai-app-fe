import { createBrowserRouter, Navigate } from 'react-router-dom'
import { LoginPage } from './features/auth/pages/LoginPage'
import { RegisterPage } from './features/auth/pages/RegisterPage'
import { DashboardPage } from './features/dashboard/pages/DashboardPage'
import { TicketsPage } from './features/tickets/pages/TicketsPage'
import { TicketDetailPage } from './features/tickets/pages/TicketDetailPage'
import { CreateTicketPage } from './features/tickets/pages/CreateTicketPage'
import { AdminPage } from './features/admin/pages/AdminPage'
import { ProtectedRoute } from './components/shared/ProtectedRoute'
import { PageLayout } from './components/layout/PageLayout'
import { ROUTES } from './lib/constants'

export const router = createBrowserRouter([
  {
    path: ROUTES.LOGIN,
    element: <LoginPage />,
  },
  {
    path: ROUTES.REGISTER,
    element: <RegisterPage />,
  },
  {
    path: ROUTES.HOME,
    element: <Navigate to={ROUTES.DASHBOARD} replace />,
  },
  {
    path: ROUTES.DASHBOARD,
    element: (
      <ProtectedRoute>
        <PageLayout>
          <DashboardPage />
        </PageLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.TICKETS,
    element: (
      <ProtectedRoute>
        <PageLayout>
          <TicketsPage />
        </PageLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.TICKET_NEW,
    element: (
      <ProtectedRoute>
        <PageLayout>
          <CreateTicketPage />
        </PageLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.TICKET_DETAIL,
    element: (
      <ProtectedRoute>
        <PageLayout>
          <TicketDetailPage />
        </PageLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.ADMIN,
    element: (
      <ProtectedRoute roles={['admin']}>
        <PageLayout>
          <AdminPage />
        </PageLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.ADMIN_USERS,
    element: (
      <ProtectedRoute roles={['admin']}>
        <PageLayout>
          <AdminPage />
        </PageLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.ADMIN_LOGS,
    element: (
      <ProtectedRoute roles={['admin']}>
        <PageLayout>
          <AdminPage />
        </PageLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.AI_INSIGHTS,
    element: (
      <ProtectedRoute roles={['admin', 'agent']}>
        <PageLayout>
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold">AI Insights</h1>
            <p className="text-muted-foreground mt-2">Coming soon...</p>
          </div>
        </PageLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.PROFILE,
    element: (
      <ProtectedRoute>
        <PageLayout>
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold">Profile</h1>
            <p className="text-muted-foreground mt-2">Profile page coming soon...</p>
          </div>
        </PageLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.SETTINGS,
    element: (
      <ProtectedRoute>
        <PageLayout>
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold">Settings</h1>
            <p className="text-muted-foreground mt-2">Settings page coming soon...</p>
          </div>
        </PageLayout>
      </ProtectedRoute>
    ),
  },
])
