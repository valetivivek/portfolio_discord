"use client";

import React from "react";
import { Hash, Volume2, Megaphone, BookOpen } from "lucide-react";
import { ChannelData } from "./data";

export default function ChannelWelcome({ channel }: { channel: ChannelData }) {
    const getChannelIcon = () => {
        switch (channel.type) {
            case "voice": return <Volume2 className="w-10 h-10 text-white" />;
            case "announcement": return <Megaphone className="w-10 h-10 text-white" />;
            case "rules": return <BookOpen className="w-10 h-10 text-white" />;
            default: return <Hash className="w-10 h-10 text-white" />;
        }
    };

    return (
        <div className="px-4 pt-6 pb-4">
            <div className="w-[68px] h-[68px] rounded-full bg-[#41434A] flex items-center justify-center mb-4">
                {getChannelIcon()}
            </div>
            <h1 className="text-[32px] font-bold text-[#F2F3F5] mb-2">
                Welcome to #{channel.name}!
            </h1>
            <p className="text-[#B5BAC1] text-base">
                {channel.description || `This is the start of the #${channel.name} channel.`}
            </p>
        </div>
    );
}
