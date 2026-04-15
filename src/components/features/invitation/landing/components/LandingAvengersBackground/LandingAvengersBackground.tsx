"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useEffect, useState, useMemo } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  opacity: number;
  duration: number;
  delay: number;
  blur: number;
  parallaxSpeed: number;
}

const PARTICLE_COLORS = ["#ff9f42", "#ffd66c", "#6ac1ff"];

interface ParticleComponentProps {
  particle: Particle;
  smoothScrollY: any;
}

function ParticleComponent({ particle, smoothScrollY }: ParticleComponentProps) {
  const scrollOffset = useTransform(smoothScrollY, (value: number) => value * -particle.parallaxSpeed);

  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        left: `${particle.x}%`,
        top: `${particle.y}%`,
        width: particle.size,
        height: particle.size,
        backgroundColor: particle.color,
        opacity: particle.opacity,
        filter: `blur(${particle.blur}px)`,
        boxShadow: `0 0 ${particle.size * 2}px ${particle.color}, 0 0 ${particle.size * 4}px ${particle.color}60`,
        willChange: "transform",
        y: scrollOffset,
      }}
      animate={{
        y: ["100vh", "-10vh"], // Movimiento infinito hacia arriba
        x: [0, (Math.random() - 0.5) * 30],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: particle.duration,
        repeat: Infinity,
        delay: particle.delay,
        ease: "linear",
      }}
    />
  );
}

export function LandingAvengersBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const { scrollY } = useScroll();

  // Suavizar el scroll para un efecto parallax más fluido
  const smoothScrollY = useSpring(scrollY, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Transformaciones para el fondo base (movimiento muy sutil)
  const yBg1 = useTransform(smoothScrollY, [0, 5000], ["0%", "-5%"]);
  const yBg2 = useTransform(smoothScrollY, [0, 5000], ["0%", "-10%"]);
  const rotateBg = useTransform(smoothScrollY, [0, 5000], [0, 5]);

  useEffect(() => {
    const newParticles: Particle[] = Array.from({ length: 80 }).map((_, i) => {
      const duration = Math.random() * 20 + 20;
      return {
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100, // Posición inicial aleatoria en todo el viewport
        size: Math.random() * 4 + 4,
        color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
        opacity: Math.random() * 0.3 + 0.4,
        duration: duration,
        delay: Math.random() * -duration,
        blur: Math.random() * 0.4 + 0.2,
        parallaxSpeed: Math.random() * 0.2 + 0.1, // Factor de movimiento por scroll
      };
    });
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Fondo sólido base - Este no se mueve para evitar huecos */}
      <div className="absolute inset-0 bg-[#040814]" />

      {/* 1. Base Gradient Background con Parallax sutil */}
      <motion.div
        className="absolute inset-[-10%]"
        style={{
          background: "linear-gradient(180deg, #040814 0%, #050a17 100%)",
          y: yBg1,
          rotate: rotateBg,
        }}
      />

      {/* Vignette Effect - Negros en los bordes */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.5) 100%)"
        }}
      />

      {/* 2. Soft Center Glow - Movimiento opuesto para profundidad */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-40"
        style={{
          background: "radial-gradient(circle, rgba(14, 26, 51, 0.6) 0%, transparent 70%)",
          filter: "blur(120px)",
          y: yBg2,
          scale: useTransform(smoothScrollY, [0, 5000], [1, 1.2]),
        }}
      />

      {/* 3 & 4. Particles with Movement + Parallax */}
      {particles.map((p) => (
        <ParticleComponent key={p.id} particle={p} smoothScrollY={smoothScrollY} />
      ))}

      {/* Ambient Occlusion / Depth Shadow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
    </div>
  );
}
