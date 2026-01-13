"use client";

import React from "react";
import { MessageData, MEMBERS } from "./data";
import { ExternalLink, Github, Calendar, GraduationCap, Briefcase, Download } from "lucide-react";

const vishnu = MEMBERS.find((m) => m.id === "vishnu")!;
const bot = MEMBERS.find((m) => m.id === "portfolio-bot")!;
const system = { id: "system", name: "System", discriminator: "0000", status: "online" as const, roles: [] };

function ProjectEmbed({ title, description, tags, github, live }: {
  title: string;
  description: string;
  tags: string[];
  github?: string;
  live?: string;
}) {
  return (
    <div className="mt-2 border-l-4 border-[#5865F2] bg-[#2B2D31] rounded-r p-3 max-w-lg">
      <div className="font-semibold text-[#00A8FC] hover:underline cursor-pointer mb-1">{title}</div>
      <p className="text-sm text-[#B5BAC1] mb-2">{description}</p>
      <div className="flex flex-wrap gap-1 mb-2">
        {tags.map((tag) => (
          <span key={tag} className="px-2 py-0.5 bg-[#5865F2]/20 text-[#8B9DFF] text-xs rounded">
            {tag}
          </span>
        ))}
      </div>
      <div className="flex gap-3 text-sm">
        {github && (
          <a href={github} target="_blank" rel="noopener noreferrer" className="text-[#00A8FC] hover:underline flex items-center gap-1">
            <Github className="w-4 h-4" /> Source
          </a>
        )}
        {live && (
          <a href={live} target="_blank" rel="noopener noreferrer" className="text-[#00A8FC] hover:underline flex items-center gap-1">
            <ExternalLink className="w-4 h-4" /> Demo
          </a>
        )}
      </div>
    </div>
  );
}

function RoleBadge({ name, color }: { name: string; color: string }) {
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium mr-1 mb-1"
      style={{ backgroundColor: `${color}20`, color }}
    >
      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
      {name}
    </span>
  );
}

export function getChannelMessages(channelId: string): MessageData[] {
  switch (channelId) {
    case "welcome":
      return [
        {
          id: "w1",
          author: vishnu,
          timestamp: new Date(Date.now() - 3600000),
          content: (
            <div>
              <span className="text-[#5865F2] font-medium">@everyone</span> Welcome to my portfolio server! 👋
              <br /><br />
              I&apos;m <span className="font-semibold text-[#F2F3F5]">Vishnu Vivek</span>, a Full-Stack Developer and Graduate CS student
              at the University of Florida. This server is designed to feel like home — explore the channels to learn about my work,
              skills, and experience.
              <br /><br />
              <span className="text-[#B5BAC1]">Here&apos;s how to navigate:</span>
              <div className="bg-[#2B2D31] rounded p-3 mt-2 text-sm">
                • <span className="text-[#00A8FC]">#announcements</span> — Career milestones and updates<br />
                • <span className="text-[#00A8FC]">#projects</span> — Featured work and case studies<br />
                • <span className="text-[#00A8FC]">#skills</span> — Technical expertise and roles<br />
                • <span className="text-[#00A8FC]">#contact</span> — Let&apos;s connect!
              </div>
            </div>
          ),
        },
        {
          id: "w2",
          author: system,
          timestamp: new Date(Date.now() - 3500000),
          content: "You joined the server. We hope you brought pizza. 🍕",
        },
        {
          id: "w3",
          author: bot,
          timestamp: new Date(Date.now() - 3400000),
          content: (
            <div>
              Hey there! 👋 I&apos;m the Portfolio Bot. I can help you navigate this server!
              <br /><br />
              <span className="font-semibold text-[#F2F3F5]">Quick Commands:</span>
              <div className="bg-[#1E1F22] rounded p-2 mt-2 font-mono text-sm">
                <code className="text-[#23A559]">/resume</code> — Download Vishnu&apos;s resume<br />
                <code className="text-[#23A559]">/projects</code> — View featured projects<br />
                <code className="text-[#23A559]">/contact</code> — Get in touch<br />

              </div>
            </div>
          ),
        },
        {
          id: "w3-projects",
          author: vishnu,
          timestamp: new Date(Date.now() - 3350000),
          content: (
            <div>
              <span className="text-[#B5BAC1]">Check out a couple of my featured projects:</span>
              <div className="grid gap-2 mt-2">
                <ProjectEmbed
                  title="JobScoop"
                  description="Full-stack job search platform with advanced filtering and dashboards."
                  tags={["Go", "React", "Docker"]}
                  github="https://github.com/crazyotakuu/JobScoop"
                />
                <ProjectEmbed
                  title="Comite"
                  description="Sleek manga reading platform with mobile-first design."
                  tags={["React", "Tailwind", "Vite"]}
                  github="https://github.com/valetivivek/Comite"
                />
              </div>
            </div>
          ),
        },
        {
          id: "w4",
          author: vishnu,
          timestamp: new Date(Date.now() - 3300000),
          content: (
            <div>
              Pro tip: Click on my avatar to see my full profile, or use the member list on the right to explore!
            </div>
          ),
          edited: true,
        },
      ];

    case "rules":
      return [
        {
          id: "r1",
          author: vishnu,
          timestamp: new Date(Date.now() - 86400000),
          content: (
            <div>
              <span className="text-[#F2F3F5] font-bold text-lg">📜 Server Rules & Work Philosophy</span>
              <br /><br />
              These aren&apos;t strict rules — they&apos;re the principles that guide how I approach my work.
            </div>
          ),
          pinned: true,
        },
        {
          id: "r2",
          author: vishnu,
          timestamp: new Date(Date.now() - 86300000),
          content: (
            <div className="space-y-3">
              <div className="flex gap-3">
                <span className="text-2xl">1️⃣</span>
                <div>
                  <span className="font-semibold text-[#F2F3F5]">Build with Purpose</span>
                  <p className="text-[#B5BAC1]">Every line of code should solve a real problem. I focus on creating software that&apos;s not just functional, but meaningful.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-2xl">2️⃣</span>
                <div>
                  <span className="font-semibold text-[#F2F3F5]">Performance is Non-Negotiable</span>
                  <p className="text-[#B5BAC1]">I aim for 90+ Lighthouse scores. Fast experiences aren&apos;t optional—they&apos;re essential.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-2xl">3️⃣</span>
                <div>
                  <span className="font-semibold text-[#F2F3F5]">Accessibility First</span>
                  <p className="text-[#B5BAC1]">The web should be usable by everyone. I build with keyboard navigation and screen readers in mind.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-2xl">4️⃣</span>
                <div>
                  <span className="font-semibold text-[#F2F3F5]">Clean Code, Clear Intent</span>
                  <p className="text-[#B5BAC1]">Code is read more than it&apos;s written. I prioritize maintainability and clear abstractions.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-2xl">5️⃣</span>
                <div>
                  <span className="font-semibold text-[#F2F3F5]">Ship, Iterate, Learn</span>
                  <p className="text-[#B5BAC1]">Perfect is the enemy of done. Ship, gather feedback, and continuously improve.</p>
                </div>
              </div>
            </div>
          ),
        },
      ];

    case "introductions":
      return [
        {
          id: "i1",
          author: vishnu,
          timestamp: new Date(Date.now() - 518400000),
          content: (
            <div>
              Hey everyone! I&apos;ll start 👋
              <br /><br />
              I&apos;m <span className="font-semibold text-[#F2F3F5]">Vishnu Vivek</span>, the server owner. I&apos;m a Full-Stack Developer
              currently pursuing my Master&apos;s in CS at UF. I love building things that are fast, accessible, and actually useful.
              <br /><br />
              When I&apos;m not coding, you&apos;ll find me exploring new technologies, reading manga, or thinking about distributed systems.
              <br /><br />
              <span className="text-[#B5BAC1] text-sm">📍 Gainesville, FL | 💻 Open to work</span>
            </div>
          ),
        },
      ];

    case "announcements":
      return [
        {
          id: "a1",
          author: vishnu,
          timestamp: new Date(Date.now() - 2592000000),
          content: (
            <div>
              <span className="text-[#F2F3F5] font-bold">🎉 Current Role: Machine Learning Engineer Intern</span>
              <div className="bg-[#2B2D31] rounded p-3 mt-2">
                <div className="flex items-center gap-2 text-sm text-[#B5BAC1] mb-2">
                  <Briefcase className="w-4 h-4" />
                  <span>ReplyQuick LLC</span>
                  <span>•</span>
                  <Calendar className="w-4 h-4" />
                  <span>Dec 2025 – Present</span>
                </div>
                <ul className="text-[#B5BAC1] text-sm space-y-1">
                  <li>• Trained and fine-tuned YOLOv8-based computer vision models on dental imaging datasets for object detection tasks</li>
                  <li>• Built Python-based data preprocessing, augmentation, and annotation pipelines for large-scale dental image training</li>
                  <li>• Developed reproducible cloud-based training pipelines on AWS to support controlled experimentation and evaluation</li>
                  <li>• Collaborated with software engineers to integrate ML inference outputs into production application workflows</li>
                </ul>
              </div>
            </div>
          ),
        },
        {
          id: "a2",
          author: vishnu,
          timestamp: new Date(Date.now() - 5184000000),
          content: (
            <div>
              <span className="text-[#F2F3F5] font-bold">🎓 Graduate Student Assistant</span>
              <div className="bg-[#2B2D31] rounded p-3 mt-2">
                <div className="flex items-center gap-2 text-sm text-[#B5BAC1] mb-2">
                  <GraduationCap className="w-4 h-4" />
                  <span>University of Florida</span>
                  <span>•</span>
                  <Calendar className="w-4 h-4" />
                  <span>Aug 2025 – Dec 2025</span>
                </div>
                <ul className="text-[#B5BAC1] text-sm space-y-1">
                  <li>• Designed and developed a full-stack web application using React and backend APIs to automate accreditation workflows</li>
                  <li>• Implemented backend business logic and decision-analysis rules to support consistent tiered accreditation outcomes</li>
                  <li>• Built dynamic, data-driven UI components and reporting features that reduced manual review effort by 50%</li>
                  <li>• Deployed and maintained the application on Vercel, ensuring reliability, performance, and long-term maintainability</li>
                </ul>
              </div>
            </div>
          ),
        },
        {
          id: "a3",
          author: vishnu,
          timestamp: new Date(Date.now() - 7776000000),
          content: (
            <div>
              <span className="text-[#F2F3F5] font-bold">💻 Software Development Program Apprentice</span>
              <div className="bg-[#2B2D31] rounded p-3 mt-2">
                <div className="flex items-center gap-2 text-sm text-[#B5BAC1] mb-2">
                  <Briefcase className="w-4 h-4" />
                  <span>Vignan University</span>
                  <span>•</span>
                  <Calendar className="w-4 h-4" />
                  <span>Jan 2024 – May 2024</span>
                </div>
                <ul className="text-[#B5BAC1] text-sm space-y-1">
                  <li>• Built and maintained a full-stack academic portal using React, PHP, and MySQL to streamline academic workflows end-to-end</li>
                  <li>• Automated record management, validation, and update logic to eliminate redundant manual processes across systems</li>
                  <li>• Designed secure, role-based dashboards with authorization controls for academic and administrative users</li>
                  <li>• Implemented backend integrations and optimized database queries to ensure transactional consistency and system reliability</li>
                </ul>
              </div>
            </div>
          ),
        },
      ];

    case "projects":
      return [
        {
          id: "p1",
          author: vishnu,
          timestamp: new Date(Date.now() - 7200000),
          content: (
            <div>
              Here are some of my featured projects! Each one represents a different challenge I&apos;ve tackled.
              <br /><br />
              <span className="text-[#B5BAC1] text-sm">Click on any project to learn more, or use <code className="bg-[#1E1F22] px-1 py-0.5 rounded">/projects</code> for the full list.</span>
            </div>
          ),
        },
        {
          id: "p2",
          author: vishnu,
          timestamp: new Date(Date.now() - 7100000),
          content: (
            <ProjectEmbed
              title="JobScoop"
              description="Full-stack job search platform with advanced filtering, secure authentication, and comprehensive dashboards. Built with Go backend and React frontend."
              tags={["Go", "PostgreSQL", "React", "Redis", "Docker", "Cypress", "Jest"]}
              github="https://github.com/crazyotakuu/JobScoop"
            />
          ),
        },
        {
          id: "p3",
          author: vishnu,
          timestamp: new Date(Date.now() - 7000000),
          content: (
            <ProjectEmbed
              title="Reddit-Style Discussion Platform"
              description="Concurrency-safe backend supporting users, subreddits, posts, nested comments, voting, and messaging. Built with synchronization primitives and RESTful APIs."
              tags={["Go", "PostgreSQL", "REST APIs", "Concurrency"]}
              github="https://github.com/valetivivek/redditclone"
            />
          ),
        },
        {
          id: "p4",
          author: vishnu,
          timestamp: new Date(Date.now() - 6900000),
          content: (
            <ProjectEmbed
              title="Rule-Based Chatbot"
              description="Full-stack rule-driven chatbot with WebSocket-based real-time messaging, hot-reloadable rule evaluation, and containerized deployment."
              tags={["React", "TypeScript", "Node.js", "Express", "WebSockets", "Redis", "Docker"]}
              github="https://github.com/valetivivek/rulebot"
            />
          ),
        },
        {
          id: "p5",
          author: vishnu,
          timestamp: new Date(Date.now() - 6800000),
          content: (
            <ProjectEmbed
              title="HushHabbit"
              description="A modern, privacy-focused habit tracking app for Android. Built with Jetpack Compose and Material 3, featuring streak tracking and offline-first architecture."
              tags={["Kotlin", "Jetpack Compose", "Room", "Hilt", "Android"]}
              github="https://github.com/valetivivek/hushhabbit"
            />
          ),
        },
        {
          id: "p6",
          author: vishnu,
          timestamp: new Date(Date.now() - 6700000),
          content: (
            <ProjectEmbed
              title="Comite"
              description="A sleek manga and manhua reading platform built with modern web technologies. Features mobile-first design and smooth animations."
              tags={["React", "TypeScript", "Tailwind CSS", "Vite", "Framer Motion"]}
              github="https://github.com/valetivivek/Comite"
            />
          ),
        },
      ];

    case "skills":
      return [
        {
          id: "s1",
          author: vishnu,
          timestamp: new Date(Date.now() - 172800000),
          content: (
            <div>
              <span className="text-[#F2F3F5] font-bold text-lg">⚡ Technical Skills</span>
              <br /><br />
              Here&apos;s my tech stack and areas of expertise:
            </div>
          ),
        },
        {
          id: "s2",
          author: vishnu,
          timestamp: new Date(Date.now() - 172700000),
          content: (
            <div>
              <span className="font-semibold text-[#F2F3F5] mb-2 block">Primary Roles:</span>
              <div className="flex flex-wrap gap-1">
                <RoleBadge name="Full-Stack Developer" color="#5865F2" />
                <RoleBadge name="React Specialist" color="#61DAFB" />
                <RoleBadge name="Go Backend Engineer" color="#00ADD8" />
                <RoleBadge name="ML Engineer" color="#FF6F00" />
                <RoleBadge name="Cloud Architect" color="#FF9900" />
              </div>
            </div>
          ),
        },
        {
          id: "s3",
          author: vishnu,
          timestamp: new Date(Date.now() - 172600000),
          content: (
            <div className="space-y-3">
              <div className="bg-[#2B2D31] rounded p-3">
                <span className="font-semibold text-[#F2F3F5]">Programming Languages:</span>
                <p className="text-[#B5BAC1]">Python, Go, C/C++, JavaScript, TypeScript, SQL, HTML, CSS</p>
              </div>
              <div className="bg-[#2B2D31] rounded p-3">
                <span className="font-semibold text-[#F2F3F5]">Frameworks & Libraries:</span>
                <p className="text-[#B5BAC1]">React.js, Node.js, Express.js, PyTorch, TensorFlow, Streamlit</p>
              </div>
              <div className="bg-[#2B2D31] rounded p-3">
                <span className="font-semibold text-[#F2F3F5]">Databases:</span>
                <p className="text-[#B5BAC1]">PostgreSQL, MySQL, MongoDB, Redis, Supabase</p>
              </div>
              <div className="bg-[#2B2D31] rounded p-3">
                <span className="font-semibold text-[#F2F3F5]">Cloud & DevOps:</span>
                <p className="text-[#B5BAC1]">AWS, Docker, CI/CD, GitHub Actions, Linux/Unix</p>
              </div>
              <div className="bg-[#2B2D31] rounded p-3">
                <span className="font-semibold text-[#F2F3F5]">Testing & Tools:</span>
                <p className="text-[#B5BAC1]">Unit Testing, Cypress, Jest, Git, REST APIs, Agile/Scrum, Go test</p>
              </div>
            </div>
          ),
        },
      ];

    case "education":
      return [
        {
          id: "e1",
          author: vishnu,
          timestamp: new Date(Date.now() - 345600000),
          content: (
            <div>
              <span className="text-[#F2F3F5] font-bold text-lg">🎓 Academic Journey</span>
            </div>
          ),
        },
        {
          id: "e2",
          author: vishnu,
          timestamp: new Date(Date.now() - 345500000),
          content: (
            <div className="space-y-4">
              <div className="bg-[#2B2D31] rounded p-4">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-3 gap-2">
                  <div>
                    <div className="font-semibold text-[#F2F3F5] text-lg">M.S. in Computer Science</div>
                    <div className="flex items-center gap-2 text-sm text-[#B5BAC1]">
                      <GraduationCap className="w-4 h-4" />
                      <span>University of Florida</span>
                    </div>
                  </div>
                  <div className="sm:text-right text-sm text-[#B5BAC1]">
                    <div>Aug 2024 – May 2026</div>
                    <div className="text-[#23A559] font-semibold">GPA: 3.83</div>
                  </div>
                </div>
                <div className="text-sm text-[#B5BAC1] space-y-2">
                  <div>
                    <span className="font-medium text-[#F2F3F5]">Relevant Coursework:</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    <span className="px-2 py-1 bg-[#5865F2]/20 text-[#8B9DFF] text-xs rounded">Advanced Data Structures</span>
                    <span className="px-2 py-1 bg-[#5865F2]/20 text-[#8B9DFF] text-xs rounded">Distributed Operating Systems</span>
                    <span className="px-2 py-1 bg-[#5865F2]/20 text-[#8B9DFF] text-xs rounded">Internet Storage Systems</span>
                    <span className="px-2 py-1 bg-[#5865F2]/20 text-[#8B9DFF] text-xs rounded">Software Engineering</span>
                    <span className="px-2 py-1 bg-[#5865F2]/20 text-[#8B9DFF] text-xs rounded">Distributed Multimedia Systems</span>
                    <span className="px-2 py-1 bg-[#5865F2]/20 text-[#8B9DFF] text-xs rounded">Bioinformatics</span>
                    <span className="px-2 py-1 bg-[#5865F2]/20 text-[#8B9DFF] text-xs rounded">Natural Language Processing</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#2B2D31] rounded p-4">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-3 gap-2">
                  <div>
                    <div className="font-semibold text-[#F2F3F5] text-lg">B.Tech in Information Technology</div>
                    <div className="flex items-center gap-2 text-sm text-[#B5BAC1]">
                      <GraduationCap className="w-4 h-4" />
                      <span>Vignan University</span>
                    </div>
                  </div>
                  <div className="sm:text-right text-sm text-[#B5BAC1]">
                    <div>Aug 2020 – May 2024</div>
                    <div className="text-[#23A559] font-semibold">GPA: 3.43</div>
                  </div>
                </div>
                <div className="text-sm text-[#B5BAC1] space-y-2">
                  <div>
                    <span className="font-medium text-[#F2F3F5]">Relevant Coursework:</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    <span className="px-2 py-1 bg-[#23A559]/20 text-[#57F287] text-xs rounded">Data Structures and Algorithms</span>
                    <span className="px-2 py-1 bg-[#23A559]/20 text-[#57F287] text-xs rounded">Java</span>
                    <span className="px-2 py-1 bg-[#23A559]/20 text-[#57F287] text-xs rounded">Python</span>
                    <span className="px-2 py-1 bg-[#23A559]/20 text-[#57F287] text-xs rounded">Web Applications</span>
                    <span className="px-2 py-1 bg-[#23A559]/20 text-[#57F287] text-xs rounded">DBMS</span>
                    <span className="px-2 py-1 bg-[#23A559]/20 text-[#57F287] text-xs rounded">Computer Architecture</span>
                    <span className="px-2 py-1 bg-[#23A559]/20 text-[#57F287] text-xs rounded">IoT</span>
                    <span className="px-2 py-1 bg-[#23A559]/20 text-[#57F287] text-xs rounded">Network Security</span>
                    <span className="px-2 py-1 bg-[#23A559]/20 text-[#57F287] text-xs rounded">Operating Systems</span>
                  </div>
                </div>
              </div>
            </div>
          ),
        },
      ];

    case "contact":
      return [
        {
          id: "c1",
          author: vishnu,
          timestamp: new Date(Date.now() - 432000000),
          content: (
            <div>
              <span className="text-[#F2F3F5] font-bold text-lg">💬 Let&apos;s Connect!</span>
              <br /><br />
              Thanks for exploring my portfolio server! I&apos;m always open to new opportunities and interesting conversations.
            </div>
          ),
        },
        {
          id: "c2",
          author: vishnu,
          timestamp: new Date(Date.now() - 431900000),
          content: (
            <div>
              <span className="font-semibold text-[#F2F3F5]">I&apos;m currently looking for:</span>
              <div className="bg-[#2B2D31] rounded p-3 mt-2 space-y-1 text-sm text-[#B5BAC1]">
                <p>• Full-time SDE and Full-Stack opportunities</p>
                <p>• Collaborative projects and open-source contributions</p>
                <p>• Interesting technical challenges</p>
              </div>
            </div>
          ),
        },
        {
          id: "c3",
          author: vishnu,
          timestamp: new Date(Date.now() - 431800000),
          content: (
            <div className="flex flex-wrap gap-2">
              <a
                href="mailto:vishnuvivek.valeti@gmail.com"
                className="inline-flex items-center gap-2 bg-[#5865F2] hover:bg-[#4752C4] text-white px-4 py-2.5 rounded-md transition-colors font-medium"
              >
                📧 Email Me
              </a>
              <a
                href="https://linkedin.com/in/valetivishnuvivek"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#0A66C2] hover:bg-[#084D92] text-white px-4 py-2.5 rounded-md transition-colors font-medium"
              >
                💼 LinkedIn
              </a>
              <a
                href="https://github.com/valetivivek"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#24292E] hover:bg-[#1B1F23] text-white px-4 py-2.5 rounded-md transition-colors font-medium"
              >
                <Github className="w-4 h-4" /> GitHub
              </a>
              <a
                href="/resume/resume.pdf"
                download
                className="inline-flex items-center gap-2 bg-[#23A559] hover:bg-[#1A8045] text-white px-4 py-2.5 rounded-md transition-colors font-medium"
              >
                <Download className="w-4 h-4" /> Resume
              </a>
            </div>
          ),
        },
        {
          id: "c4",
          author: bot,
          timestamp: new Date(Date.now() - 431700000),
          content: (
            <div className="bg-[#2B2D31] rounded p-3 text-sm">
              <span className="text-[#F2F3F5] font-medium">📞 Direct Contact:</span>
              <div className="text-[#B5BAC1] mt-1">
                <p>Phone: <a href="tel:+13522267455" className="text-[#00A8FC] hover:underline">+1 (352) 226-7455</a></p>
                <p>Email: <a href="mailto:vishnuvivek.valeti@gmail.com" className="text-[#00A8FC] hover:underline">vishnuvivek.valeti@gmail.com</a></p>
              </div>
            </div>
          ),
        },
      ];

    default:
      return [
        {
          id: "default",
          author: bot,
          timestamp: new Date(),
          content: "This channel is under construction! Check back soon. 🚧",
        },
      ];
  }
}
