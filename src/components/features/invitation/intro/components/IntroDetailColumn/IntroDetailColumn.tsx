"use client";

import { motion } from "framer-motion";

import type { IntroDetail } from "../../hooks/useIntroContent";
import { easeOutQuart } from "../../constants";

export type IntroDetailColumnProps = {
  data?: IntroDetail;
  align: "left" | "right";
  typography?: {
    heading: string;
    body: string;
  };
  isPrincessTheme?: boolean;
};

export function IntroDetailColumn({ data, align, typography, isPrincessTheme }: IntroDetailColumnProps) {
  if (!data) return <span />;

  const textColor = isPrincessTheme ? "#9278b9" : undefined;
  const textSecondaryColor = isPrincessTheme ? "#f8a6ba" : undefined;

  return (
    <motion.div
      className="flex flex-col gap-1"
      initial={{ opacity: 0, x: align === "left" ? -12 : 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: easeOutQuart, delay: 0.55 }}
      style={{ textAlign: align, fontFamily: typography?.body }}
    >
      <span className={isPrincessTheme ? "text-sm font-semibold uppercase tracking-[0.3em]" : "text-sm font-semibold uppercase tracking-[0.3em] text-amber-900/80"} style={{ color: textColor }}>
        {data.title}
      </span>
      <span className={isPrincessTheme ? "text-2xl font-extrabold uppercase" : "text-2xl font-extrabold uppercase text-slate-900"} style={{ fontFamily: typography?.heading, color: textSecondaryColor }}>{data.subtitle}</span>
      {data.helper ? (
        <span className={isPrincessTheme ? "text-xs uppercase tracking-[0.25em]" : "text-xs uppercase tracking-[0.25em] text-slate-500"} style={{ color: textColor }}>{data.helper}</span>
      ) : null}
    </motion.div>
  );
}
