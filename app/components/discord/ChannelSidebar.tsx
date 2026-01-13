"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDiscord } from "./DiscordApp";
import { CHANNELS } from "./data";
import { Hash, Volume2, Megaphone, BookOpen, Lock, ChevronDown, ChevronRight, Settings, UserPlus, Mic, Headphones, X, Menu } from "lucide-react";

const categoryOrder = ["START HERE", "EXPERIENCE", "PORTFOLIO", "BACKGROUND", "CONNECT", "VOICE"];

export default function ChannelSidebar() {
  const { activeChannel, setActiveChannel, setServerDropdownOpen } = useDiscord();
  const [collapsedCategories, setCollapsedCategories] = useState<Set<string>>(new Set());
  const [mobileOpen, setMobileOpen] = useState(false);

  const groupedChannels = CHANNELS.reduce((acc, ch) => {
    if (!acc[ch.category]) acc[ch.category] = [];
    acc[ch.category].push(ch);
    return acc;
  }, {} as Record<string, typeof CHANNELS>);

  const toggleCategory = (category: string) => {
    setCollapsedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(category)) next.delete(category);
      else next.add(category);
      return next;
    });
  };

  const getChannelIcon = (type: string, locked?: boolean) => {
    if (locked) return <Lock className="w-5 h-5 text-[#80848E]" />;
    switch (type) {
      case "voice": return <Volume2 className="w-5 h-5 text-[#80848E]" />;
      case "announcement": return <Megaphone className="w-5 h-5 text-[#80848E]" />;
      case "rules": return <BookOpen className="w-5 h-5 text-[#80848E]" />;
      case "forum": return <Hash className="w-5 h-5 text-[#80848E]" />;
      default: return <Hash className="w-5 h-5 text-[#80848E]" />;
    }
  };

  const ChannelListContent = () => (
    <>
      {/* Server header */}
      <button
        onClick={() => setServerDropdownOpen(true)}
        className="h-12 px-4 flex items-center justify-between border-b border-[#1F2023] shadow-sm hover:bg-[#35373C] transition-colors group flex-shrink-0"
      >
        <h1 className="text-[#F2F3F5] font-semibold text-[15px] truncate">Vishnu&apos;s Portfolio</h1>
        <ChevronDown className="w-4 h-4 text-[#B5BAC1] group-hover:text-[#DBDEE1] transition-colors" />
      </button>

      {/* Nitro boost banner */}
      <div className="px-4 py-2 bg-gradient-to-r from-[#FF73FA]/10 to-[#5865F2]/10 border-b border-[#1F2023] flex-shrink-0">
        <div className="flex items-center gap-2 text-xs">
          <svg className="w-4 h-4 text-[#FF73FA]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L1 21h22L12 2zm0 4.4L19.1 19H4.9L12 6.4z" />
          </svg>
          <span className="text-[#B5BAC1]">Server Boosted</span>
          <span className="text-[#80848E]">•</span>
          <span className="text-[#FF73FA]">Level 2</span>
        </div>
      </div>

      {/* Channels */}
      <nav className="flex-1 overflow-y-auto pt-4 px-2">
        {categoryOrder.map((category) => {
          const channels = groupedChannels[category];
          if (!channels) return null;
          const isCollapsed = collapsedCategories.has(category);

          return (
            <div key={category} className="mb-4">
              <button
                onClick={() => toggleCategory(category)}
                className="flex items-center gap-0.5 px-0.5 mb-1 text-[11px] font-semibold text-[#949BA4] uppercase tracking-wide hover:text-[#DBDEE1] transition-colors w-full text-left group"
              >
                {isCollapsed ? (
                  <ChevronRight className="w-3 h-3" />
                ) : (
                  <ChevronDown className="w-3 h-3" />
                )}
                <span>{category}</span>
              </button>

              {!isCollapsed && (
                <div className="overflow-hidden">
                  {channels.map((channel) => {
                    const isActive = activeChannel === channel.id;
                    return (
                      <button
                        key={channel.id}
                        onClick={() => {
                          setActiveChannel(channel.id);
                          setMobileOpen(false);
                        }}
                        className={`w-full flex items-center gap-1.5 px-2 py-1.5 rounded group/channel ${isActive
                          ? "bg-[#404249] text-[#F2F3F5]"
                          : "text-[#949BA4] hover:text-[#DBDEE1] hover:bg-[#35373C]"
                          }`}
                      >
                        {getChannelIcon(channel.type, channel.locked)}
                        <span className="text-[15px] truncate flex-1 text-left">{channel.name}</span>
                        {channel.unread && !isActive && (
                          <div className="w-2 h-2 rounded-full bg-white flex-shrink-0" />
                        )}
                        {/* Hover actions */}
                        <div className="hidden group-hover/channel:flex items-center gap-0.5 opacity-60 hover:opacity-100">
                          <button className="p-0.5 hover:text-[#DBDEE1]">
                            <UserPlus className="w-4 h-4" />
                          </button>
                          <button className="p-0.5 hover:text-[#DBDEE1]">
                            <Settings className="w-4 h-4" />
                          </button>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* User panel */}
      <div className="h-[52px] bg-[#232428] px-2 flex items-center gap-2 flex-shrink-0">
        <div className="relative cursor-pointer hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 rounded-full bg-[#5865F2] flex items-center justify-center text-white font-semibold text-xs">
            VV
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-[#232428] rounded-full flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-[#23A559]" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-semibold text-[#F2F3F5] truncate leading-tight">Vishnu Vivek</p>
          <p className="text-[11px] text-[#B5BAC1] truncate leading-tight">Online</p>
        </div>
        <div className="flex items-center gap-1">
          <button
            className="p-1.5 rounded hover:bg-[#3F4147] text-[#B5BAC1] hover:text-[#DBDEE1] transition-colors"
            aria-label="Mute (decorative)"
            title="It's just a portfolio! 🎤"
          >
            <Mic className="w-5 h-5" />
          </button>
          <button
            className="p-1.5 rounded hover:bg-[#3F4147] text-[#B5BAC1] hover:text-[#DBDEE1] transition-colors"
            aria-label="Deafen (decorative)"
            title="No voice chat here 🎧"
          >
            <Headphones className="w-5 h-5" />
          </button>
          <button
            className="p-1.5 rounded hover:bg-[#3F4147] text-[#B5BAC1] hover:text-[#DBDEE1] transition-colors"
            aria-label="User settings (decorative)"
            title="Just for show ⚙️"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div >
    </>
  );

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-3 left-3 z-50 p-2 rounded-lg bg-[#2B2D31] text-[#B5BAC1] hover:text-[#DBDEE1] transition-colors"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 bg-black/50 z-40"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="md:hidden fixed left-0 top-0 bottom-0 w-72 bg-[#2B2D31] z-50 flex flex-col"
            >
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute top-3 right-3 p-2 rounded-lg text-[#B5BAC1] hover:text-[#DBDEE1] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <ChannelListContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <div className="w-60 bg-[#2B2D31] flex-col flex-shrink-0 hidden md:flex">
        <ChannelListContent />
      </div>
    </>
  );
}
