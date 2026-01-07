# TicketFlow AI - Smart Ticketing System

A modern, production-ready SaaS ticketing system with AI-powered response generation built with React, TypeScript, and Tailwind CSS.

## Features

- **🔐 Authentication System** - Secure login/register with JWT tokens and protected routes
- **📊 Role-Based Dashboard** - Customized views for Users, Agents, and Admins
- **🎫 Ticket Management** - Create, view, filter, and manage support tickets
- **✨ AI-Powered Suggestions** - Generate intelligent response suggestions for tickets (Killer Feature!)
- **👥 User Management** - Admin panel for managing users and roles
- **📝 Activity Logs** - Track all system activities with detailed logging
- **🌓 Dark Mode** - Beautiful light and dark themes
- **📱 Fully Responsive** - Optimized for mobile, tablet, and desktop

## Tech Stack

- **Framework:** React 18+ with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS with shadcn/ui components
- **State Management:** Zustand (global state) + TanStack Query (server state)
- **Form Handling:** React Hook Form with Zod validation
- **Routing:** React Router v6
- **HTTP Client:** Axios with interceptors
- **Icons:** Lucide React
- **Date Handling:** date-fns
- **Charts:** Recharts (for dashboard metrics)

## Prerequisites

- Node.js 18+ and npm
- A modern web browser

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ticketing-ai-app-fe
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env
   ```

   Edit `.env` with your configuration:
   ```env
   VITE_API_URL=http://localhost:8000/api
   VITE_APP_NAME=TicketFlow AI
   VITE_ENABLE_MOCK_API=true
   VITE_AI_FEATURE_FLAG=true
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run test` - Run tests (when configured)

## Project Structure

```
src/
├── features/              # Feature-based modules
│   ├── auth/             # Authentication (login, register)
│   ├── dashboard/        # Dashboard with metrics
│   ├── tickets/          # Ticket management
│   ├── ai/               # AI suggestion features
│   └── admin/            # Admin panel
├── components/
│   ├── ui/               # shadcn/ui components
│   ├── layout/           # Layout components (Navbar, Sidebar)
│   └── shared/           # Shared components
├── lib/
│   ├── api/              # API client and configuration
│   ├── utils/            # Utility functions
│   └── constants/        # Constants and enums
├── hooks/                # Custom React hooks
├── stores/               # Zustand stores
├── types/                # TypeScript type definitions
├── App.tsx               # Main App component
├── main.tsx              # Application entry point
└── router.tsx            # Route configuration
```

## Mock API Mode

The application includes built-in mock data for development and demo purposes:

1. **Enable Mock Mode**
   - Set `VITE_ENABLE_MOCK_API=true` in your `.env` file
   - The app will use mock data instead of making real API calls

2. **Mock Features**
   - Realistic data with faker.js
   - Simulated network delays (200-500ms)
   - All API endpoints covered

3. **Demo Credentials** (for testing)
   - Admin: `admin@example.com` / `password123`
   - Agent: `agent@example.com` / `password123`
   - User: `user@example.com` / `password123`

## Key Features Guide

### 1. Authentication

- **Login/Register** with form validation
- **Password strength indicator** on registration
- **Protected routes** based on user roles
- **Auto-logout** on 401 responses

### 2. Dashboard

Role-based views with:
- **Metric cards** showing key statistics
- **Quick actions** for common tasks
- **Recent activity** feed
- **Trend charts** (coming soon)

### 3. Ticket Management

- **Create tickets** with priority and category
- **Filter and search** functionality
- **Real-time updates** with React Query
- **Status tracking** and assignment

### 4. AI Suggestions (✨ Killer Feature)

Located in the ticket detail page sidebar (agents/admins only):

1. Click "Generate AI Suggestion" button
2. Wait 3-5 seconds for AI analysis
3. Review the generated response
4. **Edit** if needed or **Approve & Send** directly
5. **Regenerate** for alternative suggestions
6. Provide **feedback** (helpful/not helpful)

**Features:**
- Confidence level indicator
- Edit before sending
- Copy to clipboard
- View previous suggestions
- Feedback mechanism

### 5. Admin Panel

**Users Tab:**
- View all users with search and filters
- Change user roles (Admin, Agent, User)
- Activate/deactivate users
- View user creation date

**Activity Logs Tab:**
- Real-time activity tracking
- Filter by action type
- Export to CSV
- IP address tracking

**Settings Tab:**
- AI configuration toggle
- API status monitoring
- Usage statistics
- General system settings

## Development Patterns

### API Integration

```typescript
// Example: Using React Query hooks
const { data, isLoading } = useTickets(filters)
const { mutate: createTicket } = useCreateTicket()

createTicket(ticketData, {
  onSuccess: () => {
    toast.success('Ticket created!')
  }
})
```

### State Management

```typescript
// Global state with Zustand
const { user, isAuthenticated } = useAuthStore()

// Server state with TanStack Query
const { data: tickets } = useQuery({
  queryKey: ['tickets', filters],
  queryFn: () => ticketsApi.getAll(filters)
})
```

### Form Handling

```typescript
// React Hook Form + Zod
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})

const { register, handleSubmit } = useForm({
  resolver: zodResolver(schema)
})
```

## Deployment

### Vercel (Recommended)

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

Or use the Vercel dashboard:
- Connect your Git repository
- Configure build settings:
  - Build Command: `npm run build`
  - Output Directory: `dist`
- Add environment variables
- Deploy!

### Netlify

1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Configure environment variables in Netlify dashboard

### Manual Deployment

```bash
npm run build
# Upload the dist/ folder to your web server
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:8000/api` |
| `VITE_APP_NAME` | Application name | `TicketFlow AI` |
| `VITE_ENABLE_MOCK_API` | Use mock data | `true` |
| `VITE_AI_FEATURE_FLAG` | Enable AI features | `true` |

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- **Bundle size:** < 500KB (gzipped)
- **Lighthouse score:** 90+ (performance)
- **Code splitting:** Route-based lazy loading
- **Image optimization:** WebP format, lazy loading

## Accessibility

- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- Color contrast ratio ≥ 4.5:1
- Screen reader friendly

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support, email support@ticketflow-ai.com or open an issue on GitHub.

## Roadmap

- [ ] Real-time notifications with WebSockets
- [ ] File attachments for tickets
- [ ] Advanced analytics dashboard
- [ ] Email notifications
- [ ] Knowledge base integration
- [ ] Multi-language support
- [ ] Mobile app (React Native)

---

Built with ❤️ using React, TypeScript, and modern web technologies.
