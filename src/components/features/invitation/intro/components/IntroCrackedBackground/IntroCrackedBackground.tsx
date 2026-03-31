"use client";

import { useIsMobile } from "@/hooks/useIsMobile";

export function IntroCrackedBackground() {
  const isMobile = useIsMobile();
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Fondo gradiente */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 30% 20%, rgba(200, 230, 200, 0.4) 0%, rgba(180, 220, 180, 0.2) 50%), radial-gradient(circle at 70% 80%, rgba(170, 210, 170, 0.35) 0%, rgba(180, 220, 180, 0.15) 50%), linear-gradient(180deg, #A8D4AB 0%, #92C095 50%, #7CAA7F 100%)",
        }}
      />

      {/* Hojas tropicales - Esquina superior izquierda */}
      <svg
        className="absolute -left-4 -top-4 opacity-70"
        width="180"
        height="180"
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

      {/* T-Rex detrás del botón */}
      <img
        src="/t-rex.svg"
        alt=""
        className="absolute bottom-24 -translate-x-1/2 opacity-20 sm:opacity-30"
        style={{ left: isMobile ? 'calc(50% - 10px)' : 'calc(50% - 190px)' }}
        width={isMobile ? "200" : "280"}
        height={isMobile ? "200" : "280"}
      />

      {/* T-Rex */}
      <img
        src="/dinousar-1.svg"
        alt="Dinosaurio 1"
        className="absolute left-4 sm:left-12 top-1/4 opacity-40 sm:opacity-60 scale-75 sm:scale-100"
        width="190"
        height="190"
      />

      {/* Hojas tropicales - Inferior izquierda */}
      <svg
        className="absolute left-0 bottom-4 sm:bottom-12 opacity-50 sm:opacity-70 scale-75 sm:scale-100"
        width="200"
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

      {/* Triceratops - Derecha (verde) */}
      <img
        src="/dinousar-2.svg"
        alt=""
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 opacity-15 sm:opacity-20"
        width={isMobile ? '100' : '200'}
        height={isMobile ? '100' : '200'}
      />

      {/* Hojas tropicales - Inferior derecha */}
      <svg
        className="absolute -right-4 bottom-4 sm:bottom-8 opacity-50 sm:opacity-70 scale-75 sm:scale-100"
        width="180"
        height="200"
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
    </div>
  );
}
