import type { ReactNode } from "react";

export default function ViewingPort({ children }: { children: ReactNode }) {
  return (
    <div className="border border-white/10 rounded-2xl p-6 bg-[#0A192F]/40 backdrop-blur-sm h-[600px] overflow-y-auto hide-scrollbar">
      {children}
    </div>
  );
}
