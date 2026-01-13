"use client";

import React from "react";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

type CodeBlockProps = {
  code: string;
  language?: string;
  className?: string;
};

export default function CodeBlock({ code, language, className = "" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`bg-[#2F3136] rounded border border-[#202225] overflow-hidden my-2 ${className}`}>
      <div className="flex items-center justify-between px-4 py-2 bg-[#1E1F22] border-b border-[#202225]">
        <span className="text-xs font-semibold text-[#B9BBBE] uppercase">{language || "code"}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-1 text-xs text-[#B9BBBE] hover:text-[#F2F3F5] hover:bg-[#2F3136] rounded transition-colors"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto">
        <code className="text-sm text-[#DCDDDE] font-mono leading-relaxed whitespace-pre">{code}</code>
      </pre>
    </div>
  );
}
