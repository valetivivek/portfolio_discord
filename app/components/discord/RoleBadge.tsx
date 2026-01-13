"use client";

import { motion } from "framer-motion";

type RoleBadgeProps = {
  name: string;
  color?: string;
  icon?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizeClasses = {
  sm: "px-2 py-1 text-xs",
  md: "px-3 py-1.5 text-sm",
  lg: "px-4 py-2 text-base",
};

export default function RoleBadge({ name, color = "#5865F2", icon, size = "md", className = "" }: RoleBadgeProps) {
  return (
    <motion.div
      data-role-badge
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`inline-flex items-center gap-1.5 rounded-full font-medium transition-all cursor-pointer ${sizeClasses[size]} ${className}`}
      style={{
        backgroundColor: `${color}20`,
        color: color,
        border: `1px solid ${color}40`,
      }}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{name}</span>
    </motion.div>
  );
}
