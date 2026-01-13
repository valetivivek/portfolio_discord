"use client";

import React, { useRef, useEffect } from "react";
import { useDiscord } from "../../context/DiscordContext";
import { CHANNELS } from "./data";
import ChannelHeaderBar from "./ChannelHeaderBar";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { Hash, Volume2, Megaphone, BookOpen } from "lucide-react";

export default function ChatArea() {
  const { activeChannel } = useDiscord();
  const channel = CHANNELS.find((c) => c.id === activeChannel);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom on channel change
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [activeChannel]);

  const getChannelIcon = () => {
    switch (channel?.type) {
      case "voice": return <Volume2 className="w-6 h-6 text-[#80848E]" />;
      case "announcement": return <Megaphone className="w-6 h-6 text-[#80848E]" />;
      case "rules": return <BookOpen className="w-6 h-6 text-[#80848E]" />;
      default: return <Hash className="w-6 h-6 text-[#80848E]" />;
    }
  };

  if (!channel) return null;

  return (
    <div className="flex-1 flex flex-col bg-[#313338] min-w-0 h-screen max-h-screen">
      {/* Header - fixed at top */}
      <div className="flex-shrink-0">
        <ChannelHeaderBar channel={channel} />
      </div>

      {/* Messages area - scrollable with visible scrollbar */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-scroll overflow-x-hidden min-h-0"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#1a1b1e #2b2d31'
        }}
      >
        {/* Channel welcome */}
        <div className="px-4 pt-6 pb-4">
          <div className="w-[68px] h-[68px] rounded-full bg-[#41434A] flex items-center justify-center mb-2">
            {getChannelIcon()}
          </div>
          <h1 className="text-[32px] font-bold text-[#F2F3F5] mb-2">
            Welcome to #{channel.name}!
          </h1>
          <p className="text-[#B5BAC1]">
            {channel.description || `This is the start of the #${channel.name} channel.`}
          </p>
        </div>

        {/* Divider with date */}
        <div className="flex items-center gap-2 px-4 mb-4">
          <div className="flex-1 h-px bg-[#3F4147]" />
          <span className="text-[11px] font-semibold text-[#B5BAC1]">January 12, 2026</span>
          <div className="flex-1 h-px bg-[#3F4147]" />
        </div>

        {/* Messages */}
        <MessageList channelId={activeChannel} />

        {/* Bottom padding for scroll */}
        <div className="h-4" />
      </div>

      {/* Input area - fixed at bottom */}
      <div className="flex-shrink-0 border-t border-[#3F4147]">
        <MessageInput channel={channel} />
      </div>
    </div>
  );
}
