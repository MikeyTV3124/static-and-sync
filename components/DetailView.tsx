"use client";

import { motion } from "framer-motion";

type DetailViewProps = {
  data: any;
  onBack: () => void;
  type: "member" | "character";
};

export default function DetailView({ data, onBack, type }: DetailViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="space-y-6"
    >
      <button
        type="button"
        onClick={onBack}
        className="
          sticky top-0 z-10
          bg-[#0A192F]/80 backdrop-blur-md
          ui-label text-[10px] tracking-[0.2em] uppercase
          px-4 py-2 transition-all duration-200
          border border-accent-cyan/30 text-accent-cyan/60
          hover:bg-accent-cyan/10 hover:border-accent-cyan hover:text-white
        "
      >
        [ &lt; BACK TO DATABASE ]
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-5 items-start gap-6 bg-[#112240]/40 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
        <div className="lg:col-span-2 sticky top-24">
          <div className="relative w-full aspect-[3/4] rounded-xl border border-white/10 bg-white/5 overflow-hidden">
            {data.imageUrl ? (
              <img
                src={data.imageUrl}
                alt={data.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <>
                <div className="absolute inset-0 opacity-30 bg-[linear-gradient(0deg,transparent_24%,rgba(100,255,218,0.08)_25%,rgba(100,255,218,0.08)_26%,transparent_27%,transparent_74%,rgba(100,255,218,0.08)_75%,rgba(100,255,218,0.08)_76%,transparent_77%,transparent),linear-gradient(90deg,transparent_24%,rgba(100,255,218,0.08)_25%,rgba(100,255,218,0.08)_26%,transparent_27%,transparent_74%,rgba(100,255,218,0.08)_75%,rgba(100,255,218,0.08)_76%,transparent_77%,transparent)] bg-[length:36px_36px]" />
                <div className="absolute inset-0 flex items-center justify-center text-text-secondary/60 ui-label text-xs tracking-[0.2em] uppercase">
                  Portrait Pending
                </div>
              </>
            )}
          </div>
        </div>

        <div className="lg:col-span-3 space-y-5 text-left">
          <div className="space-y-2">
            <h2 className="ui-label text-2xl text-text-primary">{data.name}</h2>
            <p className="ui-label text-xs tracking-[0.2em] uppercase text-accent-cyan">
              {data.role}
            </p>
            {type === "character" && data.actor ? (
              <p className="text-xs italic text-text-secondary/80">{data.actor}</p>
            ) : null}
          </div>

          <div>
            <h3 className="ui-label text-[10px] tracking-[0.2em] text-text-secondary uppercase mb-2">
              // BIOGRAPHIC ENTRY
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed">{data.bio}</p>
          </div>

          <div>
            <h3 className="ui-label text-[10px] tracking-[0.2em] text-text-secondary uppercase mb-2">
              // PERSONAL CLEARANCE
            </h3>
            {Array.isArray(data.socials) && data.socials.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {data.socials.map((social: { label: string; url: string }) => (
                  <a
                    key={`${data.name}-${social.label}`}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ui-label text-[9px] tracking-[0.15em] uppercase px-3 py-1.5 border border-accent-cyan/30 bg-transparent text-accent-cyan/70 transition-colors hover:bg-accent-cyan/10 hover:border-accent-cyan hover:text-white"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            ) : (
              <p className="text-xs text-text-secondary/70">Record Incomplete</p>
            )}
          </div>

          <div>
            <h3 className="ui-label text-[10px] tracking-[0.2em] text-text-secondary uppercase mb-2">
              // EXTENDED DOSSIER
            </h3>
            {data.extendedBio ? (
              <p className="text-sm text-text-secondary leading-relaxed">{data.extendedBio}</p>
            ) : (
              <p className="text-xs text-text-secondary/70">Record Incomplete</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="rounded-lg border border-white/10 bg-white/5 p-3">
              <p className="ui-label text-[9px] tracking-[0.2em] uppercase text-text-secondary">
                Profile Type
              </p>
              <p className="text-sm text-text-primary mt-1">
                {type === "member" ? "Production Team" : "Character Dossier"}
              </p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/5 p-3">
              <p className="ui-label text-[9px] tracking-[0.2em] uppercase text-text-secondary">
                Status
              </p>
              <p className="text-sm text-text-primary mt-1">Active Record</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
