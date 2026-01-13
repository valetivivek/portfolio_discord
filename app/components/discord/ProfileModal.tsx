"use client";

import React from "react";
import { motion } from "framer-motion";
import { MemberData } from "./data";
import { X, Pencil, Crown, Shield, Verified } from "lucide-react";

type Props = {
  member: MemberData;
  onClose: () => void;
};

const roleColors: Record<string, string> = {
  "Server Owner": "#F0B232",
  "Full-Stack Dev": "#5865F2",
  "React": "#61DAFB",
  "Go": "#00ADD8",
  "ML Engineer": "#FF6F00",
  "Bot": "#5865F2",
  "Verified Bot": "#5865F2",
  "Developer": "#3BA55D",
  "Visitor": "#99AAB5",
  "New Member": "#99AAB5",
};

export default function ProfileModal({ member, onClose }: Props) {
  // Banner gradient for owner, solid for others
  const isOwner = member.isOwner;
  const isBot = member.isBot;

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50"
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] max-w-[95vw] bg-[#232428] rounded-lg shadow-2xl z-50 overflow-hidden"
      >
        {/* Banner - Gradient for owner */}
        <div
          className="h-[120px] relative"
          style={{
            background: isOwner
              ? "linear-gradient(135deg, #a855f7 0%, #5865F2 50%, #8b5cf6 100%)"
              : isBot
                ? "#5865F2"
                : "#1E1F22"
          }}
        >
          <button
            onClick={onClose}
            className="absolute top-2 right-2 p-1 rounded-full hover:bg-black/20 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Avatar */}
        <div className="relative px-4 -mt-[50px] mb-3">
          <div className="relative inline-block">
            <div
              className="w-[94px] h-[94px] rounded-full border-[6px] border-[#232428] flex items-center justify-center text-white font-bold text-2xl overflow-hidden"
              style={{ backgroundColor: isBot ? "#5865F2" : "#5865F2" }}
            >
              {member.avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={member.avatar} alt="" className="w-full h-full object-cover" />
              ) : (
                member.name.split(" ").map(n => n[0]).join("").slice(0, 2)
              )}
            </div>
            {/* Status indicator */}
            <div
              className="absolute bottom-1 right-1 w-7 h-7 rounded-full border-[5px] border-[#232428]"
              style={{ backgroundColor: "#23A559" }}
            />
          </div>

          {/* Badges row */}
          <div className="absolute top-3 right-4 flex gap-1.5">
            {isOwner && (
              <div className="w-9 h-9 rounded-lg bg-[#111214] flex items-center justify-center" title="Server Owner">
                <Crown className="w-5 h-5 text-[#F0B232]" />
              </div>
            )}
            {isBot && (
              <div className="w-9 h-9 rounded-lg bg-[#5865F2] flex items-center justify-center" title="Verified Bot">
                <Verified className="w-5 h-5 text-white" />
              </div>
            )}
          </div>
        </div>

        {/* Card content */}
        <div className="px-4 pb-4">
          {/* Name card */}
          <div className="bg-[#111214] rounded-lg p-3 mb-3">
            {/* Display name and username */}
            <div className="mb-2">
              <div className="flex items-center gap-2 mb-0.5">
                <h2 className="text-xl font-bold text-white">{member.name}</h2>
                {isBot && (
                  <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-[#5865F2] text-white rounded flex items-center gap-0.5">
                    <Verified className="w-3 h-3" /> BOT
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-[#B5BAC1]">{member.name.toLowerCase().replace(" ", "")}</span>
                {isOwner && (
                  <>
                    <span className="text-[#B5BAC1]">•</span>
                    <span className="text-[#B5BAC1]">He/Him</span>
                    <span className="bg-[#5865F2] text-white text-[10px] px-1 py-0.5 rounded font-semibold">🇺🇸 FL</span>
                  </>
                )}
              </div>
            </div>

            {/* Status text */}
            {isOwner && (
              <div className="flex items-start gap-2 mt-2 p-2 bg-[#232428] rounded-md">
                <span className="text-sm">💻</span>
                <span className="text-sm text-[#DCDDDE]">Building cool stuff @ UF</span>
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="h-px bg-[#3F4147] mb-3" />

          {/* About Me */}
          <div className="mb-3">
            <h3 className="text-[11px] font-bold text-[#B5BAC1] uppercase mb-2">ABOUT ME</h3>
            <p className="text-[#DCDDDE] text-sm leading-relaxed">
              {isOwner ? (
                <>
                  Full-Stack Developer & Graduate CS student at University of Florida.
                  Building performant, accessible, and scalable applications.
                  <br /><br />
                  📍 Gainesville, FL
                  <br />
                  💼 Open to SDE & Full-Stack roles
                </>
              ) : isBot ? (
                "I help navigate this portfolio server! Try /help to see what I can do."
              ) : (
                member.activity || "Exploring this amazing portfolio!"
              )}
            </p>
          </div>

          {/* Divider */}
          <div className="h-px bg-[#3F4147] mb-3" />

          {/* Member Since */}
          <div className="mb-3">
            <h3 className="text-[11px] font-bold text-[#B5BAC1] uppercase mb-2">MEMBER SINCE</h3>
            <div className="flex items-center gap-2 text-[#DCDDDE] text-sm">
              <svg className="w-4 h-4 text-[#5865F2]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.73 4.87a18.2 18.2 0 0 0-4.6-1.44c-.21.4-.4.8-.58 1.21-1.69-.26-3.4-.26-5.1 0-.18-.41-.37-.82-.59-1.2-1.6.27-3.14.75-4.6 1.43A19.04 19.04 0 0 0 .96 17.7a18.43 18.43 0 0 0 5.63 2.87c.46-.62.86-1.28 1.2-1.98-.65-.25-1.29-.55-1.9-.92.17-.12.33-.24.48-.37 3.68 1.76 7.73 1.76 11.41 0 .16.13.32.25.49.37-.62.36-1.25.67-1.9.92.35.7.75 1.36 1.2 1.98 1.94-.58 3.86-1.53 5.64-2.87.44-4.65-.73-9.1-3.49-12.83Z" />
              </svg>
              <span>Jan 1, 2024</span>
            </div>
          </div>

          {/* Roles */}
          <div className="mb-4">
            <h3 className="text-[11px] font-bold text-[#B5BAC1] uppercase mb-2">ROLES</h3>
            <div className="flex flex-wrap gap-1">
              {member.roles.map((role) => (
                <div
                  key={role}
                  className="flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium"
                  style={{
                    backgroundColor: `${roleColors[role] || "#99AAB5"}20`,
                    color: roleColors[role] || "#99AAB5",
                  }}
                >
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: roleColors[role] || "#99AAB5" }}
                  />
                  {role}
                </div>
              ))}
            </div>
          </div>

          {/* Note input */}
          <div className="mb-4">
            <h3 className="text-[11px] font-bold text-[#B5BAC1] uppercase mb-2">NOTE</h3>
            <input
              type="text"
              placeholder="Click to add a note"
              className="w-full bg-transparent text-[#B5BAC1] text-sm placeholder-[#72767D] outline-none cursor-text"
              readOnly
            />
          </div>

          {/* Edit Profile button (only for owner) */}
          {isOwner && (
            <button
              onClick={() => window.open("https://linkedin.com/in/valetivishnuvivek", "_blank")}
              className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white font-medium text-sm py-2.5 rounded transition-colors flex items-center justify-center gap-2"
            >
              <Pencil className="w-4 h-4" />
              View Full Profile
            </button>
          )}
        </div>
      </motion.div>
    </>
  );
}
