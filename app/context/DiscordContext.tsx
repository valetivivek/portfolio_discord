"use client";

import React, { createContext, useContext, useState } from "react";
import { MemberData } from "../components/discord/data";

type DiscordContextType = {
    activeChannel: string;
    setActiveChannel: (id: string) => void;
    showMemberList: boolean;
    setShowMemberList: (show: boolean) => void;
    profileModal: MemberData | null;
    setProfileModal: (member: MemberData | null) => void;
    serverDropdownOpen: boolean;
    setServerDropdownOpen: (open: boolean) => void;
    slashCommandOpen: boolean;
    setSlashCommandOpen: (open: boolean) => void;
    slashCommandQuery: string;
    setSlashCommandQuery: (query: string) => void;
};

const DiscordContext = createContext<DiscordContextType | null>(null);

export function DiscordProvider({ children, initialChannel = "welcome" }: { children: React.ReactNode; initialChannel?: string }) {
    const [activeChannel, setActiveChannel] = useState(initialChannel);
    const [showMemberList, setShowMemberList] = useState(true);
    const [profileModal, setProfileModal] = useState<MemberData | null>(null);
    const [serverDropdownOpen, setServerDropdownOpen] = useState(false);
    const [slashCommandOpen, setSlashCommandOpen] = useState(false);
    const [slashCommandQuery, setSlashCommandQuery] = useState("");

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
                slashCommandOpen,
                setSlashCommandOpen,
                slashCommandQuery,
                setSlashCommandQuery,
            }}
        >
            {children}
        </DiscordContext.Provider>
    );
}

export function useDiscord() {
    const context = useContext(DiscordContext);
    if (!context) {
        throw new Error("useDiscord must be used within a DiscordProvider");
    }
    return context;
}
