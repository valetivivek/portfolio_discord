"use client";

import React, { useRef, useEffect } from "react";
import { useDiscord } from "../../context/DiscordContext";
import { CHANNELS } from "./data";
import ChannelHeaderBar from "./ChannelHeaderBar";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import ChannelWelcome from "./ChannelWelcome";
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

  useEffect(() => {
    if (channel) {
      document.title = `Vishnu | #${channel.name}`;
    }
  }, [channel]);

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
        <ChannelWelcome channel={channel} />

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
