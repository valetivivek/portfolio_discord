"use client";

import React, { useState } from "react";
import { MessageData } from "./data";
import { MoreHorizontal, Smile, Reply, Link as LinkIcon } from "lucide-react";

type Props = {
  message: MessageData;
  isGrouped?: boolean;
  onAvatarClick?: () => void;
};

export default function Message({ message, isGrouped = false, onAvatarClick }: Props) {
  const [showActions, setShowActions] = useState(false);

  const timeString = message.timestamp.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const getRoleColor = () => {
    if (message.author.isOwner) return "#FFD700";
    if (message.author.isBot) return "#5865F2";
    if (message.author.roles.includes("Full-Stack Dev")) return "#5865F2";
    return "#B5BAC1";
  };

  // System message
  if (message.author.id === "system") {
    return (
      <div className="flex items-center gap-2 py-1 text-[#949BA4] text-sm">
        <span className="flex-shrink-0">→</span>
        <span>{message.content}</span>
        <span className="text-[11px] text-[#72767D]">{timeString}</span>
      </div>
    );
  }

  // Grouped message (same author, close time) - no timestamp displayed
  if (isGrouped) {
    return (
      <div
        className="pl-[56px] py-0.5 hover:bg-[#2E3035] group relative"
        onMouseEnter={() => setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
      >
        <div className="flex items-start">
          <div className="flex-1 min-w-0">
            <div className="text-[#DCDDDE] text-[15px] leading-relaxed break-words">
              {message.content}
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <MessageActions show={showActions} />
      </div>
    );
  }

  // Full message
  return (
    <div
      className="flex gap-4 py-1.5 mt-3 hover:bg-[#2E3035] group relative px-0"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {/* Avatar */}
      <div
        className="w-10 h-10 rounded-full flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
        onClick={onAvatarClick}
      >
        {message.author.avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={message.author.avatar}
            alt={message.author.name}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm"
            style={{ backgroundColor: message.author.isBot ? "#5865F2" : "#5865F2" }}
          >
            {message.author.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 mb-0.5 flex-wrap">
          <span
            className="font-medium hover:underline cursor-pointer"
            style={{ color: getRoleColor() }}
            onClick={onAvatarClick}
          >
            {message.author.name}
          </span>
          {message.author.isBot && (
            <span className="px-1 py-0.5 text-[10px] font-semibold bg-[#5865F2] text-white rounded">
              BOT
            </span>
          )}
          {message.author.isOwner && (
            <span className="px-1 py-0.5 text-[10px] font-semibold bg-[#F0B232] text-black rounded">
              OWNER
            </span>
          )}
          <span className="text-[11px] text-[#949BA4]">
            Today at {timeString}
          </span>
          {message.edited && (
            <span className="text-[10px] text-[#949BA4]">(edited)</span>
          )}
        </div>

        <div className="text-[#DCDDDE] text-[15px] leading-relaxed break-words">
          {message.content}
        </div>
      </div>

      {/* Action buttons */}
      <MessageActions show={showActions} />
    </div>
  );
}

function MessageActions({ show }: { show: boolean }) {
  if (!show) return null;

  return (
    <div className="absolute -top-4 right-4 bg-[#313338] border border-[#1E1F22] rounded shadow-lg flex items-center">
      <button
        onClick={() => alert("Reactions coming soon! 👍")}
        className="p-1.5 hover:bg-[#3A3C41] text-[#B5BAC1] hover:text-[#DBDEE1] transition-colors"
        title="Add Reaction"
      >
        <Smile className="w-5 h-5" />
      </button>
      <button
        onClick={() => alert("This is a static portfolio, but feel free to email me! 📧")}
        className="p-1.5 hover:bg-[#3A3C41] text-[#B5BAC1] hover:text-[#DBDEE1] transition-colors"
        title="Reply"
      >
        <Reply className="w-5 h-5" />
      </button>
      <button
        onClick={() => alert("Threads are not enabled here! 🧵")}
        className="p-1.5 hover:bg-[#3A3C41] text-[#B5BAC1] hover:text-[#DBDEE1] transition-colors"
        title="Create Thread"
      >
        <LinkIcon className="w-5 h-5" />
      </button>
      <button
        onClick={() => alert("More options... eventually! ⚙️")}
        className="p-1.5 hover:bg-[#3A3C41] text-[#B5BAC1] hover:text-[#DBDEE1] transition-colors"
        title="More"
      >
        <MoreHorizontal className="w-5 h-5" />
      </button>
    </div>
  );
}
