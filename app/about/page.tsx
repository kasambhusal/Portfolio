import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code, Heart, Lightbulb, Users } from "lucide-react";
import { Footer } from "@/components/footer";
import Link from "next/link";

export default function AboutPage() {
  const values = [
    {
      icon: Code,
      title: "Technical Excellence",
      description:
        "Committed to writing clean, efficient code and staying current with the latest technologies and best practices.",
    },
    {
      icon: Heart,
      title: "People Connection",
      description:
        "Passionate about building meaningful relationships and creating technology that brings people together.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "Always exploring new ideas and approaches to solve complex problems with creative solutions.",
    },
    {
      icon: Users,
      title: "Collaboration",
      description:
        "Believe in the power of teamwork and enjoy mentoring others while learning from diverse perspectives.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
                  About Me
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground text-pretty mb-8 text-justify">
                  I am a passionate tech enthusiast, problem-solver, and
                  community-driven innovator with hands-on experience in
                  software development, AI, and web technologies. From securing
                  top positions in internships and hackathons to leading
                  initiatives like EduSphere and contributing to government and
                  youth-focused programs, I strive to create meaningful impact
                  through technology and education. With a proven track record
                  in building scalable projects, mentoring teams, and driving
                  social change, I am committed to continuous growth, learning,
                  and using my skills to empower communities and foster
                  opportunities for others.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/contact">
                    <Button size="lg">Get In Touch</Button>
                  </Link>
                  <Link href="/projects">
                    <Button size="lg" variant="outline">
                      View My Work
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-accent/20 to-secondary/20 rounded-2xl p-8 glass dark:glass-dark">
                  <img
                    src="/kasam-photo.png"
                    alt="Kasam Bhusal"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">My Journey</h2>
            <div className="space-y-8">
              <Card className="glass dark:glass-dark">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold mb-4 text-accent">
                    The Beginning
                  </h3>
                  <p className="text-muted-foreground text-pretty leading-relaxed">
                    Born and raised in a public high school in southern Nepal, I
                    experienced the challenges of limited resources early on,
                    which sparked my drive to learn and create opportunities for
                    myself.
                  </p>
                </CardContent>
              </Card>

              <Card className="glass dark:glass-dark">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold mb-4 text-accent">
                    Exploring Technology
                  </h3>
                  <p className="text-muted-foreground text-pretty leading-relaxed">
                    Moving to the city, I immersed myself in tech, completing
                    internships over three months that exposed me to real-world
                    software development and problem-solving.
                  </p>
                </CardContent>
              </Card>

              <Card className="glass dark:glass-dark">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold mb-4 text-accent">
                    Early Career Growth
                  </h3>
                  <p className="text-muted-foreground text-pretty leading-relaxed">
                    My passion and skills led to my first professional role,
                    where I contributed to impactful projects, learned to work
                    in teams, and honed my technical expertise.
                  </p>
                </CardContent>
              </Card>

              <Card className="glass dark:glass-dark">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold mb-4 text-accent">
                    Leadership & Community Engagement
                  </h3>
                  <p className="text-muted-foreground text-pretty leading-relaxed">
                    Beyond work, I joined clubs and organizations, taking on
                    leadership roles and organizing initiatives that positively
                    impact society and empower youth.
                  </p>
                </CardContent>
              </Card>
              <Card className="glass dark:glass-dark">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold mb-4 text-accent">
                    Founder of EduSphere
                  </h3>
                  <p className="text-muted-foreground text-pretty leading-relaxed">
                    Driven to bridge opportunity gaps, I founded EduSphere, a
                    non-profit aimed at providing training, mentorship, and
                    internships for students, helping the community grow.
                  </p>
                </CardContent>
              </Card>
              <Card className="glass dark:glass-dark">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold mb-4 text-accent">
                    Lifelong Learner
                  </h3>
                  <p className="text-muted-foreground text-pretty leading-relaxed">
                    Keen to expand my knowledge and make a larger impact, I am
                    pursuing undergraduate studies in the USA, eager to learn,
                    collaborate, and continue serving communities.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              What Drives Me
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <Card
                    key={index}
                    className="glass dark:glass-dark hover:scale-105 transition-all duration-300"
                  >
                    <CardContent className="p-8">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-accent/10 rounded-lg">
                          <Icon className="w-6 h-6 text-accent" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold mb-3">
                            {value.title}
                          </h3>
                          <p className="text-muted-foreground text-pretty">
                            {value.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Let's Build Something Amazing Together
            </h2>
            <p className="text-lg text-muted-foreground mb-8 text-pretty">
              I'm always excited to collaborate on new projects and connect with
              fellow developers, entrepreneurs, and innovators. Whether you have
              a project in mind or just want to chat about technology, I'd love
              to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg">Start a Conversation</Button>
              </Link>
              <Link href="/projects">
                <Button size="lg" variant="outline">
                  See My Work
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
