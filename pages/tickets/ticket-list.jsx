"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { apiService } from "../../services/api-service"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Badge } from "../../components/ui/badge"
import { useToast } from "../../components/ui/use-toast"
import { Loading } from "../../components/loading"
import { Calendar, MapPin } from "lucide-react"

export function TicketList() {
  const [tournaments, setTournaments] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate()
  const { toast } = useToast()

  useEffect(() => {
    fetchTournaments()
  }, [])

  const fetchTournaments = async () => {
    try {
      setLoading(true)
      const data = await apiService.getAllTournaments()

      // Filter only upcoming or active tournaments
      const availableTournaments = data.filter((tournament) => {
        const endDate = new Date(tournament.end_date)
        return endDate >= new Date()
      })

      setTournaments(availableTournaments)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load tournaments. Please try again.",
      })
    } finally {
      setLoading(false)
    }
  }

  const filteredTournaments = tournaments.filter((tournament) =>
    tournament.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Function to determine if a tournament is upcoming or active
  const getTournamentStatus = (tournament) => {
    const startDate = new Date(tournament.start_date)
    const endDate = new Date(tournament.end_date)
    const now = new Date()

    if (now < startDate) return "Upcoming"
    if (now >= startDate && now <= endDate) return "Active"
    return "Completed"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Available Tickets</h1>
        <div className="w-64">
          <Input
            placeholder="Search tournaments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <Loading />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredTournaments.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <h2 className="text-xl font-semibold">No tournaments found</h2>
              <p className="text-muted-foreground mt-2">There are no upcoming tournaments with available tickets.</p>
            </div>
          ) : (
            filteredTournaments.map((tournament) => {
              const status = getTournamentStatus(tournament)

              return (
                <Card key={tournament.id} className="overflow-hidden">
                  <div className="h-3 bg-primary" />
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{tournament.name}</CardTitle>
                        <CardDescription className="flex items-center mt-1">
                          <MapPin className="mr-1 h-4 w-4" /> {tournament.location}
                        </CardDescription>
                      </div>
                      <Badge variant={status === "Active" ? "default" : "outline"}>{status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <div className="flex items-center">
                        <Calendar className="mr-1 h-4 w-4 text-muted-foreground" />
                        <span>Starts: {new Date(tournament.start_date).toLocaleDateString()}</span>
                      </div>
                      <div>Teams: {tournament.teams.length}</div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Ticket Price</p>
                        <p className="text-lg font-bold">$49.99</p>
                      </div>
                      <Badge variant="outline" className="text-green-600 bg-green-50">
                        Available
                      </Badge>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" onClick={() => navigate(`/tickets/purchase/${tournament.id}`)}>
                      Buy Tickets
                    </Button>
                  </CardFooter>
                </Card>
              )
            })
          )}
        </div>
      )}
    </div>
  )
}
