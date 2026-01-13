"use client";

import React from "react";
import { Hash, Bell, BellOff, Pin, Users, Search, Inbox, HelpCircle } from "lucide-react";

type ChannelHeaderProps = {
  name: string;
  icon?: React.ComponentType<{ className?: string }>;
  description?: string;
  memberCount?: number;
};

export default function ChannelHeader({ name, icon: Icon, description, memberCount }: ChannelHeaderProps) {
  const [muted, setMuted] = React.useState(false);

  return (
    <div className="h-12 bg-[#36393F] border-b border-[#202225] px-4 flex items-center justify-between shadow-sm sticky top-0 z-10">
      <div className="flex items-center gap-2 min-w-0 flex-1">
        {Icon ? (
          <Icon className="h-5 w-5 text-[#8E9297] flex-shrink-0" />
        ) : (
          <Hash className="h-5 w-5 text-[#8E9297] flex-shrink-0" />
        )}
        <h1 className="text-[#F2F3F5] font-semibold text-base truncate">{name}</h1>
        {description && (
          <>
            <div className="w-px h-6 bg-[#40444B] mx-2" />
            <span className="text-sm text-[#B9BBBE] truncate">{description}</span>
          </>
        )}
      </div>
      
      <div className="flex items-center gap-1 ml-2">
        {memberCount !== undefined && (
          <button className="p-1.5 rounded hover:bg-[#40444B] text-[#B9BBBE] hover:text-[#DCDDDE] transition-colors group relative">
            <Users className="h-5 w-5" />
            <div className="absolute -top-1 -right-1 bg-[#ED4245] text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              {memberCount}
            </div>
          </button>
        )}
        <button
          onClick={() => setMuted(!muted)}
          className="p-1.5 rounded hover:bg-[#40444B] text-[#B9BBBE] hover:text-[#DCDDDE] transition-colors"
          aria-label={muted ? "Unmute channel" : "Mute channel"}
        >
          {muted ? <BellOff className="h-5 w-5" /> : <Bell className="h-5 w-5" />}
        </button>
        <button className="p-1.5 rounded hover:bg-[#40444B] text-[#B9BBBE] hover:text-[#DCDDDE] transition-colors" aria-label="Pinned messages">
          <Pin className="h-5 w-5" />
        </button>
        <button className="p-1.5 rounded hover:bg-[#40444B] text-[#B9BBBE] hover:text-[#DCDDDE] transition-colors" aria-label="Add friends to DM">
          <Users className="h-5 w-5" />
        </button>
        <div className="w-px h-6 bg-[#40444B] mx-1" />
        <button className="p-1.5 rounded hover:bg-[#40444B] text-[#B9BBBE] hover:text-[#DCDDDE] transition-colors" aria-label="Inbox">
          <Inbox className="h-5 w-5" />
        </button>
        <button className="p-1.5 rounded hover:bg-[#40444B] text-[#B9BBBE] hover:text-[#DCDDDE] transition-colors" aria-label="Help">
          <HelpCircle className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
