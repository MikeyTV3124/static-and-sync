"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Mic, Radio, Sliders, User, Volume2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type ProductionMember = {
  name: string;
  role: string;
  bio: string;
};

type Character = {
  id: string;
  name: string;
  role: string;
  actor: string;
  bio: string;
  audioSample: string;
};

const productionTeam: ProductionMember[] = [
  {
    name: "Mikey V",
    role: "Creator / Audio Engineer",
    bio: "The architect behind the soundscapes of Arroyo. Responsible for writing, directing, and the immersive audio design.",
  },
  {
    name: "Zac Clemens",
    role: "Lead Voice Actor",
    bio: "The vocal chameleon bringing the sprawl to life, providing the voices for Leo, Vesper, Julian, The Owner, and the Narrator.",
  },
];

const characterDatabase: Character[] = [
  {
    id: "leo",
    name: "Leo",
    role: "Diner Cook",
    actor: "Voiced by Zac Clemens",
    bio: "A reclusive worker just trying to keep his head down in the sprawl, until a rogue connection changes everything.",
    audioSample: "/samples/leo.mp3",
  },
  {
    id: "vesper",
    name: "Vesper.OS",
    role: "Rogue AI",
    actor: "Voiced by Zac Clemens",
    bio: "An advanced, untethered artificial intelligence housed within a midnight blue datapad.",
    audioSample: "/samples/vesper.mp3",
  },
  {
    id: "julian",
    name: "Julian",
    role: "Arroyo Local",
    actor: "Voiced by Zac Clemens",
    bio: "A regular face in the neon-lit underbelly of the city.",
    audioSample: "/samples/julian.mp3",
  },
  {
    id: "owner",
    name: "The Owner",
    role: "Diner Proprietor",
    actor: "Voiced by Zac Clemens",
    bio: "The grizzled manager of the midnight shift where Leo works.",
    audioSample: "/samples/owner.mp3",
  },
];

function SectionToggle({
  label,
  isExpanded,
  onToggle,
}: {
  label: string;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={isExpanded}
      className="w-full flex items-center justify-between gap-4 rounded-xl border border-white/10 px-4 py-3 text-left transition-colors hover:bg-white/5 hover:border-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/40"
    >
      <span className="ui-label text-[9px] tracking-[0.35em] text-accent-cyan/80 uppercase">
        {label}
      </span>
      <motion.span
        animate={{ rotate: isExpanded ? 180 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="shrink-0 text-accent-cyan/70"
      >
        <ChevronDown size={18} />
      </motion.span>
    </button>
  );
}

function ProductionCard({
  member,
  icon: Icon,
}: {
  member: ProductionMember;
  icon: LucideIcon;
}) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="relative bg-[#112240]/40 backdrop-blur-md rounded-2xl border border-white/5 hover:border-[#B392F0]/30 p-6 transition-colors"
    >
      <Icon
        size={18}
        className="absolute top-5 right-5 text-text-primary/20 pointer-events-none"
        aria-hidden
      />

      <div className="space-y-4 pr-6">
        <div className="space-y-2">
          <h3 className="ui-label text-lg text-text-primary">{member.name}</h3>
          <span className="ui-label block text-[9px] tracking-[0.2em] uppercase text-text-secondary">
            {member.role}
          </span>
        </div>

        <p className="text-sm text-text-secondary leading-relaxed">{member.bio}</p>
      </div>
    </motion.article>
  );
}

function CharacterCard({
  character,
  isPlaying,
  onToggleAudio,
}: {
  character: Character;
  isPlaying: boolean;
  onToggleAudio: (id: string, url: string) => void;
}) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="relative bg-[#112240]/40 backdrop-blur-md rounded-2xl border border-white/5 hover:border-[#64FFDA]/30 p-6 transition-colors"
    >
      <User
        size={18}
        className="absolute top-5 right-5 text-text-primary/20 pointer-events-none"
        aria-hidden
      />

      <div className="space-y-4 pr-6">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between gap-3">
            <h3 className="ui-label text-lg text-text-primary">{character.name}</h3>
            <motion.button
              type="button"
              onClick={() => onToggleAudio(character.id, character.audioSample)}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              className="shrink-0 flex items-center justify-center w-9 h-9 rounded-full bg-[#64FFDA]/10 text-[#64FFDA] hover:bg-[#64FFDA]/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/50"
              aria-label={isPlaying ? `Pause ${character.name} sample` : `Play ${character.name} sample`}
            >
              {isPlaying ? (
                <Radio size={16} className="animate-pulse" />
              ) : (
                <Volume2 size={16} />
              )}
            </motion.button>
          </div>
          <span className="ui-label block text-[9px] tracking-[0.2em] uppercase text-text-secondary">
            {character.role}
          </span>
          <p className="text-xs italic text-slate-400">{character.actor}</p>
        </div>

        <p className="text-sm text-text-secondary leading-relaxed">{character.bio}</p>
      </div>
    </motion.article>
  );
}

export default function PersonnelGrid() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [isCrewExpanded, setIsCrewExpanded] = useState(true);
  const [isCharactersExpanded, setIsCharactersExpanded] = useState(false);

  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;

    const handleEnded = () => setPlayingId(null);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.pause();
      audio.removeEventListener("ended", handleEnded);
      audioRef.current = null;
    };
  }, []);

  const toggleAudio = useCallback((id: string, url: string) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playingId === id) {
      audio.pause();
      setPlayingId(null);
      return;
    }

    audio.pause();
    audio.src = url;
    audio.currentTime = 0;

    void audio.play()
      .then(() => setPlayingId(id))
      .catch(() => setPlayingId(null));
  }, [playingId]);

  return (
    <section className="w-full space-y-6">
      <div className="space-y-3">
        <SectionToggle
          label="/// PRODUCTION CLEARANCE ///"
          isExpanded={isCrewExpanded}
          onToggle={() => setIsCrewExpanded((prev) => !prev)}
        />

        <AnimatePresence initial={false}>
          {isCrewExpanded && (
            <motion.div
              key="production-grid"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-3">
                {productionTeam.map((member) => (
                  <ProductionCard
                    key={member.name}
                    member={member}
                    icon={member.role.includes("Audio") ? Sliders : Mic}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="space-y-3">
        <SectionToggle
          label="/// ARROYO DATABASE // CHARACTER DOSSIERS ///"
          isExpanded={isCharactersExpanded}
          onToggle={() => setIsCharactersExpanded((prev) => !prev)}
        />

        <AnimatePresence initial={false}>
          {isCharactersExpanded && (
            <motion.div
              key="character-grid"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-3">
                {characterDatabase.map((character) => (
                  <CharacterCard
                    key={character.id}
                    character={character}
                    isPlaying={playingId === character.id}
                    onToggleAudio={toggleAudio}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
