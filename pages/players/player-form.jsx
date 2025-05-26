"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate, useLocation } from "react-router-dom"
import { apiService } from "../../services/api-service"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { ArrowLeft, Save } from "lucide-react"
import { useToast } from "../../components/ui/use-toast"
import { Loading } from "../../components/loading"

export function PlayerForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { toast } = useToast()
  const isEditMode = !!id

  const [loading, setLoading] = useState(isEditMode)
  const [saving, setSaving] = useState(false)
  const [teams, setTeams] = useState([])
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    in_game_name: "",
    role: "",
    team_id: location.state?.teamId || "",
  })

  useEffect(() => {
    fetchTeams()
    if (isEditMode) {
      fetchPlayer()
    }
  }, [id])

  const fetchTeams = async () => {
    try {
      const teamsData = await apiService.getAllTeams()
      setTeams(teamsData)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load teams. Please try again.",
      })
    }
  }

  const fetchPlayer = async () => {
    try {
      setLoading(true)
      const data = await apiService.getPlayerById(id)
      setFormData(data)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load player data. Please try again.",
      })
      navigate("/players")
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
    if (!formData.name || !formData.in_game_name || !formData.role || !formData.team_id) {
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
        await apiService.updatePlayer(id, formData)
        toast({
          title: "Success",
          description: "Player updated successfully",
        })
      } else {
        // Generate ID if not in edit mode
        const playerData = {
          ...formData,
          id: formData.id || `player-${formData.name.toLowerCase().replace(/\s+/g, "-")}`,
        }
        await apiService.createPlayer(playerData)
        toast({
          title: "Success",
          description: "Player created successfully",
        })
      }

      // Navigate back to team details if we came from there
      if (location.state?.teamId) {
        navigate(`/team/${location.state.teamId}`)
      } else {
        navigate("/players")
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: isEditMode
          ? "Failed to update player. Please try again."
          : "Failed to create player. Please try again.",
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
        <Button
          variant="ghost"
          onClick={() => (location.state?.teamId ? navigate(`/team/${location.state.teamId}`) : navigate("/players"))}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <h1 className="text-2xl font-bold">{isEditMode ? "Edit Player" : "Create Player"}</h1>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Player Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {!isEditMode && (
              <div className="space-y-2">
                <Label htmlFor="id">Player ID (optional)</Label>
                <Input
                  id="id"
                  name="id"
                  value={formData.id}
                  onChange={handleChange}
                  placeholder="Leave blank to auto-generate"
                />
                <p className="text-sm text-muted-foreground">
                  If left blank, an ID will be automatically generated based on the player name
                </p>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="name">Real Name *</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="in_game_name">In-Game Name *</Label>
              <Input
                id="in_game_name"
                name="in_game_name"
                value={formData.in_game_name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role *</Label>
              <Input id="role" name="role" value={formData.role} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="team_id">Team *</Label>
              <Select value={formData.team_id} onValueChange={(value) => handleSelectChange("team_id", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a team" />
                </SelectTrigger>
                <SelectContent>
                  {teams.map((team) => (
                    <SelectItem key={team.id} value={team.id}>
                      {team.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {teams.length === 0 && (
                <p className="text-sm text-muted-foreground">No teams available. Create a team first.</p>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            <Button
              variant="outline"
              type="button"
              onClick={() =>
                location.state?.teamId ? navigate(`/team/${location.state.teamId}`) : navigate("/players")
              }
            >
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
                  {isEditMode ? "Update Player" : "Create Player"}
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
