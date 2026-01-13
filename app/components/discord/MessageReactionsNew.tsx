"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";

type Reaction = {
  emoji: string;
  count: number;
  me: boolean;
};

type Props = {
  reactions: Reaction[];
};

export default function MessageReactionsNew({ reactions }: Props) {
  const [localReactions, setLocalReactions] = useState(reactions);

  const toggleReaction = (index: number) => {
    setLocalReactions((prev) =>
      prev.map((r, i) =>
        i === index
          ? { ...r, me: !r.me, count: r.me ? r.count - 1 : r.count + 1 }
          : r
      )
    );
  };

  if (localReactions.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1 mt-1">
      {localReactions.map((reaction, i) => (
        <motion.button
          key={i}
          whileTap={{ scale: 0.95 }}
          onClick={() => toggleReaction(i)}
          className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-sm transition-colors ${
            reaction.me
              ? "bg-[#5865F2]/30 border border-[#5865F2] text-[#DEE0FC]"
              : "bg-[#2B2D31] border border-[#3F4147] text-[#B5BAC1] hover:border-[#5865F2]"
          }`}
        >
          <span>{reaction.emoji}</span>
          <span className={reaction.me ? "text-[#C9CDFB]" : "text-[#B5BAC1]"}>{reaction.count}</span>
        </motion.button>
      ))}
      <motion.button
        whileTap={{ scale: 0.95 }}
        className="flex items-center justify-center w-6 h-6 rounded-full bg-[#2B2D31] border border-[#3F4147] text-[#B5BAC1] hover:border-[#5865F2] hover:text-[#DBDEE1] transition-colors"
      >
        <Plus className="w-4 h-4" />
      </motion.button>
    </div>
  );
}
