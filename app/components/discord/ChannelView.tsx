"use client";

import { ReactNode } from "react";
import ChannelHeader from "./ChannelHeader";

type ChannelViewProps = {
  channelName: string;
  channelIcon: React.ComponentType<{ className?: string }>;
  description?: string;
  memberCount?: number;
  children: ReactNode;
  className?: string;
};

export default function ChannelView({
  channelName,
  channelIcon,
  description,
  memberCount,
  children,
  className = "",
}: ChannelViewProps) {
  return (
    <div className={`flex-1 flex flex-col bg-[#36393F] ${className}`}>
      <ChannelHeader
        name={channelName}
        icon={channelIcon}
        description={description}
        memberCount={memberCount}
      />
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 py-6">{children}</div>
      </div>
    </div>
  );
}
