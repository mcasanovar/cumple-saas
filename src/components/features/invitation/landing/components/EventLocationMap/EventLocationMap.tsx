"use client";

import dynamic from "next/dynamic";

// Dynamically import MapView to avoid SSR issues with Leaflet
const MapView = dynamic(() => import("@/components/shared/map-view/MapView"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[300px] items-center justify-center rounded-[28px] border-2 border-gray-200 bg-gray-50">
      <div className="text-center">
        <div className="mb-3 h-8 w-8 animate-spin rounded-full border-2 border-purple-500 border-t-transparent" />
        <p className="text-sm text-gray-500">Cargando mapa...</p>
      </div>
    </div>
  ),
});

type EventLocationMapProps = {
  coordinates?: { lat: number; lng: number };
  venueName: string;
  address: string;
  mapsUrl?: string;
};

export function EventLocationMap({ coordinates, venueName, address, mapsUrl }: EventLocationMapProps) {
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

      {/* Leaflet Map */}
      <MapView
        initialAddress={address}
        initialCoordinates={coordinates}
        showSearch={false}
      />

      <div className="px-6 pb-6 pt-4 text-left text-xs text-[#6f6bb3]">
        <p className="font-semibold uppercase tracking-[0.28em]">Dirección</p>
        <p className="mt-1 text-sm font-medium text-[#433f8c]">{address}</p>
      </div>
    </div>
  );
}
