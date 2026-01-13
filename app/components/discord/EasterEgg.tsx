"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Trophy, Zap, Star } from "lucide-react";

type Achievement = {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
};

const achievements: Achievement[] = [
  {
    id: "explorer",
    name: "Explorer",
    description: "Visited all channels",
    icon: <Sparkles className="h-5 w-5" />,
    unlocked: false,
  },
  {
    id: "reader",
    name: "Deep Reader",
    description: "Read through all messages",
    icon: <Star className="h-5 w-5" />,
    unlocked: false,
  },
  {
    id: "clicker",
    name: "Click Master",
    description: "Clicked 10 role badges",
    icon: <Zap className="h-5 w-5" />,
    unlocked: false,
  },
  {
    id: "completionist",
    name: "Completionist",
    description: "Unlocked all achievements",
    icon: <Trophy className="h-5 w-5" />,
    unlocked: false,
  },
];

export default function EasterEgg() {
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);
  const [showNotification, setShowNotification] = useState(false);
  const [currentAchievement, setCurrentAchievement] = useState<Achievement | null>(null);
  const [clickCount, setClickCount] = useState(0);

  const unlockAchievement = React.useCallback((id: string) => {
    setUnlockedAchievements((prev) => {
      if (prev.includes(id)) return prev;

      const achievement = achievements.find((a) => a.id === id);
      if (achievement) {
        setCurrentAchievement(achievement);
        setShowNotification(true);

        setTimeout(() => {
          setShowNotification(false);
          setCurrentAchievement(null);
        }, 4000);

        // Check for completionist
        if (prev.length + 1 >= achievements.length - 1) {
          setTimeout(() => {
            unlockAchievement("completionist");
          }, 1000);
        }

        return [...prev, id];
      }
      return prev;
    });
  }, []);

  useEffect(() => {
    // Track channel visits
    const visitedChannels = new Set<string>();
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash) {
        visitedChannels.add(hash);
        if (visitedChannels.size >= 8) {
          unlockAchievement("explorer");
        }
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [unlockAchievement]);

  useEffect(() => {
    // Track badge clicks
    const handleBadgeClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('[data-role-badge]')) {
        setClickCount((prev) => {
          const newCount = prev + 1;
          if (newCount >= 10) {
            unlockAchievement("clicker");
          }
          return newCount;
        });
      }
    };

    document.addEventListener("click", handleBadgeClick);
    return () => {
      document.removeEventListener("click", handleBadgeClick);
    };
  }, [unlockAchievement]);

  return (
    <AnimatePresence>
      {showNotification && currentAchievement && (
        <motion.div
          initial={{ opacity: 0, y: -50, x: -50 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: -50, x: -50 }}
          className="fixed top-20 right-6 z-50 bg-[#2F3136] border border-[#40444B] rounded-lg p-4 shadow-xl max-w-sm"
        >
          <div className="flex items-start gap-3">
            <div className="p-2 bg-[#5865F2] rounded-lg text-white">
              {currentAchievement.icon}
            </div>
            <div className="flex-1">
              <p className="font-semibold text-[#F2F3F5] text-sm">Achievement Unlocked!</p>
              <p className="text-[#B9BBBE] text-xs mt-1">{currentAchievement.name}</p>
              <p className="text-[#72767D] text-xs mt-0.5">{currentAchievement.description}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
