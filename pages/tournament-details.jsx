"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { apiService } from "../services/api-service"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { ArrowLeft, Edit, Calendar, Trophy, Users, DollarSign } from "lucide-react"
import { useToast } from "../components/ui/use-toast"

export function TournamentDetails() {
  const [tournament, setTournament] = useState(null)
  const [loading, setLoading] = useState(true)
  const { id } = useParams()
  const navigate = useNavigate()
  const { toast } = useToast()

  useEffect(() => {
    fetchTournament()
  }, [id])

  const fetchTournament = async () => {
    try {
      setLoading(true)
      const data = await apiService.getTournamentById(id)
      setTournament(data)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load tournament details. Please try again.",
      })
      navigate("/")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!tournament) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold">Tournament not found</h2>
        <Button className="mt-4" onClick={() => navigate("/")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Tournaments
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => navigate("/")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button onClick={() => navigate(`/tournament/edit/${id}`)}>
          <Edit className="mr-2 h-4 w-4" /> Edit Tournament
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{tournament.name}</CardTitle>
            <CardDescription>{tournament.game}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Start Date</p>
                  <p>{new Date(tournament.startDate).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">End Date</p>
                  <p>{new Date(tournament.endDate).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Trophy className="mr-2 h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Status</p>
                  <Badge
                    variant={
                      tournament.status === "Upcoming"
                        ? "outline"
                        : tournament.status === "Active"
                          ? "default"
                          : "secondary"
                    }
                  >
                    {tournament.status}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center">
                <Users className="mr-2 h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Teams</p>
                  <p>{tournament.teamCount}</p>
                </div>
              </div>
              <div className="flex items-center col-span-2">
                <DollarSign className="mr-2 h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Prize Pool</p>
                  <p className="text-xl font-bold">${tournament.prizePool.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{tournament.description}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="teams">
        <TabsList>
          <TabsTrigger value="teams">Teams</TabsTrigger>
          <TabsTrigger value="matches">Matches</TabsTrigger>
          <TabsTrigger value="brackets">Brackets</TabsTrigger>
        </TabsList>
        <TabsContent value="teams" className="p-4 border rounded-md mt-2">
          <h3 className="text-lg font-medium mb-4">Participating Teams</h3>
          {tournament.teams && tournament.teams.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {tournament.teams.map((team) => (
                <Card key={team.id}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{team.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Players: {team.playerCount}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No teams registered yet.</p>
          )}
        </TabsContent>
        <TabsContent value="matches" className="p-4 border rounded-md mt-2">
          <h3 className="text-lg font-medium mb-4">Match Schedule</h3>
          {tournament.matches && tournament.matches.length > 0 ? (
            <div className="space-y-4">
              {tournament.matches.map((match) => (
                <Card key={match.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div className="font-medium">
                        {match.teamA} vs {match.teamB}
                      </div>
                      <Badge>{new Date(match.date).toLocaleString()}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No matches scheduled yet.</p>
          )}
        </TabsContent>
        <TabsContent value="brackets" className="p-4 border rounded-md mt-2">
          <h3 className="text-lg font-medium mb-4">Tournament Brackets</h3>
          <p className="text-muted-foreground">Bracket visualization will be available once the tournament starts.</p>
        </TabsContent>
      </Tabs>
    </div>
  )
}
