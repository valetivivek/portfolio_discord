"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Hash, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#313338] flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        {/* Discord-style error icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <div className="w-24 h-24 mx-auto rounded-full bg-[#2B2D31] flex items-center justify-center mb-4">
            <Hash className="w-12 h-12 text-[#5865F2]" />
          </div>
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-6xl"
          >
            😵
          </motion.div>
        </motion.div>

        {/* Error content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          <h1 className="text-7xl font-bold text-[#F2F3F5]">404</h1>
          <h2 className="text-xl font-semibold text-[#B5BAC1]">
            Channel Not Found
          </h2>
          <p className="text-[#949BA4] text-sm leading-relaxed">
            Looks like this channel got lost in the void. Maybe it was deleted,
            or perhaps you stumbled into a secret area that doesn&apos;t exist yet.
          </p>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 space-y-3"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#5865F2] hover:bg-[#4752C4] text-white font-medium px-6 py-3 rounded transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Return to #welcome
          </Link>
          <p className="text-[#72767D] text-xs">
            or try one of the channels in the sidebar
          </p>
        </motion.div>

        {/* Discord-style footer hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-[#4E5058] text-xs"
        >
          Error Code: CHANNEL_NOT_FOUND
        </motion.div>
      </div>
    </div>
  );
}
