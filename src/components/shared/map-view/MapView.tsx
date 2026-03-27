"use client";
import { useEffect, useRef, useState } from "react";
import L from "@/lib/leaflet-fix"; // Usa la versión corregida
import "leaflet/dist/leaflet.css";

type MapViewProps = {
  onLocationSelect?: (coordinates: { lat: number; lng: number }, address: string) => void;
  initialAddress?: string;
  initialCoordinates?: { lat: number; lng: number } | null;
  showSearch?: boolean;
};

export default function MapView({ onLocationSelect, initialAddress, initialCoordinates, showSearch = true }: MapViewProps) {
  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);

  const [query, setQuery] = useState(initialAddress || "");

  useEffect(() => {
    if (!mapRef.current) {
      // Si hay coordenadas iniciales, usarlas; si no, usar Santiago como default
      const defaultLat = initialCoordinates?.lat ?? -33.4489;
      const defaultLng = initialCoordinates?.lng ?? -70.6693;
      const zoom = initialCoordinates ? 17 : 13; // Zoom más cercano si hay coordenadas

      mapRef.current = L.map(document.getElementById("leaflet-map") as HTMLElement).setView([defaultLat, defaultLng], zoom);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(mapRef.current);

      // Si hay coordenadas iniciales, mostrar marker
      if (initialCoordinates) {
        markerRef.current = L.marker([initialCoordinates.lat, initialCoordinates.lng]).addTo(mapRef.current);
      }
    }
  }, [initialCoordinates]);

  // Buscar dirección con Nominatim
  const searchAddress = async () => {
    if (!query) return;

    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      query
    )}&format=json&limit=1`;

    const res = await fetch(url, {
      headers: { "User-Agent": "nextjs-app" },
    });
    const data = await res.json();

    if (!data[0]) {
      alert("Dirección no encontrada");
      return;
    }

    const { lat, lon } = data[0];

    // Mover mapa a coordenadas
    mapRef.current.setView([lat, lon], 17);

    // Marker
    if (markerRef.current) markerRef.current.remove();

    markerRef.current = L.marker([lat, lon]).addTo(mapRef.current);

    // Devolver coordenadas al componente padre
    if (onLocationSelect) {
      onLocationSelect({ lat: parseFloat(lat), lng: parseFloat(lon) }, query);
    }
  };

  return (
    <div className="relative">
      {/* INPUT - solo mostrar si showSearch es true */}
      {showSearch && (
        <div className="mb-3 flex gap-2">
          <input
            type="text"
            placeholder="Escribe una dirección…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
          />
          <button
            onClick={searchAddress}
            className="rounded-xl bg-purple-500 px-6 py-3 text-white transition hover:bg-purple-600"
          >
            Buscar
          </button>
        </div>
      )}

      {/* MAP */}
      <div id="leaflet-map" className="relative z-0 h-[300px] w-full rounded-xl border-2 border-gray-200" />
    </div>
  );
}