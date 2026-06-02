"use client";

import { motion } from "framer-motion";
import PersonnelGrid from "@/components/PersonnelGrid";

export default function PersonnelFiles() {
  return (
    <section className="w-full space-y-10">
      <div className="flex items-center gap-4">
        <div className="flex-1 h-px bg-white/10" />
        <span className="ui-label text-[9px] tracking-[0.35em] text-text-secondary/60 uppercase whitespace-nowrap">
          /// PERSONNEL FILES ///
        </span>
        <div className="flex-1 h-px bg-white/10" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
      >
        <PersonnelGrid />
      </motion.div>
    </section>
  );
}
