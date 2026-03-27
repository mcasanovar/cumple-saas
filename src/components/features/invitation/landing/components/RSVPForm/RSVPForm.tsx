"use client";

import { useState, useActionState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import type { ThemeToken, RSVPActionState } from "@/lib/types/invitation";
import { useThemeDetection } from "@/hooks/useThemeDetection";
import { submitRSVP } from "@/app/(public)/invitacion/[invitationId]/actions";
import { CTAButton } from "@/components/shared/cta-button/CTAButton";

type RSVPFormProps = {
  invitationId: string;
  typography: {
    heading: string;
    body: string;
  };
  themeToken?: ThemeToken;
};

function Confetti() {
  const confettiPieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 0.5,
    duration: 2 + Math.random() * 2,
    rotation: Math.random() * 360,
    color: ["#ff6b3d", "#ffb347", "#4ECDC4", "#ff7a3d", "#6f6bb3"][Math.floor(Math.random() * 5)],
  }));

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {confettiPieces.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute h-3 w-3 rounded-full"
          style={{
            left: `${piece.x}%`,
            top: "-10%",
            backgroundColor: piece.color,
          }}
          initial={{ y: 0, opacity: 1, rotate: 0 }}
          animate={{
            y: [0, window.innerHeight + 100],
            opacity: [1, 1, 0],
            rotate: [0, piece.rotation],
          }}
          transition={{
            duration: piece.duration,
            delay: piece.delay,
            ease: "easeIn",
          }}
        />
      ))}
    </div>
  );
}

export function RSVPForm({ invitationId, typography, themeToken }: RSVPFormProps) {
  const { isDinoTheme, isKPopTheme } = useThemeDetection(themeToken);
  const [willAttend, setWillAttend] = useState<boolean | null>(null);
  const [guestCount, setGuestCount] = useState<number>(1);
  const [guestNames, setGuestNames] = useState<string[]>([""]);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const [state, formAction, isPending] = useActionState<RSVPActionState, FormData>(
    submitRSVP,
    { status: "idle" }
  );

  useEffect(() => {
    if (state.status === "success") {
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });

      if (willAttend) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 4000);
      }
    }
  }, [state.status, willAttend]);

  const handleAttendanceChange = (value: boolean) => {
    setWillAttend(value);
    if (!value) {
      setGuestCount(1);
      setGuestNames([""]);
      setEmail("");
    }
  };

  const handleGuestCountChange = (count: number) => {
    setGuestCount(count);
    setGuestNames(Array(count).fill(""));
  };

  const handleGuestNameChange = (index: number, name: string) => {
    const newNames = [...guestNames];
    newNames[index] = name;
    setGuestNames(newNames);
  };

  if (isSubmitted) {
    return (
      <>
        {showConfetti && <Confetti />}
        <motion.div
          className="fixed inset-0 z-40 flex items-start justify-center bg-black/40 backdrop-blur-sm pt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="mx-4 max-w-md rounded-[32px] bg-white p-12 text-center shadow-2xl"
            initial={{ scale: 0.8, opacity: 0, y: -50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="mb-6 text-6xl"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
            >
              {willAttend ? "🎉" : "😢"}
            </motion.div>
            <h3
              className="mb-4 text-3xl font-bold text-[#262147]"
              style={{ fontFamily: typography.heading }}
            >
              {state.status === "success" ? state.message : willAttend
                ? "¡Gracias por confirmar!"
                : "Lamentamos no tenerte con nosotros"}
            </h3>
            <p
              className="text-lg text-[#6f6bb3] mb-6"
              style={{ fontFamily: typography.body }}
            >
              {willAttend
                ? "Te esperamos con muchas ganas"
                : "Pero te esperamos para una próxima ocasión."}
            </p>

            {willAttend && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="pt-4 border-t border-gray-100"
              >
                <p className="text-sm text-gray-500 mb-4" style={{ fontFamily: typography.body }}>
                  ¿Te gustaría crear una invitación así para tu evento?
                </p>
                <CTAButton href="/" size="sm">
                  Crear mi invitación
                </CTAButton>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </>
    );
  }

  return (
    <motion.form
      action={formAction}
      className="relative overflow-hidden rounded-[32px] border border-white/60 bg-white/90 p-8 shadow-[0_24px_80px_rgba(15,11,29,0.12)] backdrop-blur-2xl"
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <input type="hidden" name="invitationId" value={invitationId} />
      <input type="hidden" name="willAttend" value={String(willAttend)} />
      <input type="hidden" name="guestNames" value={JSON.stringify(guestNames)} />

      <div className="pointer-events-none absolute -left-20 top-10 h-40 w-40 rounded-full bg-[#fddae4]/60 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-6 h-44 w-44 rounded-full bg-[#e7defa]/50 blur-3xl" />

      <div className="relative space-y-6">
        <div className="text-center">
          <h3
            className="mb-2 text-3xl font-bold"
            style={{ fontFamily: typography.heading, color: isDinoTheme ? "#2D3D2D" : isKPopTheme ? "#9333ea" : "#262147" }}
          >
            Confirma tu asistencia
          </h3>
          <p
            className="text-base"
            style={{ fontFamily: typography.body, color: isDinoTheme ? "#5A8A5D" : isKPopTheme ? "#E91E63" : "#6f6bb3" }}
          >
            ¿Podrás acompañarnos?
          </p>

          {state.status === "error" && (
            <p className="mt-2 text-sm text-red-500 font-medium">
              {state.message}
            </p>
          )}
        </div>

        <div className="flex justify-center gap-4">
          <motion.button
            type="button"
            onClick={() => handleAttendanceChange(true)}
            className="rounded-full px-12 py-4 text-lg font-bold transition"
            style={{
              background: willAttend === true
                ? isDinoTheme
                  ? "linear-gradient(135deg, rgba(90, 138, 93, 0.98) 0%, rgba(74, 115, 80, 0.95) 52%, rgba(107, 155, 110, 0.92) 100%)"
                  : isKPopTheme
                    ? "linear-gradient(135deg, rgba(233, 30, 99, 0.95) 0%, rgba(147, 51, 234, 0.95) 100%)"
                    : "linear-gradient(135deg, rgba(255,112,161,0.95) 0%, rgba(255,149,89,0.92) 52%, rgba(255,213,102,0.88) 100%)"
                : "rgba(255, 255, 255, 0.8)",
              color: willAttend === true ? "#ffffff" : "#6f6bb3",
              boxShadow: willAttend === true
                ? isDinoTheme
                  ? "0 22px 48px rgba(74, 115, 80, 0.4)"
                  : isKPopTheme
                    ? "0 22px 45px rgba(218, 112, 214, 0.3)"
                    : "0 22px 45px rgba(244,63,94,0.25)"
                : "none",
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Sí ✨
          </motion.button>
          <motion.button
            type="button"
            onClick={() => handleAttendanceChange(false)}
            className="rounded-full px-12 py-4 text-lg font-bold transition"
            style={{
              background: willAttend === false
                ? isDinoTheme
                  ? "linear-gradient(135deg, rgba(90, 138, 93, 0.98) 0%, rgba(74, 115, 80, 0.95) 52%, rgba(107, 155, 110, 0.92) 100%)"
                  : isKPopTheme
                    ? "linear-gradient(135deg, rgba(233, 30, 99, 0.95) 0%, rgba(147, 51, 234, 0.95) 100%)"
                    : "linear-gradient(135deg, rgba(255,112,161,0.95) 0%, rgba(255,149,89,0.92) 52%, rgba(255,213,102,0.88) 100%)"
                : "rgba(255, 255, 255, 0.8)",
              color: willAttend === false ? "#ffffff" : "#6f6bb3",
              boxShadow: willAttend === false
                ? isDinoTheme
                  ? "0 22px 48px rgba(74, 115, 80, 0.4)"
                  : isKPopTheme
                    ? "0 22px 45px rgba(218, 112, 214, 0.3)"
                    : "0 22px 45px rgba(244,63,94,0.25)"
                : "none",
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            No 😢
          </motion.button>
        </div>

        <AnimatePresence mode="wait">
          {willAttend === true && (
            <motion.div
              className="space-y-5"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
            >
              <label className="flex flex-col gap-2 text-sm font-medium text-slate-600">
                ¿Cuántas personas asistirán?
                <select
                  name="guestCount"
                  value={guestCount}
                  onChange={(e) => handleGuestCountChange(Number(e.target.value))}
                  className="rounded-2xl border border-white/70 bg-white/90 px-4 py-3 text-base text-slate-800 shadow-inner shadow-white/40 outline-none transition focus:border-slate-300 focus:shadow-lg"
                  required
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? "persona" : "personas"}
                    </option>
                  ))}
                </select>
              </label>

              <div className="space-y-3">
                <p className="text-sm font-medium text-slate-600">
                  Nombre{guestCount > 1 ? "s" : ""} de {guestCount > 1 ? "los" : "la"} asistente{guestCount > 1 ? "s" : ""}:
                </p>
                {guestNames.map((name, index) => (
                  <motion.input
                    key={index}
                    type="text"
                    value={name}
                    onChange={(e) => handleGuestNameChange(index, e.target.value)}
                    placeholder={`Nombre de la persona ${index + 1}`}
                    className="w-full rounded-2xl border border-white/70 bg-white/90 px-4 py-3 text-base text-slate-800 shadow-inner shadow-white/40 outline-none transition focus:border-slate-300 focus:shadow-lg"
                    required
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  />
                ))}
              </div>

              <label className="flex flex-col gap-2 text-sm font-medium text-slate-600">
                Correo electrónico
                <input
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className="rounded-2xl border border-white/70 bg-white/90 px-4 py-3 text-base text-slate-800 shadow-inner shadow-white/40 outline-none transition focus:border-slate-300 focus:shadow-lg"
                  required
                />
              </label>
            </motion.div>
          )}

          {willAttend === false && (
            <motion.div
              className="space-y-5"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-sm text-gray-500 text-center">
                Lamentamos que no puedas acompañarnos. ¡Gracias por avisar!
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {willAttend !== null && (
          <motion.button
            type="submit"
            disabled={isPending}
            className="w-full rounded-full px-8 py-4 text-lg font-bold text-white transition hover:-translate-y-0.5 disabled:opacity-50"
            style={{
              background: isDinoTheme
                ? "linear-gradient(135deg, rgba(90, 138, 93, 0.98) 0%, rgba(74, 115, 80, 0.95) 52%, rgba(107, 155, 110, 0.92) 100%)"
                : isKPopTheme
                  ? "linear-gradient(135deg, rgba(233, 30, 99, 0.95) 0%, rgba(147, 51, 234, 0.95) 100%)"
                  : "linear-gradient(135deg, rgba(255,112,161,0.95) 0%, rgba(255,149,89,0.92) 52%, rgba(255,213,102,0.88) 100%)",
              boxShadow: isDinoTheme
                ? "0 22px 48px rgba(74, 115, 80, 0.4)"
                : isKPopTheme
                  ? "0 22px 45px rgba(218, 112, 214, 0.3)"
                  : "0 22px 45px rgba(244,63,94,0.25)",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isPending ? "Enviando..." : "Enviar confirmación"}
          </motion.button>
        )}
      </div>
    </motion.form>
  );
}
