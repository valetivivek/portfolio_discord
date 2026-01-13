"use client";

import React, { useState, useEffect, createContext, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ServerListSidebar from "./ServerListSidebar";
import ChannelSidebar from "./ChannelSidebar";
import ChatArea from "./ChatArea";
import MemberListSidebar from "./MemberListSidebar";
import ProfileModal from "./ProfileModal";
import ServerDropdown from "./ServerDropdown";
import SlashCommand from "./SlashCommand";
import { MemberData } from "./data";

// Context
type DiscordContextType = {
  activeChannel: string;
  setActiveChannel: (id: string) => void;
  showMemberList: boolean;
  setShowMemberList: (show: boolean) => void;
  profileModal: MemberData | null;
  setProfileModal: (member: MemberData | null) => void;
  serverDropdownOpen: boolean;
  setServerDropdownOpen: (open: boolean) => void;
};

const DiscordContext = createContext<DiscordContextType | null>(null);
export const useDiscord = () => {
  const ctx = useContext(DiscordContext);
  if (!ctx) throw new Error("useDiscord must be used within DiscordProvider");
  return ctx;
};

export default function DiscordApp() {
  const [activeChannel, setActiveChannel] = useState("welcome");
  const [showMemberList, setShowMemberList] = useState(true);
  const [profileModal, setProfileModal] = useState<MemberData | null>(null);
  const [serverDropdownOpen, setServerDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate Discord loading
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Loading screen
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-[#36393F] flex items-center justify-center z-50">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 mx-auto mb-4 border-4 border-[#5865F2] border-t-transparent rounded-full"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[#B9BBBE] text-sm"
          >
            Did you know: You can use <span className="text-[#DCDDDE]">/resume</span> to download Vishnu&apos;s resume?
          </motion.p>
        </div>
      </div>
    );
  }

  return (
    <DiscordContext.Provider
      value={{
        activeChannel,
        setActiveChannel,
        showMemberList,
        setShowMemberList,
        profileModal,
        setProfileModal,
        serverDropdownOpen,
        setServerDropdownOpen,
      }}
    >
      <div className="h-screen flex overflow-hidden bg-[#313338]">
        {/* Server list */}
        <ServerListSidebar />

        {/* Channel sidebar */}
        <ChannelSidebar />

        {/* Main content */}
        <div className="flex-1 flex flex-col min-w-0">
          <ChatArea />
        </div>

        {/* Member list */}
        <AnimatePresence>
          {showMemberList && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 240, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex-shrink-0 overflow-hidden hidden lg:block"
            >
              <MemberListSidebar />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Profile modal */}
        <AnimatePresence>
          {profileModal && (
            <ProfileModal member={profileModal} onClose={() => setProfileModal(null)} />
          )}
        </AnimatePresence>

        {/* Server dropdown */}
        <AnimatePresence>
          {serverDropdownOpen && <ServerDropdown />}
        </AnimatePresence>

        {/* Slash command palette */}
        <SlashCommand />
      </div>
    </DiscordContext.Provider>
  );
}
