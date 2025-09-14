"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, AwardIcon } from "lucide-react"
import { Footer } from "@/components/footer"

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [skillsResponse, awardsResponse] = await Promise.all([
          fetch("/api/public/skills"),
          fetch("/api/public/awards"),
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
        console.error("Failed to fetch data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">Skills & Awards</h1>
            <p className="text-lg md:text-xl text-muted-foreground text-pretty">
              A comprehensive overview of my technical expertise and achievements. From cutting-edge technologies to
              recognition for excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Technical Skills</h2>

          {loading ? (
            <div className="space-y-8">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i}>
                  <div className="h-6 bg-muted rounded w-32 mb-4" />
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Array.from({ length: 6 }).map((_, j) => (
                      <Card key={j} className="animate-pulse">
                        <CardHeader>
                          <div className="h-5 bg-muted rounded w-3/4" />
                        </CardHeader>
                        <CardContent>
                          <div className="h-4 bg-muted rounded w-full" />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : Object.keys(groupedSkills).length === 0 ? (
            <div className="text-center py-20">
              <h3 className="text-2xl font-semibold mb-4">Skills Coming Soon</h3>
              <p className="text-muted-foreground">Technical skills showcase is being updated. Check back soon!</p>
            </div>
          ) : (
            <div className="space-y-12">
              {Object.entries(groupedSkills).map(([category, categorySkills]) => (
                <div key={category}>
                  <h3 className="text-2xl font-semibold mb-6 text-accent">{category}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categorySkills.map((skill) => (
                      <Card
                        key={skill.id}
                        className="group hover:scale-105 transition-all duration-300 glass dark:glass-dark"
                      >
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg group-hover:text-accent transition-colors">
                            {skill.name}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between">
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
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Awards & Achievements</h2>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {Array.from({ length: 4 }).map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader>
                    <div className="h-6 bg-muted rounded w-3/4" />
                    <div className="h-4 bg-muted rounded w-1/2" />
                  </CardHeader>
                  <CardContent>
                    <div className="h-4 bg-muted rounded w-full mb-2" />
                    <div className="h-4 bg-muted rounded w-2/3" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : awards.length === 0 ? (
            <div className="text-center py-20">
              <h3 className="text-2xl font-semibold mb-4">Awards Coming Soon</h3>
              <p className="text-muted-foreground">Achievement showcase is being updated. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {awards.map((award) => (
                <Card
                  key={award.id}
                  className="group hover:scale-105 transition-all duration-300 glass dark:glass-dark"
                >
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
                        <AwardIcon className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl group-hover:text-accent transition-colors">
                          {award.title}
                        </CardTitle>
                        {award.organization && (
                          <p className="text-sm font-medium text-muted-foreground mt-1">{award.organization}</p>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {award.description && <p className="text-muted-foreground mb-4 text-pretty">{award.description}</p>}
                    {award.date_received && (
                      <p className="text-sm text-muted-foreground">
                        Received: {new Date(award.date_received).toLocaleDateString()}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
