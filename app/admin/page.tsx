"use client"

import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LayoutDashboard, FolderOpen, BookOpen, Building2, Award, MessageSquare, LogOut, User } from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  const { user, logout } = useAuth()

  const dashboardItems = [
    {
      title: "Projects",
      description: "Manage your portfolio projects",
      icon: FolderOpen,
      href: "/admin/projects",
      color: "text-blue-600",
    },
    {
      title: "Blogs & Events",
      description: "Manage blog posts and life events",
      icon: BookOpen,
      href: "/admin/blogs",
      color: "text-green-600",
    },
    {
      title: "Companies",
      description: "Manage companies you've worked with",
      icon: Building2,
      href: "/admin/companies",
      color: "text-purple-600",
    },
    {
      title: "Skills & Awards",
      description: "Manage your skills and achievements",
      icon: Award,
      href: "/admin/skills",
      color: "text-orange-600",
    },
    {
      title: "Testimonials",
      description: "Manage client testimonials",
      icon: MessageSquare,
      href: "/admin/testimonials",
      color: "text-pink-600",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="w-6 h-6" />
            <h1 className="text-xl font-semibold">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <User className="w-4 h-4" />
              Welcome, {user?.username}
            </div>
            <Button variant="outline" size="sm" onClick={logout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Portfolio Management</h2>
          <p className="text-muted-foreground">Manage all aspects of your portfolio website from this dashboard.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboardItems.map((item) => {
            const Icon = item.icon
            return (
              <Link key={item.href} href={item.href}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-muted ${item.color}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{item.title}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{item.description}</CardDescription>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>

        {/* Quick Stats */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold mb-4">Quick Overview</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">0</div>
                <div className="text-sm text-muted-foreground">Projects</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">0</div>
                <div className="text-sm text-muted-foreground">Blog Posts</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">0</div>
                <div className="text-sm text-muted-foreground">Companies</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">0</div>
                <div className="text-sm text-muted-foreground">Skills</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-pink-600">0</div>
                <div className="text-sm text-muted-foreground">Testimonials</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
