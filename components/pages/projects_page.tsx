"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ExternalLink, Calendar, ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface Project {
  id: number;
  title: string;
  description: string;
  image_url?: string;
  project_link?: string;
  created_at: string;
}

// Animation variants for staggered entrance
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring" as const, stiffness: 50 } 
  },
};

export default function ProjectsPage({ initialProjects }: { initialProjects: Project[] }) {
  const projects = initialProjects || [];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden selection:bg-primary/20">
      
      {/* Dynamic Background Elements - Adds depth without being distracting */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] animate-pulse delay-1000" />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-32 pb-16 container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl flex flex-col items-center text-center mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">Works</span>
            </h1>
            <p className="text-xl text-muted-foreground text-pretty max-w-2xl leading-relaxed">
              A few selected projects spanning software development, machine learning, and creative solutions, reflecting my hands-on learning and real-world impact.
            </p>
          </motion.div>
        </section>

        {/* Projects Grid */}
        <section className="pb-32 container mx-auto px-6">
          {projects.length === 0 ? (
            <div className="text-center py-20 border border-dashed rounded-xl bg-muted/20">
              <h3 className="text-2xl font-semibold mb-4">No Projects Yet</h3>
              <p className="text-muted-foreground mb-8">Projects are being added regularly.</p>
              <Link href="/">
                <Button variant="outline">Back to Home</Button>
              </Link>
            </div>
          ) : (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  className="group relative flex flex-col h-full"
                >
                  {/* Card Container */}
                  <div className="relative h-full bg-muted/30 backdrop-blur-sm border border-white/10 dark:border-white/5 rounded-3xl overflow-hidden hover:border-primary/50 transition-colors duration-500">
                    
                    {/* Image Area */}
                    <div className="aspect-[4/3] overflow-hidden relative">
                      {project.image_url ? (
                        <img
                          src={project.image_url}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                          <span className="text-muted-foreground font-mono text-sm">No Preview</span>
                        </div>
                      )}
                      
                      {/* Overlay Gradient for text readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-60" />
                    </div>

                    {/* Content Area */}
                    <div className="p-6 flex flex-col flex-grow relative">
                      
                      {/* Date badge */}
                      <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-3">
                        <Calendar className="w-3 h-3" />
                        {new Date(project.created_at).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'long'
                        })}
                      </div>

                      <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors flex items-center gap-2">
                        {project.title}
                      </h3>
                      
                      <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                        {project.description}
                      </p>

                      {project.project_link && (
                        <div className="pt-4 mt-auto border-t border-white/5">
                          <a
                            href={project.project_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors group/link"
                          >
                            View Project
                            <ArrowUpRight className="w-4 h-4 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1" />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </section>
      </div>

    </div>
  );
}