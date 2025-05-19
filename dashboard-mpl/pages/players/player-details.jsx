"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { apiService } from "../../services/api-service"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { ArrowLeft, Edit } from "lucide-react"
import { useToast } from "../../components/ui/use-toast"
import { Loading } from "../../components/loading"

export function PlayerDetails() {
  const [player, setPlayer] = useState(null)
  const [team, setTeam] = useState(null)
  const [loading, setLoading] = useState(true)
  const { id } = useParams()
  const navigate = useNavigate()
  const { toast } = useToast()

  useEffect(() => {
    fetchPlayer()
  }, [id])

  const fetchPlayer = async () => {
    try {
      setLoading(true)
      const playerData = await apiService.getPlayerById(id)
      setPlayer(playerData)

      // Fetch team data
      if (playerData.team_id) {
        const teamData = await apiService.getTeamById(playerData.team_id)
        setTeam(teamData)
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load player details. Please try again.",
      })
      navigate("/players")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <Loading />
  }

  if (!player) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold">Player not found</h2>
        <Button className="mt-4" onClick={() => navigate("/players")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Players
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => navigate("/players")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button onClick={() => navigate(`/player/edit/${id}`)}>
          <Edit className="mr-2 h-4 w-4" /> Edit Player
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{player.name}</CardTitle>
            <CardDescription>{player.in_game_name}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium">Role</h3>
                <p>{player.role}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium">Team</h3>
                {team ? (
                  <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate(`/team/${team.id}`)}>
                    {team.logo && (
                      <img
                        src={team.logo || "/placeholder.svg"}
                        alt={team.name}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                    )}
                    <p>{team.name}</p>
                  </div>
                ) : (
                  <p className="text-muted-foreground">No team assigned</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
