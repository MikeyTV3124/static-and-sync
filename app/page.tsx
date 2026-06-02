"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Radio } from "lucide-react";
import { FaInstagram, FaRedditAlien, FaTiktok, FaTwitter } from "react-icons/fa";
import VesperPlayer from "@/components/VesperPlayer";
import TranscriptPane from "@/components/TranscriptPane";
import PersonnelGrid from "@/components/PersonnelGrid";
import SubscribeBadges from "@/components/SubscribeBadges";
import Footer from "@/components/Footer";

export default function Home() {
  const [globalTime, setGlobalTime] = useState(0);

  const topSocialLinks = [
    {
      label: "Twitter",
      href: "https://twitter.com/StaticSyncPod",
      Icon: FaTwitter,
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

      <div className="z-10 w-full max-w-6xl mt-20 space-y-10">
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-white/10" />
          <span className="ui-label text-[9px] tracking-[0.35em] text-text-secondary/60 uppercase whitespace-nowrap">
            /// PERSONNEL FILES ///
          </span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          <PersonnelGrid />
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}
