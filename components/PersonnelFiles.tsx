"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import PersonnelGrid from "@/components/PersonnelGrid";
import DetailView from "@/components/DetailView";

export default function PersonnelFiles() {
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [viewType, setViewType] = useState<"member" | "character">("member");

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
        {selectedItem === null ? (
          <PersonnelGrid
            onSelect={(item, type) => {
              setSelectedItem(item);
              setViewType(type);
            }}
          />
        ) : (
          <DetailView
            data={selectedItem}
            type={viewType}
            onBack={() => setSelectedItem(null)}
          />
        )}
      </motion.div>
    </section>
  );
}
