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
  const { setActiveChannel, slashCommandOpen, setSlashCommandOpen, slashCommandQuery, setSlashCommandQuery } = useDiscord();
  const [selectedIndex, setSelectedIndex] = useState(0);
  // We keep a local query for the input to avoid lag, but sync with context when opening
  const [localQuery, setLocalQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const commands = useCommands();

  // Sync global query to local query when opening
  useEffect(() => {
    if (slashCommandOpen) {
      setLocalQuery(slashCommandQuery);
    }
  }, [slashCommandOpen, slashCommandQuery]);

  const filteredCommands = commands.filter(cmd =>
    cmd.name.toLowerCase().includes(localQuery.toLowerCase()) ||
    cmd.description.toLowerCase().includes(localQuery.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Open command palette with Ctrl+F, Ctrl+K, or /
      const isSearchShortcut = (e.metaKey || e.ctrlKey) && (e.key === "f" || e.key === "k");
      const isSlashTrigger = e.key === "/" && !slashCommandOpen && document.activeElement?.tagName !== "INPUT" && document.activeElement?.tagName !== "TEXTAREA";

      if (isSearchShortcut || isSlashTrigger) {
        e.preventDefault();
        setSlashCommandOpen(true);
        // Don't clear query if it was a shortcut, so user can see previous search? 
        // Actually typically you want to select the text. For now let's clear or select.
        // Let's clear for fresh search as per previous behavior.
        // setSlashCommandQuery(""); 
        // Actually, if simply opening, maybe we should select all text? 
        // For simplicity matching existing logic:
        // if (isSlashTrigger) setSlashCommandQuery(""); 
        // specific request "search based on words", so we keep the input as is.
        // Let's just focus it.

        if (inputRef.current) {
          inputRef.current.focus();
          inputRef.current.select();
        }
        setSelectedIndex(0);
      }

      if (slashCommandOpen) {
        if (e.key === "Escape") {
          setSlashCommandOpen(false);
          // Optional: clear query on close? existing logic did.
        } else if (e.key === "ArrowDown") {
          e.preventDefault();
          setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
        } else if (e.key === "Enter" && filteredCommands[selectedIndex]) {
          e.preventDefault();
          filteredCommands[selectedIndex].action();
          setSlashCommandOpen(false);
          setSlashCommandQuery("");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [slashCommandOpen, localQuery, selectedIndex, filteredCommands, setActiveChannel, setSlashCommandOpen, setSlashCommandQuery, slashCommandQuery]);

  useEffect(() => {
    if (slashCommandOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [slashCommandOpen]);

  return (
    <>
      <AnimatePresence>
        {slashCommandOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setSlashCommandOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, x: "-50%", y: "-50%" }}
              animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
              exit={{ opacity: 0, scale: 0.95, x: "-50%", y: "-50%" }}
              role="dialog"
              aria-modal="true"
              aria-label="Command palette"
              className="fixed top-1/2 left-1/2 w-[90%] md:w-[500px] lg:w-[640px] bg-[#2B2D31] border border-[#1E1F22] rounded-lg shadow-2xl z-50 overflow-hidden"
            >
              <div className="flex items-center gap-2 px-4 py-3 border-b border-[#1E1F22]">
                <Search className="h-5 w-5 text-[#72767D]" aria-hidden="true" />
                <input
                  ref={inputRef}
                  type="text"
                  value={localQuery}
                  onChange={(e) => {
                    setLocalQuery(e.target.value);
                    setSelectedIndex(0);
                  }}
                  placeholder="Type a command or search..."
                  className="flex-1 bg-transparent text-[#DCDDDE] placeholder-[#72767D] outline-none text-sm focus-visible:ring-0"
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
                          setSlashCommandOpen(false);
                          setSlashCommandQuery("");
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
                          <div className="text-xs text-[#949BA4] truncate">{cmd.description}</div>
                        </div>
                        {i === selectedIndex && (
                          <ArrowRight className="h-4 w-4 text-[#72767D] flex-shrink-0" aria-hidden="true" />
                        )}
                      </motion.button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
