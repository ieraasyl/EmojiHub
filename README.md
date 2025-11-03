# EmojiHub

Next.js web app for exploring, searching, and managing emojis with AI-powered descriptions.

## Features

- 🔍 Search & filter emojis by name, category, and group
- ⭐ Save favorites (requires authentication)
- 🤖 AI-powered descriptions via Google Gemini
- 🔐 Google OAuth 2.0 with JWT and multi-device sessions
- 🎨 Material-UI with dark/light theme

## Tech Stack

**Frontend:** Next.js 16, Material-UI, TypeScript, SWR, Axios  
**Authentication:** Go-based service (JWT, Redis sessions, PostgreSQL)  
**AI:** Google Generative AI (Gemini)

## Quick Start

### Prerequisites

- Node.js 18+
 - Running [AuthService](https://github.com/ieraasyl/AuthService) backend
- Google API key for Gemini

### Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment** (`.env.local`):
   ```bash
   EMOJI_API_URL=<emoji-api-endpoint>
   NEXT_PUBLIC_AUTH_API_URL=http://localhost:8080
   GOOGLE_API_KEY=<gemini-api-key>
   ```

3. **Run development server:**
   ```bash
   npm run dev
   ```

Visit http://localhost:3000

## Authentication Service

Integrates with a Go-based auth service providing:
- Google OAuth 2.0 login
- JWT access (15m) & refresh tokens (7d) with rotation
- Multi-device session management in Redis
- Token blacklisting and automatic refresh
- Rate limiting (100 req/min per IP)

### Running Auth Service

```powershell
# With Docker
cd AuthService
docker-compose up -d --build
```

Auth service runs at: http://localhost:8080
- API docs: http://localhost:8080/api/docs
- Health: http://localhost:8080/health

### Required Auth Config

```bash
FRONTEND_URL=http://localhost:3000
ALLOWED_ORIGINS=http://localhost:3000
GOOGLE_CLIENT_ID=<your-client-id>
GOOGLE_CLIENT_SECRET=<your-client-secret>
JWT_SECRET=<min-32-bytes-secret>
POSTGRES_PASSWORD=<db-password>
```

See [AuthService README](https://github.com/ieraasyl/AuthService) for full setup.

## Authentication Service

This application integrates with a custom Go-based authentication service that provides:

### Auth Features

- **Google OAuth 2.0** - Secure login with Google (profile + email scopes)
- **JWT Tokens** - HS256 access (15m) and refresh tokens (7d) with rotation
- **Multi-Device Sessions** - Redis-backed session management with device tracking
- **Token Security** - Automatic token refresh, blacklisting, and revocation
- **Rate Limiting** - IP-based rate limiting per endpoint
- **Session Control** - View active sessions, revoke individual devices, or logout from all devices

### Auth Service Tech Stack

- **Backend**: Go 1.25.3 with chi router
- **Database**: PostgreSQL 16 (user persistence)
- **Cache/Sessions**: Redis 7 (sessions, tokens, rate limiting)
- **Security**: JWT with token rotation, CORS, security headers
- **Monitoring**: Prometheus metrics, structured logging (zerolog)
- **Documentation**: Swagger UI at `/api/docs`

### Auth Endpoints Used

The frontend integrates with these auth service endpoints:

- `GET /api/v1/auth/google/login` - Initiate Google OAuth flow
- `GET /api/v1/auth/google/callback` - OAuth callback (redirects to frontend)
- `POST /api/v1/auth/refresh` - Refresh access token
- `GET /api/v1/auth/me` - Get current user profile (protected)
- `POST /api/v1/auth/logout` - Logout from all devices (protected)
- `GET /api/v1/auth/sessions` - List active sessions (protected)
- `DELETE /api/v1/auth/sessions/{id}` - Revoke specific session (protected)
- `POST /api/v1/auth/sessions/revoke-others` - Revoke all other sessions (protected)

### Running the Auth Service

The auth service must be running for login and protected features to work. 

**Quick Start with Docker:**

```powershell
# Clone the auth service repository
git clone <auth-service-repo-url>
cd AuthService

# Create .env file with required variables
# Minimum required:
# - POSTGRES_PASSWORD
# - GOOGLE_CLIENT_ID
# - GOOGLE_CLIENT_SECRET
# - JWT_SECRET (≥32 bytes)

# Start the services
docker-compose up -d --build
```

**Auth service will be available at:** `http://localhost:8080`
- API: http://localhost:8080
- Swagger Docs: http://localhost:8080/api/docs
- Health Check: http://localhost:8080/health
- Metrics: http://localhost:8080/metrics

For detailed setup instructions, refer to the [AuthService README](https://github.com/ieraasyl/AuthService).

### Auth Configuration

Ensure these environment variables are set in the auth service:

```bash
# Frontend redirect after login
FRONTEND_URL=http://localhost:3000

# CORS - allow frontend origin
ALLOWED_ORIGINS=http://localhost:3000

# Google OAuth credentials
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# JWT secret (min 32 bytes)
JWT_SECRET=your-secret-key-min-32-bytes

# Database
POSTGRES_PASSWORD=your-db-password
```

## Project Structure

```
/app              # Next.js pages and API routes
  /api/emojis     # Emoji endpoints (list, details, favorites)
  /dashboard      # User dashboard
  /emojis         # Emoji browser and detail pages
  /login          # Login page
  /sessions       # Session management
/components       # React components
  /auth           # LoginButton, UserProfile, SessionManager
  /layout         # Navbar, ProtectedRoute
/lib              # Utilities and API clients
  /api            # API client, error handling
  /auth           # Auth context, hooks, client
/hooks            # Custom React hooks (useFavorites)
```

## Key Features

### Authentication Flow
1. User clicks "Login with Google"
2. Redirected to auth service → Google OAuth
3. Auth service creates session, issues JWT tokens (HttpOnly cookies)
4. Redirects back to frontend with authenticated session

### Token Management
- **Access Token**: 15 min, auto-refreshed
- **Refresh Token**: 7 days, rotated on each refresh
- **Storage**: HttpOnly cookies (XSS protection)

### Session Management
View and manage all active sessions across devices. Revoke individual sessions or logout from all devices.

## API Routes

**Public:** `/`, `/emojis`, `/emojis/[name]`, `/login`  
**Protected:** `/dashboard`, `/sessions`, `/api/emojis/favorites`

## Troubleshooting

**Cookies not set locally:**
- Set `ENV=development` in auth service for HTTP testing

**401 Unauthorized:**
- Verify access token hasn't expired
- Check `NEXT_PUBLIC_AUTH_API_URL` is correct

**CORS errors:**
- Ensure `ALLOWED_ORIGINS` in auth service includes frontend URL

**Auth service connection failed:**
- Verify auth service is running: http://localhost:8080/health
- Check Docker containers: `docker ps`
