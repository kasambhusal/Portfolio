"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { AdminHeader } from "@/components/admin/admin-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Edit, Trash2, Star, AwardIcon } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Skill {
  id: number
  name: string
  category?: string
  proficiency_level: number
  created_at: string
}

interface Award {
  id: number
  title: string
  description?: string
  date_received?: string
  organization?: string
  created_at: string
}

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [awards, setAwards] = useState<Award[]>([])
  const [loading, setLoading] = useState(true)
  const [skillDialogOpen, setSkillDialogOpen] = useState(false)
  const [awardDialogOpen, setAwardDialogOpen] = useState(false)
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null)
  const [editingAward, setEditingAward] = useState<Award | null>(null)
  const [skillFormData, setSkillFormData] = useState({
    name: "",
    category: "",
    proficiency_level: "5",
  })
  const [awardFormData, setAwardFormData] = useState({
    title: "",
    description: "",
    date_received: "",
    organization: "",
  })
  const { toast } = useToast()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [skillsResponse, awardsResponse] = await Promise.all([
        fetch("/api/admin/skills"),
        fetch("/api/admin/awards"),
      ])

      if (skillsResponse.ok) {
        const skillsData = await skillsResponse.json()
        setSkills(skillsData)
      }

      if (awardsResponse.ok) {
        const awardsData = await awardsResponse.json()
        setAwards(awardsData)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch data",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSkillSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const url = editingSkill ? `/api/admin/skills/${editingSkill.id}` : "/api/admin/skills"
      const method = editingSkill ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(skillFormData),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: `Skill ${editingSkill ? "updated" : "created"} successfully`,
        })
        setSkillDialogOpen(false)
        setEditingSkill(null)
        setSkillFormData({ name: "", category: "", proficiency_level: "5" })
        fetchData()
      } else {
        const error = await response.json()
        toast({
          title: "Error",
          description: error.error || "Failed to save skill",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Network error occurred",
        variant: "destructive",
      })
    }
  }

  const handleAwardSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const url = editingAward ? `/api/admin/awards/${editingAward.id}` : "/api/admin/awards"
      const method = editingAward ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(awardFormData),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: `Award ${editingAward ? "updated" : "created"} successfully`,
        })
        setAwardDialogOpen(false)
        setEditingAward(null)
        setAwardFormData({ title: "", description: "", date_received: "", organization: "" })
        fetchData()
      } else {
        const error = await response.json()
        toast({
          title: "Error",
          description: error.error || "Failed to save award",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Network error occurred",
        variant: "destructive",
      })
    }
  }

  const handleSkillEdit = (skill: Skill) => {
    setEditingSkill(skill)
    setSkillFormData({
      name: skill.name,
      category: skill.category || "",
      proficiency_level: skill.proficiency_level.toString(),
    })
    setSkillDialogOpen(true)
  }

  const handleAwardEdit = (award: Award) => {
    setEditingAward(award)
    setAwardFormData({
      title: award.title,
      description: award.description || "",
      date_received: award.date_received || "",
      organization: award.organization || "",
    })
    setAwardDialogOpen(true)
  }

  const handleSkillDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this skill?")) return

    try {
      const response = await fetch(`/api/admin/skills/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Skill deleted successfully",
        })
        fetchData()
      } else {
        toast({
          title: "Error",
          description: "Failed to delete skill",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Network error occurred",
        variant: "destructive",
      })
    }
  }

  const handleAwardDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this award?")) return

    try {
      const response = await fetch(`/api/admin/awards/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Award deleted successfully",
        })
        fetchData()
      } else {
        toast({
          title: "Error",
          description: "Failed to delete award",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Network error occurred",
        variant: "destructive",
      })
    }
  }

  const openSkillCreateDialog = () => {
    setEditingSkill(null)
    setSkillFormData({ name: "", category: "", proficiency_level: "5" })
    setSkillDialogOpen(true)
  }

  const openAwardCreateDialog = () => {
    setEditingAward(null)
    setAwardFormData({ title: "", description: "", date_received: "", organization: "" })
    setAwardDialogOpen(true)
  }

  const renderStars = (level: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(level / 2) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ))
  }

  const groupedSkills = skills.reduce(
    (acc, skill) => {
      const category = skill.category || "Other"
      if (!acc[category]) acc[category] = []
      acc[category].push(skill)
      return acc
    },
    {} as Record<string, Skill[]>,
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <AdminHeader title="Skills & Awards" />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader title="Skills & Awards" />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Manage Skills & Awards</h2>
          <p className="text-muted-foreground">Showcase your expertise and achievements</p>
        </div>

        <Tabs defaultValue="skills" className="space-y-6">
          <TabsList>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="awards">Awards</TabsTrigger>
          </TabsList>

          <TabsContent value="skills" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Technical Skills</h3>
              <Dialog open={skillDialogOpen} onOpenChange={setSkillDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={openSkillCreateDialog}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Skill
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{editingSkill ? "Edit Skill" : "Add New Skill"}</DialogTitle>
                    <DialogDescription>
                      {editingSkill ? "Update the skill details" : "Add a new skill to your portfolio"}
                    </DialogDescription>
                  </DialogHeader>

                  <form onSubmit={handleSkillSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="skill-name">Skill Name *</Label>
                      <Input
                        id="skill-name"
                        value={skillFormData.name}
                        onChange={(e) => setSkillFormData({ ...skillFormData, name: e.target.value })}
                        required
                        placeholder="e.g., React, Python, Machine Learning"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="skill-category">Category</Label>
                      <Select
                        value={skillFormData.category}
                        onValueChange={(value) => setSkillFormData({ ...skillFormData, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Frontend">Frontend</SelectItem>
                          <SelectItem value="Backend">Backend</SelectItem>
                          <SelectItem value="Database">Database</SelectItem>
                          <SelectItem value="ML/AI">ML/AI</SelectItem>
                          <SelectItem value="DevOps">DevOps</SelectItem>
                          <SelectItem value="Cloud">Cloud</SelectItem>
                          <SelectItem value="Mobile">Mobile</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="skill-proficiency">Proficiency Level (1-10)</Label>
                      <Select
                        value={skillFormData.proficiency_level}
                        onValueChange={(value) => setSkillFormData({ ...skillFormData, proficiency_level: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 10 }, (_, i) => (
                            <SelectItem key={i + 1} value={(i + 1).toString()}>
                              {i + 1} - {i < 2 ? "Beginner" : i < 5 ? "Intermediate" : i < 8 ? "Advanced" : "Expert"}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                      <Button type="button" variant="outline" onClick={() => setSkillDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="submit">{editingSkill ? "Update" : "Create"} Skill</Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {Object.keys(groupedSkills).length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground mb-4">No skills found</p>
                  <Button onClick={openSkillCreateDialog}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Your First Skill
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {Object.entries(groupedSkills).map(([category, categorySkills]) => (
                  <div key={category}>
                    <h4 className="text-lg font-medium mb-3">{category}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {categorySkills.map((skill) => (
                        <Card key={skill.id}>
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <CardTitle className="text-base">{skill.name}</CardTitle>
                              <div className="flex gap-1">
                                <Button variant="ghost" size="sm" onClick={() => handleSkillEdit(skill)}>
                                  <Edit className="w-3 h-3" />
                                </Button>
                                <Button variant="ghost" size="sm" onClick={() => handleSkillDelete(skill.id)}>
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-center gap-2">
                              <div className="flex">{renderStars(skill.proficiency_level)}</div>
                              <Badge variant="outline" className="text-xs">
                                {skill.proficiency_level}/10
                              </Badge>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="awards" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Awards & Achievements</h3>
              <Dialog open={awardDialogOpen} onOpenChange={setAwardDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={openAwardCreateDialog}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Award
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{editingAward ? "Edit Award" : "Add New Award"}</DialogTitle>
                    <DialogDescription>
                      {editingAward ? "Update the award details" : "Add a new award or achievement"}
                    </DialogDescription>
                  </DialogHeader>

                  <form onSubmit={handleAwardSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="award-title">Award Title *</Label>
                      <Input
                        id="award-title"
                        value={awardFormData.title}
                        onChange={(e) => setAwardFormData({ ...awardFormData, title: e.target.value })}
                        required
                        placeholder="e.g., Best Innovation Award"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="award-description">Description</Label>
                      <Textarea
                        id="award-description"
                        value={awardFormData.description}
                        onChange={(e) => setAwardFormData({ ...awardFormData, description: e.target.value })}
                        rows={3}
                        placeholder="Brief description of the award and achievement"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="award-date">Date Received</Label>
                        <Input
                          id="award-date"
                          type="date"
                          value={awardFormData.date_received}
                          onChange={(e) => setAwardFormData({ ...awardFormData, date_received: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="award-organization">Organization</Label>
                        <Input
                          id="award-organization"
                          value={awardFormData.organization}
                          onChange={(e) => setAwardFormData({ ...awardFormData, organization: e.target.value })}
                          placeholder="e.g., Tech Innovation Summit"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                      <Button type="button" variant="outline" onClick={() => setAwardDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="submit">{editingAward ? "Update" : "Create"} Award</Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {awards.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground mb-4">No awards found</p>
                  <Button onClick={openAwardCreateDialog}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Your First Award
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {awards.map((award) => (
                  <Card key={award.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-yellow-100 rounded-lg">
                            <AwardIcon className="w-5 h-5 text-yellow-600" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{award.title}</CardTitle>
                            {award.organization && (
                              <CardDescription className="text-sm font-medium">{award.organization}</CardDescription>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm" onClick={() => handleAwardEdit(award)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleAwardDelete(award.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {award.description && <p className="text-sm text-muted-foreground mb-2">{award.description}</p>}
                      {award.date_received && (
                        <p className="text-xs text-muted-foreground">
                          Received: {new Date(award.date_received).toLocaleDateString()}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
