"use client";

import React from "react";
import { Hash, Users, Megaphone, Code, Briefcase, Mail, GraduationCap, Sparkles, Lock } from "lucide-react";

export type Channel = {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  category?: string;
  unread?: boolean;
  locked?: boolean;
};

const channels: Channel[] = [
  { id: "welcome", name: "welcome", icon: Sparkles, href: "/#welcome", category: "📌 ONBOARDING", unread: false },
  { id: "rules", name: "rules", icon: Users, href: "/#rules", category: "📌 ONBOARDING", unread: false },
  { id: "announcements", name: "announcements", icon: Megaphone, href: "/#announcements", category: "💼 EXPERIENCE", unread: false },
  { id: "roles", name: "roles", icon: Code, href: "/#roles", category: "⚡ SKILLS", unread: false },
  { id: "channels", name: "projects", icon: Briefcase, href: "/#channels", category: "💼 EXPERIENCE", unread: false },
  { id: "education", name: "education", icon: GraduationCap, href: "/#education", category: "📚 LEARNING", unread: false },
  { id: "invite", name: "get-in-touch", icon: Mail, href: "/#invite", category: "💬 CONNECT", unread: false },
];

export default function ChannelList() {
  const [activeHash, setActiveHash] = React.useState("");

  React.useEffect(() => {
    const updateHash = () => {
      setActiveHash(window.location.hash.slice(1));
    };
    updateHash();
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, []);

  const groupedChannels = channels.reduce((acc, channel) => {
    const cat = channel.category || "OTHER";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(channel);
    return acc;
  }, {} as Record<string, Channel[]>);

  return (
    <aside className="hidden lg:flex flex-col w-60 bg-[#2B2D31] text-[#B5BAC1] overflow-y-auto fixed left-[72px] top-0 bottom-0 z-40">
      {/* Server header */}
      <div className="h-12 px-4 flex items-center border-b border-[#1E1F22] shadow-sm">
        <h2 className="text-[#F2F3F5] font-semibold text-base truncate">Vishnu&apos;s Portfolio</h2>
      </div>
      
      {/* Channel list */}
      <nav className="flex-1 px-2 py-2 overflow-y-auto">
        {Object.entries(groupedChannels).map(([category, categoryChannels]) => (
          <div key={category} className="mb-2">
            <div className="px-2 mb-1.5">
              <span className="text-[11px] font-semibold text-[#8E9297] uppercase tracking-wider hover:text-[#DCDDDE] cursor-default">
                {category}
              </span>
            </div>
            {categoryChannels.map((channel) => {
              const Icon = channel.icon;
              const isActive = activeHash === channel.id;
              
              return (
                <button
                  key={channel.id}
                  onClick={() => {
                    const element = document.getElementById(channel.id);
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth", block: "start" });
                      window.history.pushState(null, "", `#${channel.id}`);
                      setActiveHash(channel.id);
                    }
                  }}
                  className={`group w-full flex items-center gap-1.5 px-2 py-1 rounded text-sm transition-colors relative ${
                    isActive
                      ? "bg-[#404249] text-[#FFFFFF]"
                      : "hover:bg-[#35373C] hover:text-[#DCDDDE] text-[#8E9297]"
                  }`}
                >
                  {channel.locked ? (
                    <Lock className="h-4 w-4 flex-shrink-0" />
                  ) : (
                    <Hash className="h-4 w-4 flex-shrink-0" />
                  )}
                  <span className="truncate flex-1 text-left">{channel.name}</span>
                  {channel.unread && (
                    <div className="w-2 h-2 rounded-full bg-[#F2F3F5] flex-shrink-0" />
                  )}
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-[#FFFFFF] rounded-r-full" />
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* User panel */}
      <div className="h-[52px] px-2 py-2 bg-[#232428] border-t border-[#1E1F22]">
        <div className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-[#2F3136] transition-colors group">
          <div className="relative">
            <div className="h-8 w-8 rounded-full bg-[#5865F2] flex items-center justify-center text-white font-semibold text-sm">
              VV
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#2B2D31] rounded-full flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-[#23A559]" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-[#F2F3F5] truncate">Vishnu Vivek</p>
            <p className="text-xs text-[#B9BBBE] truncate">#0001</p>
          </div>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="p-1.5 rounded hover:bg-[#40444B] text-[#B9BBBE] hover:text-[#F2F3F5] transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z" />
              </svg>
            </button>
            <button className="p-1.5 rounded hover:bg-[#40444B] text-[#B9BBBE] hover:text-[#F2F3F5] transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
