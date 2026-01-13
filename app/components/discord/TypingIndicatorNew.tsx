"use client";

import React from "react";
import { motion } from "framer-motion";

type Props = {
  users: string[];
};

export default function TypingIndicatorNew({ users }: Props) {
  if (users.length === 0) return null;

  return (
    <div className="h-6 px-4 flex items-center gap-1.5 text-[11px] text-[#949BA4]">
      <div className="flex gap-0.5">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 bg-[#F2F3F5] rounded-full"
            animate={{
              y: [0, -3, 0],
            }}
            transition={{
              duration: 0.4,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      <span><span className="font-semibold text-[#F2F3F5]">{users.join(", ")}</span> {users.length === 1 ? "is" : "are"} typing...</span>
    </div>
  );
}
