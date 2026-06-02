"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Pause, Play } from "lucide-react";

type Episode = {
  id: string;
  season: number;
  episodeNumber: number;
  title: string;
  audioUrl: string;
};

const episodeList: Episode[] = [
  {
    id: "test01",
    season: 1,
    episodeNumber: 1,
    title: "Sync Test",
    audioUrl: "/Static & Sync - S01E01 - Test Audio for Transcripts.mp3",
  },
  {
    id: "s01e02",
    season: 1,
    episodeNumber: 2,
    title: "Static Hum",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
  {
    id: "s01e03",
    season: 1,
    episodeNumber: 3,
    title: "Vesper Protocol",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  },
  {
    id: "s01e04",
    season: 1,
    episodeNumber: 4,
    title: "Rain on Chrome",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
  },
  {
    id: "s01e05",
    season: 1,
    episodeNumber: 5,
    title: "Diner at Midnight",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
  },
  {
    id: "s01e06",
    season: 1,
    episodeNumber: 6,
    title: "Sync Drift",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
  },
  {
    id: "s01e07",
    season: 1,
    episodeNumber: 7,
    title: "Ghost in the Wire",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
  },
  {
    id: "s01e08",
    season: 1,
    episodeNumber: 8,
    title: "Neon Communion",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
  },
  {
    id: "s01e09",
    season: 1,
    episodeNumber: 9,
    title: "Last Signal",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
  },
  {
    id: "s02e01",
    season: 2,
    episodeNumber: 1,
    title: "Signal Decay",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
  },
  {
    id: "s02e02",
    season: 2,
    episodeNumber: 2,
    title: "Broken Frequency",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3",
  },
];

const WAVE_BARS = 28;

const barHeights = Array.from({ length: WAVE_BARS }, (_, i) =>
  0.35 + Math.abs(Math.sin(i * 0.55)) * 0.65
);

function formatEpisodeCode(season: number, episodeNumber: number): string {
  return `S${season}E${String(episodeNumber).padStart(2, "0")}`;
}

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "00:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function groupEpisodesBySeason(episodes: Episode[]) {
  const groups = new Map<number, { episode: Episode; index: number }[]>();

  episodes.forEach((episode, index) => {
    const seasonEpisodes = groups.get(episode.season) ?? [];
    seasonEpisodes.push({ episode, index });
    groups.set(episode.season, seasonEpisodes);
  });

  return Array.from(groups.entries()).sort(([a], [b]) => a - b);
}

const RESYNC_DELAY_MS = 3500;

interface VesperPlayerProps {
  onTimeUpdate?: (time: number) => void;
}

export default function VesperPlayer({ onTimeUpdate }: VesperPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceConnectedRef = useRef(false);
  const useFallbackRef = useRef(false);
  const playAfterLoadRef = useRef(false);
  const currentEpisodeIndexRef = useRef(0);
  const resyncTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isResyncing, setIsResyncing] = useState(false);
  const [useFallback, setUseFallback] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const currentEpisode = episodeList[currentEpisodeIndex];
  const groupedEpisodes = groupEpisodesBySeason(episodeList);

  const clearResync = useCallback(() => {
    if (resyncTimeoutRef.current) {
      clearTimeout(resyncTimeoutRef.current);
      resyncTimeoutRef.current = null;
    }
    setIsResyncing(false);
  }, []);

  useEffect(() => {
    currentEpisodeIndexRef.current = currentEpisodeIndex;
  }, [currentEpisodeIndex]);

  const drawResyncGlitch = useCallback(() => {
    const canvas = canvasRef.current;
    const container = canvasContainerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    ctx.clearRect(0, 0, width, height);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#FF6B35";
    ctx.shadowBlur = 6;
    ctx.shadowColor = "#FF6B35";
    ctx.beginPath();
    ctx.moveTo(0, height / 2);

    for (let x = 0; x < width; x += 2) {
      const glitch = Math.random() > 0.94 ? (Math.random() - 0.5) * 18 : 0;
      ctx.lineTo(x, height / 2 + glitch);
    }

    ctx.stroke();
  }, []);

  const drawFlatLine = useCallback(() => {
    const canvas = canvasRef.current;
    const container = canvasContainerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    ctx.clearRect(0, 0, width, height);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#64FFDA";
    ctx.shadowBlur = 8;
    ctx.shadowColor = "#64FFDA";
    ctx.globalAlpha = 0.35;
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();
    ctx.globalAlpha = 1;
  }, []);

  const drawWaveform = useCallback(() => {
    const canvas = canvasRef.current;
    const container = canvasContainerRef.current;
    const analyser = analyserRef.current;
    if (!canvas || !container || !analyser) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = container.clientWidth;
    const height = container.clientHeight;
    const bufferLength = analyser.fftSize;
    const dataArray = new Uint8Array(bufferLength);

    analyser.getByteTimeDomainData(dataArray);
    ctx.clearRect(0, 0, width, height);

    ctx.lineWidth = 2;
    ctx.strokeStyle = "#64FFDA";
    ctx.shadowBlur = 8;
    ctx.shadowColor = "#64FFDA";
    ctx.beginPath();

    const sliceWidth = width / bufferLength;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      const v = dataArray[i] / 128;
      const y = (v * height) / 2;

      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);

      x += sliceWidth;
    }

    ctx.lineTo(width, height / 2);
    ctx.stroke();
  }, []);

  const stopVisualization = useCallback(() => {
    cancelAnimationFrame(animationRef.current);
    drawFlatLine();
  }, [drawFlatLine]);

  const startVisualization = useCallback(() => {
    cancelAnimationFrame(animationRef.current);

    const loop = () => {
      drawWaveform();
      animationRef.current = requestAnimationFrame(loop);
    };

    animationRef.current = requestAnimationFrame(loop);
  }, [drawWaveform]);

  const initAudioContext = useCallback(async (): Promise<boolean> => {
    const audio = audioRef.current;
    if (!audio) return false;

    if (sourceConnectedRef.current && analyserRef.current) return true;

    try {
      const AudioContextClass =
        window.AudioContext ??
        (
          window as typeof window & {
            webkitAudioContext: typeof AudioContext;
          }
        ).webkitAudioContext;

      const audioContext = new AudioContextClass();
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 2048;

      const source = audioContext.createMediaElementSource(audio);
      source.connect(analyser);
      analyser.connect(audioContext.destination);

      audioContextRef.current = audioContext;
      analyserRef.current = analyser;
      sourceConnectedRef.current = true;
      useFallbackRef.current = false;
      setUseFallback(false);
      return true;
    } catch {
      useFallbackRef.current = true;
      setUseFallback(true);
      return false;
    }
  }, []);

  const playCurrentTrack = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    const webAudioReady = await initAudioContext();

    if (audioContextRef.current?.state === "suspended") {
      await audioContextRef.current.resume();
    }

    try {
      await audio.play();
      if (webAudioReady && !useFallbackRef.current) {
        startVisualization();
      }
    } catch {
      setIsPlaying(false);
    }
  }, [initAudioContext, startVisualization]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      return;
    }

    await playCurrentTrack();
  };

  const selectEpisode = (index: number) => {
    if (index === currentEpisodeIndex) {
      setIsDropdownOpen(false);
      return;
    }

    clearResync();
    playAfterLoadRef.current = isPlaying;
    setCurrentEpisodeIndex(index);
    setIsDropdownOpen(false);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
    audio.currentTime = ratio * duration;
    setCurrentTime(audio.currentTime);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = canvasContainerRef.current;
    if (!canvas || !container) return;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = container.clientWidth;
      const height = container.clientHeight;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      canvas.width = width * dpr;
      canvas.height = height * dpr;

      const ctx = canvas.getContext("2d");
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      drawFlatLine();
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [drawFlatLine]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    stopVisualization();
    audio.pause();
    audio.src = currentEpisode.audioUrl;
    audio.load();
    setCurrentTime(0);
    setDuration(0);

    if (!playAfterLoadRef.current) {
      setIsPlaying(false);
      return;
    }

    playAfterLoadRef.current = false;

    const playWhenReady = () => {
      void playCurrentTrack();
      audio.removeEventListener("canplay", playWhenReady);
    };

    audio.addEventListener("canplay", playWhenReady);
    return () => audio.removeEventListener("canplay", playWhenReady);
  }, [currentEpisode.audioUrl, playCurrentTrack, stopVisualization]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      if (onTimeUpdate) onTimeUpdate(audio.currentTime);
    };
    const onLoadedMetadata = () => setDuration(audio.duration);
    const onPlay = () => {
      setIsPlaying(true);
      if (!useFallbackRef.current) startVisualization();
    };
    const onPause = () => {
      setIsPlaying(false);
      stopVisualization();
    };
    const onEnded = () => {
      stopVisualization();
      setIsPlaying(false);

      const nextIndex = currentEpisodeIndexRef.current + 1;
      if (nextIndex < episodeList.length) {
        setIsResyncing(true);
        resyncTimeoutRef.current = setTimeout(() => {
          playAfterLoadRef.current = true;
          setCurrentEpisodeIndex(nextIndex);
          setIsResyncing(false);
          resyncTimeoutRef.current = null;
        }, RESYNC_DELAY_MS);
      } else {
        audio.currentTime = 0;
        setCurrentTime(0);
      }
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
    };
  }, [startVisualization, stopVisualization]);

  useEffect(() => {
    if (!isDropdownOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownOpen]);

  useEffect(() => {
    if (!isResyncing || useFallback) return;

    cancelAnimationFrame(animationRef.current);

    const loop = () => {
      drawResyncGlitch();
      animationRef.current = requestAnimationFrame(loop);
    };

    animationRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationRef.current);
  }, [isResyncing, useFallback, drawResyncGlitch]);

  useEffect(() => {
    return () => {
      if (resyncTimeoutRef.current) clearTimeout(resyncTimeoutRef.current);
      cancelAnimationFrame(animationRef.current);
      void audioContextRef.current?.close();
    };
  }, []);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="relative w-full max-w-md bg-[#112240]/80 backdrop-blur-md border border-[#64FFDA]/10 rounded-2xl shadow-lg shadow-[#64FFDA]/5 p-6 space-y-5">
      <audio ref={audioRef} crossOrigin="anonymous" preload="metadata" />

      <p className="ui-label text-[10px] tracking-[0.25em] text-accent-cyan uppercase [text-shadow:0_0_14px_rgba(100,255,218,0.45)]">
        SYNC ESTABLISHED // VESPER.OS
      </p>

      <div ref={dropdownRef} className="relative space-y-1.5 text-left">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 space-y-1">
            <h3 className="ui-label text-sm text-text-primary tracking-wide">
              {formatEpisodeCode(currentEpisode.season, currentEpisode.episodeNumber)} —{" "}
              {currentEpisode.title}
            </h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              In the rain-slicked sprawl of Arroyo, a reclusive diner cook finds his
              world inextricably bound to a rogue AI.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsDropdownOpen((open) => !open)}
            className="shrink-0 flex items-center gap-1.5 ui-label text-[9px] tracking-[0.15em] uppercase text-text-secondary hover:text-accent-cyan border border-white/10 hover:border-[#64FFDA]/30 rounded-lg px-2.5 py-1.5 transition-colors"
            aria-expanded={isDropdownOpen}
            aria-haspopup="listbox"
          >
            Sync Log
            <motion.span
              animate={{ rotate: isDropdownOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown size={14} />
            </motion.span>
          </button>
        </div>

        <AnimatePresence>
          {isDropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute left-0 right-0 top-full z-20 mt-2 bg-[#112240]/95 backdrop-blur-md border border-white/10 rounded-xl shadow-xl shadow-black/40 overflow-hidden"
              role="listbox"
              aria-label="Episode list"
            >
              <ul className="max-h-56 overflow-y-auto py-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#64FFDA]/20 [scrollbar-width:thin] [scrollbar-color:rgba(100,255,218,0.2)_transparent]">
                {groupedEpisodes.map(([season, episodes]) => (
                  <li key={`season-${season}`}>
                    <p className="ui-label px-4 pt-2 pb-1 text-[9px] tracking-[0.2em] text-accent-cyan/50 uppercase pointer-events-none select-none">
                      // ARCHIVE: SEASON {season}
                    </p>
                    <ul>
                      {episodes.map(({ episode, index }) => {
                        const isActive = index === currentEpisodeIndex;

                        return (
                          <li key={episode.id}>
                            <button
                              type="button"
                              role="option"
                              aria-selected={isActive}
                              onClick={() => selectEpisode(index)}
                              className={`w-full text-left px-4 py-2.5 text-xs transition-colors ${
                                isActive
                                  ? "text-[#64FFDA] bg-[#64FFDA]/10"
                                  : "text-text-secondary hover:text-text-primary hover:bg-white/5"
                              }`}
                            >
                              <span className="ui-label tracking-wide">
                                {formatEpisodeCode(episode.season, episode.episodeNumber)}
                              </span>
                              <span className="mx-2 text-white/20">//</span>
                              <span>{episode.title}</span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="ui-label text-[9px] tracking-[0.2em] text-accent-cyan/60 uppercase">
            Active Sync
          </span>
          <motion.span
            className="ui-label text-[9px] tracking-widest uppercase"
            animate={
              isResyncing
                ? { opacity: [1, 0.35, 1], color: ["#FF6B35", "#FF4500", "#FF6B35"] }
                : isPlaying
                  ? { color: ["#64FFDA", "#B392F0", "#64FFDA"], opacity: 1 }
                  : { color: "#8892B0", opacity: 1 }
            }
            transition={
              isResyncing
                ? { duration: 0.75, repeat: Infinity, ease: "easeInOut" }
                : { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
            }
          >
            {isResyncing
              ? "RE-ESTABLISHING CONNECTION..."
              : isPlaying
                ? "Streaming"
                : "Standby"}
          </motion.span>
        </div>

        {useFallback ? (
          <div className="relative h-12 flex items-center gap-[3px] px-0.5">
            {barHeights.map((peak, i) => (
              <motion.div
                key={i}
                className={`flex-1 rounded-full origin-center ${
                  isResyncing ? "bg-[#FF6B35]" : "bg-accent-cyan"
                }`}
                animate={
                  isResyncing
                    ? {
                        height: [3, 4 + (i % 3) * 2, 3, 5 + (i % 2) * 3, 3],
                        opacity: [0.12, 0.35, 0.12, 0.28, 0.12],
                      }
                    : isPlaying
                      ? {
                          height: [
                            3,
                            6 + peak * 28,
                            4 + peak * 18,
                            3 + peak * 10,
                            3,
                          ],
                          opacity: [0.25, 0.85, 0.55, 0.4, 0.25],
                        }
                      : { height: 3, opacity: 0.15 }
                }
                transition={
                  isResyncing
                    ? {
                        duration: 0.35 + (i % 5) * 0.05,
                        repeat: Infinity,
                        ease: "linear",
                        delay: i * 0.02,
                      }
                    : isPlaying
                      ? {
                          duration: 1.4 + (i % 4) * 0.15,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: i * 0.035,
                        }
                      : { duration: 0.4 }
                }
              />
            ))}
          </div>
        ) : (
          <div
            ref={canvasContainerRef}
            className="relative h-12 w-full rounded-lg bg-white/[0.03] overflow-hidden"
          >
            <canvas ref={canvasRef} className="block w-full h-full" />
          </div>
        )}
      </div>

      <div className="space-y-1.5">
        <span className="ui-label text-[9px] tracking-[0.2em] text-accent-cyan/60 uppercase">
          Data Transfer
        </span>
        <div className="flex items-center gap-3">
          <span className="ui-label text-[10px] text-text-secondary tabular-nums w-10 text-right">
            {formatTime(currentTime)}
          </span>
          <button
            type="button"
            onClick={handleProgressClick}
            className="relative flex-1 h-2 rounded-sm bg-white/10 overflow-hidden cursor-pointer group"
            aria-label="Seek audio"
          >
            <div
              className="absolute inset-y-0 left-0 bg-[#64FFDA] transition-[width] duration-150 ease-linear"
              style={{ width: `${progress}%` }}
            />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-white/5 transition-opacity" />
          </button>
          <span className="ui-label text-[10px] text-text-secondary tabular-nums w-10">
            {formatTime(duration)}
          </span>
        </div>
      </div>

      <div className="flex justify-center pt-1">
        <motion.button
          type="button"
          onClick={togglePlay}
          disabled={isResyncing}
          whileTap={isResyncing ? undefined : { scale: 0.92 }}
          whileHover={isResyncing ? undefined : { scale: 1.04 }}
          className="flex items-center justify-center w-14 h-14 rounded-full bg-[#64FFDA]/10 border border-[#64FFDA]/30 text-accent-cyan hover:bg-[#64FFDA]/20 hover:border-[#64FFDA]/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/50 disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <Pause size={22} fill="currentColor" />
          ) : (
            <Play size={22} fill="currentColor" className="ml-0.5" />
          )}
        </motion.button>
      </div>
    </div>
  );
}
