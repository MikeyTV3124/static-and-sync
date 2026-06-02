"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import EmbeddablePlayer from "@/components/EmbeddablePlayer";

function EmbedPlayerContent() {
  const params = useSearchParams();
  const audioUrl =
    params.get("url") ??
    "/Static & Sync - S01E01 - Test Audio for Transcripts.mp3";
  const title = params.get("title") ?? "Static & Sync Embed";

  return <EmbeddablePlayer audioUrl={audioUrl} title={title} />;
}

export default function EmbedPage() {
  return (
    <main className="h-screen w-full bg-[#0A192F] flex items-center justify-center overflow-hidden p-4">
      <Suspense fallback={<div className="text-text-secondary">Loading embed...</div>}>
        <EmbedPlayerContent />
      </Suspense>
    </main>
  );
}
