import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { Layout } from "./components/layout"
import { TournamentList } from "./pages/tournaments/tournament-list"
import { TournamentDetails } from "./pages/tournaments/tournament-details"
import { TournamentForm } from "./pages/tournaments/tournament-form"
import { TeamList } from "./pages/teams/team-list"
import { TeamDetails } from "./pages/teams/team-details"
import { TeamForm } from "./pages/teams/team-form"
import { PlayerList } from "./pages/players/player-list"
import { PlayerDetails } from "./pages/players/player-details"
import { PlayerForm } from "./pages/players/player-form"
import { MatchList } from "./pages/matches/match-list"
import { MatchDetails } from "./pages/matches/match-details"
import { MatchForm } from "./pages/matches/match-form"
import { Login } from "./pages/auth/login"
import { Register } from "./pages/auth/register"
import { TicketList } from "./pages/tickets/ticket-list"
import { TicketPurchase } from "./pages/tickets/ticket-purchase"
import { OrderConfirmation } from "./pages/tickets/order-confirmation"
import { OrderHistory } from "./pages/tickets/order-history"
import { Profile } from "./pages/auth/profile"
import { Toaster } from "./components/ui/toaster"
import { ThemeProvider } from "./components/theme-provider"
import { AuthProvider } from "./contexts/auth-context"
import { ProtectedRoute } from "./components/protected-route"

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="esports-theme">
      <AuthProvider>
        <Router>
          <Routes>
            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              {/* Tournament Routes */}
              <Route index element={<TournamentList />} />
              <Route path="tournament/:id" element={<TournamentDetails />} />
              <Route path="tournament/new" element={<TournamentForm />} />
              <Route path="tournament/edit/:id" element={<TournamentForm />} />

              {/* Team Routes */}
              <Route path="teams" element={<TeamList />} />
              <Route path="team/:id" element={<TeamDetails />} />
              <Route path="team/new" element={<TeamForm />} />
              <Route path="team/edit/:id" element={<TeamForm />} />

              {/* Player Routes */}
              <Route path="players" element={<PlayerList />} />
              <Route path="player/:id" element={<PlayerDetails />} />
              <Route path="player/new" element={<PlayerForm />} />
              <Route path="player/edit/:id" element={<PlayerForm />} />

              {/* Match Routes */}
              <Route path="matches" element={<MatchList />} />
              <Route path="match/:id" element={<MatchDetails />} />
              <Route path="match/new" element={<MatchForm />} />
              <Route path="match/edit/:id" element={<MatchForm />} />

              {/* Ticket Routes */}
              <Route path="tickets" element={<TicketList />} />
              <Route path="tickets/purchase/:tournamentId" element={<TicketPurchase />} />
              <Route path="tickets/confirmation/:orderId" element={<OrderConfirmation />} />
              <Route path="orders" element={<OrderHistory />} />

              {/* User Profile */}
              <Route path="profile" element={<Profile />} />
            </Route>

            {/* Redirect to login if not authenticated */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Router>
        <Toaster />
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
