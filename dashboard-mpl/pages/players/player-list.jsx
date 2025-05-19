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

export function PlayerList() {
  const [players, setPlayers] = useState([])
  const [teams, setTeams] = useState([])
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
      const [playersData, teamsData] = await Promise.all([apiService.getAllPlayers(), apiService.getAllTeams()])
      setPlayers(playersData)
      setTeams(teamsData)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load players. Please try again.",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      await apiService.deletePlayer(id)
      setPlayers(players.filter((player) => player.id !== id))
      toast({
        title: "Success",
        description: "Player deleted successfully",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete player. Please try again.",
      })
    }
  }

  const getTeamName = (teamId) => {
    const team = teams.find((t) => t.id === teamId)
    return team ? team.name : teamId
  }

  const filteredPlayers = players.filter(
    (player) =>
      player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.in_game_name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Players</CardTitle>
        <div className="flex items-center gap-4">
          <div className="relative w-64">
            <Input
              placeholder="Search players..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <Button onClick={() => navigate("/player/new")}>
            <Plus className="mr-2 h-4 w-4" /> Add Player
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
                <TableHead>Name</TableHead>
                <TableHead>In-Game Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Team</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPlayers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    No players found
                  </TableCell>
                </TableRow>
              ) : (
                filteredPlayers.map((player) => (
                  <TableRow key={player.id}>
                    <TableCell className="font-medium">{player.name}</TableCell>
                    <TableCell>{player.in_game_name}</TableCell>
                    <TableCell>{player.role}</TableCell>
                    <TableCell>{getTeamName(player.team_id)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => navigate(`/player/${player.id}`)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => navigate(`/player/edit/${player.id}`)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <DeleteDialog onDelete={() => handleDelete(player.id)} itemName="player" />
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
