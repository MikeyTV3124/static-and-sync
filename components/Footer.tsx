import {
  FaInstagram,
  FaRedditAlien,
  FaTiktok,
  FaTwitter,
} from "react-icons/fa";
import type { IconType } from "react-icons";
import SubscribeBadges from "@/components/SubscribeBadges";

const socialLinks: { label: string; icon: IconType; href: string }[] = [
  {
    label: "Twitter",
    icon: FaTwitter,
    href: "https://twitter.com/StaticSyncPod",
  },
  {
    label: "Instagram",
    icon: FaInstagram,
    href: "https://instagram.com/StaticSyncPod",
  },
  {
    label: "TikTok",
    icon: FaTiktok,
    href: "https://tiktok.com/@StaticSyncPod",
  },
  {
    label: "Reddit",
    icon: FaRedditAlien,
    href: "https://reddit.com/r/StaticAndSync",
  },
];

export default function Footer() {
  return (
    <footer className="w-full mt-20 pt-24 pb-8 bg-[#050d18]/80">
      <div className="max-w-6xl mx-auto px-6 flex flex-col">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-8">
          <div className="flex items-center gap-3">
            {socialLinks.map(({ label, icon: Icon, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex items-center justify-center w-9 h-9 rounded-full border border-white/10 bg-white/5 text-text-secondary opacity-70 transition-opacity hover:opacity-100"
              >
                <Icon size={16} aria-hidden />
              </a>
            ))}
          </div>

          <a
            href="#"
            className="ui-label text-[9px] tracking-[0.2em] text-text-secondary uppercase transition-colors hover:text-accent-cyan hover:[text-shadow:0_0_12px_rgba(100,255,218,0.45)]"
          >
            [ ACCESS PRESS KIT ]
          </a>
        </div>

        <div className="flex justify-center mb-6">
          <SubscribeBadges />
        </div>

        <div className="border-t border-white/5 pt-6 mt-6 text-center">
          <p className="text-[10px] text-text-secondary/70 tracking-wide">
            © 2026 STATIC & SYNC // ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
}
