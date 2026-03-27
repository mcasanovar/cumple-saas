"use client";

import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default markers in webpack
const DefaultIcon = L.icon({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export type LocationMapProps = {
  address: string;
  onLocationChange: (coordinates: { lat: number; lng: number }) => void;
  initialCoordinates?: { lat: number; lng: number };
  searchTrigger?: number;
};

function LeafletMap({ address, onLocationChange, initialCoordinates, searchTrigger }: LocationMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Geocoding function using Nominatim (OpenStreetMap API - Free)
  const geocodeAddress = async (address: string): Promise<{ lat: number; lng: number } | null> => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`,
        {
          headers: {
            'User-Agent': 'CumpleSaaS/1.0 (contact@example.com)' // Required by Nominatim
          }
        }
      );

      if (!response.ok) {
        throw new Error('Error en la geocodificación');
      }

      const data = await response.json();

      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        return { lat: parseFloat(lat), lng: parseFloat(lon) };
      }

      return null;
    } catch (err) {
      console.error('Geocoding error:', err);
      return null;
    }
  };

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize map
    const map = L.map(mapRef.current).setView([-33.4489, -70.6693], 13); // Default: Santiago, Chile

    // Add OpenStreetMap tiles (free)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const updateMapLocation = async () => {
      if (!mapInstanceRef.current || !address) return;

      setIsLoading(true);
      setError(null);

      try {
        let coordinates = initialCoordinates;

        // Try to geocode the address
        if (!coordinates) {
          const geocoded = await geocodeAddress(address);
          if (geocoded) {
            coordinates = geocoded;
          } else {
            // Fallback to Santiago coordinates if geocoding fails
            coordinates = { lat: -33.4489, lng: -70.6693 };
            setError('No se pudo encontrar la dirección. Usando ubicación por defecto.');
          }
        }

        // Update map view
        mapInstanceRef.current.setView([coordinates.lat, coordinates.lng], 15);

        // Update or create marker
        if (markerRef.current) {
          markerRef.current.setLatLng([coordinates.lat, coordinates.lng]);
        } else if (mapInstanceRef.current) {
          const customIcon = L.divIcon({
            html: `
              <div style="
                background: linear-gradient(135deg, #ff6b3d 0%, #ff9736 100%);
                width: 40px;
                height: 40px;
                border-radius: 50% 50% 50% 0;
                transform: rotate(-45deg);
                border: 3px solid white;
                box-shadow: 0 4px 12px rgba(255, 107, 61, 0.4);
                display: flex;
                align-items: center;
                justify-content: center;
              ">
                <div style="
                  transform: rotate(45deg);
                  color: white;
                  font-size: 18px;
                ">📍</div>
              </div>
            `,
            className: 'custom-marker',
            iconSize: [40, 40],
            iconAnchor: [20, 40],
            popupAnchor: [0, -40],
          });

          markerRef.current = L.marker([coordinates.lat, coordinates.lng], {
            icon: customIcon,
            draggable: true
          }).addTo(mapInstanceRef.current);

          // Add popup
          if (markerRef.current) {
            markerRef.current.bindPopup(`
              <div style="text-align: center; font-family: system-ui;">
                <strong>${address}</strong><br>
                <small>Arrastra el pin para ajustar</small>
              </div>
            `).openPopup();
          }

          // Handle marker drag events
          if (markerRef.current) {
            markerRef.current.on('dragend', (e) => {
              const position = e.target.getLatLng();
              const newCoordinates = { lat: position.lat, lng: position.lng };
              onLocationChange(newCoordinates);

              // Update popup
              if (markerRef.current) {
                markerRef.current.setPopupContent(`
                  <div style="text-align: center; font-family: system-ui;">
                    <strong>${address}</strong><br>
                    <small>Ubicación ajustada</small><br>
                    <small>${position.lat.toFixed(6)}, ${position.lng.toFixed(6)}</small>
                  </div>
                `);
              }
            });
          }
        }

        // Notify parent component
        onLocationChange(coordinates);

      } catch (err) {
        console.error('Map update error:', err);
        setError('Error al cargar el mapa');
      } finally {
        setIsLoading(false);
      }
    };

    updateMapLocation();
  }, [address, initialCoordinates, onLocationChange, searchTrigger]);

  return (
    <div className="relative">
      <div
        ref={mapRef}
        className="h-[300px] w-full rounded-lg border-2 border-gray-200"
      />

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-white/80 backdrop-blur-sm">
          <div className="text-center">
            <div className="mb-2 h-6 w-6 animate-spin rounded-full border-2 border-purple-500 border-t-transparent" />
            <p className="text-sm text-gray-600">Buscando dirección...</p>
          </div>
        </div>
      )}

      {error && (
        <div className="absolute bottom-4 left-4 right-4 rounded-lg bg-yellow-100 border border-yellow-300 px-3 py-2">
          <p className="text-xs text-yellow-800">{error}</p>
        </div>
      )}
    </div>
  );
}

export function LocationMap({ address, onLocationChange, initialCoordinates, searchTrigger }: LocationMapProps) {
  return (
    <div className="w-full">
      <LeafletMap
        address={address}
        onLocationChange={onLocationChange}
        initialCoordinates={initialCoordinates}
        searchTrigger={searchTrigger}
      />
    </div>
  );
}
