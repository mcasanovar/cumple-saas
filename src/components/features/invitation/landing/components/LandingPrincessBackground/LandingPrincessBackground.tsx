"use client";

import { useIsMobile } from "@/hooks/useIsMobile";

export function LandingPrincessBackground() {
  const isMobile = useIsMobile();
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Castillo - posicionado en la parte superior */}
      <div className="absolute left-1/2 top-0 z-0 pt-28 -translate-x-1/2">
        <img
          src="/princes_castle.svg"
          alt=""
          className="opacity-50"
          style={{
            width: isMobile ? "100%" : "600px",
            height: isMobile ? "100%" : "600px",
            transform: "translateY(-15%)",
            maskImage: "radial-gradient(ellipse 80% 70% at center 30%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0) 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 70% at center 30%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0) 100%)",
          }}
        />
      </div>

      {/* Flores decorativas dispersas - más sutiles que en intro */}

      {/* Flor superior izquierda */}
      <svg
        className="absolute opacity-40"
        style={{ top: "8%", left: "5%" }}
        width="60"
        height="60"
        viewBox="0 0 60 60"
        fill="none"
      >
        <g transform="translate(30, 30)">
          <circle cx="0" cy="-12" r="7" fill="#FFB6D9" />
          <circle cx="10" cy="-4" r="7" fill="#FFC0E0" />
          <circle cx="6" cy="7" r="7" fill="#FFB6D9" />
          <circle cx="-6" cy="7" r="7" fill="#FFC0E0" />
          <circle cx="-10" cy="-4" r="7" fill="#FFB6D9" />
          <circle cx="0" cy="0" r="4" fill="#F4D03F" />
        </g>
      </svg>

      {/* Flor superior derecha */}
      <svg
        className="absolute opacity-40"
        style={{ top: "12%", right: "8%" }}
        width="50"
        height="50"
        viewBox="0 0 50 50"
        fill="none"
      >
        <g transform="translate(25, 25)">
          <circle cx="0" cy="-10" r="6" fill="#FFC0E0" />
          <circle cx="8" cy="-3" r="6" fill="#FFB6D9" />
          <circle cx="5" cy="6" r="6" fill="#FFC0E0" />
          <circle cx="-5" cy="6" r="6" fill="#FFB6D9" />
          <circle cx="-8" cy="-3" r="6" fill="#FFC0E0" />
          <circle cx="0" cy="0" r="3" fill="#F7DC6F" />
        </g>
      </svg>

      {/* Flor centro izquierda */}
      <svg
        className="absolute opacity-35"
        style={{ top: "35%", left: "3%" }}
        width="55"
        height="55"
        viewBox="0 0 55 55"
        fill="none"
      >
        <g transform="translate(27, 27)">
          <circle cx="0" cy="-11" r="6" fill="#FFB6D9" />
          <circle cx="9" cy="-3" r="6" fill="#FFC0E0" />
          <circle cx="5" cy="6" r="6" fill="#FFB6D9" />
          <circle cx="-5" cy="6" r="6" fill="#FFC0E0" />
          <circle cx="-9" cy="-3" r="6" fill="#FFB6D9" />
          <circle cx="0" cy="0" r="4" fill="#F4D03F" />
        </g>
        {/* Hoja */}
        <path
          d="M10 40 Q 8 30, 6 20 Q 8 28, 14 35"
          fill="#7CAA7F"
          opacity="0.6"
        />
      </svg>

      {/* Flor centro derecha */}
      <svg
        className="absolute opacity-35"
        style={{ top: "42%", right: "6%" }}
        width="50"
        height="50"
        viewBox="0 0 50 50"
        fill="none"
      >
        <g transform="translate(25, 25)">
          <circle cx="0" cy="-10" r="6" fill="#FFC0E0" />
          <circle cx="8" cy="-3" r="6" fill="#FFB6D9" />
          <circle cx="5" cy="6" r="6" fill="#FFC0E0" />
          <circle cx="-5" cy="6" r="6" fill="#FFB6D9" />
          <circle cx="-8" cy="-3" r="6" fill="#FFC0E0" />
          <circle cx="0" cy="0" r="3" fill="#F7DC6F" />
        </g>
      </svg>

      {/* Flor inferior izquierda */}
      <svg
        className="absolute opacity-40"
        style={{ bottom: "15%", left: "7%" }}
        width="58"
        height="58"
        viewBox="0 0 58 58"
        fill="none"
      >
        <g transform="translate(29, 29)">
          <circle cx="0" cy="-11" r="7" fill="#FFB6D9" />
          <circle cx="9" cy="-3" r="7" fill="#FFC0E0" />
          <circle cx="6" cy="7" r="7" fill="#FFB6D9" />
          <circle cx="-6" cy="7" r="7" fill="#FFC0E0" />
          <circle cx="-9" cy="-3" r="7" fill="#FFB6D9" />
          <circle cx="0" cy="0" r="4" fill="#F4D03F" />
        </g>
        {/* Hojas */}
        <path
          d="M12 45 Q 10 35, 8 25 Q 10 33, 16 40"
          fill="#6B9B6E"
          opacity="0.6"
        />
        <path
          d="M18 48 Q 16 38, 14 28 Q 16 36, 22 43"
          fill="#7CAA7F"
          opacity="0.6"
        />
      </svg>

      {/* Flor inferior derecha */}
      <svg
        className="absolute opacity-40"
        style={{ bottom: "18%", right: "5%" }}
        width="52"
        height="52"
        viewBox="0 0 52 52"
        fill="none"
      >
        <g transform="translate(26, 26)">
          <circle cx="0" cy="-10" r="6" fill="#FFC0E0" />
          <circle cx="8" cy="-3" r="6" fill="#FFB6D9" />
          <circle cx="5" cy="6" r="6" fill="#FFC0E0" />
          <circle cx="-5" cy="6" r="6" fill="#FFB6D9" />
          <circle cx="-8" cy="-3" r="6" fill="#FFC0E0" />
          <circle cx="0" cy="0" r="3" fill="#F7DC6F" />
        </g>
        {/* Hoja */}
        <path
          d="M35 42 Q 33 32, 31 22 Q 33 30, 27 37"
          fill="#7CAA7F"
          opacity="0.6"
        />
      </svg>

      {/* Pequeñas flores adicionales dispersas */}
      <svg
        className="absolute opacity-30"
        style={{ top: "25%", right: "15%" }}
        width="35"
        height="35"
        viewBox="0 0 35 35"
        fill="none"
      >
        <g transform="translate(17, 17)">
          <circle cx="0" cy="-7" r="4" fill="#FFB6D9" />
          <circle cx="6" cy="-2" r="4" fill="#FFC0E0" />
          <circle cx="3" cy="4" r="4" fill="#FFB6D9" />
          <circle cx="-3" cy="4" r="4" fill="#FFC0E0" />
          <circle cx="-6" cy="-2" r="4" fill="#FFB6D9" />
          <circle cx="0" cy="0" r="2" fill="#F4D03F" />
        </g>
      </svg>

      <svg
        className="absolute opacity-30"
        style={{ top: "55%", left: "12%" }}
        width="38"
        height="38"
        viewBox="0 0 38 38"
        fill="none"
      >
        <g transform="translate(19, 19)">
          <circle cx="0" cy="-7" r="4" fill="#FFC0E0" />
          <circle cx="6" cy="-2" r="4" fill="#FFB6D9" />
          <circle cx="3" cy="4" r="4" fill="#FFC0E0" />
          <circle cx="-3" cy="4" r="4" fill="#FFB6D9" />
          <circle cx="-6" cy="-2" r="4" fill="#FFC0E0" />
          <circle cx="0" cy="0" r="2" fill="#F7DC6F" />
        </g>
      </svg>

      <svg
        className="absolute opacity-30"
        style={{ bottom: "35%", right: "18%" }}
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

      {/* Blanca Nieves */}
      <div className={`absolute ${isMobile ? 'left-[0%]' : 'left-[8%]'} ${isMobile ? 'top-[40%]' : 'top-[50%]'} bottom-20 z-10`}>
        <img
          src="/blanca-nieves.png"
          alt="Blanca Nieves"
          style={{
            opacity: '0.5',
            width: isMobile ? "130px" : "300px",
            height: isMobile ? "130px" : "300px",
          }}
        />
      </div>

      {/* Frozen */}
      <div className={`absolute ${isMobile ? 'right-[0%]' : 'right-[5%]'} ${isMobile ? 'top-[51%]' : 'top-[60%]'} bottom-20 z-10`}>
        <img
          src="/elsa-frozen.png"
          alt="Frozen Elsa"
          style={{
            opacity: '0.3',
            width: isMobile ? "190px" : "300px",
            height: isMobile ? "190px" : "300px",
          }}
        />
      </div>

      {/* Puntos de luz sutiles (bokeh) */}
      {Array.from({ length: 12 }).map((_, i) => (
        <span
          key={`bokeh-${i}`}
          className="absolute rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, rgba(255,255,255,0.6) 0%, rgba(255,192,224,0.2) 70%, transparent 100%)",
            width: `${15 + (i % 3) * 10}px`,
            height: `${15 + (i % 3) * 10}px`,
            top: `${(i * 9 + 8) % 85}%`,
            left: `${(i * 11 + 12) % 85}%`,
            filter: "blur(6px)",
          }}
        />
      ))}
    </div>
  );
}
