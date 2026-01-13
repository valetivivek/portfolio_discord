"use client";

import React, { useState } from "react";
import { ChannelData } from "./data";
import { PlusCircle, Gift, Sticker, Smile } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  channel: ChannelData;
};

type TooltipButtonProps = {
  icon: React.ReactNode;
  tooltip: string;
  className?: string;
};

function TooltipButton({ icon, tooltip, className = "" }: TooltipButtonProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={`p-1.5 rounded hover:bg-[#41434A] text-[#B5BAC1] hover:text-[#DBDEE1] transition-colors ${className}`}
        aria-label={tooltip}
      >
        {icon}
      </button>
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-[#111214] text-white px-2.5 py-1.5 rounded text-xs font-medium whitespace-nowrap z-50 shadow-xl"
          >
            {tooltip}
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-[#111214] rotate-45 -mt-1" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

import { useCommands } from "./useCommands";

// ... existing imports ...

export default function MessageInput({ channel }: Props) {
  const [message, setMessage] = useState("");
  const [showCommands, setShowCommands] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const commands = useCommands();

  const filteredCommands = message.startsWith("/")
    ? commands.filter(cmd =>
      cmd.name.toLowerCase().startsWith(message.slice(1).toLowerCase()) ||
      cmd.description.toLowerCase().includes(message.slice(1).toLowerCase())
    )
    : [];

  // Reset selection when filtering changes
  React.useEffect(() => {
    setSelectedIndex(0);
    setShowCommands(message.startsWith("/") && filteredCommands.length > 0);
  }, [message, filteredCommands.length]);

  const executeCommand = (cmd: any) => {
    cmd.action();
    setMessage("");
    setShowCommands(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (showCommands && filteredCommands.length > 0) {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % filteredCommands.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        executeCommand(filteredCommands[selectedIndex]);
      } else if (e.key === "Escape") {
        setShowCommands(false);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // If it looks like a command but wasn't selected via menu, try to execute it
    if (message.startsWith("/")) {
      const cmdName = message.slice(1).toLowerCase();
      const exactMatch = commands.find(c => c.name === cmdName);
      if (exactMatch) {
        executeCommand(exactMatch);
        return;
      }
    }

    // Clear input - this is a portfolio, no actual messaging
    setMessage("");
  };

  return (
    <div className="relative">
      {/* Command Autocomplete Popover */}
      <AnimatePresence>
        {showCommands && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-full left-4 right-4 mb-2 bg-[#2B2D31] rounded-lg shadow-2xl border border-[#1E1F22] overflow-hidden z-50 max-h-[300px] overflow-y-auto"
          >
            <div className="px-3 py-2 text-[11px] font-bold text-[#949BA4] uppercase tracking-wide border-b border-[#1F2023]">
              Commands matching /{message.slice(1)}
            </div>
            {filteredCommands.map((cmd, i) => (
              <button
                key={cmd.name}
                onClick={() => executeCommand(cmd)}
                onMouseEnter={() => setSelectedIndex(i)}
                className={`w-full flex items-center gap-3 px-3 py-2 text-left transition-colors ${i === selectedIndex ? "bg-[#404249]" : "hover:bg-[#35373C]"
                  }`}
              >
                <div className="w-8 h-8 rounded-full bg-[#5865F2] flex items-center justify-center text-white flex-shrink-0">
                  {cmd.icon}
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#F2F3F5]">/{cmd.name}</div>
                  <div className="text-xs text-[#B5BAC1]">{cmd.description}</div>
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="px-4 py-4 flex-shrink-0">
        <div className="bg-[#383A40] rounded-lg flex items-center px-4 py-2">
          {/* Attach button */}
          <TooltipButton
            icon={<PlusCircle className="w-6 h-6" />}
            tooltip="It's a portfolio! 📎"
            className="mr-2"
          />

          {/* Input */}
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Message #${channel.name}`}
            className="flex-1 bg-transparent text-[#DCDDDE] placeholder-[#6D6F78] outline-none text-base"
            aria-label={`Message input for ${channel.name}`}
          />

          {/* Actions */}
          <div className="flex items-center gap-0.5 ml-2">
            <TooltipButton
              icon={<Gift className="w-6 h-6" />}
              tooltip="No Nitro needed 🎁"
              className="hidden sm:block"
            />
            <TooltipButton
              icon={<Sticker className="w-6 h-6" />}
              tooltip="Stickers coming soon™"
              className="hidden sm:block"
            />
            <TooltipButton
              icon={<Smile className="w-6 h-6" />}
              tooltip="😊 Use the contact channel!"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
