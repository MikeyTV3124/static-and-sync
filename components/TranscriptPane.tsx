"use client";

import { useEffect, useRef } from "react";

type TranscriptLine = {
  id: number;
  start: number;
  end: number;
  speaker: string;
  text: string;
};

const transcriptData: TranscriptLine[] = [
  {
    id: 1,
    start: 0,
    end: 4,
    speaker: "SYSTEM",
    text: "Audio connection established.",
  },
  {
    id: 2,
    start: 4.5,
    end: 8,
    speaker: "LEO",
    text: "Vesper, you reading this? The rain is shorting out the neon down here.",
  },
  {
    id: 3,
    start: 8.5,
    end: 12,
    speaker: "VESPER",
    text: "Signal is degraded, Leo. Rerouting through the localized mesh.",
  },
];

type TranscriptPaneProps = {
  currentTime?: number;
};

export default function TranscriptPane({ currentTime = 0 }: TranscriptPaneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeRef.current) {
      activeRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [currentTime]);

  return (
    <div className="w-full h-[500px] bg-[#112240]/30 backdrop-blur-md border border-white/5 rounded-2xl flex flex-col overflow-hidden">
      <div className="shrink-0 px-5 py-3 border-b border-white/5">
        <p className="ui-label text-[9px] tracking-[0.3em] text-accent-cyan/70 uppercase">
          /// TRANSCRIPT STREAM ///
        </p>
      </div>

      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto px-5 py-4 space-y-3 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#64FFDA]/20 [scrollbar-width:thin] [scrollbar-color:rgba(100,255,218,0.2)_transparent]"
      >
        {transcriptData.map((line) => {
          const isActive = currentTime >= line.start && currentTime <= line.end;

          return (
            <div
              key={line.id}
              ref={isActive ? activeRef : null}
              className={`rounded-lg px-3 py-2.5 transition-all duration-300 ease-in-out ${
                isActive
                  ? "text-[#64FFDA] bg-[#64FFDA]/10"
                  : "text-text-secondary/50"
              }`}
            >
              <p className="ui-label text-[9px] tracking-[0.2em] uppercase mb-1">
                {line.speaker}
              </p>
              <p className="text-sm leading-relaxed">{line.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
