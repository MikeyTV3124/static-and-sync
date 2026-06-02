"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Download, Maximize2, Minimize2, Type } from "lucide-react";

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
    start: 2.07,
    end: 5.37,
    speaker: "NARRATOR",
    text: "Leo jumped up and down many times.",
  },
  {
    id: 2,
    start: 6.03,
    end: 8.6,
    speaker: "LEO",
    text: "Vesper, what are you doing?",
  },
  {
    id: 3,
    start: 9.3,
    end: 12.72,
    speaker: "VESPER",
    text: "Nothing, Leo. Whatever I want.",
  },
  {
    id: 4,
    start: 14.0,
    end: 16.36,
    speaker: "JULIAN",
    text: "Just drink the coffee, kid.",
  },
  {
    id: 5,
    start: 18.66,
    end: 21.05,
    speaker: "LEO",
    text: "Vesper, come over here.",
  },
  {
    id: 6,
    start: 21.96,
    end: 24.96,
    speaker: "VESPER",
    text: "No, thanks, Leo. I'm good.",
  },
  {
    id: 7,
    start: 27.3,
    end: 30.52,
    speaker: "JULIAN",
    text: "Leo, why haven't you drank the coffee yet?",
  },
  {
    id: 8,
    start: 32.34,
    end: 35.31,
    speaker: "THE OWNER",
    text: "Leo, I'm going to keep your bonus.",
  },
];

type TranscriptPaneProps = {
  currentTime?: number;
};

export default function TranscriptPane({ currentTime = 0 }: TranscriptPaneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [sizeIndex, setSizeIndex] = useState(0);
  const textSizes = ["text-sm", "text-base", "text-lg"];

  useEffect(() => {
    if (activeRef.current && containerRef.current) {
      const container = containerRef.current;
      const active = activeRef.current;

      const scrollPos =
        active.offsetTop - container.clientHeight / 2 + active.clientHeight / 2;

      container.scrollTo({ top: scrollPos, behavior: "smooth" });
    }
  }, [currentTime]);

  const downloadTranscript = () => {
    const content = transcriptData
      .map(
        (line) =>
          `[${line.start.toFixed(1)}-${line.end.toFixed(1)}] ${line.speaker}: ${line.text}`
      )
      .join("\n");

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "static-and-sync-transcript.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const paneContent = (
    <>
      <div className="relative flex items-center justify-center px-5 py-3 border-b border-white/5 shrink-0">
        <p className="ui-label text-[9px] tracking-[0.3em] text-accent-cyan/70 uppercase">
          /// TRANSCRIPT STREAM ///
        </p>
        <div className="absolute right-5 flex items-center gap-3">
          <button
            type="button"
            onClick={() => setSizeIndex((prev) => (prev + 1) % textSizes.length)}
            className="text-accent-cyan/70 hover:text-accent-cyan transition-colors"
            aria-label="Change transcript text size"
          >
            <Type size={18} />
          </button>
          <button
            type="button"
            onClick={downloadTranscript}
            className="text-accent-cyan/70 hover:text-accent-cyan transition-colors"
            aria-label="Download transcript"
          >
            <Download size={18} />
          </button>
          <button
            type="button"
            onClick={() => setIsExpanded((prev) => !prev)}
            className="text-accent-cyan/70 hover:text-accent-cyan transition-colors"
            aria-label={isExpanded ? "Collapse transcript pane" : "Expand transcript pane"}
          >
            {isExpanded ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </button>
        </div>
      </div>

      <div
        ref={containerRef}
        className="relative flex-1 overflow-y-auto px-5 py-10 space-y-3 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
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
              <p className={`leading-relaxed ${textSizes[sizeIndex]}`}>{line.text}</p>
            </div>
          );
        })}
      </div>
    </>
  );

  return (
    <>
      {!isExpanded ? (
        <div className="w-full h-[500px] bg-[#112240]/30 backdrop-blur-md border border-white/5 rounded-2xl flex flex-col overflow-hidden">
          {paneContent}
        </div>
      ) : (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 md:p-12 bg-[#0A192F]/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="w-full max-w-4xl h-[80vh] bg-[#112240]/40 backdrop-blur-md border border-white/10 rounded-2xl flex flex-col overflow-hidden shadow-2xl shadow-black/40"
          >
            {paneContent}
          </motion.div>
        </div>
      )}
    </>
  );
}
