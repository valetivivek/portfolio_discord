# Vishnu Vivek Valeti — Portfolio

![Project Banner](https://img.shields.io/badge/Status-Active-success?style=for-the-badge) ![Tech Stack](https://img.shields.io/badge/Stack-Next.js_14_•_TypeScript_•_Tailwind-blue?style=for-the-badge)

A **unique, interactive portfolio experience** that reimagines the developer identity through the familiar interface of Discord. Built with performance, accessibility, and attention to detail in mind, this project demonstrates advanced frontend engineering skills using modern web technologies.

[**View Live Demo**](https://valetiportfolio.vercel.app/)

## ✨ Key Features

- **Discord Simulation**: A pixel-perfect recreation of the Discord UI, including servers, channels, and message interactions.
- **Interactive Slash Commands**: Type `/` to access a command palette for navigation (`/projects`, `/resume`, `/contact`) or utility (`/clear`).
- **Dynamic Content Rendering**: Channel-based routing that loads content (About, Experience, Projects) dynamically without full page refreshes.
- **Keyboard Navigation**: Full keyboard support for slash commands and message input, mimicking desktop app behavior.
- **Responsive Design**: Mobile-friendly sidebar implementation with smooth transitions and touch-friendly interactions.
- **Optimized Performance**: Built on Next.js App Router with React Server Components for fast initial loads and SEO content.

## 🛠️ Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Vercel

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/valetivivek/portfolio_discord.git

# Navigate to project directory
cd portfolio_discord

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

```bash
├── app/
│   ├── components/         # Reusable UI components
│   │   └── discord/        # Discord-specific UI (Sidebar, Chat, Messages)
│   ├── context/            # React Context for app state (DiscordContext)
│   └── layout.tsx          # Root layout and metadata
├── content/                # Static content data (Projects, Experience)
├── public/                 # Static assets (Resume, Images)
└── styles/                 # Global styles and Tailwind configuration
```

## ☁️ Deployment

This project is optimized for deployment on **Vercel**.

1. Push your changes to GitHub.
2. Import the project into Vercel.
3. Vercel will automatically detect the Next.js framework and configure the build settings.
4. Deploy!

## 🧩 Customization

- **Content**: Update `app/components/discord/data.ts` to modify channels, server name, and user details.
- **Profile**: Edit `app/components/discord/ProfileModal.tsx` to customize the user profile popup.
- **Theme**: Colors are defined in `tailwind.config.ts` using Discord's color palette (e.g., `#313338`, `#5865F2`).

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---
*Designed and built by Vishnu Vivek Valeti.*