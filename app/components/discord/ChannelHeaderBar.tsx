"use client";

import React from "react";
import { useDiscord } from "./DiscordApp";
import { ChannelData } from "./data";
import { Hash, Volume2, Megaphone, BookOpen, Bell, BellOff, Pin, Users, Search, Inbox, HelpCircle } from "lucide-react";

type Props = {
  channel: ChannelData;
};

export default function ChannelHeaderBar({ channel }: Props) {
  const { showMemberList, setShowMemberList } = useDiscord();
  const [muted, setMuted] = React.useState(false);

  const getChannelIcon = () => {
    switch (channel.type) {
      case "voice": return <Volume2 className="w-6 h-6 text-[#80848E]" />;
      case "announcement": return <Megaphone className="w-6 h-6 text-[#80848E]" />;
      case "rules": return <BookOpen className="w-6 h-6 text-[#80848E]" />;
      default: return <Hash className="w-6 h-6 text-[#80848E]" />;
    }
  };

  return (
    <div className="h-12 bg-[#313338] border-b border-[#1F2023] px-4 flex items-center justify-between flex-shrink-0 shadow-sm">
      {/* Left side */}
      <div className="flex items-center gap-2 min-w-0 pl-10 md:pl-0">
        {getChannelIcon()}
        <h1 className="text-[#F2F3F5] font-semibold text-base">{channel.name}</h1>
        {channel.description && (
          <>
            <div className="w-px h-6 bg-[#3F4147] mx-2 hidden md:block" />
            <span className="text-sm text-[#949BA4] truncate hidden md:block">{channel.description}</span>
          </>
        )}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-1 ml-2 flex-shrink-0">
        {/* Threads */}
        <button className="p-2 rounded hover:bg-[#3A3C41] text-[#B5BAC1] hover:text-[#DBDEE1] transition-colors hidden md:block" title="Threads">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M5.43 21a1.5 1.5 0 0 1-1.5-1.5v-15A1.5 1.5 0 0 1 5.43 3h13.14a1.5 1.5 0 0 1 1.5 1.5v15a1.5 1.5 0 0 1-1.5 1.5H5.43Zm1.07-13.5a.5.5 0 0 0 0 1h11a.5.5 0 0 0 0-1h-11Zm0 3a.5.5 0 0 0 0 1h11a.5.5 0 0 0 0-1h-11Zm0 3a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7Z" />
          </svg>
        </button>

        {/* Notifications */}
        <button
          onClick={() => setMuted(!muted)}
          className="p-2 rounded hover:bg-[#3A3C41] text-[#B5BAC1] hover:text-[#DBDEE1] transition-colors hidden md:block"
          title={muted ? "Unmute" : "Mute"}
        >
          {muted ? <BellOff className="w-6 h-6" /> : <Bell className="w-6 h-6" />}
        </button>

        {/* Pinned messages */}
        <button className="p-2 rounded hover:bg-[#3A3C41] text-[#B5BAC1] hover:text-[#DBDEE1] transition-colors hidden md:block" title="Pinned Messages">
          <Pin className="w-6 h-6" />
        </button>

        {/* Member list toggle */}
        <button
          onClick={() => setShowMemberList(!showMemberList)}
          className={`p-2 rounded hover:bg-[#3A3C41] transition-colors hidden lg:block ${showMemberList ? "text-[#DBDEE1] bg-[#3A3C41]" : "text-[#B5BAC1] hover:text-[#DBDEE1]"}`}
          title="Member List"
        >
          <Users className="w-6 h-6" />
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-[#3F4147] mx-1 hidden md:block" />

        {/* Search */}
        <div className="relative hidden md:block">
          <input
            type="text"
            placeholder="Search"
            className="w-36 h-6 bg-[#1E1F22] rounded px-1.5 text-sm text-[#DBDEE1] placeholder-[#949BA4] outline-none focus:w-56 transition-all"
          />
        </div>

        {/* Inbox */}
        <button className="p-2 rounded hover:bg-[#3A3C41] text-[#B5BAC1] hover:text-[#DBDEE1] transition-colors hidden md:block" title="Inbox">
          <Inbox className="w-6 h-6" />
        </button>

        {/* Help */}
        <button className="p-2 rounded hover:bg-[#3A3C41] text-[#B5BAC1] hover:text-[#DBDEE1] transition-colors" title="Help">
          <HelpCircle className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
