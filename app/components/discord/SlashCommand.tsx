"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Hash, Search, ArrowRight, Download, FileText, Briefcase, Code, Mail, Command } from "lucide-react";
import { useDiscord } from "../../context/DiscordContext";

type Command = {
  name: string;
  description: string;
  icon: React.ReactNode;
  action: () => void;
};

import { useCommands } from "./useCommands";

export default function SlashCommand() {
  const { setActiveChannel } = useDiscord();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands = useCommands();

  const filteredCommands = commands.filter(cmd =>
    cmd.name.toLowerCase().includes(query.toLowerCase()) ||
    cmd.description.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Open command palette with / key
      if (e.key === "/" && !isOpen && document.activeElement?.tagName !== "INPUT" && document.activeElement?.tagName !== "TEXTAREA") {
        e.preventDefault();
        setIsOpen(true);
        setQuery("");
        setSelectedIndex(0);
      }

      if (isOpen) {
        if (e.key === "Escape") {
          setIsOpen(false);
          setQuery("");
        } else if (e.key === "ArrowDown") {
          e.preventDefault();
          setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
        } else if (e.key === "Enter" && filteredCommands[selectedIndex]) {
          e.preventDefault();
          filteredCommands[selectedIndex].action();
          setIsOpen(false);
          setQuery("");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, query, selectedIndex, filteredCommands, setActiveChannel]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => {
          setIsOpen(true);
          setQuery("");
          setSelectedIndex(0);
        }}
        className="fixed bottom-24 right-6 z-30 w-12 h-12 bg-[#5865F2] hover:bg-[#4752C4] rounded-full shadow-lg flex items-center justify-center text-white transition-all hover:scale-105 active:scale-95"
        title="Open commands (Press /)"
        aria-label="Open command palette"
      >
        <Command className="w-5 h-5" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              role="dialog"
              aria-modal="true"
              aria-label="Command palette"
              className="fixed top-20 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:w-[500px] lg:w-[640px] bg-[#2B2D31] border border-[#1E1F22] rounded-lg shadow-2xl z-50 overflow-hidden"
            >
              <div className="flex items-center gap-2 px-4 py-3 border-b border-[#1E1F22]">
                <Search className="h-5 w-5 text-[#72767D]" aria-hidden="true" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setSelectedIndex(0);
                  }}
                  placeholder="Type a command or search..."
                  className="flex-1 bg-transparent text-[#DCDDDE] placeholder-[#72767D] outline-none text-sm"
                  autoFocus
                  aria-label="Search commands"
                />
                <kbd className="px-2 py-1 bg-[#1E1F22] border border-[#3F4147] rounded text-xs text-[#72767D]">ESC</kbd>
              </div>

              <div className="max-h-96 overflow-y-auto">
                {filteredCommands.length === 0 ? (
                  <div className="px-4 py-8 text-center text-[#72767D] text-sm">
                    No commands found
                  </div>
                ) : (
                  <div className="py-2" role="listbox">
                    {filteredCommands.map((cmd, i) => (
                      <motion.button
                        key={cmd.name}
                        onClick={() => {
                          cmd.action();
                          setIsOpen(false);
                          setQuery("");
                        }}
                        onMouseEnter={() => setSelectedIndex(i)}
                        role="option"
                        aria-selected={i === selectedIndex}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${i === selectedIndex ? "bg-[#404249]" : "hover:bg-[#35373C]"
                          }`}
                      >
                        <div className="w-10 h-10 rounded-full bg-[#5865F2] flex items-center justify-center text-white flex-shrink-0">
                          {cmd.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-[#F2F3F5]">/{cmd.name}</div>
                          <div className="text-xs text-[#B5BAC1] truncate">{cmd.description}</div>
                        </div>
                        {i === selectedIndex && (
                          <ArrowRight className="h-4 w-4 text-[#72767D] flex-shrink-0" aria-hidden="true" />
                        )}
                      </motion.button>
                    ))}
                  </div>
                )}
              </div>

              {/* Hint */}
              <div className="px-4 py-2 border-t border-[#1E1F22] text-[11px] text-[#72767D] flex items-center gap-4">
                <span><kbd className="px-1 bg-[#1E1F22] rounded">↑↓</kbd> to navigate</span>
                <span><kbd className="px-1 bg-[#1E1F22] rounded">Enter</kbd> to select</span>
                <span><kbd className="px-1 bg-[#1E1F22] rounded">/</kbd> to open</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
