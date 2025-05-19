"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { apiService } from "../../services/api-service"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { ArrowLeft, Edit, MapPin, Calendar } from "lucide-react"
import { useToast } from "../../components/ui/use-toast"
import { Loading } from "../../components/loading"

export function TournamentDetails() {
  const [tournament, setTournament] = useState(null)
  const [teams, setTeams] = useState([])
  const [matches, setMatches] = useState([])
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
      const tournamentData = await apiService.getTournamentById(id)
      setTournament(tournamentData)

      // Fetch teams for this tournament
      const allTeams = await apiService.getAllTeams()
      const tournamentTeams = allTeams.filter((team) => tournamentData.teams.includes(team.id))
      setTeams(tournamentTeams)

      // Fetch matches for this tournament
      const allMatches = await apiService.getAllMatches()
      const tournamentMatches = allMatches.filter((match) => match.tournament_id === id)
      setMatches(tournamentMatches)
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
    return <Loading />
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
            <CardDescription className="flex items-center">
              <MapPin className="mr-1 h-4 w-4" /> {tournament.location}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Start Date</p>
                  <p>{new Date(tournament.start_date).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">End Date</p>
                  <p>{new Date(tournament.end_date).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="teams">
        <TabsList>
          <TabsTrigger value="teams">Teams</TabsTrigger>
          <TabsTrigger value="matches">Matches</TabsTrigger>
        </TabsList>
        <TabsContent value="teams" className="p-4 border rounded-md mt-2">
          <h3 className="text-lg font-medium mb-4">Participating Teams</h3>
          {teams.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {teams.map((team) => (
                <Card
                  key={team.id}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => navigate(`/team/${team.id}`)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-3">
                      {team.logo && (
                        <img
                          src={team.logo || "/placeholder.svg"}
                          alt={team.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      )}
                      <CardTitle className="text-base">{team.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Region: {team.region}</p>
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
          {matches.length > 0 ? (
            <div className="space-y-4">
              {matches.map((match) => {
                const team1 = teams.find((t) => t.id === match.team1_id)
                const team2 = teams.find((t) => t.id === match.team2_id)

                return (
                  <Card
                    key={match.id}
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => navigate(`/match/${match.id}`)}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                          <div className="text-right font-medium">{team1?.name || match.team1_id}</div>
                          <div className="text-xl font-bold">
                            {match.team1_score} - {match.team2_score}
                          </div>
                          <div className="font-medium">{team2?.name || match.team2_id}</div>
                        </div>
                        <div className="text-sm text-muted-foreground">{new Date(match.date).toLocaleDateString()}</div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          ) : (
            <p className="text-muted-foreground">No matches scheduled yet.</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
