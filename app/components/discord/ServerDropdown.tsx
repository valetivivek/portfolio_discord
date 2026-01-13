"use client";

import React from "react";
import { motion } from "framer-motion";
import { useDiscord } from "./DiscordApp";
import {
  Rocket,
  UserPlus,
  Settings,
  Folder,
  Calendar,
  Bell,
  Shield,
  Pencil,
  ChevronRight,
  Download,
  LogOut
} from "lucide-react";

export default function ServerDropdown() {
  const { setServerDropdownOpen } = useDiscord();

  const menuItems = [
    { icon: Rocket, label: "Server Boost", badge: "2 Boosts", color: "#FF73FA" },
    { divider: true },
    { icon: UserPlus, label: "Invite People", color: "#5865F2" },
    { icon: Settings, label: "Server Settings", hasSubmenu: true },
    { icon: Folder, label: "Create Channel" },
    { icon: Calendar, label: "Create Event" },
    { divider: true },
    { icon: Bell, label: "Notification Settings", hasSubmenu: true },
    { icon: Shield, label: "Privacy Settings" },
    { divider: true },
    { icon: Pencil, label: "Edit Server Profile" },
    { icon: Download, label: "Download Resume", color: "#23A559" },
    { divider: true },
    { icon: LogOut, label: "Leave Server", color: "#F23F43" },
  ];

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-40"
        onClick={() => setServerDropdownOpen(false)}
      />

      {/* Dropdown */}
      <motion.div
        initial={{ opacity: 0, y: -10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.95 }}
        className="fixed left-[72px] md:left-[72px] left-0 top-0 mt-12 ml-2 w-56 bg-[#111214] rounded-lg shadow-xl z-50 py-1.5 overflow-hidden"
      >
        {menuItems.map((item, i) => {
          if (item.divider) {
            return <div key={i} className="h-px bg-[#2D2F33] my-1 mx-2" />;
          }

          const Icon = item.icon!;
          return (
            <button
              key={i}
              onClick={async () => {
                if (item.label === "Download Resume") {
                  window.open("/resume/resume.pdf", "_blank");
                } else if (item.label === "Leave Server") {
                  window.location.href = "https://google.com";
                  return;
                } else if (item.label === "Invite People") {
                  try {
                    await navigator.clipboard.writeText(window.location.href);
                    alert("Portfolio link copied to clipboard!");
                  } catch {
                    alert("Failed to copy link");
                  }
                }
                setServerDropdownOpen(false);
              }}
              className="w-full flex items-center gap-2 px-2.5 py-1.5 mx-1 rounded text-sm hover:bg-[#5865F2] text-[#B5BAC1] hover:text-white transition-colors duration-100"
              style={{ width: "calc(100% - 8px)" }}
            >
              <Icon
                className="w-4 h-4 flex-shrink-0"
                style={{ color: item.color }}
              />
              <span
                className="flex-1 text-left"
                style={{ color: item.color }}
              >
                {item.label}
              </span>
              {item.badge && (
                <span
                  className="text-[10px] font-semibold px-1.5 py-0.5 rounded"
                  style={{ backgroundColor: `${item.color}20`, color: item.color }}
                >
                  {item.badge}
                </span>
              )}
              {item.hasSubmenu && (
                <ChevronRight className="w-4 h-4 text-[#72767D]" />
              )}
            </button>
          );
        })}
      </motion.div>
    </>
  );
}
