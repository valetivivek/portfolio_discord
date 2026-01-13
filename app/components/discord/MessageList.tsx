"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDiscord } from "../../context/DiscordContext";
import { MessageData, MemberData } from "./data";
import Message from "./Message";
import TypingIndicatorNew from "./TypingIndicatorNew";
import { getChannelMessages } from "./channelContent";

type Props = {
  channelId: string;
};

export default function MessageList({ channelId }: Props) {
  const { setProfileModal } = useDiscord();
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [typing, setTyping] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setMessages([]);

    // Simulate loading messages
    const loadTimer = setTimeout(() => {
      const channelMessages = getChannelMessages(channelId);

      // Stagger message appearance
      channelMessages.forEach((msg, i) => {
        setTimeout(() => {
          setMessages((prev) => [...prev, msg]);
        }, i * 100);
      });

      setIsLoading(false);

      // Simulate typing indicator
      if (channelId === "welcome") {
        setTimeout(() => {
          setTyping(["Portfolio Bot"]);
          setTimeout(() => setTyping([]), 3000);
        }, channelMessages.length * 100 + 2000);
      }
    }, 300);

    return () => clearTimeout(loadTimer);
  }, [channelId]);

  const handleAvatarClick = (member: MemberData) => {
    setProfileModal(member);
  };

  if (isLoading) {
    return (
      <div className="px-4 space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex gap-4 animate-pulse">
            <div className="w-10 h-10 rounded-full bg-[#3F4147]" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-32 bg-[#3F4147] rounded" />
              <div className="h-4 w-full bg-[#3F4147] rounded" />
              <div className="h-4 w-3/4 bg-[#3F4147] rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="px-4 pb-6">
      <AnimatePresence>
        {messages.map((msg, i) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Message
              message={msg}
              isGrouped={i > 0 && messages[i - 1].author.id === msg.author.id}
              onAvatarClick={() => handleAvatarClick(msg.author)}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Typing indicator */}
      <AnimatePresence>
        {typing.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <TypingIndicatorNew users={typing} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
