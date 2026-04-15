"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import type { ThemeToken } from "@/lib/types/invitation";
import { useThemeDetection } from "@/hooks/useThemeDetection";

import { easeOutQuart } from "../../constants";

export type IntroCallToActionProps = {
  className?: string;
  label: string;
  onComplete: () => void;
  fontFamily: string;
  isTransitioning: boolean;
  themeToken?: ThemeToken;
  isPreview?: boolean;
};

export function IntroCallToAction({ className, label, onComplete, fontFamily, isTransitioning, themeToken, isPreview = false }: IntroCallToActionProps) {
  const { isDinoTheme, isPrincessTheme, isKPopTheme, isAvengersTheme } = useThemeDetection(themeToken);
  const [isAnimating, setIsAnimating] = useState(false);
  const [confettiActive, setConfettiActive] = useState(false);
  const [fadeActive, setFadeActive] = useState(false);
  const [burstOrigin, setBurstOrigin] = useState<{ x: number; y: number } | null>(null);

  const lcgNext = (value: number): number => (1664525 * value + 1013904223) >>> 0;

  const confettiPieces = useMemo(() => {
    const palette = ["#ffadad", "#ffd6a5", "#fdffb6", "#caffbf", "#9bf6ff", "#bdb2ff"] as const;
    return Array.from({ length: 28 }).map((_, index) => {
      let current = (8731 * (index + 1)) >>> 0;
      current = lcgNext(current);
      const startX = ((current / 0xffffffff) * 26 - 13).toFixed(2);
      current = lcgNext(current);
      const startY = ((current / 0xffffffff) * 18 - 9).toFixed(2);
      current = lcgNext(current);
      const driftX = ((current / 0xffffffff) * 240 - 120).toFixed(2);
      current = lcgNext(current);
      const driftY = -((current / 0xffffffff) * 240 + 80).toFixed(2);
      current = lcgNext(current);
      const rotate = ((current / 0xffffffff) * 200 - 100).toFixed(2);
      const shapes = ["circle", "square", "bar"] as const;
      const shape = shapes[current % shapes.length];
      const sizes = [6, 7, 8, 9, 10] as const;
      const size = sizes[current % sizes.length];

      return {
        id: `burst-${index}`,
        color: palette[index % palette.length],
        startX: Number(startX),
        startY: Number(startY),
        driftX: Number(driftX),
        driftY: Number(driftY),
        rotate: Number(rotate),
        initialRotate: Number((Number(rotate) / 3).toFixed(2)),
        shape,
        size,
      };
    });
  }, []);

  const completionTimeout = useRef<number | null>(null);
  const fadeTimeout = useRef<number | null>(null);
  const confettiTimeout = useRef<number | null>(null);
  const finalizeTimeout = useRef<number | null>(null);
  const hasSignalled = useRef(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const buttonText = useMemo(() => {
    const cleaned = label.replace(/presiona/gi, "").trim();
    const text = cleaned.length > 0 ? cleaned : "¡Abrir invitación!";
    if (isAvengersTheme) {
      return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[¡!¿?]/g, "");
    }
    return text;
  }, [label, isAvengersTheme]);

  useEffect(() => {
    return () => {
      if (completionTimeout.current !== null) {
        window.clearTimeout(completionTimeout.current);
        completionTimeout.current = null;
      }
      if (fadeTimeout.current !== null) {
        window.clearTimeout(fadeTimeout.current);
        fadeTimeout.current = null;
      }
      if (confettiTimeout.current !== null) {
        window.clearTimeout(confettiTimeout.current);
        confettiTimeout.current = null;
      }
      if (finalizeTimeout.current !== null) {
        window.clearTimeout(finalizeTimeout.current);
        finalizeTimeout.current = null;
      }
      hasSignalled.current = false;
      setConfettiActive(false);
      setFadeActive(false);
      setIsAnimating(false);
    };
  }, []);

  useEffect(() => {
    if (!isAnimating || hasSignalled.current) return;
    hasSignalled.current = true;
    completionTimeout.current = window.setTimeout(() => {
      if (!isPreview) {
        onComplete();
      }
      completionTimeout.current = null;
    }, 1200);
  }, [isAnimating, onComplete, isPreview]);

  const handlePress = useCallback(() => {
    if (isAnimating || isTransitioning) return;
    if (typeof window === "undefined" || !buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    setBurstOrigin({ x: centerX, y: centerY });
    setIsAnimating(true);
    setConfettiActive(true);
    setFadeActive(false);

    if (fadeTimeout.current !== null) {
      window.clearTimeout(fadeTimeout.current);
    }
    fadeTimeout.current = window.setTimeout(() => {
      setFadeActive(true);
      fadeTimeout.current = null;
    }, 550);

    if (confettiTimeout.current !== null) {
      window.clearTimeout(confettiTimeout.current);
    }
    confettiTimeout.current = window.setTimeout(() => {
      setConfettiActive(false);
      confettiTimeout.current = null;
    }, 1000);

    if (finalizeTimeout.current !== null) {
      window.clearTimeout(finalizeTimeout.current);
    }
    finalizeTimeout.current = window.setTimeout(() => {
      setFadeActive(false);
      setIsAnimating(false);
      setBurstOrigin(null);
      finalizeTimeout.current = null;
    }, 1800);
  }, [isAnimating, isTransitioning]);

  const hoverAnimation = !isAnimating && !isTransitioning ? { y: -3 } : undefined;
  const tapAnimation = !isAnimating && !isTransitioning ? { scale: 0.985 } : undefined;

  return (
    <>
      <motion.button
        ref={buttonRef}
        type="button"
        disabled={isAnimating || isTransitioning}
        onClick={handlePress}
        className={`group relative flex w-full max-w-[min(520px,94vw)] flex-col items-center gap-5 overflow-visible rounded-[32px] focus:outline-none focus-visible:ring-4 focus-visible:ring-rose-300/45 disabled:cursor-default ${className || "mt-4"}`}
        aria-label={label}
        style={{ fontFamily }}
        whileHover={hoverAnimation}
        whileTap={tapAnimation}
        transition={{ duration: 0.3, ease: easeOutQuart }}
      >
        <div className="relative z-10 flex w-full items-center justify-center">
          <div
            className="relative flex w-full flex-col items-center justify-center gap-1 overflow-hidden rounded-[32px] px-10 py-6"
            style={{
              background: isPrincessTheme
                ? "linear-gradient(135deg, rgba(146, 120, 185, 0.95) 0%, rgba(248, 166, 186, 0.92) 52%, rgba(200, 162, 200, 0.88) 100%)"
                : isDinoTheme
                  ? "linear-gradient(135deg, rgba(90, 138, 93, 0.98) 0%, rgba(74, 115, 80, 0.95) 52%, rgba(107, 155, 110, 0.92) 100%)"
                  : isKPopTheme
                    ? "linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(45, 27, 105, 0.9) 100%)"
                    : isAvengersTheme
                      ? "linear-gradient(135deg, #b91c1c 0%, #7f1d1d 100%)"
                      : "linear-gradient(135deg, rgba(255,112,161,0.95) 0%, rgba(255,149,89,0.92) 52%, rgba(255,213,102,0.88) 100%)",
              boxShadow: isPrincessTheme
                ? "0 22px 45px rgba(146, 120, 185, 0.35)"
                : isDinoTheme
                  ? "0 22px 48px rgba(74, 115, 80, 0.4)"
                  : isKPopTheme
                    ? "0 0 30px rgba(243, 99, 180, 0.6), 0 0 60px rgba(147, 51, 234, 0.4), inset 0 0 0 2px rgba(243, 99, 180, 0.8)"
                    : isAvengersTheme
                      ? "0 0 20px rgba(248, 113, 113, 0.4), inset 0 0 15px rgba(251, 192, 45, 0.2)"
                      : "0 22px 45px rgba(244,63,94,0.25)",
              border: isKPopTheme ? "2px solid rgba(243, 99, 180, 0.8)" : isAvengersTheme ? "2px solid #fbc02d" : undefined,
            }}
          >
            {!isDinoTheme && !isPrincessTheme && !isKPopTheme && (
              <div className="pointer-events-none absolute inset-0">
                <span className="absolute -left-6 top-4 h-14 w-14 rounded-full bg-white/14 blur-xl" />
                <span className="absolute -right-8 bottom-3 h-16 w-16 rounded-full bg-white/18 blur-[22px]" />
                <span className="absolute left-[18%] top-3 h-2 w-8 rounded-full bg-white/60" />
                <span className="absolute right-[22%] bottom-5 h-2 w-7 rounded-full bg-white/50" />
                <span className="absolute left-[14%] bottom-6 h-1.5 w-5 rotate-12 rounded-full bg-[#ffd8ef]/90" />
                <span className="absolute right-[12%] top-6 h-1.5 w-6 -rotate-8 rounded-full bg-[#ffe8a3]/90" />
              </div>
            )}

            {isPrincessTheme ? (
              <div className="pointer-events-none absolute inset-0 overflow-hidden">
                {/* Flores decorativas para princesa */}
                <svg className="absolute left-[8%] top-[20%]" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="4" fill="#f8a6ba" />
                  <ellipse cx="12" cy="5" rx="3" ry="4" fill="#f8a6ba" opacity="0.8" />
                  <ellipse cx="12" cy="19" rx="3" ry="4" fill="#f8a6ba" opacity="0.8" />
                  <ellipse cx="5" cy="12" rx="4" ry="3" fill="#f8a6ba" opacity="0.8" />
                  <ellipse cx="19" cy="12" rx="4" ry="3" fill="#f8a6ba" opacity="0.8" />
                  <circle cx="12" cy="12" r="2" fill="#fff" opacity="0.9" />
                </svg>
                <svg className="absolute right-[10%] top-[25%]" width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="4" fill="#c8a2c8" />
                  <ellipse cx="12" cy="5" rx="3" ry="4" fill="#c8a2c8" opacity="0.8" />
                  <ellipse cx="12" cy="19" rx="3" ry="4" fill="#c8a2c8" opacity="0.8" />
                  <ellipse cx="5" cy="12" rx="4" ry="3" fill="#c8a2c8" opacity="0.8" />
                  <ellipse cx="19" cy="12" rx="4" ry="3" fill="#c8a2c8" opacity="0.8" />
                  <circle cx="12" cy="12" r="2" fill="#fff" opacity="0.9" />
                </svg>
                <svg className="absolute left-[15%] bottom-[20%]" width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="4" fill="#9278b9" opacity="0.7" />
                  <ellipse cx="12" cy="5" rx="3" ry="4" fill="#9278b9" opacity="0.5" />
                  <ellipse cx="12" cy="19" rx="3" ry="4" fill="#9278b9" opacity="0.5" />
                  <ellipse cx="5" cy="12" rx="4" ry="3" fill="#9278b9" opacity="0.5" />
                  <ellipse cx="19" cy="12" rx="4" ry="3" fill="#9278b9" opacity="0.5" />
                  <circle cx="12" cy="12" r="2" fill="#fff" opacity="0.8" />
                </svg>
                <svg className="absolute right-[12%] bottom-[25%]" width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="4" fill="#f8a6ba" opacity="0.8" />
                  <ellipse cx="12" cy="5" rx="3" ry="4" fill="#f8a6ba" opacity="0.6" />
                  <ellipse cx="12" cy="19" rx="3" ry="4" fill="#f8a6ba" opacity="0.6" />
                  <ellipse cx="5" cy="12" rx="4" ry="3" fill="#f8a6ba" opacity="0.6" />
                  <ellipse cx="19" cy="12" rx="4" ry="3" fill="#f8a6ba" opacity="0.6" />
                  <circle cx="12" cy="12" r="2" fill="#fff" opacity="0.9" />
                </svg>
                {/* Pequeños brillos */}
                <span className="absolute left-[30%] top-[15%] h-1.5 w-1.5 rounded-full bg-white/70" />
                <span className="absolute right-[25%] top-[35%] h-1 w-1 rounded-full bg-white/60" />
                <span className="absolute left-[40%] bottom-[30%] h-1 w-1 rounded-full bg-white/50" />
              </div>
            ) : isDinoTheme ? (
              <div className="pointer-events-none absolute inset-0 overflow-hidden">
                {/* Pasto prehistórico animado desde atrás */}
                {[
                  { left: "5%", height: 45, delay: 0, rotation: -8 },
                  { left: "15%", height: 38, delay: 0.1, rotation: 5 },
                  { left: "25%", height: 42, delay: 0.05, rotation: -3 },
                  { left: "35%", height: 50, delay: 0.15, rotation: 8 },
                  { left: "45%", height: 36, delay: 0.08, rotation: -6 },
                  { left: "55%", height: 48, delay: 0.12, rotation: 4 },
                  { left: "65%", height: 40, delay: 0.06, rotation: -5 },
                  { left: "75%", height: 44, delay: 0.14, rotation: 7 },
                  { left: "85%", height: 39, delay: 0.09, rotation: -4 },
                  { left: "95%", height: 46, delay: 0.11, rotation: 6 },
                ].map((grass, idx) => (
                  <motion.div
                    key={`grass-${idx}`}
                    className="absolute bottom-0"
                    style={{ left: grass.left }}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.8,
                      delay: grass.delay,
                      ease: [0.34, 1.56, 0.64, 1],
                    }}
                  >
                    <svg
                      width="12"
                      height={grass.height}
                      viewBox="0 0 12 50"
                      fill="none"
                      style={{ transform: `rotate(${grass.rotation}deg)` }}
                    >
                      <path
                        d="M6 50 Q 3 35, 4 20 Q 5 10, 6 0 Q 7 10, 8 20 Q 9 35, 6 50"
                        fill="rgba(74, 115, 80, 0.6)"
                      />
                      <path
                        d="M6 50 Q 4 38, 5 25 Q 5.5 12, 6 2"
                        stroke="rgba(90, 138, 93, 0.8)"
                        strokeWidth="1.5"
                        fill="none"
                      />
                    </svg>
                  </motion.div>
                ))}
              </div>
            ) : isKPopTheme ? (
              <div className="pointer-events-none absolute inset-0">
                {/* Neon glow effects */}
                <div className="absolute inset-0 rounded-[32px] bg-gradient-to-r from-pink-500/20 to-purple-600/20 blur-sm" />
                <div className="absolute inset-2 rounded-[28px] bg-gradient-to-r from-pink-400/10 to-purple-500/10 blur-md" />
                {/* Sparkle effects */}
                {[
                  { color: "#f363b4", size: 3, top: "20%", left: "15%", delay: 0 },
                  { color: "#9333ea", size: 2, top: "70%", left: "80%", delay: 0.5 },
                  { color: "#f363b4", size: 4, top: "40%", left: "85%", delay: 1 },
                  { color: "#9333ea", size: 2, top: "60%", left: "10%", delay: 1.5 },
                  { color: "#f363b4", size: 3, top: "25%", left: "75%", delay: 2 },
                ].map((sparkle, idx) => (
                  <motion.div
                    key={`k-pop-sparkle-${idx}`}
                    className="absolute rounded-full"
                    style={{
                      backgroundColor: sparkle.color,
                      width: sparkle.size,
                      height: sparkle.size,
                      top: sparkle.top,
                      left: sparkle.left,
                      boxShadow: `0 0 10px ${sparkle.color}, 0 0 20px ${sparkle.color}`,
                    }}
                    animate={{
                      opacity: [0.3, 1, 0.3],
                      scale: [0.8, 1.2, 0.8],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: sparkle.delay,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>
            ) : isAvengersTheme ? (
              <div className="pointer-events-none absolute inset-0 overflow-hidden">
                {/* Destellos de energía para Avengers */}
                <motion.div
                  className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,192,45,0.15),transparent_70%)]"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <span className="absolute left-[-10%] top-[-50%] h-[200%] w-[20%] rotate-[35deg] bg-white/10 blur-xl" />
              </div>
            ) : (
              <div className="pointer-events-none absolute inset-0">
                {["#fff5f7", "#ffe7f1", "#fff0d6"].map((color, idx) => (
                  <span
                    key={`confetti-dot-${idx}`}
                    className="absolute rounded-full opacity-80"
                    style={{
                      background: color,
                      width: [9, 6, 8][idx],
                      height: [9, 6, 8][idx],
                      top: `${18 + idx * 22}%`,
                      left: `${28 + idx * 24}%`,
                    }}
                  />
                ))}
                {["-22deg", "12deg", "-38deg"].map((rotation, idx) => (
                  <span
                    key={`sprinkle-${idx}`}
                    className="absolute h-8 w-1.5 rounded-full"
                    style={{
                      background: idx === 1 ? "#ffe599" : "#ffd1dc",
                      top: idx === 0 ? "16%" : idx === 1 ? "62%" : "44%",
                      left: idx === 0 ? "78%" : idx === 1 ? "16%" : "84%",
                      transform: `rotate(${rotation})`,
                      opacity: 0.7,
                    }}
                  />
                ))}
              </div>
            )}

            <span
              className={`relative text-lg font-extrabold uppercase tracking-[0.4em] ${isKPopTheme ? "text-transparent" : isAvengersTheme ? "text-[#fbc02d]" : "text-white"
                }`}
              style={{
                textShadow: isPrincessTheme
                  ? "0 3px 6px rgba(146, 120, 185, 0.5)"
                  : isDinoTheme
                    ? "0 3px 6px rgba(45, 61, 45, 0.5)"
                    : isKPopTheme
                      ? "none"
                      : isAvengersTheme
                        ? "0 0 10px rgba(251, 192, 45, 0.5), 2px 2px 0px rgba(0,0,0,0.8)"
                        : "0 3px 6px rgba(236,72,153,0.45)",
                background: isKPopTheme
                  ? "linear-gradient(45deg, #f363b4 0%, #ffd166 50%, #f363b4 100%)"
                  : undefined,
                WebkitBackgroundClip: isKPopTheme ? "text" : undefined,
                WebkitTextStroke: isKPopTheme ? "2px rgba(243, 99, 180, 0.8)" : isAvengersTheme ? "1px rgba(0,0,0,0.5)" : undefined,
                filter: isKPopTheme
                  ? "drop-shadow(0 0 10px rgba(243, 99, 180, 0.8)) drop-shadow(0 0 20px rgba(147, 51, 234, 0.6))"
                  : undefined,
                fontFamily: isAvengersTheme ? 'Avengeance, var(--font-avengers), sans-serif' : undefined
              }}
            >
              {buttonText.toUpperCase()}
            </span>
          </div>
        </div>
      </motion.button>

      <AnimatePresence>
        {confettiActive && burstOrigin ? (
          <motion.div
            key="envelope-confetti"
            className={`pointer-events-none ${isPreview ? 'absolute' : 'fixed'} inset-0 z-40`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: easeOutQuart }}
          >
            <div className="relative h-full w-full">
              <div
                className="absolute"
                style={{
                  top: burstOrigin.y,
                  left: burstOrigin.x,
                  transform: "translate(-50%, -50%)",
                  pointerEvents: "none",
                }}
              >
                {confettiPieces.map((piece) => {
                  const isBar = piece.shape === "bar";
                  const width = isBar ? piece.size * 0.75 + 4 : piece.size;
                  const height = isBar ? piece.size * 2.2 + 6 : piece.size;
                  const borderRadius =
                    piece.shape === "circle" ? piece.size : piece.shape === "square" ? 3 : 4;

                  return (
                    <motion.span
                      key={piece.id}
                      className="absolute"
                      style={{
                        width,
                        height,
                        backgroundColor: piece.color,
                        borderRadius,
                      }}
                      initial={{
                        x: piece.startX,
                        y: piece.startY,
                        opacity: 0,
                        scale: 0.6,
                        rotate: piece.initialRotate,
                      }}
                      animate={{
                        x: piece.startX + piece.driftX,
                        y: piece.startY + piece.driftY,
                        opacity: [0.95, 0.95, 0],
                        scale: 1,
                        rotate: piece.rotate,
                      }}
                      transition={{ duration: 0.9, ease: [0.34, 1.4, 0.64, 1] }}
                    />
                  );
                })}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {fadeActive ? (
          <motion.div
            key="whiteout"
            className={`pointer-events-none ${isPreview ? 'absolute' : 'fixed'} inset-0 z-50 bg-white`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: easeOutQuart }}
          />
        ) : null}
      </AnimatePresence>
    </>
  );
}
