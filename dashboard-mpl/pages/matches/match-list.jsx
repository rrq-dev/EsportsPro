"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { apiService } from "../../services/api-service"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { Input } from "../../components/ui/input"
import { Plus, Edit, Eye } from "lucide-react"
import { useToast } from "../../components/ui/use-toast"
import { DeleteDialog } from "../../components/delete-dialog"
import { Loading } from "../../components/loading"

export function MatchList() {
  const [matches, setMatches] = useState([])
  const [teams, setTeams] = useState([])
  const [tournaments, setTournaments] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate()
  const { toast } = useToast()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const [matchesData, teamsData, tournamentsData] = await Promise.all([
        apiService.getAllMatches(),
        apiService.getAllTeams(),
        apiService.getAllTournaments(),
      ])
      setMatches(matchesData)
      setTeams(teamsData)
      setTournaments(tournamentsData)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load matches. Please try again.",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      await apiService.deleteMatch(id)
      setMatches(matches.filter((match) => match.id !== id))
      toast({
        title: "Success",
        description: "Match deleted successfully",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete match. Please try again.",
      })
    }
  }

  const getTeamName = (teamId) => {
    const team = teams.find((t) => t.id === teamId)
    return team ? team.name : teamId
  }

  const getTournamentName = (tournamentId) => {
    const tournament = tournaments.find((t) => t.id === tournamentId)
    return tournament ? tournament.name : tournamentId
  }

  const filteredMatches = matches.filter((match) => {
    const team1Name = getTeamName(match.team1_id).toLowerCase()
    const team2Name = getTeamName(match.team2_id).toLowerCase()
    const tournamentName = getTournamentName(match.tournament_id).toLowerCase()
    const searchLower = searchTerm.toLowerCase()

    return team1Name.includes(searchLower) || team2Name.includes(searchLower) || tournamentName.includes(searchLower)
  })

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Match Scores</CardTitle>
        <div className="flex items-center gap-4">
          <div className="relative w-64">
            <Input
              placeholder="Search matches..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <Button onClick={() => navigate("/match/new")}>
            <Plus className="mr-2 h-4 w-4" /> Add Match
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <Loading />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tournament</TableHead>
                <TableHead>Team 1</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Team 2</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMatches.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    No matches found
                  </TableCell>
                </TableRow>
              ) : (
                filteredMatches.map((match) => (
                  <TableRow key={match.id}>
                    <TableCell>{getTournamentName(match.tournament_id)}</TableCell>
                    <TableCell>{getTeamName(match.team1_id)}</TableCell>
                    <TableCell className="font-bold">
                      {match.team1_score} - {match.team2_score}
                    </TableCell>
                    <TableCell>{getTeamName(match.team2_id)}</TableCell>
                    <TableCell>{new Date(match.date).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => navigate(`/match/${match.id}`)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => navigate(`/match/edit/${match.id}`)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <DeleteDialog onDelete={() => handleDelete(match.id)} itemName="match" />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}
