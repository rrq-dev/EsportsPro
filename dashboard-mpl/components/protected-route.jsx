"use client"

import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "../contexts/auth-context"
import { Loading } from "./loading"

export function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return <Loading />
  }

  if (!isAuthenticated) {
    // Redirect to login page but save the location they were trying to access
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}
