"use client";

import React, { useState } from "react";
import { Menu, X, Sparkles, Users, Megaphone, Code, Briefcase, Mail, GraduationCap } from "lucide-react";
import Link from "next/link";

const channels = [
  { id: "welcome", name: "Welcome", icon: Sparkles, href: "/#welcome" },
  { id: "rules", name: "Rules", icon: Users, href: "/#rules" },
  { id: "announcements", name: "Announcements", icon: Megaphone, href: "/#announcements" },
  { id: "roles", name: "Roles", icon: Code, href: "/#roles" },
  { id: "channels", name: "Projects", icon: Briefcase, href: "/#channels" },
  { id: "bots", name: "Bots", icon: Code, href: "/#bots" },
  { id: "education", name: "Education", icon: GraduationCap, href: "/#education" },
  { id: "invite", name: "Contact", icon: Mail, href: "/#invite" },
];

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.pushState(null, "", `#${id}`);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[#2F3136] border border-[#40444B] rounded-lg text-[#F2F3F5] hover:bg-[#40444B] transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-[#2B2D31] border-r border-[#1E1F22] overflow-y-auto">
          <div className="p-4 border-b border-[#1E1F22]">
            <h2 className="text-[#F2F3F5] font-semibold text-lg">Vishnu&apos;s Server</h2>
            <p className="text-xs text-[#949BA4] mt-1">Welcome to my portfolio!</p>
          </div>
          
          <nav className="p-2 space-y-1">
            {channels.map((channel) => {
              const Icon = channel.icon;
              return (
                <button
                  key={channel.id}
                  onClick={() => handleLinkClick(channel.id)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded text-sm text-[#B5BAC1] hover:bg-[#35373C] hover:text-[#F2F3F5] transition-colors"
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  <span>{channel.name}</span>
                </button>
              );
            })}
          </nav>

          <div className="p-4 border-t border-[#1E1F22] bg-[#232428] mt-auto">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-[#5865F2] flex items-center justify-center text-white font-semibold">
                VV
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#F2F3F5] truncate">Vishnu Vivek</p>
                <p className="text-xs text-[#949BA4] truncate">Online</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
