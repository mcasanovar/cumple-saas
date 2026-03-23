"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

import { SceneBackground } from "@/components/shared/invitation/scene-background";
import type { IntroSceneConfig } from "@/lib/types/invitation";

type IntroSceneBackgroundProps = {
  scene: IntroSceneConfig;
  isTransitioning: boolean;
};

function IntroConfettiBackdrop() {
  const confetti = useMemo(() => {
    const palette = ["#ffbe0b", "#fb5607", "#ff006e", "#8338ec", "#3a86ff", "#8ac926"] as const;
    return Array.from({ length: 42 }).map((_, index) => {
      const color = palette[index % palette.length];
      const size = [6, 8, 10][index % 3];
      const top = ((index * 7 + 9) % 100) / 1;
      const left = ((index * 13 + 17) % 100) / 1;
      return {
        id: `confetti-${index}`,
        color,
        size,
        top: `${top}%`,
        left: `${left}%`,
      };
    });
  }, []);

  return (
    <div className="absolute inset-0">
      {confetti.map((dot) => (
        <span
          key={dot.id}
          className="absolute rounded-full opacity-70"
          style={{
            background: dot.color,
            width: dot.size,
            height: dot.size,
            top: dot.top,
            left: dot.left,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
    </div>
  );
}

function IntroBalloonClusters({ scene }: { scene: IntroSceneConfig }) {
  if (!scene.balloonClusters?.length) return null;

  return (
    <div className="absolute inset-0">
      {scene.balloonClusters.map((cluster) => (
        <motion.div
          key={`intro-cluster-${cluster.id}`}
          className="absolute"
          style={{
            top: cluster.position.top,
            left: cluster.position.left,
            opacity: cluster.opacity ?? 0.32,
          }}
          initial={{ y: 0, opacity: cluster.opacity ?? 0.32 }}
          animate={{
            y: [0, -10, 4, -6, 0],
            rotate: [-1, 1.2, -0.8, 0.6, -1],
          }}
          transition={{
            duration: 7 + (cluster.oscillation ?? 0) / 4,
            repeat: Infinity,
            ease: [0.42, 0, 0.58, 1],
            delay: cluster.delay ?? 0,
          }}
        >
          {cluster.balloons.map((balloon) => (
            <div
              key={balloon.id}
              className="absolute flex flex-col items-center"
              style={{
                width: balloon.size,
                height: balloon.size * 1.1,
                transform: `translate(${balloon.offsetX}px, ${balloon.offsetY}px)`,
              }}
            >
              <div
                className="relative h-full w-full rounded-full"
                style={{
                  background: balloon.color,
                  boxShadow: "0 18px 40px rgba(0,0,0,0.08)",
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background: balloon.accentColor ?? "rgba(255,255,255,0.35)",
                    clipPath: "ellipse(46% 64% at 30% 30%)",
                    opacity: 0.6,
                  }}
                />
              </div>
              <div className="h-8 w-[2px] bg-slate-400/25" />
            </div>
          ))}
        </motion.div>
      ))}
    </div>
  );
}

function IntroAmbientBalloons({ scene }: { scene: IntroSceneConfig }) {
  if (!scene.ambientBalloons?.length) return null;

  return (
    <div className="absolute inset-0">
      {scene.ambientBalloons.map((balloon) => (
        <motion.div
          key={`intro-ambient-${balloon.id}`}
          className="absolute flex items-center justify-center"
          style={{
            top: balloon.position.top,
            left: balloon.position.left,
            width: balloon.size,
            height: balloon.size * 1.2,
            opacity: balloon.opacity ?? 0.9,
          }}
          initial={{ y: 0, opacity: balloon.opacity ?? 0.9 }}
          animate={{
            y: [0, -14, 6, -10, 0],
            rotate: [-1.5, 1, -0.75, 0.5, -1.5],
          }}
          transition={{
            duration: 8 + (balloon.oscillation ?? 0) / 2,
            repeat: Infinity,
            ease: [0.42, 0, 0.58, 1],
            delay: balloon.delay ?? 0,
          }}
        >
          <div className="relative flex w-full flex-col items-center" style={{ transform: "translateY(-10%)" }}>
            <div
              className="relative w-full flex-1 rounded-full"
              style={{
                background: balloon.color,
                boxShadow: "0 18px 40px rgba(0,0,0,0.08)",
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background: balloon.accentColor ?? "rgba(255,255,255,0.35)",
                  clipPath: "ellipse(45% 65% at 30% 30%)",
                  opacity: 0.65,
                }}
              />
            </div>
            <div className="h-7 w-[2px] bg-slate-400/30" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function IntroOverlayDecorations({ scene, isTransitioning }: IntroSceneBackgroundProps) {
  if (!scene.decorations.length) return null;

  return (
    <div className="absolute inset-0">
      {scene.decorations.map((decoration) => (
        <motion.span
          key={`intro-decoration-${decoration.id}`}
          className="absolute"
          style={{
            width: decoration.size,
            height: decoration.size,
            top: decoration.position.top,
            left: decoration.position.left,
            opacity: (decoration.opacity ?? 1) * 0.35,
            background:
              decoration.type === "confetti"
                ? "radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 65%)"
                : decoration.color,
            filter: decoration.blur ? "blur(16px)" : "none",
          }}
          animate={
            decoration.type === "balloon"
              ? { y: isTransitioning ? 20 : [0, -12, 4, -8, 0] }
              : decoration.type === "spark"
                ? {
                  scale: isTransitioning ? 0.92 : [1, 1.05, 1],
                  opacity: isTransitioning ? 0.2 : [0.3, 0.6, 0.3],
                }
                : { opacity: isTransitioning ? 0 : [0.25, 0.45, 0.25] }
          }
          transition={{ duration: 6, repeat: isTransitioning ? 0 : Infinity, ease: [0.42, 0, 0.58, 1] }}
        />
      ))}
    </div>
  );
}

export function IntroSceneBackground({ scene, isTransitioning }: IntroSceneBackgroundProps) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <SceneBackground
        scene={scene}
        showDecorations={false}
        showBalloonClusters={false}
        showAmbientBalloons={false}
        showConfettiDots={false}
      />
      {/* <IntroConfettiBackdrop /> */}
      <IntroBalloonClusters scene={scene} />
      <IntroAmbientBalloons scene={scene} />
      <IntroOverlayDecorations scene={scene} isTransitioning={isTransitioning} />
    </div>
  );
}
