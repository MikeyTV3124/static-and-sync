"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

type EmbeddablePlayerProps = {
  audioUrl: string;
  title: string;
};

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "00:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

export default function EmbeddablePlayer({ audioUrl, title }: EmbeddablePlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const handleProgressClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
    audio.currentTime = ratio * duration;
    setCurrentTime(audio.currentTime);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.readyState >= 1) {
      setDuration(audio.duration);
    }

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      return;
    }

    try {
      await audio.play();
    } catch {
      setIsPlaying(false);
    }
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="w-full max-w-sm bg-[#112240]/80 backdrop-blur-md border border-[#64FFDA]/10 rounded-2xl shadow-lg shadow-[#64FFDA]/5 p-5 space-y-4">
      <audio ref={audioRef} src={audioUrl} preload="metadata" />

      <p className="ui-label text-[10px] tracking-[0.25em] text-accent-cyan uppercase [text-shadow:0_0_14px_rgba(100,255,218,0.45)]">
        SYNC ESTABLISHED // VESPER.OS
      </p>

      <div className="space-y-1 text-left">
        <p className="ui-label text-xs text-text-primary tracking-wide">{title}</p>
      </div>

      <div className="space-y-1.5">
        <button
          type="button"
          onClick={handleProgressClick}
          className="relative w-full h-2 rounded-sm bg-white/10 overflow-hidden cursor-pointer group"
          aria-label="Seek audio"
        >
          <div
            className="absolute inset-y-0 left-0 h-full bg-[#64FFDA] transition-[width] duration-150 ease-linear"
            style={{ width: `${progress}%` }}
          />
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-white/5 transition-opacity" />
        </button>
        <div className="flex justify-between ui-label text-[9px] text-text-secondary tabular-nums">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className="flex justify-center pt-1">
        <button
          type="button"
          onClick={togglePlay}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-[#64FFDA]/10 border border-[#64FFDA]/30 text-accent-cyan hover:bg-[#64FFDA]/20 hover:border-[#64FFDA]/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/50"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-0.5" />}
        </button>
      </div>
    </div>
  );
}
