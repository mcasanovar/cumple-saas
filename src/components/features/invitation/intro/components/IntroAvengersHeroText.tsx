"use client";

import { motion } from "framer-motion";
import { normalizeAvengersText } from "@/lib/utils/normalizeText";

interface IntroAvengersHeroTextProps {
  celebrantName: string;
}

export const IntroAvengersHeroText = ({ celebrantName }: IntroAvengersHeroTextProps) => {
  const normalizedName = normalizeAvengersText(celebrantName);

  return (
    <div className="flex flex-col items-center text-center px-6 mt-4 md:mt-8 gap-1 md:gap-2">
      {/* Título 1: ¡ESTÁS INVITADO! */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-[#fbc02d] font-bold tracking-[2px] drop-shadow-[0_8px_12px_rgba(0,0,0,0.7)] text-4xl md:text-6xl lg:text-7xl py-2 px-4"
        style={{ fontFamily: 'Avengeance, var(--font-avengers), sans-serif', fontWeight: 700 }}
      >
        {normalizeAvengersText("¡ESTÁS INVITADO!", true)}
      </motion.h2>

      {/* Subtítulo */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-[#b3b3b3] tracking-[3px] text-sm md:text-xl lg:text-2xl drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]"
      >
        {normalizeAvengersText("A LA FIESTA DE CUMPLEAÑOS MÁS ÉPICA", true)}
      </motion.p>

      {/* Título Central: AVENGERS (o nombre del festejado con estilo Avengers) */}
      <motion.div
        initial={{ opacity: 0, scale: 1.03 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.6 }}
        className="relative mt-2 md:mt-4 px-6 overflow-visible"
      >
        <h1
          className="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-normal bg-clip-text text-transparent drop-shadow-[0_10px_15px_rgba(255,122,0,0.4)] pt-6 pb-2 pr-8 leading-[1.2] inline-block"
          style={{
            fontFamily: 'Avengeance, var(--font-avengers), sans-serif',
            fontWeight: 700,
            fontStyle: 'italic',
            backgroundImage: "linear-gradient(to right, #ff7a00, #ffd54f, #4ea2ff)",
            WebkitBackgroundClip: "text"
          }}
        >
          {normalizedName}
        </h1>
      </motion.div>

      {/* Texto Inferior */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="text-[#9b9b9b] tracking-[4px] text-xs md:text-lg lg:text-xl mt-2"
      >
        {normalizeAvengersText("CELEBRACIÓN HEROICA", true)}
      </motion.p>
    </div>
  );
};
