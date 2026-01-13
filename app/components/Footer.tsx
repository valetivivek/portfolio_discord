import Link from "next/link";
import { Mail, Github, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-[#202225] bg-[#2F3136]">
      <nav aria-label="Footer" className="container-page text-sm text-[#B9BBBE]">
        <div className="grid gap-8 py-10 sm:grid-cols-2 md:grid-cols-4">
          <section>
            <p className="font-semibold font-heading text-[#F2F3F5]">Vishnu&apos;s Server</p>
            <p className="mt-2 max-w-xs text-[#B9BBBE]">Thanks for exploring my portfolio! Hope you enjoyed the journey.</p>
          </section>
          <section>
            <p className="font-medium font-heading text-[#F2F3F5]">Quick Links</p>
            <ul role="list" className="mt-2 space-y-2">
              <li><Link className="hover:underline hover:text-[#F2F3F5] focus:outline-none focus:ring-2 focus:ring-[#5865F2] rounded" href="/#welcome">Welcome</Link></li>
              <li><Link className="hover:underline hover:text-[#F2F3F5] focus:outline-none focus:ring-2 focus:ring-[#5865F2] rounded" href="/#channels">Projects</Link></li>
              <li><Link className="hover:underline hover:text-[#F2F3F5] focus:outline-none focus:ring-2 focus:ring-[#5865F2] rounded" href="/#announcements">Experience</Link></li>
              <li><Link className="hover:underline hover:text-[#F2F3F5] focus:outline-none focus:ring-2 focus:ring-[#5865F2] rounded" href="/#invite">Contact</Link></li>
            </ul>
          </section>
          <section>
            <p className="font-medium font-heading text-[#F2F3F5] mb-2">Connect</p>
            <ul role="list" className="space-y-2">
              <li>
                <a href="mailto:vivekvaleti7053@gmail.com" className="flex items-center gap-2 text-[#B9BBBE] hover:text-[#5865F2] focus:outline-none rounded transition duration-200 after:content-none before:content-none" rel="me">
                  <Mail className="h-4 w-4" aria-hidden />
                  <span>Email</span>
                </a>
              </li>
              <li>
                <a href="https://github.com/valetivivek" target="_blank" rel="me noopener noreferrer" className="flex items-center gap-2 text-[#B9BBBE] hover:text-[#5865F2] focus:outline-none rounded transition duration-200 after:content-none before:content-none">
                  <Github className="h-4 w-4" aria-hidden />
                  <span>GitHub</span>
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/valetivishnuvivek/" target="_blank" rel="me noopener noreferrer" className="flex items-center gap-2 text-[#B9BBBE] hover:text-[#5865F2] focus:outline-none rounded transition duration-200 after:content-none before:content-none">
                  <Linkedin className="h-4 w-4" aria-hidden />
                  <span>LinkedIn</span>
                </a>
              </li>
            </ul>
          </section>
          <section className="self-end md:text-right">
            <p className="text-xs text-[#72767D]">&copy; {new Date().getFullYear()} Vishnu Vivek.</p>
            <p className="text-xs text-[#72767D]">Built with Next.js, TypeScript, Tailwind.</p>
            <p className="text-xs text-[#72767D] mt-1">
              <Link href="/privacy" className="hover:underline hover:text-[#F2F3F5] focus:outline-none focus:ring-2 focus:ring-[#5865F2] rounded">
                Privacy Policy
              </Link>
            </p>
          </section>
        </div>
      </nav>
    </footer>
  );
}


