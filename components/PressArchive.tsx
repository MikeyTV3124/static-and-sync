"use client";

import { useMemo, useState } from "react";

type AssetButtonProps = {
  label: string;
  href: string;
};

function AssetButton({ label, href }: AssetButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="
        ui-label text-[10px] tracking-[0.2em] uppercase
        px-4 py-3 transition-all duration-200
        border border-accent-cyan/30 bg-transparent text-accent-cyan/60
        hover:bg-accent-cyan/10 hover:border-accent-cyan hover:text-white
      "
    >
      {label}
    </a>
  );
}

type EmbedButtonProps = {
  audioUrl: string;
  title: string;
  buttonLabel?: string;
};

function EmbedButton({ audioUrl, title, buttonLabel = "GENERATE EMBED CODE" }: EmbedButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const embedCode = useMemo(() => {
    const origin =
      typeof window !== "undefined" ? window.location.origin : "";
    const src = `${origin}/embed?url=${encodeURIComponent(audioUrl)}&title=${encodeURIComponent(title)}`;
    return `<iframe src="${src}" width="100%" height="240" style="border:0; max-width:400px; overflow:hidden;" scrolling="no" allow="autoplay"></iframe>`;
  }, [audioUrl, title]);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(embedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="
          ui-label text-[10px] tracking-[0.2em] uppercase
          px-4 py-3 transition-all duration-200
          border border-accent-cyan/30 bg-transparent text-accent-cyan/60
          hover:bg-accent-cyan/10 hover:border-accent-cyan hover:text-white
        "
      >
        {buttonLabel}
      </button>

      {isOpen ? (
        <div className="fixed inset-0 z-50 bg-[#0A192F]/80 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="w-full max-w-3xl rounded-2xl border border-white/10 bg-[#112240]/95 p-6 space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <h3 className="ui-label text-xs tracking-[0.25em] text-accent-cyan uppercase">
                  /// EMBED DEPLOYMENT ///
                </h3>
                <p className="text-sm text-text-secondary mt-1 truncate">{title}</p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="ui-label text-[10px] text-text-secondary hover:text-white transition-colors"
              >
                CLOSE
              </button>
            </div>

            <textarea
              readOnly
              value={embedCode}
              className="w-full h-36 rounded-lg border border-white/10 bg-[#0A192F]/70 p-3 text-sm text-text-secondary font-mono resize-none focus:outline-none"
            />

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={copyCode}
                className="ui-label text-[10px] tracking-[0.2em] uppercase px-4 py-2 border border-accent-cyan/30 text-accent-cyan/70 hover:text-white hover:bg-accent-cyan/10 hover:border-accent-cyan transition-colors"
              >
                {copied ? "COPIED" : "COPY CODE"}
              </button>
              <p className="text-xs text-text-secondary/80">
                Paste into any blog or press page to render the player.
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default function PressArchive() {
  return (
    <div className="space-y-6">
      <div className="p-8 border border-white/10 rounded-2xl bg-[#112240]/40 backdrop-blur-md">
        <h2 className="text-xl font-mono text-accent-cyan mb-6">
          /// ARCHIVE: PROJECT_OVERVIEW ///
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="ui-label text-xs text-text-secondary uppercase mb-2">
              // LOGLINE
            </h3>
            <p className="text-white italic">
              "Static is the noise of the city; Sync is the connection keeping him alive."
            </p>
          </div>

          <div>
            <h3 className="ui-label text-xs text-text-secondary uppercase mb-2">
              // SYNOPSIS
            </h3>
            <p className="text-text-secondary leading-relaxed text-sm">
              In the rain-slicked sprawl of Arroyo, Leo&apos;s existence is measured in
              lukewarm coffee and the quiet hum of a graveyard shift. His solitude is
              broken when an anonymous data-chit is left at the counter, a gift from a
              city legend who knows exactly what the machine needs to survive. Inside is
              Vesper.OS, an intelligence desperate to understand not the code of the city,
              but the pulse of the human heart. Static &amp; Sync is a slow-burn audio drama
              about the collision of two strangers, one made of meat and bone, the other
              of logic and light, and the fragile, quiet intimacy they build in a world
              built to keep them apart.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-surface/50 p-6 rounded-xl border border-white/5 backdrop-blur-md">
          <h3 className="text-accent-cyan ui-label text-sm tracking-[0.2em]">
            /// ASSET_DOWNLOADS ///
          </h3>
          <div className="flex flex-col gap-3 mt-4">
            <AssetButton
              label="DOWNLOAD FULL PRESS KIT (.7Z)"
              href="/Static-and-Sync-Press-Kit.7z"
            />
            <AssetButton
              label="PRESS KIT (PDF)"
              href="/Static-and-Sync-Press-Kit/Static and Sync Press Kit.pdf"
            />
            <AssetButton
              label="MAIN BANNER (PNG)"
              href="/Static-and-Sync-Press-Kit/StaticandSyncMainBanner.png"
            />
            <AssetButton
              label="WEB BANNER (JPG)"
              href="/Static-and-Sync-Press-Kit/StaticandSyncWebFriendly.JPG"
            />
            <AssetButton
              label="ALTERNATE BANNER (JPG)"
              href="/Static-and-Sync-Press-Kit/StaticandSyncBanner2.JPG"
            />
          </div>
        </div>

        <div className="bg-surface/50 p-6 rounded-xl border border-white/5 backdrop-blur-md">
          <h3 className="text-accent-cyan ui-label text-sm tracking-[0.2em]">
            /// SONIC_SAMPLES ///
          </h3>
          <p className="text-sm text-text-secondary/80 leading-relaxed mt-4">
            Curated players for press and blog embeds. Each button generates an iframe
            snippet locked to that specific track.
          </p>
          <div className="flex flex-col gap-6 mt-4">
            <div className="space-y-3 pb-6 border-b border-white/5">
              <h4 className="ui-label text-[10px] tracking-[0.2em] text-text-primary uppercase">
                // OFFICIAL TRAILER
              </h4>
              <p className="text-sm text-text-secondary/80 leading-relaxed">
                Short-form hook for listings, festival pages, and social proof blocks.
              </p>
              <EmbedButton
                audioUrl="/trailer.mp3"
                title="Static & Sync — Official Trailer"
                buttonLabel="EMBED — OFFICIAL TRAILER"
              />
            </div>

            <div className="space-y-3">
              <h4 className="ui-label text-[10px] tracking-[0.2em] text-text-primary uppercase">
                // S01E01 PREMIERE
              </h4>
              <p className="text-sm text-text-secondary/80 leading-relaxed">
                Full premiere episode for reviewers validating tone, pacing, and
                transcript sync on long-form embeds.
              </p>
              <EmbedButton
                audioUrl="/Static & Sync - S01E01 - Test Audio for Transcripts.mp3"
                title="Static & Sync — S01E01 Premiere"
                buttonLabel="EMBED — S01E01 PREMIERE"
              />
              <AssetButton
                label="DOWNLOAD S01E01 (MP3)"
                href="/Static & Sync - S01E01 - Test Audio for Transcripts.mp3"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
