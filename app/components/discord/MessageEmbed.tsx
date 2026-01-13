"use client";

import React from "react";
import { ExternalLink, Github, Calendar, Tag } from "lucide-react";

type MessageEmbedProps = {
  title: string;
  description?: string;
  url?: string;
  thumbnail?: string;
  color?: string;
  fields?: Array<{ name: string; value: string; inline?: boolean }>;
  footer?: { text: string; icon?: string };
  timestamp?: Date;
  author?: { name: string; icon?: string; url?: string };
};

export default function MessageEmbed({
  title,
  description,
  url,
  thumbnail,
  color = "#5865F2",
  fields = [],
  footer,
  timestamp,
  author,
}: MessageEmbedProps) {
  return (
    <div className="mt-2 mb-1 rounded border-l-4 overflow-hidden" style={{ borderColor: color }}>
      <div className="bg-[#2F3136] rounded-r border border-[#202225] p-4">
        {author && (
          <div className="flex items-center gap-2 mb-2">
            {author.icon && (
              <img src={author.icon} alt="" className="w-5 h-5 rounded-full" />
            )}
            <a
              href={author.url}
              className="text-sm font-semibold text-[#FFFFFF] hover:underline"
            >
              {author.name}
            </a>
          </div>
        )}
        
        <div className="flex gap-4">
          {thumbnail && (
            <img
              src={thumbnail}
              alt=""
              className="w-20 h-20 rounded object-cover flex-shrink-0"
            />
          )}
          
          <div className="flex-1 min-w-0">
            <a
              href={url}
              className="text-base font-semibold text-[#00A8FC] hover:underline block mb-1"
            >
              {title}
            </a>
            
            {description && (
              <p className="text-sm text-[#DCDDDE] mb-2 leading-relaxed">{description}</p>
            )}
            
            {fields.length > 0 && (
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-2">
                {fields.map((field, i) => (
                  <div key={i} className={field.inline ? "" : "col-span-2"}>
                    <div className="text-xs font-semibold text-[#FFFFFF] mb-0.5">{field.name}</div>
                    <div className="text-sm text-[#DCDDDE]">{field.value}</div>
                  </div>
                ))}
              </div>
            )}
            
            {footer && (
              <div className="flex items-center gap-1.5 mt-2 text-xs text-[#72767D]">
                {footer.icon && (
                  <img src={footer.icon} alt="" className="w-4 h-4 rounded-full" />
                )}
                <span>{footer.text}</span>
                {timestamp && (
                  <>
                    <span>•</span>
                    <time>{new Date(timestamp).toLocaleDateString()}</time>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
