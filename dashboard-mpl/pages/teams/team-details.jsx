"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { apiService } from "../../services/api-service"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { ArrowLeft, Edit, MapPin, Plus, Eye } from "lucide-react"
import { useToast } from "../../components/ui/use-toast"
import { Loading } from "../../components/loading"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"

export function TeamDetails() {
  const [team, setTeam] = useState(null)
  const [players, setPlayers] = useState([])
  const [tournaments, setTournaments] = useState([])
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)
  const { id } = useParams()
  const navigate = useNavigate()
  const { toast } = useToast()

  useEffect(() => {
    fetchTeam()
  }, [id])

  const fetchTeam = async () => {
    try {
      setLoading(true)
      const teamData = await apiService.getTeamById(id)
      setTeam(teamData)

      // Fetch players for this team
      const allPlayers = await apiService.getAllPlayers()
      const teamPlayers = allPlayers.filter((player) => player.team_id === id)
      setPlayers(teamPlayers)

      // Fetch tournaments this team is part of
      const allTournaments = await apiService.getAllTournaments()
      const teamTournaments = allTournaments.filter((tournament) => tournament.teams.includes(id))
      setTournaments(teamTournaments)

      // Fetch matches for this team
      const allMatches = await apiService.getAllMatches()
      const teamMatches = allMatches.filter((match) => match.team1_id === id || match.team2_id === id)
      setMatches(teamMatches)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load team details. Please try again.",
      })
      navigate("/teams")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <Loading />
  }

  if (!team) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold">Team not found</h2>
        <Button className="mt-4" onClick={() => navigate("/teams")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Teams
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => navigate("/teams")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button onClick={() => navigate(`/team/edit/${id}`)}>
          <Edit className="mr-2 h-4 w-4" /> Edit Team
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            {team.logo && (
              <img
                src={team.logo || "/placeholder.svg"}
                alt={team.name}
                className="w-16 h-16 rounded-full object-cover"
              />
            )}
            <div>
              <CardTitle className="text-2xl">{team.name}</CardTitle>
              <CardDescription className="flex items-center">
                <MapPin className="mr-1 h-4 w-4" /> {team.region}
              </CardDescription>
            </div>
          </CardHeader>
        </Card>
      </div>

      <Tabs defaultValue="players">
        <TabsList>
          <TabsTrigger value="players">Players</TabsTrigger>
          <TabsTrigger value="tournaments">Tournaments</TabsTrigger>
          <TabsTrigger value="matches">Matches</TabsTrigger>
        </TabsList>
        <TabsContent value="players" className="p-4 border rounded-md mt-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Team Players</h3>
            <Button size="sm" onClick={() => navigate("/player/new", { state: { teamId: id } })}>
              <Plus className="mr-2 h-4 w-4" /> Add Player
            </Button>
          </div>
          {players.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>In-Game Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {players.map((player) => (
                  <TableRow key={player.id}>
                    <TableCell className="font-medium">{player.name}</TableCell>
                    <TableCell>{player.in_game_name}</TableCell>
                    <TableCell>{player.role}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => navigate(`/player/${player.id}`)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => navigate(`/player/edit/${player.id}`)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-muted-foreground">No players in this team yet.</p>
          )}
        </TabsContent>
        <TabsContent value="tournaments" className="p-4 border rounded-md mt-2">
          <h3 className="text-lg font-medium mb-4">Tournaments</h3>
          {tournaments.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {tournaments.map((tournament) => (
                <Card
                  key={tournament.id}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => navigate(`/tournament/${tournament.id}`)}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{tournament.name}</CardTitle>
                    <CardDescription>{tournament.location}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {new Date(tournament.start_date).toLocaleDateString()} -{" "}
                      {new Date(tournament.end_date).toLocaleDateString()}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">This team is not participating in any tournaments yet.</p>
          )}
        </TabsContent>
        <TabsContent value="matches" className="p-4 border rounded-md mt-2">
          <h3 className="text-lg font-medium mb-4">Match History</h3>
          {matches.length > 0 ? (
            <div className="space-y-4">
              {matches.map((match) => (
                <Card
                  key={match.id}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => navigate(`/match/${match.id}`)}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <div className={`text-right font-medium ${match.team1_id === id ? "font-bold" : ""}`}>
                          {match.team1_id === id ? team.name : match.team1_id}
                        </div>
                        <div className="text-xl font-bold">
                          {match.team1_score} - {match.team2_score}
                        </div>
                        <div className={`font-medium ${match.team2_id === id ? "font-bold" : ""}`}>
                          {match.team2_id === id ? team.name : match.team2_id}
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">{new Date(match.date).toLocaleDateString()}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No match history available for this team.</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
