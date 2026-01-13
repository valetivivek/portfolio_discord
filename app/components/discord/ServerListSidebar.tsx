"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export default function ServerListSidebar() {
  const [hoveredServer, setHoveredServer] = useState<string | null>(null);

  return (
    <div className="w-[72px] bg-[#1E1F22] flex flex-col items-center py-3 gap-2 flex-shrink-0 hidden md:flex">
      <div className="relative group">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onMouseEnter={() => setHoveredServer("home")}
          onMouseLeave={() => setHoveredServer(null)}
          className="relative w-12 h-12 rounded-[24px] hover:rounded-[16px] bg-[#313338] hover:bg-[#5865F2] transition-all duration-200 flex items-center justify-center"
        >
          <svg className="w-7 h-7 text-[#DBDEE1] group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.73 4.87a18.2 18.2 0 0 0-4.6-1.44c-.21.4-.4.8-.58 1.21-1.69-.26-3.4-.26-5.1 0-.18-.41-.37-.82-.59-1.2-1.6.27-3.14.75-4.6 1.43A19.04 19.04 0 0 0 .96 17.7a18.43 18.43 0 0 0 5.63 2.87c.46-.62.86-1.28 1.2-1.98-.65-.25-1.29-.55-1.9-.92.17-.12.33-.24.48-.37 3.68 1.76 7.73 1.76 11.41 0 .16.13.32.25.49.37-.62.36-1.25.67-1.9.92.35.7.75 1.36 1.2 1.98 1.94-.58 3.86-1.53 5.64-2.87.44-4.65-.73-9.1-3.49-12.83ZM8.3 15.12c-1.1 0-2-1.02-2-2.27 0-1.24.88-2.26 2-2.26s2.02 1.02 2 2.26c0 1.25-.89 2.27-2 2.27Zm7.4 0c-1.1 0-2-1.02-2-2.27 0-1.24.88-2.26 2-2.26s2.02 1.02 2 2.26c0 1.25-.88 2.27-2 2.27Z" />
          </svg>
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 group-hover:h-5 bg-white rounded-r-full transition-all duration-200" />
        </motion.button>

        {hoveredServer === "home" && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute left-full ml-4 top-1/2 -translate-y-1/2 bg-[#111214] text-white px-3 py-2 rounded-md text-sm font-semibold whitespace-nowrap z-50 shadow-xl"
          >
            Direct Messages
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-[#111214] rotate-45" />
          </motion.div>
        )}
      </div>

      {/* Separator */}
      <div className="w-8 h-[2px] bg-[#35363C] rounded-full my-0.5" />

      {/* Main server - Portfolio */}
      <div className="relative group">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onMouseEnter={() => setHoveredServer("portfolio")}
          onMouseLeave={() => setHoveredServer(null)}
          className="relative w-12 h-12 rounded-[16px] bg-[#5865F2] transition-all duration-200 flex items-center justify-center text-white font-bold text-lg"
        >
          VV
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-10 bg-white rounded-r-full" />
        </motion.button>

        {/* Notification badge */}
        <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-[#ED4245] rounded-full flex items-center justify-center text-white text-[10px] font-bold border-4 border-[#1E1F22]">
          3
        </div>

        {/* Tooltip */}
        {hoveredServer === "portfolio" && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute left-full ml-4 top-1/2 -translate-y-1/2 bg-[#111214] text-white px-3 py-2 rounded-md text-sm font-semibold whitespace-nowrap z-50 shadow-xl"
          >
            Vishnu&apos;s Portfolio
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-[#111214] rotate-45" />
          </motion.div>
        )}
      </div>

      {/* Add Server button - Opens LinkedIn */}
      <div className="relative group">
        <motion.button
          whileHover={{ scale: 1.1, backgroundColor: "#23A559" }}
          whileTap={{ scale: 0.95 }}
          onMouseEnter={() => setHoveredServer("add")}
          onMouseLeave={() => setHoveredServer(null)}
          onClick={() => window.open("https://linkedin.com/in/valetivishnuvivek", "_blank")}
          className="w-12 h-12 rounded-[24px] hover:rounded-[16px] bg-[#313338] transition-all duration-200 flex items-center justify-center text-[#23A559] hover:text-white"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </motion.button>

        {hoveredServer === "add" && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute left-full ml-4 top-1/2 -translate-y-1/2 bg-[#111214] px-3 py-2 rounded-md text-sm whitespace-nowrap z-50 shadow-xl max-w-[200px]"
          >
            <div className="font-semibold text-white">Connect on LinkedIn 💼</div>
            <div className="text-[#B5BAC1] text-xs mt-1">Click to open my profile</div>
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-[#111214] rotate-45" />
          </motion.div>
        )}
      </div>

      {/* Explore button - Opens GitHub */}
      <div className="relative group">
        <motion.button
          whileHover={{ scale: 1.1, backgroundColor: "#23A559" }}
          whileTap={{ scale: 0.95 }}
          onMouseEnter={() => setHoveredServer("explore")}
          onMouseLeave={() => setHoveredServer(null)}
          onClick={() => window.open("https://github.com/valetivivek", "_blank")}
          className="w-12 h-12 rounded-[24px] hover:rounded-[16px] bg-[#313338] transition-all duration-200 flex items-center justify-center text-[#23A559] hover:text-white"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 10.9c-.61 0-1.1.49-1.1 1.1s.49 1.1 1.1 1.1c.61 0 1.1-.49 1.1-1.1s-.49-1.1-1.1-1.1zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm2.19 12.19L6 18l3.81-8.19L18 6l-3.81 8.19z" />
          </svg>
        </motion.button>

        {hoveredServer === "explore" && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute left-full ml-4 top-1/2 -translate-y-1/2 bg-[#111214] px-3 py-2 rounded-md text-sm whitespace-nowrap z-50 shadow-xl max-w-[200px]"
          >
            <div className="font-semibold text-white">Explore GitHub 🚀</div>
            <div className="text-[#B5BAC1] text-xs mt-1">Click to view my repos</div>
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-[#111214] rotate-45" />
          </motion.div>
        )}
      </div>
    </div>
  );
}
