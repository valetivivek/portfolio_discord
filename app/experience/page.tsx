import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experience",
  description: "My professional experience as a Graduate Student Assistant at University of Florida and Software Development roles at Vignan University.",
  openGraph: {
    title: "Experience | Vishnu Vivek",
    description: "My professional experience as a Graduate Student Assistant at University of Florida and Software Development roles at Vignan University.",
  },
};

import DiscordApp from "@/components/discord/DiscordApp";

export default function ExperiencePage() {
  return <DiscordApp initialChannel="announcements" />;
}


