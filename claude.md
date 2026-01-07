# Claude.md - TicketFlow AI Project Documentation

This document provides comprehensive context about the TicketFlow AI project for AI assistants and developers working on this codebase.

## Project Overview

**TicketFlow AI** is a modern, production-ready SaaS ticketing system with AI-powered response generation. Built with React 18, TypeScript, and Tailwind CSS, it provides a complete support ticket management solution with intelligent automation.

### Key Features
- **Authentication**: Secure JWT-based auth with role-based access control
- **Dashboard**: Role-specific views (User, Agent, Admin) with real-time metrics
- **Ticket Management**: Full CRUD operations with filtering, search, and status tracking
- **AI Suggestions**: Intelligent response generation for support tickets (killer feature)
- **Admin Panel**: User management, activity logs, and system settings

## Architecture Overview

### Technology Stack

```
Frontend Framework: React 18.3+ with TypeScript 5.6+
Build Tool: Vite 5.4+
Styling: Tailwind CSS 3.4+ with shadcn/ui components
State Management:
  - Global State: Zustand 4.5+ (auth, UI preferences)
  - Server State: TanStack Query 5.20+ (API data, caching)
Form Handling: React Hook Form 7.50+ with Zod 3.22+ validation
Routing: React Router v6.22+
HTTP Client: Axios 1.6+ with interceptors
Icons: Lucide React 0.323+
Dates: date-fns 3.3+
Notifications: Sonner 1.4+
```

### Project Structure Philosophy

The project follows a **feature-based architecture** (not layer-based). Each feature is self-contained with its own components, hooks, API services, and pages.

```
src/
├── features/           # Feature modules (self-contained)
│   ├── auth/          # Authentication feature
│   │   ├── api/       # Auth API services
│   │   ├── components/# Auth-specific components (forms)
│   │   ├── hooks/     # Auth hooks (useLogin, useRegister, useAuth)
│   │   └── pages/     # Auth pages (LoginPage, RegisterPage)
│   ├── dashboard/     # Dashboard feature
│   ├── tickets/       # Ticket management feature
│   ├── ai/           # AI suggestions feature
│   └── admin/        # Admin panel feature
├── components/
│   ├── ui/           # shadcn/ui base components
│   ├── layout/       # Layout components (Navbar, Sidebar, PageLayout)
│   └── shared/       # Shared components (ErrorBoundary, LoadingSkeleton, etc.)
├── lib/
│   ├── api/          # API client configuration, query client
│   ├── utils/        # Utility functions (formatters, validators, cn)
│   └── constants/    # Constants (routes, colors, enums)
├── hooks/            # Global custom hooks
├── stores/           # Zustand stores (authStore, uiStore)
├── types/            # TypeScript type definitions
├── App.tsx           # Root component
├── main.tsx          # Entry point
└── router.tsx        # Route configuration
```

## Key Architectural Patterns

### 1. API Client Pattern

**File**: `src/lib/api/client.ts`

```typescript
// Centralized axios instance with interceptors
- Request interceptor: Adds JWT token to all requests
- Response interceptor: Handles 401 (auto-logout), error formatting
- extractData helper: Extracts data from API responses
```

**Usage**:
```typescript
import { apiClient, extractData } from '@/lib/api'

const response = await apiClient.get('/endpoint')
const data = extractData(response)
```

### 2. React Query Pattern

**File**: `src/lib/api/queryClient.ts`

```typescript
// Query keys factory pattern for cache management
queryKeys.tickets.all(filters) // ['tickets', { status: 'open' }]
queryKeys.tickets.detail(id)   // ['tickets', '123']
```

**Custom Hooks Pattern**:
```typescript
// Queries (GET)
export const useTickets = (filters?: TicketFilters) => {
  return useQuery({
    queryKey: queryKeys.tickets.all(filters),
    queryFn: () => ticketsApi.getAll(filters),
    staleTime: 1000 * 60, // 1 minute
  })
}

// Mutations (POST/PUT/DELETE)
export const useCreateTicket = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ticketsApi.create,
    onSuccess: () => {
      // Invalidate cache to refetch
      queryClient.invalidateQueries(['tickets'])
      toast.success('Ticket created!')
    },
  })
}
```

### 3. Zustand Store Pattern

**Files**: `src/stores/authStore.ts`, `src/stores/uiStore.ts`

```typescript
// Persistent stores with middleware
- authStore: User session, JWT tokens (persisted to localStorage)
- uiStore: Theme, sidebar state (persisted to localStorage)

// Usage
const { user, isAuthenticated, hasRole } = useAuthStore()
const { theme, toggleTheme } = useUIStore()
```

### 4. Form Handling Pattern

**Pattern**: React Hook Form + Zod validation

```typescript
// 1. Define Zod schema
const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Min 6 characters'),
})

// 2. Create form with resolver
const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(schema),
  defaultValues: { ... }
})

// 3. Handle submission
const onSubmit = (data) => {
  mutate(data) // React Query mutation
}
```

### 5. Protected Routes Pattern

**File**: `src/components/shared/ProtectedRoute.tsx`

```typescript
// Wrap routes that require authentication
<ProtectedRoute roles={['admin', 'agent']}>
  <PageLayout>
    <AdminPage />
  </PageLayout>
</ProtectedRoute>

// Checks:
// 1. User is authenticated (redirect to /login if not)
// 2. User has required role (redirect to /dashboard if not)
```

### 6. Component Composition Pattern

**Layout Composition**:
```typescript
// All authenticated pages follow this pattern
<PageLayout>         {/* Navbar + Sidebar + Main wrapper */}
  <FeaturePage />    {/* Page content */}
</PageLayout>

// Benefits:
// - Consistent layout across app
// - Single place to update navigation
// - Responsive behavior handled once
```

## Important Conventions

### 1. Import Aliases

```typescript
import { Button } from '@/components/ui/button'  // @ = src/
import type { User } from '@/types'
import { ROUTES } from '@/lib/constants'
```

### 2. Component Naming

```typescript
// Files: PascalCase.tsx
LoginForm.tsx
TicketCard.tsx

// Exports: Named exports (not default)
export const LoginForm = () => { ... }
export const TicketCard = ({ ticket }: TicketCardProps) => { ... }
```

### 3. Type Definitions

```typescript
// Location: src/types/
user.ts       // User, AuthResponse, LoginCredentials
ticket.ts     // Ticket, TicketActivity, TicketFilters
ai.ts         // AISuggestion, AIStats
api.ts        // ApiResponse, PaginatedResponse, ApiError

// All types are exported from src/types/index.ts
```

### 4. Styling Conventions

```typescript
// Use cn() utility for conditional classes
import { cn } from '@/lib/utils'

<div className={cn(
  'base classes',
  condition && 'conditional classes',
  STATUS_COLORS[status]  // Dynamic classes from constants
)} />

// Tailwind class order (recommended):
// 1. Layout (flex, grid)
// 2. Spacing (p-, m-)
// 3. Sizing (w-, h-)
// 4. Typography (text-, font-)
// 5. Colors (bg-, text-)
// 6. Effects (hover:, focus:)
```

### 5. Constants Usage

```typescript
// File: src/lib/constants/index.ts

// Routes
import { ROUTES, getTicketDetailRoute } from '@/lib/constants'
navigate(ROUTES.TICKETS)
navigate(getTicketDetailRoute(ticketId))

// Color classes
STATUS_COLORS.open      // 'bg-blue-100 text-blue-800...'
PRIORITY_COLORS.high    // 'bg-orange-100 text-orange-800...'
ROLE_COLORS.admin       // 'bg-purple-100 text-purple-800...'

// Usage in components
<Badge className={cn('text-xs', STATUS_COLORS[status])} />
```

## Feature Documentation

### Authentication Flow

```
1. User submits credentials → useLogin hook
2. authApi.login() → POST /api/auth/login
3. Receive { user, accessToken, refreshToken }
4. authStore.setAuth(user, token) → Save to localStorage
5. axios interceptor adds token to all future requests
6. Navigate to dashboard

Logout:
1. authApi.logout() → POST /api/auth/logout (optional)
2. authStore.clearAuth() → Remove from localStorage
3. Navigate to /login

Auto-logout on 401:
- Response interceptor catches 401
- Clears auth store
- Redirects to /login
```

### AI Suggestion Feature (Killer Feature)

**Location**: `src/features/ai/`

**Flow**:
```
1. Agent views ticket detail page
2. Clicks "Generate AI Suggestion" button
3. useGenerateAISuggestion hook triggered
4. Shows loading state (3-5 seconds)
5. AI analyzes ticket and generates response
6. Displays suggestion with confidence level
7. Agent can:
   - Edit the suggestion
   - Approve & Send (updates ticket)
   - Reject (logs feedback)
   - Regenerate (new suggestion)
   - Copy to clipboard

Components:
- AISuggestionPanel.tsx (main UI)
- useAISuggestion.ts (hooks)
- aiApi.ts (API services)
```

**Mock Implementation**:
Currently uses mock data with setTimeout to simulate API delay. Replace with real API calls when backend is ready.

### Ticket Management

**Filters**:
- Status: All, Open, In Progress, Resolved, Closed
- Priority: All, Low, Medium, High, Urgent
- Search: Searches title and description
- Assignment: Filter by assigned agent (admin/agent only)

**Permissions**:
- User: Can create tickets, view own tickets, add comments
- Agent: All user permissions + assign tickets, change status, generate AI suggestions
- Admin: All agent permissions + delete tickets, reassign to any agent

### Admin Panel

**Users Tab**:
- View all users with pagination
- Search by name/email
- Filter by role and status
- Change user roles (Admin, Agent, User)
- Activate/deactivate users

**Activity Logs Tab**:
- Real-time activity tracking
- Filter by action type
- Export to CSV
- IP address logging

**Settings Tab**:
- AI configuration toggle
- API status monitoring
- System preferences

## State Management Details

### Auth Store

```typescript
interface AuthState {
  user: User | null
  accessToken: string | null
  isAuthenticated: boolean
  setAuth: (user, token) => void
  clearAuth: () => void
  updateUser: (userData) => void
  hasRole: (roles) => boolean  // Helper for role checking
}

// Persisted to localStorage as 'auth-storage'
```

### UI Store

```typescript
interface UIState {
  theme: 'light' | 'dark'
  sidebarCollapsed: boolean
  toggleTheme: () => void
  toggleSidebar: () => void
  setSidebarCollapsed: (collapsed) => void
}

// Persisted to localStorage as 'ui-storage'
// Automatically applies dark class to <html> on theme change
```

## API Integration Guide

### Current State: Mock API

The app currently uses mock data for all API calls. This allows full functionality without a backend.

**Mock Data Locations**:
- `src/features/auth/hooks/useLogin.ts` - Mock login
- `src/features/tickets/hooks/useTickets.ts` - Mock tickets
- `src/features/dashboard/hooks/useDashboardMetrics.ts` - Mock metrics
- `src/features/ai/hooks/useAISuggestion.ts` - Mock AI generation

### Connecting Real Backend

To connect a real backend:

1. **Update API URL**:
   ```env
   # .env
   VITE_API_URL=https://your-backend-api.com/api
   VITE_ENABLE_MOCK_API=false
   ```

2. **Replace Mock Implementations**:
   - Remove setTimeout and mock data from hooks
   - Use actual API services from `*/api/*.ts` files
   - The axios client and interceptors are already configured

3. **Expected API Endpoints**:
   ```
   POST   /auth/login
   POST   /auth/register
   POST   /auth/logout
   GET    /auth/me

   GET    /tickets?status=&priority=&search=
   GET    /tickets/:id
   POST   /tickets
   PATCH  /tickets/:id
   DELETE /tickets/:id
   GET    /tickets/:id/activities
   POST   /tickets/:id/comments

   POST   /ai/suggestions
   GET    /ai/suggestions/:ticketId
   PATCH  /ai/suggestions/:id

   GET    /dashboard/metrics
   GET    /admin/users
   GET    /admin/logs
   ```

4. **API Response Format**:
   ```typescript
   // Expected format
   {
     "success": true,
     "data": { ... },
     "message": "Optional message"
   }

   // Or direct data (extractData helper handles both)
   { "data": { ... } }
   ```

## Component Library (shadcn/ui)

### Available Components

Located in `src/components/ui/`:
- Button (with variants: default, destructive, outline, secondary, ghost, link)
- Card (with CardHeader, CardTitle, CardDescription, CardContent, CardFooter)
- Input
- Textarea
- Select
- Label
- Badge
- Skeleton (for loading states)

### Adding New Components

```bash
# If using shadcn CLI:
npx shadcn-ui@latest add [component-name]

# Manual: Copy component from shadcn/ui docs to src/components/ui/
```

### Custom Styling

All components use Tailwind CSS with design tokens from `src/index.css`:
- Primary color: Blue (#3B82F6)
- Secondary color: Purple (#8B5CF6) - Used for AI features
- Success: Green (#10B981)
- Warning: Yellow (#F59E0B)
- Error: Red (#EF4444)

## Responsive Design

### Breakpoints

```typescript
// Tailwind breakpoints
sm: 640px   // Mobile landscape
md: 768px   // Tablet
lg: 1024px  // Desktop
xl: 1280px  // Large desktop
2xl: 1536px // Extra large

// Usage
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
```

### Mobile Considerations

- Sidebar becomes a drawer on mobile (<768px)
- Bottom navigation could be added for mobile
- Touch-friendly button sizes (min 44px)
- Swipeable ticket cards on mobile
- Hamburger menu for navigation

## Performance Optimization

### Code Splitting

Routes are ready for code splitting:
```typescript
// In router.tsx, add lazy loading:
const DashboardPage = lazy(() => import('./features/dashboard/pages/DashboardPage'))

<Suspense fallback={<LoadingSkeleton />}>
  <DashboardPage />
</Suspense>
```

### React Query Optimization

```typescript
// Stale times configured in queryClient.ts
- Static data: 5 minutes
- Dynamic data: 0 (always fresh)
- Background refetching on window focus: enabled
- Retry logic: 3 attempts with exponential backoff
```

### Bundle Analysis

Current build:
- Total: 507.58 KB (minified)
- Gzipped: 153.36 KB ✅ (under 500KB target)
- Optimization opportunities:
  - Dynamic imports for routes
  - Tree-shaking (already enabled)
  - Remove unused dependencies

## Testing Strategy

### Recommended Testing Approach

```typescript
// Unit tests (Vitest)
- Utility functions (formatters, validators)
- Store actions (Zustand)
- API client interceptors

// Component tests (React Testing Library)
- LoginForm
- CreateTicketForm
- AISuggestionPanel
- ProtectedRoute

// Integration tests
- Full login flow
- Create ticket flow
- Generate AI suggestion flow

// E2E tests (Playwright/Cypress)
- Critical user journeys
- Multi-page flows
```

### Test Files Location

```
src/
├── features/
│   └── auth/
│       ├── components/
│       │   ├── LoginForm.tsx
│       │   └── LoginForm.test.tsx  ← Co-located
│       └── hooks/
│           ├── useLogin.ts
│           └── useLogin.test.ts    ← Co-located
```

## Environment Variables

```env
# Required
VITE_API_URL=http://localhost:8000/api

# Optional
VITE_APP_NAME=TicketFlow AI
VITE_ENABLE_MOCK_API=true
VITE_AI_FEATURE_FLAG=true
```

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Or connect GitHub repo in Vercel dashboard
```

**Configuration**: See `vercel.json`
- SPA routing handled
- Static asset caching configured

### Netlify

```bash
# Build and deploy
npm run build
# Upload dist/ folder
```

**Configuration**: See `netlify.toml`
- Redirects configured for SPA
- Build command: `npm run build`
- Publish directory: `dist`

### Environment Variables Setup

Add in deployment platform:
```
VITE_API_URL → Your backend URL
VITE_ENABLE_MOCK_API → false (use real API)
```

## Common Tasks

### Adding a New Feature

1. Create feature folder: `src/features/new-feature/`
2. Add subfolders: `api/`, `components/`, `hooks/`, `pages/`
3. Create API service in `api/`
4. Create custom hooks in `hooks/`
5. Build components in `components/`
6. Create pages in `pages/`
7. Add route in `src/router.tsx`
8. Add navigation item in `src/components/layout/Sidebar.tsx`

### Adding a New Page

1. Create page component in appropriate `features/*/pages/` folder
2. Add route in `src/router.tsx`
3. Wrap with `<ProtectedRoute>` if authenticated
4. Wrap with `<PageLayout>` for consistent layout
5. Add navigation link if needed

### Adding New API Endpoint

1. Add function to appropriate `features/*/api/*.ts` file
2. Create custom hook in `features/*/hooks/`
3. Add query key to `src/lib/api/queryClient.ts`
4. Use hook in component

### Updating Styles

1. Use existing Tailwind classes
2. For new design tokens, update `src/index.css`
3. For component variants, update component in `src/components/ui/`
4. For constants (colors), update `src/lib/constants/`

## Troubleshooting

### Build Errors

**TypeScript errors**:
- Run `npm run build` to see all errors
- Check `tsconfig.json` for strict settings
- Use `any` sparingly, prefer proper types

**Import errors**:
- Check `@/` alias is configured in `vite.config.ts`
- Verify file extensions (.ts, .tsx)

### Runtime Errors

**401 Unauthorized**:
- Check token is in localStorage
- Verify axios interceptor is adding token
- Check token hasn't expired

**React Query errors**:
- Check query keys match
- Verify API functions return correct format
- Use React Query DevTools for debugging

**Routing issues**:
- Verify route paths match
- Check ProtectedRoute is wrapping correctly
- Ensure BrowserRouter is used (not HashRouter)

## Best Practices

### Do's ✅

- Use TypeScript strict mode
- Keep components small and focused
- Use custom hooks for reusable logic
- Handle loading and error states
- Add proper ARIA labels for accessibility
- Use React Query for server state
- Use Zustand for global client state
- Keep mock data in hooks (easy to replace)
- Follow feature-based structure
- Use constants for colors, routes
- Add proper TypeScript types

### Don'ts ❌

- Don't use default exports (use named exports)
- Don't put API logic in components
- Don't mutate state directly
- Don't forget loading/error states
- Don't hardcode URLs or colors
- Don't use inline styles (use Tailwind)
- Don't create god components
- Don't skip TypeScript types
- Don't forget error boundaries
- Don't use console.log in production

## Future Enhancements

### Planned Features
- [ ] Real-time notifications (WebSockets)
- [ ] File attachments for tickets
- [ ] Advanced analytics dashboard
- [ ] Email notifications
- [ ] Knowledge base integration
- [ ] Multi-language support (i18n)
- [ ] Mobile app (React Native)
- [ ] Voice notes for tickets
- [ ] AI chat assistant
- [ ] Ticket templates

### Technical Improvements
- [ ] Add comprehensive test suite
- [ ] Implement MSW for mock API
- [ ] Add Storybook for component documentation
- [ ] Setup CI/CD pipeline
- [ ] Add bundle size monitoring
- [ ] Implement PWA features
- [ ] Add performance monitoring (Sentry)
- [ ] Setup e2e tests (Playwright)

## Contact & Support

For questions or issues:
1. Check this documentation first
2. Review the README.md
3. Check component comments in code
4. Review React Query DevTools (development)
5. Open an issue on GitHub

---

**Last Updated**: January 2026
**Version**: 1.0.0
**Maintainer**: TicketFlow AI Team

This documentation is maintained to help AI assistants and developers understand and work with the codebase efficiently.
