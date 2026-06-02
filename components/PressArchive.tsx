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
          <div className="flex flex-col gap-3 mt-4">
            <AssetButton
              label="S01E01 TRANSCRIPT TEST AUDIO (MP3)"
              href="/Static & Sync - S01E01 - Test Audio for Transcripts.mp3"
            />
            <p className="text-sm text-text-secondary/80 leading-relaxed">
              Use this stream-safe test file to validate transcript timing and sync
              behavior.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
