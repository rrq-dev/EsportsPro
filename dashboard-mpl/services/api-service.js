const API_URL = "http://localhost:9999/api";

export const apiService = {
  // Tournament API calls
  getAllTournaments: async () => {
    try {
      const response = await fetch(`${API_URL}/tournaments`);
      if (!response.ok) throw new Error("Failed to fetch tournaments");
      return await response.json();
    } catch (error) {
      console.error("Error fetching tournaments:", error);
      throw error;
    }
  },

  getTournamentById: async (id) => {
    try {
      const response = await fetch(`${API_URL}/tournaments/${id}`);
      if (!response.ok)
        throw new Error(`Failed to fetch tournament with id ${id}`);
      return await response.json();
    } catch (error) {
      console.error(`Error fetching tournament ${id}:`, error);
      throw error;
    }
  },

  createTournament: async (data) => {
    try {
      const response = await fetch(`${API_URL}/tournaments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to create tournament");
      return await response.json();
    } catch (error) {
      console.error("Error creating tournament:", error);
      throw error;
    }
  },

  updateTournament: async (id, data) => {
    try {
      const response = await fetch(`${API_URL}/tournaments/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok)
        throw new Error(`Failed to update tournament with id ${id}`);
      return await response.json();
    } catch (error) {
      console.error(`Error updating tournament ${id}:`, error);
      throw error;
    }
  },

  deleteTournament: async (id) => {
    try {
      const response = await fetch(`${API_URL}/tournaments/${id}`, {
        method: "DELETE",
      });
      if (!response.ok)
        throw new Error(`Failed to delete tournament with id ${id}`);
      return await response.json();
    } catch (error) {
      console.error(`Error deleting tournament ${id}:`, error);
      throw error;
    }
  },

  // Team API calls
  getAllTeams: async () => {
    try {
      const response = await fetch(`${API_URL}/team`);
      if (!response.ok) throw new Error("Failed to fetch teams");
      return await response.json();
    } catch (error) {
      console.error("Error fetching teams:", error);
      throw error;
    }
  },

  getTeamById: async (id) => {
    try {
      const response = await fetch(`${API_URL}/team/${id}`);
      if (!response.ok) throw new Error(`Failed to fetch team with id ${id}`);
      return await response.json();
    } catch (error) {
      console.error(`Error fetching team ${id}:`, error);
      throw error;
    }
  },

  createTeam: async (data) => {
    try {
      const response = await fetch(`${API_URL}/team`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to create team");
      return await response.json();
    } catch (error) {
      console.error("Error creating team:", error);
      throw error;
    }
  },

  updateTeam: async (id, data) => {
    try {
      const response = await fetch(`${API_URL}/team/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error(`Failed to update team with id ${id}`);
      return await response.json();
    } catch (error) {
      console.error(`Error updating team ${id}:`, error);
      throw error;
    }
  },

  deleteTeam: async (id) => {
    try {
      const response = await fetch(`${API_URL}/team/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error(`Failed to delete team with id ${id}`);
      return await response.json();
    } catch (error) {
      console.error(`Error deleting team ${id}:`, error);
      throw error;
    }
  },

  // Player API calls
  getAllPlayers: async () => {
    try {
      const response = await fetch(`${API_URL}/player`);
      if (!response.ok) throw new Error("Failed to fetch players");
      return await response.json();
    } catch (error) {
      console.error("Error fetching players:", error);
      throw error;
    }
  },

  getPlayerById: async (id) => {
    try {
      const response = await fetch(`${API_URL}/players/${id}`);
      if (!response.ok) throw new Error(`Failed to fetch player with id ${id}`);
      return await response.json();
    } catch (error) {
      console.error(`Error fetching player ${id}:`, error);
      throw error;
    }
  },

  createPlayer: async (data) => {
    try {
      const response = await fetch(`${API_URL}/player`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to create player");
      return await response.json();
    } catch (error) {
      console.error("Error creating player:", error);
      throw error;
    }
  },

  updatePlayer: async (id, data) => {
    try {
      const response = await fetch(`${API_URL}/player/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok)
        throw new Error(`Failed to update player with id ${id}`);
      return await response.json();
    } catch (error) {
      console.error(`Error updating player ${id}:`, error);
      throw error;
    }
  },

  deletePlayer: async (id) => {
    try {
      const response = await fetch(`${API_URL}/player/${id}`, {
        method: "DELETE",
      });
      if (!response.ok)
        throw new Error(`Failed to delete player with id ${id}`);
      return await response.json();
    } catch (error) {
      console.error(`Error deleting player ${id}:`, error);
      throw error;
    }
  },

  // Match API calls
  getAllMatches: async () => {
    try {
      const response = await fetch(`${API_URL}/score-match`);
      if (!response.ok) throw new Error("Failed to fetch matches");
      return await response.json();
    } catch (error) {
      console.error("Error fetching matches:", error);
      throw error;
    }
  },

  getMatchById: async (id) => {
    try {
      const response = await fetch(`${API_URL}/score-match/${id}`);
      if (!response.ok) throw new Error(`Failed to fetch match with id ${id}`);
      return await response.json();
    } catch (error) {
      console.error(`Error fetching match ${id}:`, error);
      throw error;
    }
  },

  createMatch: async (data) => {
    try {
      const response = await fetch(`${API_URL}/matches`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to create match");
      return await response.json();
    } catch (error) {
      console.error("Error creating match:", error);
      throw error;
    }
  },

  updateMatch: async (id, data) => {
    try {
      const response = await fetch(`${API_URL}/score-match/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error(`Failed to update match with id ${id}`);
      return await response.json();
    } catch (error) {
      console.error(`Error updating match ${id}:`, error);
      throw error;
    }
  },

  deleteMatch: async (id) => {
    try {
      const response = await fetch(`${API_URL}/score-match/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error(`Failed to delete match with id ${id}`);
      return await response.json();
    } catch (error) {
      console.error(`Error deleting match ${id}:`, error);
      throw error;
    }
  },

  // Ticket API calls
  getAllTickets: async () => {
    try {
      const response = await fetch(`${API_URL}/ticket`);
      if (!response.ok) throw new Error("Failed to fetch tickets");
      return await response.json();
    } catch (error) {
      console.error("Error fetching tickets:", error);
      throw error;
    }
  },

  getTicketById: async (id) => {
    try {
      const response = await fetch(`${API_URL}/ticket/${id}`);
      if (!response.ok) throw new Error(`Failed to fetch ticket with id ${id}`);
      return await response.json();
    } catch (error) {
      console.error(`Error fetching ticket ${id}:`, error);
      throw error;
    }
  },

  createTicket: async (data) => {
    try {
      const response = await fetch(`${API_URL}/ticket`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to create ticket");
      return await response.json();
    } catch (error) {
      console.error("Error creating ticket:", error);
      throw error;
    }
  },

  // Order API calls
  getAllOrders: async () => {
    try {
      const response = await fetch(`${API_URL}/orders`);
      if (!response.ok) throw new Error("Failed to fetch orders");
      return await response.json();
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error;
    }
  },

  getOrderById: async (id) => {
    try {
      const response = await fetch(`${API_URL}/orders/${id}`);
      if (!response.ok) throw new Error(`Failed to fetch order with id ${id}`);
      return await response.json();
    } catch (error) {
      console.error(`Error fetching order ${id}:`, error);
      throw error;
    }
  },

  createOrder: async (data) => {
    try {
      const response = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to create order");
      return await response.json();
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  },

  getUserOrders: async (userId) => {
    try {
      const response = await fetch(`${API_URL}/users/${userId}/orders`);
      if (!response.ok)
        throw new Error(`Failed to fetch orders for user ${userId}`);
      return await response.json();
    } catch (error) {
      console.error(`Error fetching orders for user ${userId}:`, error);
      throw error;
    }
  },
};
