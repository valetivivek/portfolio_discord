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
};

const DiscordContext = createContext<DiscordContextType | null>(null);

export function DiscordProvider({ children }: { children: React.ReactNode }) {
    const [activeChannel, setActiveChannel] = useState("welcome");
    const [showMemberList, setShowMemberList] = useState(true);
    const [profileModal, setProfileModal] = useState<MemberData | null>(null);
    const [serverDropdownOpen, setServerDropdownOpen] = useState(false);

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
