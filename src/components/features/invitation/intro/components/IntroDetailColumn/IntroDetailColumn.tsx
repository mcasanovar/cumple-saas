"use client";

import { motion } from "framer-motion";

import type { IntroDetail } from "../../hooks/useIntroContent";
import { easeOutQuart } from "../../constants";

export type IntroDetailColumnProps = {
  data?: IntroDetail;
  align: "left" | "right";
};

export function IntroDetailColumn({ data, align }: IntroDetailColumnProps) {
  if (!data) return <span />;

  return (
    <motion.div
      className="flex flex-col gap-1"
      initial={{ opacity: 0, x: align === "left" ? -12 : 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: easeOutQuart, delay: 0.55 }}
      style={{ textAlign: align }}
    >
      <span className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-900/80">
        {data.title}
      </span>
      <span className="text-2xl font-extrabold uppercase text-slate-900">{data.subtitle}</span>
      {data.helper ? (
        <span className="text-xs uppercase tracking-[0.25em] text-slate-500">{data.helper}</span>
      ) : null}
    </motion.div>
  );
}
