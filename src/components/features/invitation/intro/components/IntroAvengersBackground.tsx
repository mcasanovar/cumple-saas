"use client";

import { motion } from "framer-motion";

export const IntroAvengersBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      {/* Fondo base con degradado rojo central */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          background: "radial-gradient(circle at center, #8b1b1b 0%, #000000 70%)"
        }}
      />

      {/* Líneas de luz radiales (Burst de energía) */}
      <motion.div 
        className="absolute inset-0 opacity-30"
        animate={{ 
          scale: [1, 1.05, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        style={{
          background: "repeating-conic-gradient(from 0deg, transparent 0deg, #ff6122 10deg, transparent 20deg)",
          maskImage: "radial-gradient(circle at center, black, transparent 80%)",
          WebkitMaskImage: "radial-gradient(circle at center, black, transparent 80%)",
        }}
      />

      {/* Personajes laterales */}
      <div className="absolute inset-0 flex justify-between items-center px-4 md:px-10">
        {/* Thor - Izquierda */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 0.75, x: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="relative h-[60%] w-[30%] md:w-[25%] blur-[1.5px]"
        >
          <img 
            src="/thor-placeholder.png" 
            alt="Thor" 
            className="h-full w-full object-contain opacity-80"
            style={{ filter: "brightness(0.6) sepia(0.3) saturate(1.2) hue-rotate(-10deg)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
        </motion.div>

        {/* Iron Man - Derecha */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 0.8, x: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="relative h-[60%] w-[30%] md:w-[25%] blur-[1.5px]"
        >
          <img 
            src="/ironman-placeholder.png" 
            alt="Iron Man" 
            className="h-full w-full object-contain opacity-80"
            style={{ filter: "brightness(0.6) sepia(0.2) saturate(1.5)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-l from-black/60 to-transparent" />
        </motion.div>
      </div>

      {/* Overlay de degradado para contraste de texto */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
    </div>
  );
};
