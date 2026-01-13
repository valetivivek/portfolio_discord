export type ChannelType = "text" | "voice" | "announcement" | "rules" | "forum";

export type ChannelData = {
  id: string;
  name: string;
  type: ChannelType;
  category: string;
  description?: string;
  unread?: boolean;
  locked?: boolean;
  nsfw?: boolean;
};

export type MemberData = {
  id: string;
  name: string;
  discriminator: string;
  avatar?: string;
  status: "online" | "idle" | "dnd" | "offline";
  activity?: string;
  roles: string[];
  isBot?: boolean;
  isOwner?: boolean;
};

export type MessageData = {
  id: string;
  author: MemberData;
  content: React.ReactNode;
  timestamp: Date;
  edited?: boolean;
  reactions?: Array<{ emoji: string; count: number; me: boolean }>;
  embeds?: any[];
  attachments?: any[];
  replyTo?: MessageData;
  pinned?: boolean;
};

export const CHANNELS: ChannelData[] = [

  { id: "welcome", name: "welcome", type: "text", category: "START HERE", description: "Welcome to the server! Start here." },
  { id: "rules", name: "rules", type: "rules", category: "START HERE", description: "Server rules and guidelines" },
  { id: "introductions", name: "introductions", type: "text", category: "START HERE", description: "Introduce yourself!" },
  { id: "announcements", name: "announcements", type: "announcement", category: "EXPERIENCE", description: "Important updates and milestones" },
  { id: "projects", name: "projects", type: "forum", category: "PORTFOLIO", description: "Featured projects and case studies" },
  { id: "skills", name: "skills", type: "text", category: "PORTFOLIO", description: "Technical skills and expertise" },
  { id: "education", name: "education", type: "text", category: "BACKGROUND", description: "Academic journey" },
  { id: "contact", name: "contact", type: "text", category: "CONNECT", description: "Get in touch" },
  { id: "lounge", name: "lounge", type: "voice", category: "VOICE", description: "Hang out and chat" },
];

export const MEMBERS: MemberData[] = [
  {
    id: "vishnu",
    name: "Vishnu Vivek",
    discriminator: "0001",
    status: "online",
    activity: "Building cool stuff",
    roles: ["Server Owner", "Full-Stack Dev", "React", "Go", "ML Engineer"],
    isOwner: true,
  },
  {
    id: "portfolio-bot",
    name: "Portfolio Bot",
    discriminator: "0000",
    status: "online",
    activity: "Serving /commands",
    roles: ["Bot", "Verified Bot"],
    isBot: true,
  },
  {
    id: "recruiter",
    name: "Friendly Recruiter",
    discriminator: "4521",
    status: "online",
    activity: "Looking for talent",
    roles: ["Visitor"],
  },
  {
    id: "dev-friend",
    name: "Dev Friend",
    discriminator: "1337",
    status: "idle",
    activity: "In VS Code",
    roles: ["Developer"],
  },
  {
    id: "viewer",
    name: "You",
    discriminator: "9999",
    status: "online",
    roles: ["New Member"],
  },
];
