"use client"

import { createContext, useState, useContext, useEffect } from "react"
import { authService } from "../services/auth-service"

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is already logged in
    const currentUser = authService.getCurrentUser()
    if (currentUser) {
      setUser(currentUser)
    }
    setLoading(false)
  }, [])

  const login = async (credentials) => {
    const response = await authService.login(credentials)
    setUser(response.user)
    return response
  }

  const register = async (userData) => {
    const response = await authService.register(userData)
    setUser(response.user)
    return response
  }

  const logout = () => {
    authService.logout()
    setUser(null)
  }

  // For development/demo purposes
  const simulateLogin = (userData) => {
    const response = authService.simulateAuth(userData)
    setUser(response.user)
    return response
  }

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    simulateLogin,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
