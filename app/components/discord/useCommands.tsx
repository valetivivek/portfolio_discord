"use client";

import React from "react";
import { Hash, Code, Briefcase, FileText, Mail, Download } from "lucide-react";
import { useDiscord } from "./DiscordApp";

export type Command = {
    name: string;
    description: string;
    icon: React.ReactNode;
    action: () => void;
};

export function useCommands() {
    const { setActiveChannel } = useDiscord();

    const commands: Command[] = [
        {
            name: "welcome",
            description: "Jump to welcome channel",
            icon: <Hash className="w-4 h-4" />,
            action: () => {
                setActiveChannel("welcome");
                // Tiny timeout to let the channel render
                setTimeout(() => {
                    document.querySelector(".overflow-y-scroll")?.scrollTo({ top: 0, behavior: "smooth" });
                }, 100);
            }
        },
        {
            name: "projects",
            description: "View all projects",
            icon: <Code className="w-4 h-4" />,
            action: () => {
                setActiveChannel("projects");
                setTimeout(() => {
                    document.querySelector(".overflow-y-scroll")?.scrollTo({ top: 0, behavior: "smooth" });
                }, 100);
            }
        },
        {
            name: "experience",
            description: "View work experience",
            icon: <Briefcase className="w-4 h-4" />,
            action: () => {
                setActiveChannel("announcements");
                setTimeout(() => {
                    document.querySelector(".overflow-y-scroll")?.scrollTo({ top: 0, behavior: "smooth" });
                }, 100);
            }
        },
        {
            name: "skills",
            description: "View skills and roles",
            icon: <FileText className="w-4 h-4" />,
            action: () => {
                setActiveChannel("skills");
                setTimeout(() => {
                    document.querySelector(".overflow-y-scroll")?.scrollTo({ top: 0, behavior: "smooth" });
                }, 100);
            }
        },
        {
            name: "contact",
            description: "Get in touch",
            icon: <Mail className="w-4 h-4" />,
            action: () => {
                setActiveChannel("contact");
                setTimeout(() => {
                    document.querySelector(".overflow-y-scroll")?.scrollTo({ top: 0, behavior: "smooth" });
                }, 100);
            }
        },
        {
            name: "resume",
            description: "Download resume",
            icon: <Download className="w-4 h-4" />,
            action: () => window.open("/resume/resume.pdf", "_blank")
        },
    ];

    return commands;
}
