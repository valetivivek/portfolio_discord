"use client";

import React from "react";
import { useDiscord } from "./DiscordApp";
import { MEMBERS, MemberData } from "./data";
import { Crown } from "lucide-react";

const roleGroups = [
  { name: "SERVER OWNER", filter: (m: MemberData) => m.isOwner },
  { name: "BOTS", filter: (m: MemberData) => m.isBot },
  { name: "ONLINE", filter: (m: MemberData) => !m.isOwner && !m.isBot && m.status === "online" },
  { name: "IDLE", filter: (m: MemberData) => m.status === "idle" },
  { name: "OFFLINE", filter: (m: MemberData) => m.status === "offline" },
];

export default function MemberListSidebar() {
  const { setProfileModal } = useDiscord();

  const getStatusColor = (status: MemberData["status"]) => {
    switch (status) {
      case "online": return "#23A559";
      case "idle": return "#F0B232";
      case "dnd": return "#F23F43";
      case "offline": return "#80848E";
    }
  };

  return (
    <div className="w-60 bg-[#2B2D31] flex flex-col overflow-y-auto h-full">
      <div className="p-4 space-y-4">
        {roleGroups.map(({ name, filter }) => {
          const members = MEMBERS.filter(filter);
          if (members.length === 0) return null;

          return (
            <div key={name}>
              <h3 className="text-[11px] font-semibold text-[#949BA4] uppercase mb-1 px-2">
                {name} — {members.length}
              </h3>
              <div className="space-y-0.5">
                {members.map((member) => (
                  <button
                    key={member.id}
                    onClick={() => setProfileModal(member)}
                    className="w-full flex items-center gap-3 px-2 py-1.5 rounded hover:bg-[#35373C] group transition-colors"
                  >
                    {/* Avatar */}
                    <div className="relative flex-shrink-0">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-xs"
                        style={{ backgroundColor: member.isBot ? "#5865F2" : "#5865F2" }}
                      >
                        {member.avatar ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={member.avatar} alt="" className="w-8 h-8 rounded-full" />
                        ) : (
                          member.name.split(" ").map(n => n[0]).join("").slice(0, 2)
                        )}
                      </div>
                      <div
                        className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-[#2B2D31]"
                        style={{ backgroundColor: getStatusColor(member.status) }}
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0 text-left">
                      <div className="flex items-center gap-1">
                        <span className={`text-sm truncate ${member.status === "offline" ? "text-[#949BA4]" : "text-[#F2F3F5]"}`}>
                          {member.name}
                        </span>
                        {member.isOwner && (
                          <Crown className="w-3.5 h-3.5 text-[#F0B232] flex-shrink-0" />
                        )}
                        {member.isBot && (
                          <span className="px-1 py-0.5 text-[8px] font-semibold bg-[#5865F2] text-white rounded flex-shrink-0">
                            BOT
                          </span>
                        )}
                      </div>
                      {member.activity && member.status !== "offline" && (
                        <p className="text-[11px] text-[#949BA4] truncate">
                          {member.activity}
                        </p>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
