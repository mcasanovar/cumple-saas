"use client";

import { useIsMobile } from "@/hooks/useIsMobile";

export function IntroPrincessBackground() {
  const isMobile = useIsMobile();

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Fondo rosa muy claro - casi blanco */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.8) 0%, rgba(255, 240, 245, 0.5) 50%), radial-gradient(circle at 70% 80%, rgba(255, 182, 217, 0.15) 0%, rgba(255, 182, 217, 0) 50%), linear-gradient(180deg, #FFF0F5 0%, #FFE8F0 50%, #FFD4EC 100%)",
        }}
      />

      {/* Efecto bokeh - puntos de luz dispersos */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <span
            key={`bokeh-${i}`}
            className="absolute rounded-full opacity-30"
            style={{
              background: "radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,192,224,0.3) 70%, transparent 100%)",
              width: `${20 + (i % 3) * 15}px`,
              height: `${20 + (i % 3) * 15}px`,
              top: `${(i * 7 + 5) % 90}%`,
              left: `${(i * 13 + 10) % 90}%`,
              filter: "blur(8px)",
            }}
          />
        ))}
      </div>

      {/* Flores decorativas - Esquina superior izquierda */}
      <svg
        className="absolute -left-2 -top-2 opacity-80"
        width="140"
        height="140"
        viewBox="0 0 140 140"
        fill="none"
      >
        {/* Flor rosa grande */}
        <g transform="translate(50, 50)">
          <circle cx="0" cy="-20" r="12" fill="#FFB6D9" opacity="0.9" />
          <circle cx="17" cy="-6" r="12" fill="#FFC0E0" opacity="0.9" />
          <circle cx="10" cy="12" r="12" fill="#FFB6D9" opacity="0.9" />
          <circle cx="-10" cy="12" r="12" fill="#FFC0E0" opacity="0.9" />
          <circle cx="-17" cy="-6" r="12" fill="#FFB6D9" opacity="0.9" />
          <circle cx="0" cy="0" r="8" fill="#F4D03F" />
        </g>
        {/* Hojas verdes */}
        <path
          d="M20 80 Q 15 60, 10 40 Q 15 55, 25 65 Q 30 70, 35 68"
          fill="#7CAA7F"
          opacity="0.7"
        />
        <path
          d="M30 90 Q 25 75, 20 55 Q 25 70, 35 80 Q 40 85, 45 83"
          fill="#6B9B6E"
          opacity="0.7"
        />
      </svg>

      {/* Flores decorativas - Esquina superior derecha */}
      <svg
        className="absolute -right-2 -top-2 opacity-80"
        width="140"
        height="140"
        viewBox="0 0 140 140"
        fill="none"
      >
        {/* Flor rosa */}
        <g transform="translate(90, 50)">
          <circle cx="0" cy="-20" r="12" fill="#FFC0E0" opacity="0.9" />
          <circle cx="17" cy="-6" r="12" fill="#FFB6D9" opacity="0.9" />
          <circle cx="10" cy="12" r="12" fill="#FFC0E0" opacity="0.9" />
          <circle cx="-10" cy="12" r="12" fill="#FFB6D9" opacity="0.9" />
          <circle cx="-17" cy="-6" r="12" fill="#FFC0E0" opacity="0.9" />
          <circle cx="0" cy="0" r="8" fill="#F7DC6F" />
        </g>
        {/* Hojas */}
        <path
          d="M120 80 Q 115 60, 110 40 Q 115 55, 105 65 Q 100 70, 95 68"
          fill="#7CAA7F"
          opacity="0.7"
        />
      </svg>

      {/* Blanca Nieves */}
      <div className={`absolute ${isMobile ? 'left-[0%]' : 'left-[18%]'} ${isMobile ? 'top-[60%]' : 'top-[50%]'} bottom-20 z-20`}>
        <img
          src="/blanca-nieves.png"
          alt="Blanca Nieves"
          style={{
            opacity: '0.5',
            width: isMobile ? "130px" : "200px",
            height: isMobile ? "130px" : "200px",
          }}
        />
      </div>

      {/* Frozen */}
      <div className={`absolute ${isMobile ? 'right-[0%]' : 'right-[22%]'} ${isMobile ? 'top-[40%]' : 'top-[20%]'} bottom-20 z-20`}>
        <img
          src="/elsa-frozen.png"
          alt="Frozen Elsa"
          style={{
            opacity: '0.3',
            width: isMobile ? "150px" : "220px",
            height: isMobile ? "150px" : "220px",
          }}
        />
      </div>

      {/* Castillo - capa de fondo */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <img
          src="/princes_castle.svg"
          alt=""
          className="opacity-70"
          style={{
            width: isMobile ? "500px" : "500px",
            height: "auto",
            transform: isMobile ? "translateY(-55%)" : "translateY(-40%)",
            maskImage: "radial-gradient(ellipse 70% 60% at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0) 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 70% 60% at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0) 100%)",
          }}
        />
      </div>

      {/* Princesa - capa media encima del castillo */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <img
          src="/princess-2.png"
          alt=""
          className="opacity-75"
          style={{
            width: "250px",
            height: "auto",
            transform: "translateY(-30%)",
            filter: "drop-shadow(0 10px 30px rgba(255, 20, 147, 0.3))",
            mixBlendMode: "multiply",
          }}
        />
      </div>

      {/* Flores decorativas - Esquina inferior izquierda */}
      <svg
        className="absolute left-0 bottom-8 opacity-80"
        width="160"
        height="160"
        viewBox="0 0 160 160"
        fill="none"
      >
        {/* Flor rosa */}
        <g transform="translate(40, 100)">
          <circle cx="0" cy="-18" r="11" fill="#FFB6D9" opacity="0.9" />
          <circle cx="15" cy="-5" r="11" fill="#FFC0E0" opacity="0.9" />
          <circle cx="9" cy="11" r="11" fill="#FFB6D9" opacity="0.9" />
          <circle cx="-9" cy="11" r="11" fill="#FFC0E0" opacity="0.9" />
          <circle cx="-15" cy="-5" r="11" fill="#FFB6D9" opacity="0.9" />
          <circle cx="0" cy="0" r="7" fill="#F4D03F" />
        </g>
        {/* Hojas verdes */}
        <path
          d="M20 120 Q 15 105, 10 85 Q 15 100, 25 110 Q 30 115, 35 113"
          fill="#6B9B6E"
          opacity="0.7"
        />
        <path
          d="M30 130 Q 25 115, 20 95 Q 25 110, 35 120 Q 40 125, 45 123"
          fill="#7CAA7F"
          opacity="0.7"
        />
      </svg>

      {/* Flores decorativas - Esquina inferior derecha */}
      <svg
        className="absolute right-0 bottom-8 opacity-80"
        width="160"
        height="160"
        viewBox="0 0 160 160"
        fill="none"
      >
        {/* Flor rosa */}
        <g transform="translate(120, 100)">
          <circle cx="0" cy="-18" r="11" fill="#FFC0E0" opacity="0.9" />
          <circle cx="15" cy="-5" r="11" fill="#FFB6D9" opacity="0.9" />
          <circle cx="9" cy="11" r="11" fill="#FFC0E0" opacity="0.9" />
          <circle cx="-9" cy="11" r="11" fill="#FFB6D9" opacity="0.9" />
          <circle cx="-15" cy="-5" r="11" fill="#FFC0E0" opacity="0.9" />
          <circle cx="0" cy="0" r="7" fill="#F7DC6F" />
        </g>
        {/* Hojas */}
        <path
          d="M140 120 Q 135 105, 130 85 Q 135 100, 125 110 Q 120 115, 115 113"
          fill="#7CAA7F"
          opacity="0.7"
        />
        <path
          d="M150 130 Q 145 115, 140 95 Q 145 110, 135 120 Q 130 125, 125 123"
          fill="#6B9B6E"
          opacity="0.7"
        />
      </svg>

      {/* Pequeñas flores dispersas adicionales */}
      <svg
        className="absolute opacity-60"
        style={{ top: "25%", left: "15%" }}
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
      >
        <g transform="translate(20, 20)">
          <circle cx="0" cy="-8" r="5" fill="#FFB6D9" />
          <circle cx="7" cy="-2" r="5" fill="#FFC0E0" />
          <circle cx="4" cy="5" r="5" fill="#FFB6D9" />
          <circle cx="-4" cy="5" r="5" fill="#FFC0E0" />
          <circle cx="-7" cy="-2" r="5" fill="#FFB6D9" />
          <circle cx="0" cy="0" r="3" fill="#F4D03F" />
        </g>
      </svg>

      <svg
        className="absolute opacity-60"
        style={{ top: "70%", right: "20%" }}
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
      >
        <g transform="translate(20, 20)">
          <circle cx="0" cy="-8" r="5" fill="#FFC0E0" />
          <circle cx="7" cy="-2" r="5" fill="#FFB6D9" />
          <circle cx="4" cy="5" r="5" fill="#FFC0E0" />
          <circle cx="-4" cy="5" r="5" fill="#FFB6D9" />
          <circle cx="-7" cy="-2" r="5" fill="#FFC0E0" />
          <circle cx="0" cy="0" r="3" fill="#F7DC6F" />
        </g>
      </svg>
    </div>
  );
}
