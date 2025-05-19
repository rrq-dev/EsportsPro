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

export function TeamForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { toast } = useToast()
  const isEditMode = !!id

  const [loading, setLoading] = useState(isEditMode)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    region: "",
    logo: "",
  })

  useEffect(() => {
    if (isEditMode) {
      fetchTeam()
    }
  }, [id])

  const fetchTeam = async () => {
    try {
      setLoading(true)
      const data = await apiService.getTeamById(id)
      setFormData(data)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load team data. Please try again.",
      })
      navigate("/teams")
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

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Basic validation
    if (!formData.name || !formData.region) {
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
        await apiService.updateTeam(id, formData)
        toast({
          title: "Success",
          description: "Team updated successfully",
        })
      } else {
        // Generate ID if not in edit mode
        const teamData = {
          ...formData,
          id: formData.id || `team-${formData.name.toLowerCase().replace(/\s+/g, "-")}`,
        }
        await apiService.createTeam(teamData)
        toast({
          title: "Success",
          description: "Team created successfully",
        })
      }

      navigate("/teams")
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: isEditMode
          ? "Failed to update team. Please try again."
          : "Failed to create team. Please try again.",
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
        <Button variant="ghost" onClick={() => navigate("/teams")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <h1 className="text-2xl font-bold">{isEditMode ? "Edit Team" : "Create Team"}</h1>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Team Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {!isEditMode && (
              <div className="space-y-2">
                <Label htmlFor="id">Team ID (optional)</Label>
                <Input
                  id="id"
                  name="id"
                  value={formData.id}
                  onChange={handleChange}
                  placeholder="Leave blank to auto-generate"
                />
                <p className="text-sm text-muted-foreground">
                  If left blank, an ID will be automatically generated based on the team name
                </p>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="name">Team Name *</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="region">Region *</Label>
              <Input id="region" name="region" value={formData.region} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="logo">Logo URL</Label>
              <Input
                id="logo"
                name="logo"
                value={formData.logo}
                onChange={handleChange}
                placeholder="https://example.com/logo.png"
              />
              {formData.logo && (
                <div className="mt-2">
                  <p className="text-sm mb-1">Preview:</p>
                  <img
                    src={formData.logo || "/placeholder.svg"}
                    alt="Logo preview"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            <Button variant="outline" type="button" onClick={() => navigate("/teams")}>
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
                  {isEditMode ? "Update Team" : "Create Team"}
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
