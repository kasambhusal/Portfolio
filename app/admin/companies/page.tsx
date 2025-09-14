"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { AdminHeader } from "@/components/admin/admin-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Plus, Edit, Trash2, ExternalLink } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Company {
  id: number
  name: string
  image_url: string
  website_link?: string
  created_at: string
}

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingCompany, setEditingCompany] = useState<Company | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    image_url: "",
    website_link: "",
  })
  const { toast } = useToast()

  useEffect(() => {
    fetchCompanies()
  }, [])

  const fetchCompanies = async () => {
    try {
      const response = await fetch("/api/admin/companies")
      if (response.ok) {
        const data = await response.json()
        setCompanies(data)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch companies",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const url = editingCompany ? `/api/admin/companies/${editingCompany.id}` : "/api/admin/companies"
      const method = editingCompany ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: `Company ${editingCompany ? "updated" : "created"} successfully`,
        })
        setDialogOpen(false)
        setEditingCompany(null)
        setFormData({ name: "", image_url: "", website_link: "" })
        fetchCompanies()
      } else {
        const error = await response.json()
        toast({
          title: "Error",
          description: error.error || "Failed to save company",
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

  const handleEdit = (company: Company) => {
    setEditingCompany(company)
    setFormData({
      name: company.name,
      image_url: company.image_url,
      website_link: company.website_link || "",
    })
    setDialogOpen(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this company?")) return

    try {
      const response = await fetch(`/api/admin/companies/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Company deleted successfully",
        })
        fetchCompanies()
      } else {
        toast({
          title: "Error",
          description: "Failed to delete company",
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

  const openCreateDialog = () => {
    setEditingCompany(null)
    setFormData({ name: "", image_url: "", website_link: "" })
    setDialogOpen(true)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <AdminHeader title="Companies" />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader title="Companies" />

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">Manage Companies</h2>
            <p className="text-muted-foreground">Organizations and companies you've worked with</p>
          </div>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openCreateDialog}>
                <Plus className="w-4 h-4 mr-2" />
                Add Company
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingCompany ? "Edit Company" : "Add New Company"}</DialogTitle>
                <DialogDescription>
                  {editingCompany ? "Update the company details" : "Add a company or organization you've worked with"}
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Company Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    placeholder="Company or Organization Name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image_url">Logo URL *</Label>
                  <Input
                    id="image_url"
                    type="url"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    required
                    placeholder="https://example.com/logo.png"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website_link">Website URL</Label>
                  <Input
                    id="website_link"
                    type="url"
                    value={formData.website_link}
                    onChange={(e) => setFormData({ ...formData, website_link: e.target.value })}
                    placeholder="https://company.com"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">{editingCompany ? "Update" : "Create"} Company</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {companies.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground mb-4">No companies found</p>
              <Button onClick={openCreateDialog}>
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Company
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {companies.map((company) => (
              <Card key={company.id}>
                <CardHeader className="text-center">
                  <div className="mx-auto w-16 h-16 bg-muted rounded-lg overflow-hidden mb-2">
                    <img
                      src={company.image_url || "/placeholder.svg"}
                      alt={company.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <CardTitle className="text-lg">{company.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(company)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(company.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    {company.website_link && (
                      <a
                        href={company.website_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm text-primary hover:underline"
                      >
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
