import { FaApple, FaRss, FaSpotify } from "react-icons/fa";
import type { IconType } from "react-icons";

const platforms: { label: string; icon: IconType; href: string }[] = [
  { label: "Apple Podcasts", icon: FaApple, href: "#" },
  { label: "Spotify", icon: FaSpotify, href: "#" },
  {
    label: "RSS Feed",
    icon: FaRss,
    href: "https://media.rss.com/static-sync/feed.xml",
  },
];

export default function SubscribeBadges() {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {platforms.map(({ label, icon: Icon, href }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-5 py-2.5 text-sm text-text-primary transition-colors hover:bg-white/10 hover:border-[#64FFDA]/50"
        >
          <Icon className="text-accent-cyan shrink-0" size={16} aria-hidden />
          <span>{label}</span>
        </a>
      ))}
    </div>
  );
}
