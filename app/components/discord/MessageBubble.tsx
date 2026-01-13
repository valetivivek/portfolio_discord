"use client";

import React from "react";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import Reactions from "./Reactions";

type MessageBubbleProps = {
  author: string;
  avatar?: string;
  timestamp?: Date;
  content: React.ReactNode;
  isSystem?: boolean;
  isBot?: boolean;
  roleColor?: string;
  badges?: string[];
  reactions?: Array<{ emoji: string; count: number; me?: boolean }>;
  edited?: boolean;
  className?: string;
  embed?: React.ReactNode;
};

export default function MessageBubble({
  author,
  avatar,
  timestamp = new Date(),
  content,
  isSystem = false,
  isBot = false,
  roleColor = "#5865F2",
  badges = [],
  reactions = [],
  edited = false,
  className = "",
  embed,
}: MessageBubbleProps) {
  const initials = author
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  if (isSystem) {
    return (
      <div className={`flex items-center gap-2 px-4 py-2 text-sm text-[#A3A6AA] ${className}`}>
        <div className="flex-1 border-t border-[#3F4147]"></div>
        <span className="px-2 text-xs font-medium">{content}</span>
        <div className="flex-1 border-t border-[#3F4147]"></div>
      </div>
    );
  }

  const timeString = timestamp.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`group flex gap-3 px-4 py-1 hover:bg-[#2F3136]/50 transition-colors ${className}`}
    >
      <div className="flex-shrink-0 w-10 h-10">
        {avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={avatar}
            alt={author}
            className="h-10 w-10 rounded-full object-cover cursor-pointer hover:ring-2 hover:ring-[#5865F2] transition-all"
          />
        ) : (
          <div
            className="h-10 w-10 rounded-full flex items-center justify-center text-white text-sm font-semibold cursor-pointer hover:ring-2 hover:ring-[#5865F2] transition-all"
            style={{ backgroundColor: roleColor }}
          >
            {initials}
          </div>
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 mb-0.5">
          <span
            className="font-semibold text-[#F2F3F5] text-sm cursor-pointer hover:underline"
            style={{ color: roleColor }}
          >
            {author}
          </span>
          {isBot && (
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-[#5865F2] text-white uppercase">
              BOT
            </span>
          )}
          {badges.map((badge, i) => (
            <span
              key={i}
              className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-[#5865F2] text-white"
              title={badge}
            >
              {badge}
            </span>
          ))}
          <span className="text-xs text-[#72767D] opacity-0 group-hover:opacity-100 transition-opacity">
            {timeString}
          </span>
          {edited && (
            <span className="text-xs text-[#72767D] italic">(edited)</span>
          )}
        </div>
        <div className="text-[#DCDDDE] text-sm leading-relaxed whitespace-pre-wrap break-words">
          {content}
        </div>
        {embed && <div className="mt-2">{embed}</div>}
        {reactions.length > 0 && (
          <Reactions reactions={reactions} />
        )}
      </div>
    </motion.div>
  );
}
