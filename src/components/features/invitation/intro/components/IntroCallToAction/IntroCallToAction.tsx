"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import type { ThemeToken } from "@/lib/types/invitation";
import { useThemeDetection } from "@/hooks/useThemeDetection";

import { easeOutQuart } from "../../constants";

export type IntroCallToActionProps = {
  label: string;
  onComplete: () => void;
  fontFamily: string;
  isTransitioning: boolean;
  themeToken?: ThemeToken;
};

export function IntroCallToAction({ label, onComplete, fontFamily, isTransitioning, themeToken }: IntroCallToActionProps) {
  const { isDinoTheme } = useThemeDetection(themeToken);
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
    return cleaned.length > 0 ? cleaned : "¡Abrir invitación!";
  }, [label]);

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
      onComplete();
      completionTimeout.current = null;
    }, 1200);
  }, [isAnimating, onComplete]);

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
        className="group relative mt-4 flex w-full max-w-[min(520px,94vw)] flex-col items-center gap-5 overflow-visible rounded-[32px] focus:outline-none focus-visible:ring-4 focus-visible:ring-rose-300/45 disabled:cursor-default"
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
              background: isDinoTheme
                ? "linear-gradient(135deg, rgba(90, 138, 93, 0.98) 0%, rgba(74, 115, 80, 0.95) 52%, rgba(107, 155, 110, 0.92) 100%)"
                : "linear-gradient(135deg, rgba(255,112,161,0.95) 0%, rgba(255,149,89,0.92) 52%, rgba(255,213,102,0.88) 100%)",
              boxShadow: isDinoTheme
                ? "0 22px 48px rgba(74, 115, 80, 0.4)"
                : "0 22px 45px rgba(244,63,94,0.25)",
            }}
          >
            {!isDinoTheme && (
              <div className="pointer-events-none absolute inset-0">
                <span className="absolute -left-6 top-4 h-14 w-14 rounded-full bg-white/14 blur-xl" />
                <span className="absolute -right-8 bottom-3 h-16 w-16 rounded-full bg-white/18 blur-[22px]" />
                <span className="absolute left-[18%] top-3 h-2 w-8 rounded-full bg-white/60" />
                <span className="absolute right-[22%] bottom-5 h-2 w-7 rounded-full bg-white/50" />
                <span className="absolute left-[14%] bottom-6 h-1.5 w-5 rotate-12 rounded-full bg-[#ffd8ef]/90" />
                <span className="absolute right-[12%] top-6 h-1.5 w-6 -rotate-8 rounded-full bg-[#ffe8a3]/90" />
              </div>
            )}

            {isDinoTheme ? (
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
              className="relative text-lg font-extrabold uppercase tracking-[0.4em] text-white"
              style={{
                textShadow: isDinoTheme
                  ? "0 3px 6px rgba(45, 61, 45, 0.5)"
                  : "0 3px 6px rgba(236,72,153,0.45)",
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
            className="pointer-events-none fixed inset-0 z-40"
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
            className="pointer-events-none fixed inset-0 z-50 bg-white"
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
