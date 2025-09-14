import Link from "next/link"
import { Github, Linkedin, Mail, Phone } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold text-gradient mb-4">Kasam Bhusal</h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              Full Stack Developer and ML Enthusiast passionate about building innovative solutions that bridge
              technology and human connection.
            </p>
            <div className="flex gap-4">
              <Link
                href="mailto:developerkasam@gmail.com"
                className="p-2 rounded-full glass dark:glass-dark hover:scale-110 transition-all duration-300"
              >
                <Mail className="h-4 w-4" />
              </Link>
              <Link
                href="https://github.com/kasam"
                className="p-2 rounded-full glass dark:glass-dark hover:scale-110 transition-all duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-4 w-4" />
              </Link>
              <Link
                href="https://linkedin.com/in/kasambhusal"
                className="p-2 rounded-full glass dark:glass-dark hover:scale-110 transition-all duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <Link href="/projects" className="block text-muted-foreground hover:text-foreground transition-colors">
                Projects
              </Link>
              <Link href="/blogs" className="block text-muted-foreground hover:text-foreground transition-colors">
                Blogs
              </Link>
              <Link href="/skills" className="block text-muted-foreground hover:text-foreground transition-colors">
                Skills
              </Link>
              <Link href="/about" className="block text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span className="text-sm">developerkasam@gmail.com</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span className="text-sm">+977 9860555866</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Kasam Bhusal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
