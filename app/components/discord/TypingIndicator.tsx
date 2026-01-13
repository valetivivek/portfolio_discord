"use client";

import React from "react";
import { motion } from "framer-motion";

type TypingIndicatorProps = {
  users: string[];
};

export default function TypingIndicator({ users }: TypingIndicatorProps) {
  if (users.length === 0) return null;

  const text = users.length === 1 
    ? `${users[0]} is typing...`
    : `${users.length} people are typing...`;

  return (
    <div className="px-4 py-2 text-xs text-[#72767D] italic">
      <div className="flex items-center gap-1">
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1 h-1 bg-[#72767D] rounded-full"
              animate={{
                y: [0, -4, 0],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
        <span>{text}</span>
      </div>
    </div>
  );
}
