"use client";

import React from "react";
import { motion } from "framer-motion";
import { Hash } from "lucide-react";

export default function ServerList() {
  return (
    <div className="w-[72px] bg-[#1E1F22] flex flex-col items-center py-3 gap-2 fixed left-0 top-0 bottom-0 z-50">
      {/* Home/DMs button */}
      <button className="w-12 h-12 rounded-full bg-[#5865F2] flex items-center justify-center text-white hover:rounded-2xl transition-all duration-200 hover:bg-[#4752C4] group relative">
        <Hash className="h-6 w-6" />
        <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-0 bg-white rounded-r-full group-hover:h-8 transition-all duration-200" />
      </button>

      <div className="w-8 h-0.5 bg-[#35373C] rounded-full" />

      {/* Server icon */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-12 h-12 rounded-full bg-[#5865F2] flex items-center justify-center text-white font-semibold text-lg hover:rounded-2xl transition-all duration-200 hover:bg-[#4752C4] group relative"
        aria-label="Vishnu's Portfolio Server"
      >
        <span>VV</span>
        <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity" />
      </motion.button>

      {/* Add server button */}
      <button className="w-12 h-12 rounded-full bg-[#2B2D31] hover:bg-[#23A559] text-[#23A559] hover:text-white flex items-center justify-center hover:rounded-2xl transition-all duration-200 group">
        <span className="text-2xl font-light group-hover:rotate-90 transition-transform duration-200">+</span>
      </button>

      {/* Explore servers */}
      <button className="w-12 h-12 rounded-full bg-[#2B2D31] hover:bg-[#5865F2] text-[#23A559] hover:text-white flex items-center justify-center hover:rounded-2xl transition-all duration-200">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 10.9c-.61 0-1.1.49-1.1 1.1s.49 1.1 1.1 1.1c.61 0 1.1-.49 1.1-1.1s-.49-1.1-1.1-1.1zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm2.19 12.19L6 18l3.81-8.19L18 6l-3.81 8.19z" />
        </svg>
      </button>
    </div>
  );
}
