"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Reaction = {
  emoji: string;
  count: number;
  me?: boolean;
};

type ReactionsProps = {
  reactions: Reaction[];
  onReact?: (emoji: string) => void;
};

export default function Reactions({ reactions, onReact }: ReactionsProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  if (reactions.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1 mt-1 mb-1">
      {reactions.map((reaction, i) => (
        <motion.button
          key={i}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onMouseEnter={() => setHovered(reaction.emoji)}
          onMouseLeave={() => setHovered(null)}
          onClick={() => onReact?.(reaction.emoji)}
          className={`flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium transition-colors ${
            reaction.me
              ? "bg-[#5865F2] text-white border border-[#5865F2]"
              : "bg-[#2F3136] text-[#DCDDDE] border border-[#40444B] hover:bg-[#40444B] hover:border-[#4E5058]"
          }`}
        >
          <span>{reaction.emoji}</span>
          <span>{reaction.count}</span>
          <AnimatePresence>
            {hovered === reaction.emoji && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#18191C] text-[#DCDDDE] text-xs px-2 py-1 rounded whitespace-nowrap pointer-events-none z-10"
              >
                {reaction.me ? "Remove reaction" : "Add reaction"}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      ))}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center justify-center w-6 h-6 rounded text-[#72767D] hover:text-[#DCDDDE] hover:bg-[#40444B] transition-colors"
        aria-label="Add reaction"
      >
        <span className="text-xs">+</span>
      </motion.button>
    </div>
  );
}
