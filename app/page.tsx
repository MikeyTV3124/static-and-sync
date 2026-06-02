"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Radio } from "lucide-react";
import {
  FaInstagram,
  FaPatreon,
  FaRedditAlien,
  FaTiktok,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import VesperPlayer from "@/components/VesperPlayer";
import TranscriptPane from "@/components/TranscriptPane";
import PersonnelFiles from "@/components/PersonnelFiles";
import PressArchive from "@/components/PressArchive";
import SubscribeBadges from "@/components/SubscribeBadges";
import ViewingPort from "@/components/ViewingPort";
import Footer from "@/components/Footer";

export default function Home() {
  const [globalTime, setGlobalTime] = useState(0);
  const [currentView, setCurrentView] = useState("home");

  const topSocialLinks = [
    {
      label: "X",
      href: "https://twitter.com/StaticSyncPod",
      Icon: FaXTwitter,
    },
    {
      label: "Instagram",
      href: "https://instagram.com/StaticSyncPod",
      Icon: FaInstagram,
    },
    {
      label: "TikTok",
      href: "https://tiktok.com/@StaticSyncPod",
      Icon: FaTiktok,
    },
    {
      label: "Reddit",
      href: "https://reddit.com/r/StaticAndSync",
      Icon: FaRedditAlien,
    },
    {
      label: "Patreon",
      href: "https://www.patreon.com/c/StaticSyncPod",
      Icon: FaPatreon,
    },
  ];

  return (
    <main className="relative flex min-h-screen flex-col items-center p-6 md:p-24">
      {/* Intimate Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent-cyan/5 blur-[120px] rounded-full pointer-events-none" />

      <header className="absolute top-0 right-0 w-full p-6 flex justify-end gap-4 z-50">
        {topSocialLinks.map(({ label, href, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="text-text-secondary/50 hover:text-accent-cyan transition-colors"
          >
            <Icon size={20} aria-hidden />
          </a>
        ))}
      </header>

      <div className="z-10 w-full max-w-6xl flex flex-col items-center text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-4 max-w-3xl"
        >
          <div className="flex items-center justify-center space-x-2 text-accent-cyan mb-4">
            <Radio size={20} className="animate-pulse" />
            <span className="ui-label text-xs uppercase tracking-[0.3em]">Signal Established</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-white">
            STATIC & SYNC
          </h1>

          <p className="text-accent-violet ui-label text-sm md:text-base italic">
            "Static is the crushing noise of the city; Sync is the connection keeping him alive."
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="bg-surface/50 border border-white/10 p-8 rounded-2xl backdrop-blur-md max-w-2xl w-full"
        >
          <p className="text-text-secondary leading-relaxed">
            In the rain-slicked sprawl of Arroyo, a reclusive diner cook finds his world
            inextricably bound to a rogue AI in this grounded, intimate cyberpunk drama.
          </p>
        </motion.div>

        <div className="w-full pb-4">
          <SubscribeBadges />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
          className="w-full max-w-5xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-10 items-stretch justify-center"
        >
          <div className="w-full lg:w-auto flex justify-center">
            <VesperPlayer onTimeUpdate={setGlobalTime} />
          </div>
          <div className="w-full lg:flex-1 max-w-2xl mx-auto">
            <TranscriptPane currentTime={globalTime} />
          </div>
        </motion.div>
      </div>

      <div className="z-10 w-full max-w-6xl mt-20">
        <div className="module-nav flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setCurrentView("home")}
            className={`
              px-4 py-2 font-mono text-sm transition-all duration-200
              border border-accent-cyan/30
              ${currentView === "home" ? "bg-accent-cyan/20 text-white" : "bg-transparent text-accent-cyan/60"}
              hover:bg-accent-cyan/10 hover:border-accent-cyan
            `}
          >
            PERSONNEL
          </button>
          <button
            type="button"
            onClick={() => setCurrentView("press")}
            className={`
              px-4 py-2 font-mono text-sm transition-all duration-200
              border border-accent-cyan/30
              ${currentView === "press" ? "bg-accent-cyan/20 text-white" : "bg-transparent text-accent-cyan/60"}
              hover:bg-accent-cyan/10 hover:border-accent-cyan
            `}
          >
            PRESS
          </button>
        </div>

        <div className="mt-4">
          <ViewingPort>
            {currentView === "home" ? <PersonnelFiles /> : <PressArchive />}
          </ViewingPort>
        </div>
      </div>

      <Footer onAccessPress={() => setCurrentView("press")} />
    </main>
  );
}
