"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Award, Code2, Zap, BrainCircuit, Rocket } from "lucide-react";

interface Skill {
  id: number;
  name: string;
  category?: string;
  proficiency_level: number;
}

interface AwardType {
  id: number;
  title: string;
  description?: string;
  date_received?: string;
  organization?: string;
}

export default function SkillsPage({ 
  initialSkills, 
  initialAwards 
}: { 
  initialSkills: Skill[], 
  initialAwards: AwardType[] 
}) {

  const groupedSkills = initialSkills.reduce((acc, skill) => {
    const category = skill.category || "General Tech";
    if (!acc[category]) acc[category] = [];
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
        <div className="container mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
         
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              Expertise & <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">Impact</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A breakdown of my technical stack and the honors I've earned while building solutions that matter.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Skills Grid */}
      <section className="py-20 container mx-auto px-6">
        <div className="space-y-24">
          {Object.entries(groupedSkills).map(([category, categorySkills], catIdx) => (
            <div key={category}>
              <div className="flex items-center gap-4 mb-10">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  {catIdx % 2 === 0 ? <Code2 className="w-6 h-6" /> : <BrainCircuit className="w-6 h-6" />}
                </div>
                <h2 className="text-3xl font-bold tracking-tight">{category}</h2>
                <div className="h-[1px] flex-grow bg-gradient-to-r from-border to-transparent" />
              </div>

              <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {categorySkills.map((skill) => (
                  <motion.div
                    key={skill.id}
                    variants={itemVariants}
                    className="p-6 rounded-2xl border bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-colors group"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-bold text-lg group-hover:text-primary transition-colors">
                        {skill.name}
                      </span>
                      <Badge variant="outline" className="font-mono bg-primary/5 border-primary/20">
                        {skill.proficiency_level * 10}%
                      </Badge>
                    </div>
                    {/* Modern Skill Bar */}
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.proficiency_level * 10}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full bg-primary rounded-full"
                      />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      </section>

      {/* Awards Section - Modern Timeline Style */}
      <section className="py-32 bg-secondary/30 relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center mb-16 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-500 text-sm font-medium border border-yellow-500/20 mb-4">
              <Award className="w-4 h-4" />
              Hall of Fame
            </div>
            <h2 className="text-4xl font-bold">Awards & Honors</h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {initialAwards.map((award, index) => (
              <motion.div
                key={award.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative flex gap-6 p-8 rounded-3xl border bg-background/50 hover:bg-background transition-all group shadow-sm hover:shadow-xl hover:shadow-primary/5"
              >
                <div className="hidden md:flex flex-col items-center">
                    <div className="p-4 rounded-2xl bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                        <Rocket className="w-6 h-6" />
                    </div>
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                    <h3 className="text-2xl font-bold tracking-tight">{award.title}</h3>
                    <span className="text-sm font-mono text-muted-foreground bg-muted px-3 py-1 rounded-full">
                        {award.date_received ? new Date(award.date_received).getFullYear() : 'Ongoing'}
                    </span>
                  </div>
                  <p className="text-primary font-medium mb-3">{award.organization}</p>
                  <p className="text-muted-foreground leading-relaxed">
                    {award.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}