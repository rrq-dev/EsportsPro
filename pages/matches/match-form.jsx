"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { apiService } from "../../services/api-service"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { ArrowLeft, Save } from "lucide-react"
import { useToast } from "../../components/ui/use-toast"
import { Loading } from "../../components/loading"

export function MatchForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { toast } = useToast()
  const isEditMode = !!id

  const [loading, setLoading] = useState(isEditMode)
  const [saving, setSaving] = useState(false)
  const [teams, setTeams] = useState([])
  const [tournaments, setTournaments] = useState([])
  const [formData, setFormData] = useState({
    id: "",
    tournament_id: "",
    team1_id: "",
    team2_id: "",
    team1_score: 0,
    team2_score: 0,
    date: new Date().toISOString().split("T")[0],
  })

  useEffect(() => {
    fetchData()
    if (isEditMode) {
      fetchMatch()
    }
  }, [id])

  const fetchData = async () => {
    try {
      const [teamsData, tournamentsData] = await Promise.all([apiService.getAllTeams(), apiService.getAllTournaments()])
      setTeams(teamsData)
      setTournaments(tournamentsData)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load data. Please try again.",
      })
    }
  }

  const fetchMatch = async () => {
    try {
      setLoading(true)
      const data = await apiService.getMatchById(id)
      setFormData({
        ...data,
        date: data.date.split("T")[0],
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load match data. Please try again.",
      })
      navigate("/matches")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Basic validation
    if (!formData.tournament_id || !formData.team1_id || !formData.team2_id || !formData.date) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please fill in all required fields.",
      })
      return
    }

    if (formData.team1_id === formData.team2_id) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Team 1 and Team 2 cannot be the same team.",
      })
      return
    }

    try {
      setSaving(true)

      // Ensure scores are numbers
      const matchData = {
        ...formData,
        team1_score: Number(formData.team1_score),
        team2_score: Number(formData.team2_score),
      }

      if (isEditMode) {
        await apiService.updateMatch(id, matchData)
        toast({
          title: "Success",
          description: "Match updated successfully",
        })
      } else {
        // Generate ID if not in edit mode
        const newMatchData = {
          ...matchData,
          id: formData.id || `match-${Date.now()}`,
        }
        await apiService.createMatch(newMatchData)
        toast({
          title: "Success",
          description: "Match created successfully",
        })
      }

      navigate("/matches")
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: isEditMode
          ? "Failed to update match. Please try again."
          : "Failed to create match. Please try again.",
      })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <Loading />
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => navigate("/matches")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <h1 className="text-2xl font-bold">{isEditMode ? "Edit Match" : "Create Match"}</h1>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Match Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {!isEditMode && (
              <div className="space-y-2">
                <Label htmlFor="id">Match ID (optional)</Label>
                <Input
                  id="id"
                  name="id"
                  value={formData.id}
                  onChange={handleChange}
                  placeholder="Leave blank to auto-generate"
                />
                <p className="text-sm text-muted-foreground">If left blank, an ID will be automatically generated</p>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="tournament_id">Tournament *</Label>
              <Select
                value={formData.tournament_id}
                onValueChange={(value) => handleSelectChange("tournament_id", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a tournament" />
                </SelectTrigger>
                <SelectContent>
                  {tournaments.map((tournament) => (
                    <SelectItem key={tournament.id} value={tournament.id}>
                      {tournament.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {tournaments.length === 0 && (
                <p className="text-sm text-muted-foreground">No tournaments available. Create a tournament first.</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="team1_id">Team 1 *</Label>
                <Select value={formData.team1_id} onValueChange={(value) => handleSelectChange("team1_id", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select team 1" />
                  </SelectTrigger>
                  <SelectContent>
                    {teams.map((team) => (
                      <SelectItem key={team.id} value={team.id}>
                        {team.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="team2_id">Team 2 *</Label>
                <Select value={formData.team2_id} onValueChange={(value) => handleSelectChange("team2_id", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select team 2" />
                  </SelectTrigger>
                  <SelectContent>
                    {teams.map((team) => (
                      <SelectItem key={team.id} value={team.id}>
                        {team.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="team1_score">Team 1 Score</Label>
                <Input
                  id="team1_score"
                  name="team1_score"
                  type="number"
                  min="0"
                  value={formData.team1_score}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="team2_score">Team 2 Score</Label>
                <Input
                  id="team2_score"
                  name="team2_score"
                  type="number"
                  min="0"
                  value={formData.team2_score}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Match Date *</Label>
              <Input id="date" name="date" type="date" value={formData.date} onChange={handleChange} required />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            <Button variant="outline" type="button" onClick={() => navigate("/matches")}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  {isEditMode ? "Update Match" : "Create Match"}
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
