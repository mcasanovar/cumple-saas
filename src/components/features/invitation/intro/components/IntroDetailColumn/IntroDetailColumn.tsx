"use client";

import { motion } from "framer-motion";

import type { IntroDetail } from "../../hooks/useIntroContent";
import { easeOutQuart } from "../../constants";

import { normalizeAvengersText } from "@/lib/utils/normalizeText";

export type IntroDetailColumnProps = {
  data?: IntroDetail;
  align: "left" | "right";
  typography?: {
    heading: string;
    body: string;
  };
  isPrincessTheme?: boolean;
  isKPopTheme?: boolean;
  isAvengersTheme?: boolean;
};

export function IntroDetailColumn({ data, align, typography, isPrincessTheme, isKPopTheme, isAvengersTheme }: IntroDetailColumnProps) {
  if (!data) return <span />;

  const textColor = isPrincessTheme ? "#9278b9" : isKPopTheme ? "#2D1B69" : isAvengersTheme ? "#fbc02d" : undefined;
  const textSecondaryColor = isPrincessTheme ? "#f8a6ba" : isKPopTheme ? "#2D1B69" : isAvengersTheme ? "#ffffff" : undefined;

  const displayTitle = data.title;
  const displaySubtitle = isAvengersTheme ? normalizeAvengersText(data.subtitle, true) : data.subtitle;
  const displayHelper = data.helper;

  return (
    <motion.div
      className="flex flex-col gap-1"
      initial={{ opacity: 0, x: align === "left" ? -12 : 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: easeOutQuart, delay: 0.55 }}
      style={{ textAlign: align, fontFamily: typography?.body }}
    >
      <span className={isPrincessTheme ? "text-[10px] sm:text-sm font-semibold uppercase tracking-[0.3em]" : isKPopTheme ? "text-[10px] sm:text-sm font-bold uppercase tracking-[0.3em]" : isAvengersTheme ? "text-[10px] sm:text-sm font-bold uppercase tracking-[0.3em]" : "text-[10px] sm:text-sm font-semibold uppercase tracking-[0.3em] text-amber-900/80"} style={{ color: textColor }}>
        {displayTitle}
      </span>
      <span className={isPrincessTheme ? "text-lg sm:text-2xl font-extrabold uppercase" : isKPopTheme ? "text-lg sm:text-2xl font-black uppercase" : isAvengersTheme ? "text-lg sm:text-2xl font-bold uppercase" : "text-lg sm:text-2xl font-extrabold uppercase text-slate-900"} style={{ fontFamily: isAvengersTheme ? 'Avengeance, var(--font-avengers), sans-serif' : typography?.heading, color: textSecondaryColor, textShadow: isAvengersTheme ? "0 4px 12px rgba(0,0,0,0.5)" : undefined }}>{displaySubtitle}</span>
      {data.helper ? (
        <span className={isPrincessTheme ? "text-[8px] sm:text-xs uppercase tracking-[0.25em]" : isKPopTheme ? "text-[8px] sm:text-xs font-bold uppercase tracking-[0.25em]" : isAvengersTheme ? "text-[8px] sm:text-xs font-bold uppercase tracking-[0.25em]" : "text-[8px] sm:text-xs uppercase tracking-[0.25em] text-slate-500"} style={{ color: isAvengersTheme ? "#9b9b9b" : textColor }}>{displayHelper}</span>
      ) : null}
    </motion.div>
  );
}
