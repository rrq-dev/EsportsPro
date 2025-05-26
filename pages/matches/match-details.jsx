"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { apiService } from "../../services/api-service"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { ArrowLeft, Edit, Calendar, Trophy } from "lucide-react"
import { useToast } from "../../components/ui/use-toast"
import { Loading } from "../../components/loading"

export function MatchDetails() {
  const [match, setMatch] = useState(null)
  const [team1, setTeam1] = useState(null)
  const [team2, setTeam2] = useState(null)
  const [tournament, setTournament] = useState(null)
  const [loading, setLoading] = useState(true)
  const { id } = useParams()
  const navigate = useNavigate()
  const { toast } = useToast()

  useEffect(() => {
    fetchMatch()
  }, [id])

  const fetchMatch = async () => {
    try {
      setLoading(true)
      const matchData = await apiService.getMatchById(id)
      setMatch(matchData)

      // Fetch related data
      const [team1Data, team2Data, tournamentData] = await Promise.all([
        apiService.getTeamById(matchData.team1_id),
        apiService.getTeamById(matchData.team2_id),
        apiService.getTournamentById(matchData.tournament_id),
      ])

      setTeam1(team1Data)
      setTeam2(team2Data)
      setTournament(tournamentData)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load match details. Please try again.",
      })
      navigate("/matches")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <Loading />
  }

  if (!match) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold">Match not found</h2>
        <Button className="mt-4" onClick={() => navigate("/matches")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Matches
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => navigate("/matches")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button onClick={() => navigate(`/match/edit/${id}`)}>
          <Edit className="mr-2 h-4 w-4" /> Edit Match
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Match Details</CardTitle>
          <CardDescription className="flex items-center">
            <Trophy className="mr-1 h-4 w-4" />
            {tournament ? (
              <span className="cursor-pointer hover:underline" onClick={() => navigate(`/tournament/${tournament.id}`)}>
                {tournament.name}
              </span>
            ) : (
              match.tournament_id
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center justify-center gap-4 md:gap-8 w-full">
              <div className="flex flex-col items-center text-center w-1/3">
                {team1 && (
                  <>
                    {team1.logo && (
                      <img
                        src={team1.logo || "/placeholder.svg"}
                        alt={team1.name}
                        className="w-16 h-16 rounded-full object-cover mb-2"
                      />
                    )}
                    <h3
                      className="font-bold text-lg cursor-pointer hover:underline"
                      onClick={() => navigate(`/team/${team1.id}`)}
                    >
                      {team1.name}
                    </h3>
                  </>
                )}
              </div>

              <div className="flex flex-col items-center">
                <div className="text-3xl font-bold">
                  {match.team1_score} - {match.team2_score}
                </div>
                <div className="text-sm text-muted-foreground mt-2 flex items-center">
                  <Calendar className="mr-1 h-4 w-4" /> {new Date(match.date).toLocaleDateString()}
                </div>
              </div>

              <div className="flex flex-col items-center text-center w-1/3">
                {team2 && (
                  <>
                    {team2.logo && (
                      <img
                        src={team2.logo || "/placeholder.svg"}
                        alt={team2.name}
                        className="w-16 h-16 rounded-full object-cover mb-2"
                      />
                    )}
                    <h3
                      className="font-bold text-lg cursor-pointer hover:underline"
                      onClick={() => navigate(`/team/${team2.id}`)}
                    >
                      {team2.name}
                    </h3>
                  </>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
