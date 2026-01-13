import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Vishnu Vivek for full-time SDE and full-stack roles. Open to new opportunities and collaborations.",
  openGraph: {
    title: "Contact | Vishnu Vivek",
    description: "Get in touch with Vishnu Vivek for full-time SDE and full-stack roles.",
  },
};

import DiscordApp from "@/components/discord/DiscordApp";

export default function ContactPage() {
  return <DiscordApp initialChannel="contact" />;
}


