"use client";

import { useMemo } from "react";

type EventLocationMapProps = {
  coordinates?: { lat: number; lng: number };
  venueName: string;
  address: string;
  mapsUrl?: string;
};

const buildGoogleMapsEmbed = (lat: number, lng: number) =>
  `https://www.google.com/maps?q=${lat},${lng}&z=16&output=embed`;

export function EventLocationMap({ coordinates, venueName, address, mapsUrl }: EventLocationMapProps) {
  const fallbackEmbed =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.0!2d-75.57!3d6.25!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTUnMDAuMCJOIDc1wrAzNCcxMi4wIlc!5e0!3m2!1ses!2sco!4v1600000000000";

  const iframeSrc = useMemo(() => {
    if (!coordinates) return fallbackEmbed;
    return buildGoogleMapsEmbed(coordinates.lat, coordinates.lng);
  }, [coordinates]);

  return (
    <div className="relative mx-auto w-full max-w-4xl overflow-hidden rounded-[28px] border border-white/80 bg-white/95 shadow-[0_18px_60px_rgba(93,75,255,0.18)]">
      {mapsUrl ? (
        <a
          href={mapsUrl}
          target="_blank"
          rel="noreferrer"
          className="absolute left-4 top-4 z-10 rounded-full bg-white px-4 py-2 text-[0.72rem] font-bold uppercase tracking-[0.32em] text-[#5d4bff] shadow-[0_10px_25px_rgba(93,75,255,0.18)] transition hover:-translate-y-0.5"
        >
          Abrir en Maps ↗
        </a>
      ) : null}
      <iframe
        title={`Ubicación de ${venueName}`}
        src={iframeSrc}
        width="100%"
        height="260"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-[260px] w-full"
      />
      <div className="px-6 pb-6 pt-4 text-left text-xs text-[#6f6bb3]">
        <p className="font-semibold uppercase tracking-[0.28em]">Dirección</p>
        <p className="mt-1 text-sm font-medium text-[#433f8c]">{address}</p>
      </div>
    </div>
  );
}
