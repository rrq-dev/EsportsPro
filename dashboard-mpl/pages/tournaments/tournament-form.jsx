"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { apiService } from "../../services/api-service"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { ArrowLeft, Save } from "lucide-react"
import { useToast } from "../../components/ui/use-toast"
import { Loading } from "../../components/loading"
import { Checkbox } from "../../components/ui/checkbox"

export function TournamentForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { toast } = useToast()
  const isEditMode = !!id

  const [loading, setLoading] = useState(isEditMode)
  const [saving, setSaving] = useState(false)
  const [allTeams, setAllTeams] = useState([])
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    location: "",
    start_date: "",
    end_date: "",
    teams: [],
  })

  useEffect(() => {
    fetchTeams()
    if (isEditMode) {
      fetchTournament()
    }
  }, [id])

  const fetchTeams = async () => {
    try {
      const teams = await apiService.getAllTeams()
      setAllTeams(teams)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load teams. Please try again.",
      })
    }
  }

  const fetchTournament = async () => {
    try {
      setLoading(true)
      const data = await apiService.getTournamentById(id)
      setFormData({
        ...data,
        start_date: data.start_date.split("T")[0],
        end_date: data.end_date.split("T")[0],
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load tournament data. Please try again.",
      })
      navigate("/")
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

  const handleTeamToggle = (teamId) => {
    setFormData((prev) => {
      const teams = [...prev.teams]
      if (teams.includes(teamId)) {
        return { ...prev, teams: teams.filter((id) => id !== teamId) }
      } else {
        return { ...prev, teams: [...teams, teamId] }
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Basic validation
    if (!formData.name || !formData.location || !formData.start_date || !formData.end_date) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please fill in all required fields.",
      })
      return
    }

    try {
      setSaving(true)

      if (isEditMode) {
        await apiService.updateTournament(id, formData)
        toast({
          title: "Success",
          description: "Tournament updated successfully",
        })
      } else {
        // Generate ID if not in edit mode
        const tournamentData = {
          ...formData,
          id: formData.id || `tournament-${Date.now()}`,
        }
        await apiService.createTournament(tournamentData)
        toast({
          title: "Success",
          description: "Tournament created successfully",
        })
      }

      navigate("/")
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: isEditMode
          ? "Failed to update tournament. Please try again."
          : "Failed to create tournament. Please try again.",
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
        <Button variant="ghost" onClick={() => navigate("/")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <h1 className="text-2xl font-bold">{isEditMode ? "Edit Tournament" : "Create Tournament"}</h1>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Tournament Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {!isEditMode && (
              <div className="space-y-2">
                <Label htmlFor="id">Tournament ID (optional)</Label>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Tournament Name *</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input id="location" name="location" value={formData.location} onChange={handleChange} required />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start_date">Start Date *</Label>
                <Input
                  id="start_date"
                  name="start_date"
                  type="date"
                  value={formData.start_date}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end_date">End Date *</Label>
                <Input
                  id="end_date"
                  name="end_date"
                  type="date"
                  value={formData.end_date}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Teams</Label>
              <div className="border rounded-md p-4 max-h-60 overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {allTeams.map((team) => (
                    <div key={team.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={team.id}
                        checked={formData.teams.includes(team.id)}
                        onCheckedChange={() => handleTeamToggle(team.id)}
                      />
                      <Label htmlFor={team.id} className="cursor-pointer">
                        {team.name}
                      </Label>
                    </div>
                  ))}
                </div>
                {allTeams.length === 0 && (
                  <p className="text-sm text-muted-foreground">No teams available. Create teams first.</p>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            <Button variant="outline" type="button" onClick={() => navigate("/")}>
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
                  {isEditMode ? "Update Tournament" : "Create Tournament"}
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
