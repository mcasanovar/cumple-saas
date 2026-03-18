"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";

import { SceneBackground } from "@/components/shared/invitation/scene-background";
import { EventLocationMap } from "../EventLocationMap";

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
  scene,
  badgeLabel,
  heroTopLine,
  heroNameLine,
  detailHighlights,
  celebrantDescription,
  celebrantName,
  celebrantAge,
  galleryItems,
  featureList,
  closingMessage,
  heroSubheadline,
  typography,
  venue,
}: LandingViewProps) {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden">
      <SceneBackground scene={scene} />

      <section className="relative z-10 flex flex-col items-center gap-16 px-6 pb-24 pt-24 text-center sm:pt-28">
        <motion.div
          className="relative flex w-full max-w-5xl flex-col items-center gap-8 rounded-[36px] bg-transparent px-4"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
        >
          <motion.span
            className="text-sm font-semibold uppercase tracking-[0.42em] text-[#6f6bb3]"
            variants={fadeInUp}
            transition={{ delay: 0.05, ease: easeOutQuint, duration: 0.7 }}
          >
            {badgeLabel}
          </motion.span>

          <motion.h1
            className="flex flex-col gap-2 text-balance text-[clamp(2.8rem,6vw,4.2rem)] font-black leading-[1.05] text-[#262147]"
            style={{ fontFamily: typography.heading }}
            variants={fadeInUp}
            transition={{ delay: 0.12, ease: easeOutQuint, duration: 0.85 }}
          >
            <span className="drop-shadow-[0_6px_16px_rgba(38,33,71,0.15)]">{heroTopLine}</span>
            <span className="text-[#ff6b3d] drop-shadow-[0_6px_16px_rgba(255,107,61,0.25)]">
              {heroNameLine}
            </span>
          </motion.h1>

          <motion.button
            type="button"
            className="rounded-[36px] bg-gradient-to-r from-[#ff7a3d] to-[#ffb347] px-14 py-4 text-lg font-extrabold uppercase tracking-[0.32em] text-white shadow-[0_12px_30px_rgba(255,142,93,0.45)] transition hover:-translate-y-0.5"
            variants={fadeInUp}
            transition={{ delay: 0.2, ease: easeOutQuint, duration: 0.75 }}
          >
            Cumpleaños
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
                    <span className="mt-3 text-[0.72rem] font-semibold uppercase tracking-[0.4em] text-[#6f6bb3]">
                      {item.label}
                    </span>
                    <span
                      className="mt-3 text-[1.75rem] font-black text-[#262147]"
                      style={{ fontFamily: typography.heading }}
                    >
                      {item.value}
                    </span>
                    {item.helper ? (
                      <span className="mt-1 text-sm font-semibold text-[#262147]">{item.helper}</span>
                    ) : null}
                  </div>
                  {index < detailHighlights.length - 1 ? (
                    <span className="mx-6 hidden h-14 w-px bg-[#e5dff8] md:block" />
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
              <span className="text-xs font-semibold uppercase tracking-[0.36em] text-[#6f6bb3]">
                Dónde festejamos
              </span>
              <h2 className="text-2xl font-extrabold text-[#262147] sm:text-[2.35rem]" style={{ fontFamily: typography.heading }}>
                {venue.name}
              </h2>
              <p className="text-base font-semibold text-[#433f8c]" style={{ fontFamily: typography.body }}>
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

            {venue.coordinates ? (
              <EventLocationMap
                coordinates={venue.coordinates}
                venueName={venue.name}
                address={venue.address}
                mapsUrl={venue.mapsUrl}
              />
            ) : (
              <div className="flex w-full flex-col items-center gap-3 rounded-[28px] border border-dashed border-[#e7defa] bg-white/90 p-8 text-[#6f6bb3]">
                <span className="text-lg font-semibold" style={{ fontFamily: typography.heading }}>
                  ¡Mapa disponible pronto!
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
          className="relative mx-auto flex w-full max-w-5xl flex-col items-center gap-10 overflow-visible rounded-[44px] bg-transparent px-4 py-12 text-center sm:gap-12 sm:px-6 sm:py-16"
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
              className="text-[clamp(2.4rem,5vw,3.4rem)] font-black leading-[1.08] text-[#1d1a43]"
              style={{ fontFamily: typography.heading }}
            >
              <span className="text-[#2f6bff]">{celebrantName}</span> cumple
              <span className="text-[#ff6b3d]"> {celebrantAge}</span>
              <span className="text-[#ff6b3d]"> {celebrantAge === 1 ? "año" : "años"}</span>
            </h2>
            <p className="max-w-3xl text-base leading-relaxed text-[#6f6bb3] sm:text-lg" style={{ fontFamily: typography.body }}>
              {celebrantDescription}
            </p>
          </div>

          <div className="relative flex w-full max-w-3xl flex-wrap items-center justify-center gap-4 sm:gap-6">
            {galleryItems.map((item, index) => (
              <motion.figure
                key={item.id}
                className={`flex items-center justify-center rounded-full border-[6px] border-white/90 bg-gradient-to-br from-[#fff6ef] to-[#ffe0f3] shadow-[0_20px_45px_rgba(255,180,200,0.32)] ${index === 1 ? "scale-105" : ""
                  } h-32 w-32 sm:h-40 sm:w-40`}
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
          className="mx-auto flex w-full max-w-6xl flex-col items-center gap-8 rounded-[48px] bg-[#fdeee2] px-5 py-12 text-center shadow-[0_24px_90px_rgba(255,188,170,0.25)] sm:gap-10 sm:px-10 sm:py-16"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ ease: easeOutQuint, duration: 0.95 }}
        >
          <div className="flex flex-col items-center gap-2 sm:gap-3">
            <h2 className="text-[clamp(2.6rem,5vw,3.4rem)] font-black leading-[1.08] text-[#1f1a48]" style={{ fontFamily: typography.heading }}>
              ¿Qué te espera?
            </h2>
            <p className="text-base font-medium text-[#6f6bb3] sm:text-lg" style={{ fontFamily: typography.body }}>
              Una fiesta llena de sorpresas para grandes y chiquitos
            </p>
          </div>

          <div className="grid w-full gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {featureList.map((feature) => (
              <motion.div
                key={feature.title}
                className="flex flex-col items-center gap-3 rounded-[28px] bg-white px-6 py-6 text-center shadow-[0_18px_44px_rgba(255,170,160,0.18)] transition-transform sm:px-8 sm:py-8"
                whileHover={{ y: -6 }}
                transition={{ duration: 0.35, ease: easeOutQuint }}
              >
                <span className="text-4xl" style={{ color: feature.color }}>
                  {feature.icon}
                </span>
                <h3 className="text-xl font-semibold text-[#1f1a48]" style={{ fontFamily: typography.heading }}>
                  {feature.title}
                </h3>
                <p className="text-sm font-medium text-[#6f6bb3]" style={{ fontFamily: typography.body }}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          className="mx-auto flex w-full max-w-4xl flex-col items-center gap-4 rounded-[44px] bg-gradient-to-br from-white via-white/85 to-white/70 p-12 text-center shadow-[0_18px_70px_rgba(210,187,255,0.22)]"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          transition={{ ease: easeOutQuint, duration: 1 }}
        >
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl" style={{ fontFamily: typography.heading }}>
            {closingMessage}
          </h2>
          <p className="max-w-2xl text-base text-slate-600" style={{ fontFamily: typography.body }}>
            {heroSubheadline}
          </p>
        </motion.section>
      </section>
    </div>
  );
}
