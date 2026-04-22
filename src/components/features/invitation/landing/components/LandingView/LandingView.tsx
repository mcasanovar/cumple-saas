"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";

import { useThemeDetection } from "@/hooks/useThemeDetection";
import { SceneBackground } from "@/components/shared/invitation/scene-background";
import { EventLocationMap } from "../EventLocationMap";
import { RSVPForm } from "../RSVPForm";
import { LandingAvengersBackground } from "../LandingAvengersBackground/LandingAvengersBackground";
import { LandingDinoBackground } from "../LandingDinoBackground/LandingDinoBackground";
import { LandingKPopBackground } from "../LandingKPopBackground";
import { LandingPrincessBackground } from "../LandingPrincessBackground";
import { IntroPetalConfetti } from "../../../intro/components/IntroPetalConfetti/IntroPetalConfetti";
import { IconRenderer } from "@/components/shared/icon-renderer/IconRenderer";
import { LandingAvengersFeatureList } from "../LandingAvengersFeatureList/LandingAvengersFeatureList";
import { normalizeAvengersText } from "@/lib/utils/normalizeText";

import type { LandingViewProps } from "./LandingView.types";

const easeOutQuint = [0.16, 1, 0.3, 1] as const;

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: easeOutQuint,
    },
  },
};

export function LandingView({
  invitationId,
  scene,
  badgeLabel,
  heroTopLine,
  heroNameLine,
  heroNameLineClass,
  detailHighlights,
  celebrantDescription,
  celebrantName,
  celebrantAge,
  galleryItems,
  featureList,
  closingMessage,
  heroSubheadline,
  typography,
  themeToken,
  venue,
  isPreview = false,
  isEventPast = false,
}: LandingViewProps) {
  const { isDinoTheme, isPrincessTheme, isKPopTheme, isAvengersTheme } = useThemeDetection(themeToken);

  const displayHeroTopLine = isAvengersTheme ? normalizeAvengersText(heroTopLine, true) : heroTopLine;
  const displayHeroNameLine = isAvengersTheme ? normalizeAvengersText(heroNameLine, true) : heroNameLine;
  const displayBadgeLabel = badgeLabel;
  const displayClosingMessage = closingMessage;
  const displayCelebrantName = celebrantName;

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden">
      <SceneBackground
        scene={scene}
        showConfettiDots={!isDinoTheme && !isPrincessTheme && !isKPopTheme && !isAvengersTheme}
        showBaseBackground={!isAvengersTheme}
        showOverlay={!isAvengersTheme}
        showTexture={!isAvengersTheme}
      />
      {isDinoTheme && <LandingDinoBackground />}
      {isAvengersTheme && <LandingAvengersBackground />}
      {isPrincessTheme && (
        <>
          <LandingPrincessBackground />
          <IntroPetalConfetti />
        </>
      )}
      {isKPopTheme && <LandingKPopBackground />}

      <section className="relative z-10 flex flex-col items-center gap-16 px-6 pb-24 pt-24 text-center sm:pt-28">
        <motion.div
          className="relative flex w-full max-w-5xl flex-col items-center gap-8 rounded-[36px] bg-transparent px-4"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
        >
          <motion.span
            className="text-sm font-semibold uppercase tracking-[0.42em]"
            style={{ color: isKPopTheme ? "#f363b4" : isAvengersTheme ? "#fbc02d" : "#6f6bb3" }}
            variants={fadeInUp}
            transition={{ delay: 0.05, ease: easeOutQuint, duration: 0.7 }}
          >
            {displayBadgeLabel}
          </motion.span>

          <motion.h1
            className="flex flex-col gap-4 text-balance text-[clamp(2.8rem,6vw,4.2rem)] font-black leading-[1.05]"
            style={{
              fontFamily: typography.heading,
              color: isKPopTheme ? "#f363b4" : isAvengersTheme ? "#ffffff" : "#262147"
            }}
            variants={fadeInUp}
            transition={{ delay: 0.12, ease: easeOutQuint, duration: 0.85 }}
          >
            <span className={isAvengersTheme ? "drop-shadow-[0_8px_12px_rgba(0,0,0,0.8)]" : "drop-shadow-[0_6px_16px_rgba(38,33,71,0.15)]"}>
              {displayHeroTopLine}
            </span>
            <span
              className={
                heroNameLineClass ||
                "text-transparent"
              }
              style={
                !heroNameLineClass
                  ? {
                    backgroundImage: isPrincessTheme
                      ? "linear-gradient(135deg, #9278b9 0%, #f8a6ba 52%, #c8a2c8 100%)"
                      : isDinoTheme
                        ? "linear-gradient(135deg, #6B9B6E 0%, #5A8A5D 50%, #4A7350 100%)"
                        : isKPopTheme
                          ? "linear-gradient(135deg, #9333ea 0%, #9333ea 52%, #9333ea 100%)"
                          : isAvengersTheme
                            ? "linear-gradient(to right, #ff7a00, #ffd54f, #4ea2ff)"
                            : "linear-gradient(90deg, #ffd166 0%, #ff9f1c 30%, #f15bb5 60%, #4361ee 100%)",
                    WebkitBackgroundClip: "text",
                    filter: isDinoTheme ? "drop-shadow(2px 2px 4px rgba(0,0,0,0.15))" : isAvengersTheme ? "drop-shadow(0_10px_15px_rgba(255,122,0,0.4))" : "none",
                  }
                  : undefined
              }
            >
              {displayHeroNameLine}
            </span>
          </motion.h1>

          <motion.button
            type="button"
            className={`rounded-[36px] px-14 py-4 text-lg font-extrabold uppercase tracking-[0.32em] transition hover:-translate-y-0.5 ${isKPopTheme ? "text-transparent" : isAvengersTheme ? "text-black" : "text-white"}`}
            style={{
              background: isDinoTheme
                ? "linear-gradient(135deg, rgba(90, 138, 93, 0.98) 0%, rgba(74, 115, 80, 0.95) 52%, rgba(107, 155, 110, 0.92) 100%)"
                : isKPopTheme
                  ? "linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(45, 27, 105, 0.9) 100%)"
                  : isAvengersTheme
                    ? "linear-gradient(135deg, #ff7a00 0%, #ffd54f 100%)"
                    : "linear-gradient(135deg, rgba(255,112,161,0.95) 0%, rgba(255,149,89,0.92) 52%, rgba(255,213,102,0.88) 100%)",
              boxShadow: isDinoTheme
                ? "0 22px 48px rgba(74, 115, 80, 0.4)"
                : isKPopTheme
                  ? "0 0 30px rgba(243, 99, 180, 0.6), 0 0 60px rgba(147, 51, 234, 0.4), inset 0 0 0 2px rgba(243, 99, 180, 0.8)"
                  : isAvengersTheme
                    ? "0 10px 25px rgba(255, 122, 0, 0.4)"
                    : "0 22px 45px rgba(244,63,94,0.25)",
              border: isKPopTheme ? "2px solid rgba(243, 99, 180, 0.8)" : isAvengersTheme ? "1px solid rgba(255,255,255,0.2)" : undefined,
              backgroundClip: isKPopTheme ? undefined : undefined,
              WebkitTextFillColor: isKPopTheme ? "transparent" : undefined,
              backgroundImage: isKPopTheme ? "linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(45, 27, 105, 0.9) 100%)" : undefined,
            }}
            variants={fadeInUp}
            transition={{ delay: 0.2, ease: easeOutQuint, duration: 0.75 }}
          >
            {isKPopTheme ? (
              <span
                style={{
                  background: "linear-gradient(45deg, #f363b4 0%, #ffd166 50%, #f363b4 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  WebkitTextStroke: "2px rgba(243, 99, 180, 0.8)",
                  filter: "drop-shadow(0 0 10px rgba(243, 99, 180, 0.8)) drop-shadow(0 0 20px rgba(147, 51, 234, 0.6))",
                }}
              >
                Cumpleaños
              </span>
            ) : (
              "Cumpleaños"
            )}
          </motion.button>

          <motion.div
            className="mt-8 flex w-full flex-col items-center"
            variants={fadeInUp}
            transition={{ delay: 0.26, ease: easeOutQuint, duration: 0.8 }}
          >
            <div className="flex w-full max-w-3xl flex-col items-center gap-y-8 md:flex-row md:items-start md:justify-center">
              {detailHighlights.map((item, index) => (
                <div key={item.label} className="flex items-center md:flex-1 md:justify-center">
                  <div className="flex flex-col items-center text-center">
                    <span className="text-xl">{item.icon}</span>
                    <span
                      className="mt-3 text-[0.72rem] font-semibold uppercase tracking-[0.4em]"
                      style={{ color: isDinoTheme ? "#5A8A5D" : isPrincessTheme ? "#9278b9" : isKPopTheme ? "#f363b4" : isAvengersTheme ? "#fbc02d" : "#6f6bb3" }}
                    >
                      {item.label}
                    </span>
                    <span
                      className="mt-3 text-[1.75rem] font-black"
                      style={{
                        fontFamily: typography.heading,
                        color: isDinoTheme ? "#2D3D2D" : isPrincessTheme ? "#9278b9" : isKPopTheme ? "#f363b4" : isAvengersTheme ? "#ffffff" : "#262147",
                      }}
                    >
                      {isAvengersTheme ? normalizeAvengersText(item.value, true) : item.value}
                    </span>
                    {item.helper ? (
                      <span
                        className="mt-1 text-sm font-semibold"
                        style={{ color: isDinoTheme ? "#2D3D2D" : isPrincessTheme ? "#ffaabe" : isKPopTheme ? "#f363b4" : isAvengersTheme ? "#9b9b9b" : "#262147" }}
                      >
                        {item.helper}
                      </span>
                    ) : null}
                  </div>
                  {index < detailHighlights.length - 1 ? (
                    <span
                      className="mx-6 hidden h-14 w-px md:block"
                      style={{ backgroundColor: isDinoTheme ? "#C8C4BC" : isAvengersTheme ? "rgba(255,255,255,0.1)" : "#e5dff8" }}
                    />
                  ) : null}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.section
          className="relative z-10 w-full max-w-4xl overflow-visible p-10 text-center"
          variants={fadeInUp}
          transition={{ delay: 0.38, ease: easeOutQuint, duration: 0.95 }}
        >
          <div className="flex flex-col items-center gap-8">
            <div className="flex flex-col items-center gap-1">
              <span className="text-xs font-semibold uppercase tracking-[0.36em]" style={{ color: isDinoTheme ? "#5A8A5D" : isPrincessTheme ? "#ffaabe" : isKPopTheme ? "#FFFFFF" : isAvengersTheme ? "#fbc02d" : "#6f6bb3", opacity: isKPopTheme ? 0.95 : 1 }}>
                {isAvengersTheme ? "DONDE FESTEJAMOS" : "Dónde festejamos"}
              </span>
              <h2 className="text-2xl font-extrabold sm:text-[2.35rem]" style={{ fontFamily: typography.heading, color: isDinoTheme ? "#2D3D2D" : isPrincessTheme ? "#9278b9" : isKPopTheme ? "#FFFFFF" : isAvengersTheme ? "#ffffff" : "#262147", textShadow: isKPopTheme ? "0 4px 12px rgba(220, 20, 60, 0.4)" : isAvengersTheme ? "0 4px 12px rgba(0,0,0,0.5)" : undefined }}>
                {isAvengersTheme ? normalizeAvengersText(venue.name, true) : venue.name}
              </h2>
              <p className="text-base font-semibold" style={{ fontFamily: typography.body, color: isDinoTheme ? "#2D3D2D" : isPrincessTheme ? "#6c5491" : isKPopTheme ? "#FFFFFF" : isAvengersTheme ? "#9b9b9b" : "#433f8c", opacity: isKPopTheme ? 0.9 : 1 }}>
                {venue.address}
              </p>
            </div>

            <div className="relative flex w-full items-center justify-center">
              <Image
                src={venue.imageUrl ?? "/place.jpg"}
                alt={`Foto del lugar ${venue.name}`}
                width={800}
                height={420}
                className="h-auto w-full max-w-4xl rounded-[32px] object-cover shadow-[0_24px_70px_rgba(255,180,195,0.28)]"
                priority
              />
            </div>

            {venue.showMap && venue.coordinates &&
              <EventLocationMap
                coordinates={venue.coordinates}
                venueName={venue.name}
                address={venue.address}
                mapsUrl={venue.mapsUrl}
              />
            }

            {venue.showMap && !venue.coordinates && (
              <div className="flex w-full flex-col items-center gap-3 rounded-[28px] border border-dashed border-[#e7defa] bg-white/90 p-8 text-[#6f6bb3]">
                <span className="text-lg font-semibold" style={{ fontFamily: typography.heading }}>
                  {isAvengersTheme ? "MAPA DISPONIBLE PRONTO" : "¡Mapa disponible pronto!"}
                </span>
                <p className="text-sm" style={{ fontFamily: typography.body }}>
                  Actualiza los datos del evento con coordenadas para mostrar la ubicación.
                </p>
              </div>
            )}
          </div>
        </motion.section>
      </section>

      <section className="relative z-10 flex flex-col gap-16 px-6 pb-28 pt-10">
        <motion.section
          className="mx-auto flex w-full max-w-5xl flex-col items-center gap-10 overflow-visible rounded-[44px] bg-transparent px-4 py-12 text-center sm:gap-12 sm:px-6 sm:py-16"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          transition={{ ease: easeOutQuint, duration: 0.9 }}
        >
          <div className="pointer-events-none absolute inset-x-0 top-20 flex justify-center opacity-40">
            <div className="h-48 w-48 rounded-full bg-[#fddae4] blur-2xl" />
          </div>

          <div className="relative flex flex-col items-center gap-3 sm:gap-4">
            <h2
              className="text-[clamp(2.4rem,5vw,3.4rem)] font-black leading-[1.08]"
              style={{
                fontFamily: typography.heading,
                color: isDinoTheme ? "#2D3D2D" : isKPopTheme ? "#9333ea" : isAvengersTheme ? "#ffffff" : "#1d1a43",
                textShadow: isKPopTheme ? "0 4px 12px rgba(220, 20, 60, 0.4)" : isAvengersTheme ? "0 4px 12px rgba(0,0,0,0.5)" : undefined,
              }}
            >
              <span style={{ color: isDinoTheme ? "#5A8A5D" : isPrincessTheme ? "#ffaabe" : isKPopTheme ? "#FFFFFF" : isAvengersTheme ? "#ff7a00" : "#2f6bff" }}>{isAvengersTheme ? normalizeAvengersText(celebrantName, true) : celebrantName}</span> {isAvengersTheme ? "CUMPLE" : "cumple"}
              <span style={{ color: isDinoTheme ? "#8B7355" : isPrincessTheme ? "#9278b9" : isKPopTheme ? "#FFFFFF" : isAvengersTheme ? "#ffd54f" : "#ff6b3d" }}> {celebrantAge}</span>
              <span style={{ color: isDinoTheme ? "#8B7355" : isPrincessTheme ? "#9278b9" : isKPopTheme ? "#9333ea" : isAvengersTheme ? "#ff6b3d" : "#ff6b3d" }}> {celebrantAge === 1 ? (isAvengersTheme ? "ANO" : "año") : (isAvengersTheme ? "ANOS" : "años")}</span>
            </h2>
            <p className="max-w-3xl text-base leading-relaxed sm:text-lg" style={{ fontFamily: typography.body, color: isKPopTheme ? "#FFFFFF" : isAvengersTheme ? "#9b9b9b" : "#6f6bb3", opacity: isKPopTheme ? 0.95 : 1 }}>
              {celebrantDescription}
            </p>
          </div>

          <div className="relative flex w-full max-w-3xl flex-wrap items-center justify-center gap-4 sm:gap-6">
            {galleryItems.map((item, index) => (
              <motion.figure
                key={item.id}
                className={`flex items-center justify-center rounded-full border-[6px] ${index === 1 ? "scale-105" : ""
                  } h-32 w-32 sm:h-40 sm:w-40`}
                style={{
                  border: isKPopTheme ? "6px solid #9333ea" : "6px solid #fff6ef",
                  background: isDinoTheme
                    ? "linear-gradient(135deg, #6B9B6E 0%, #5A8A5D 100%)"
                    : isKPopTheme
                      ? "linear-gradient(135deg, #9333ea 0%, #f363b4 100%)"
                      : "linear-gradient(135deg, #fff6ef 0%, #ffe0f3 100%)",
                  boxShadow: isDinoTheme
                    ? "0 20px 45px rgba(107, 155, 110, 0.35)"
                    : isKPopTheme
                      ? "0 20px 45px rgba(147, 51, 234, 0.35)"
                      : "0 20px 45px rgba(255,180,200,0.32)",
                }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.35, ease: easeOutQuint }}
              >
                <Image
                  src={item.imageUrl}
                  alt={item.caption}
                  width={160}
                  height={160}
                  className="h-24 w-24 rounded-full object-cover sm:h-32 sm:w-32"
                />
              </motion.figure>
            ))}
          </div>
        </motion.section>

        <motion.section
          className="mx-auto flex w-full max-w-6xl flex-col items-center gap-8 rounded-[48px] px-5 py-12 text-center sm:gap-10 sm:px-10 sm:py-16"
          style={{
            background: isDinoTheme ? "#6B9B6E" : isKPopTheme ? "#f363b4" : isAvengersTheme ? "rgba(26, 26, 26, 0.4)" : "#fdeee2",
            backdropFilter: isAvengersTheme ? "blur(12px)" : undefined,
            boxShadow: isDinoTheme
              ? "0 24px 90px rgba(90, 138, 93, 0.25)"
              : isKPopTheme
                ? "0 24px 90px rgba(218, 112, 214, 0.3)"
                : isAvengersTheme
                  ? "0 24px 90px rgba(0,0,0,0.3)"
                  : "0 24px 90px rgba(255,188,170,0.25)",
            border: isAvengersTheme ? "1px solid rgba(255,255,255,0.08)" : undefined
          }}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ ease: easeOutQuint, duration: 0.95 }}
        >
          <div className="flex flex-col items-center gap-2 sm:gap-3">
            <h2
              className="text-[clamp(2.6rem,5vw,3.4rem)] font-black leading-[1.08]"
              style={{
                fontFamily: typography.heading,
                color: isDinoTheme ? "#2D3D2D" : isKPopTheme ? "#FFFFFF" : isAvengersTheme ? "#ffffff" : "#1f1a48",
                textShadow: isKPopTheme ? "0 4px 12px rgba(220, 20, 60, 0.3)" : isAvengersTheme ? "0 4px 12px rgba(0,0,0,0.5)" : undefined
              }}
            >
              {isAvengersTheme ? "QUE TE ESPERA" : "¿Qué te espera?"}
            </h2>
            <p
              className="text-base font-medium sm:text-lg"
              style={{
                fontFamily: typography.body,
                color: isDinoTheme ? "#2D3D2D" : isKPopTheme ? "#FFFFFF" : isAvengersTheme ? "#9b9b9b" : "#6f6bb3",
                opacity: isKPopTheme ? 0.95 : 1
              }}
            >
              Una fiesta llena de sorpresas para grandes y chiquitos
            </p>
          </div>

          {isAvengersTheme ? (
            <LandingAvengersFeatureList featureList={featureList} typography={typography} />
          ) : (
            <div className="grid w-full gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {featureList.map((feature) => (
                <motion.div
                  key={feature.title}
                  className="flex flex-col items-center gap-3 rounded-[28px] px-6 py-6 text-center transition-transform sm:px-8 sm:py-8"
                  style={{
                    background: isDinoTheme ? "#E8F5E9" : "#ffffff",
                    boxShadow: isDinoTheme
                      ? "0 18px 44px rgba(107, 155, 110, 0.22)"
                      : isKPopTheme
                        ? "0 18px 44px rgba(218, 112, 214, 0.25)"
                        : "0 18px 44px rgba(255,170,160,0.18)",
                  }}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.35, ease: easeOutQuint }}
                >
                  <IconRenderer
                    icon={feature.icon}
                    className="text-4xl"
                    style={{ color: feature.color }}
                  />
                  <h3 className="text-xl font-semibold" style={{ fontFamily: typography.heading, color: isDinoTheme ? "#2D3D2D" : isKPopTheme ? "#9333ea" : isAvengersTheme ? "#ffffff" : "#1f1a48" }}>
                    {isAvengersTheme ? normalizeAvengersText(feature.title, true) : feature.title}
                  </h3>
                  <p className="text-sm font-medium" style={{ fontFamily: typography.body, color: isDinoTheme ? "#5A8A5D" : isKPopTheme ? "#E91E63" : isAvengersTheme ? "#9b9b9b" : "#6f6bb3" }}>
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </motion.section>

        <motion.section
          className="mx-auto flex w-full max-w-4xl flex-col items-center gap-4 rounded-[44px] bg-gradient-to-br from-white via-white/85 to-white/70 p-12 text-center"
          style={{
            background: isAvengersTheme ? "rgba(26, 26, 26, 0.4)" : undefined,
            backdropFilter: isAvengersTheme ? "blur(12px)" : undefined,
            boxShadow: isDinoTheme
              ? "0 18px 70px rgba(107, 155, 110, 0.15)"
              : isKPopTheme
                ? "0 18px 70px rgba(218, 112, 214, 0.25)"
                : isAvengersTheme
                  ? "0 18px 70px rgba(0,0,0,0.3)"
                  : "0 18px 70px rgba(210,187,255,0.22)",
            border: isAvengersTheme ? "1px solid rgba(255,255,255,0.08)" : undefined
          }}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          transition={{ ease: easeOutQuint, duration: 1 }}
        >
          <h2 className="text-3xl font-bold sm:text-4xl" style={{ fontFamily: typography.heading, color: isDinoTheme ? "#2D3D2D" : isKPopTheme ? "#9333ea" : isAvengersTheme ? "#ffffff" : "#0f172a" }}>
            {displayClosingMessage}
          </h2>
          <p className="max-w-2xl text-base" style={{ fontFamily: typography.body, color: isDinoTheme ? "#5A8A5D" : isKPopTheme ? "#E91E63" : isAvengersTheme ? "#9b9b9b" : "#475569" }}>
            {heroSubheadline}
          </p>
        </motion.section>

        <motion.section
          className="mx-auto w-full max-w-2xl"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ ease: easeOutQuint, duration: 1 }}
        >
          <RSVPForm invitationId={invitationId} typography={typography} themeToken={themeToken} isPreview={isPreview} isEventPast={isEventPast} />
        </motion.section>
      </section>
    </div>
  );
}
