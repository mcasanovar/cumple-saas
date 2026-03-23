"use client";

import { useIsMobile } from "@/hooks/useIsMobile";

export function LandingDinoBackground() {
  const isMobile = useIsMobile();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Hojas tropicales - Esquina superior izquierda */}
      <svg
        className="absolute -left-4 top-12 opacity-50"
        width="160"
        height="160"
        viewBox="0 0 180 180"
        fill="none"
      >
        <path
          d="M20 80 Q 30 40, 60 30 Q 90 25, 100 50 Q 95 75, 70 85 Q 45 90, 20 80 Z"
          fill="#4A7350"
        />
        <path
          d="M25 85 Q 35 50, 65 42 Q 88 38, 95 58"
          stroke="#5A8A5D"
          strokeWidth="3"
          fill="none"
        />
      </svg>

      {/* Hojas pequeñas - Superior centro-izquierda */}
      <svg
        className="absolute left-1/4 top-24 opacity-45"
        width="120"
        height="120"
        viewBox="0 0 160 140"
        fill="none"
      >
        <path
          d="M30 70 Q 15 55, 10 30 Q 13 48, 22 60 Q 35 68, 48 65 Q 40 78, 30 70 Z"
          fill="#3D6B47"
        />
      </svg>

      {/* T-Rex - Izquierda superior (más arriba y separado) */}
      <img
        src="/dinousar-1.svg"
        alt=""
        className="absolute left-12 top-64 opacity-45"
        width={isMobile ? "130" : "170"}
        height={isMobile ? "130" : "170"}
      />

      {/* Hojas tropicales - Superior derecha */}
      <svg
        className="absolute right-16 top-32 opacity-50"
        width="140"
        height="140"
        viewBox="0 0 180 180"
        fill="none"
      >
        <path
          d="M140 100 Q 160 80, 165 50 Q 162 70, 150 85 Q 135 95, 120 90 Q 130 105, 140 100 Z"
          fill="#4A7350"
        />
        <path
          d="M130 110 Q 145 95, 152 70"
          stroke="#5A8A5D"
          strokeWidth="3"
          fill="none"
        />
      </svg>

      {/* Triceratops - Derecha superior (más separado) */}
      <img
        src="/dinousar-2.svg"
        alt=""
        className="absolute right-6 top-96 opacity-35"
        width={isMobile ? "110" : "160"}
        height={isMobile ? "110" : "160"}
      />

      {/* Hojas medianas - Centro izquierda */}
      <svg
        className="absolute left-8 top-[45%] opacity-50"
        width="180"
        height="150"
        viewBox="0 0 200 160"
        fill="none"
      >
        <path
          d="M40 80 Q 20 60, 15 30 Q 18 50, 30 65 Q 45 75, 60 70 Q 50 85, 40 80 Z"
          fill="#3D6B47"
        />
        <path
          d="M50 90 Q 35 75, 28 50 Q 32 68, 42 80 Q 55 88, 68 85"
          stroke="#4A7350"
          strokeWidth="2.5"
          fill="none"
        />
      </svg>

      {/* Hojas pequeñas - Centro derecha */}
      <svg
        className="absolute right-20 top-[55%] opacity-45"
        width="130"
        height="130"
        viewBox="0 0 160 140"
        fill="none"
      >
        <path
          d="M30 70 Q 15 55, 10 30 Q 13 48, 22 60 Q 35 68, 48 65 Q 40 78, 30 70 Z"
          fill="#4A7350"
        />
        <path
          d="M38 78 Q 25 65, 20 45"
          stroke="#5A8A5D"
          strokeWidth="2.5"
          fill="none"
        />
      </svg>

      {/* T-Rex - Centro inferior (más disperso) */}
      <img
        src="/t-rex.svg"
        alt=""
        className="absolute bottom-[35%] left-[60%] -translate-x-1/2 opacity-15"
        width={isMobile ? "180" : "240"}
        height={isMobile ? "180" : "240"}
      />

      {/* Hojas tropicales - Inferior izquierda */}
      <svg
        className="absolute bottom-32 left-16 opacity-50"
        width="170"
        height="160"
        viewBox="0 0 200 160"
        fill="none"
      >
        <path
          d="M40 80 Q 20 60, 15 30 Q 18 50, 30 65 Q 45 75, 60 70 Q 50 85, 40 80 Z"
          fill="#3D6B47"
        />
        <path
          d="M50 90 Q 35 75, 28 50 Q 32 68, 42 80 Q 55 88, 68 85"
          stroke="#4A7350"
          strokeWidth="2.5"
          fill="none"
        />
      </svg>

      {/* Hojas grandes - Inferior derecha */}
      <svg
        className="absolute -right-6 bottom-24 opacity-55"
        width="200"
        height="220"
        viewBox="0 0 180 200"
        fill="none"
      >
        <path
          d="M140 100 Q 160 80, 165 50 Q 162 70, 150 85 Q 135 95, 120 90 Q 130 105, 140 100 Z"
          fill="#4A7350"
        />
        <path
          d="M130 110 Q 145 95, 152 70"
          stroke="#5A8A5D"
          strokeWidth="3"
          fill="none"
        />
      </svg>

      {/* Hojas adicionales - Inferior centro-izquierda */}
      <svg
        className="absolute bottom-16 left-[35%] opacity-45"
        width="140"
        height="130"
        viewBox="0 0 160 140"
        fill="none"
      >
        <path
          d="M30 70 Q 15 55, 10 30 Q 13 48, 22 60 Q 35 68, 48 65 Q 40 78, 30 70 Z"
          fill="#3D6B47"
        />
        <path
          d="M38 78 Q 25 65, 20 45"
          stroke="#4A7350"
          strokeWidth="2.5"
          fill="none"
        />
      </svg>

      {/* Hojas pequeñas dispersas - Centro superior derecha */}
      <svg
        className="absolute right-[30%] top-[20%] opacity-40"
        width="110"
        height="110"
        viewBox="0 0 160 140"
        fill="none"
      >
        <path
          d="M30 70 Q 15 55, 10 30 Q 13 48, 22 60 Q 35 68, 48 65 Q 40 78, 30 70 Z"
          fill="#4A7350"
        />
      </svg>

      {/* Hojas adicionales - Inferior derecha dispersa */}
      <svg
        className="absolute bottom-[45%] right-12 opacity-45"
        width="150"
        height="140"
        viewBox="0 0 180 180"
        fill="none"
      >
        <path
          d="M140 100 Q 160 80, 165 50 Q 162 70, 150 85 Q 135 95, 120 90 Q 130 105, 140 100 Z"
          fill="#4A7350"
        />
      </svg>
    </div>
  );
}
