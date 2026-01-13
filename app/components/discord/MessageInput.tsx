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

export default function MessageInput({ channel }: Props) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Clear input - this is a portfolio, no actual messaging
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className="px-4 pb-6 flex-shrink-0">
      <div className="bg-[#383A40] rounded-lg flex items-center px-4 py-2.5">
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
  );
}
