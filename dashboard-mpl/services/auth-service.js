const API_URL = "http://localhost:9999/api";

// Local storage keys
const TOKEN_KEY =
  "fs6DjyKbz0GWCTVLySeR6iTj6K8MKzhqPtggTzFhuyUaTEDUAqXIWXJAMlSuCBLf";
const USER_KEY =
  "7eu9hYEkuL7wJLs4WVAmaDz5zByPmtJCDjXZoOlCOjF4zEOCwzQIRrxI6vaggkW6";

export const authService = {
  // Register a new user
  register: async (userData) => {
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }

      const data = await response.json();

      // Store token and user data
      localStorage.setItem(TOKEN_KEY, data.token);
      localStorage.setItem(USER_KEY, JSON.stringify(data.user));

      return data;
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  },

  // Login user
  login: async (credentials) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await response.json();

      // Store token and user data
      localStorage.setItem(TOKEN_KEY, data.token);
      localStorage.setItem(USER_KEY, JSON.stringify(data.user));

      return data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },

  // Logout user
  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  // Get current user
  getCurrentUser: () => {
    const userStr = localStorage.getItem(USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  },

  // Get auth token
  getToken: () => {
    return localStorage.getItem(TOKEN_KEY);
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem(TOKEN_KEY);
  },

  // For development/demo purposes - simulate authentication
  simulateAuth: (userData) => {
    const mockUser = {
      id: "user-123",
      username: userData.username || "demo_user",
      email: userData.email || "demo@example.com",
      role: userData.role || "user",
    };

    const mockToken = "mock_jwt_token_for_development";

    localStorage.setItem(TOKEN_KEY, mockToken);
    localStorage.setItem(USER_KEY, JSON.stringify(mockUser));

    return { user: mockUser, token: mockToken };
  },
};
