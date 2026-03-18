"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { motion } from "framer-motion";

import { submitRSVP } from "@/app/(public)/invitacion/[slug]/actions";
import type { RSVPActionState } from "@/lib/types/invitation";

type RSVPFormProps = {
  slug: string;
  accentGradient: string;
  accentColor: string;
};

const initialState: RSVPActionState = { status: "idle" };

function SubmitButton({ accentColor }: { accentColor: string }) {
  const { pending } = useFormStatus();
  return (
    <motion.button
      type="submit"
      whileHover={{ scale: pending ? 1 : 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3 text-sm font-semibold text-white shadow-lg"
      style={{
        backgroundColor: accentColor,
        boxShadow: `0 18px 40px ${accentColor}40`,
      }}
      disabled={pending}
    >
      <span className="relative z-10 flex items-center gap-2">
        {pending ? "Enviando..." : "Confirmar asistencia"}
        <motion.span
          animate={pending ? { rotate: 180 } : { x: [0, 6, 0] }}
          transition={{ repeat: pending ? 0 : Infinity, duration: pending ? 0.8 : 1.6 }}
          className="text-lg"
        >
          ✨
        </motion.span>
      </span>
      <span className="absolute inset-0 bg-white/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </motion.button>
  );
}

export function RSVPForm({ slug, accentGradient, accentColor }: RSVPFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useActionState(submitRSVP, initialState);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
      const timer = setTimeout(() => {
        formRef.current?.querySelector<HTMLInputElement>("input[name=\"name\"]")?.focus();
      }, 200);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [state.status]);

  return (
    <motion.form
      ref={formRef}
      action={formAction}
      className="relative overflow-hidden rounded-[32px] border border-white/60 bg-white/80 p-8 backdrop-blur-2xl shadow-[0_24px_80px_rgba(15,11,29,0.12)]"
      style={{ boxShadow: "0 18px 60px rgba(31,25,47,0.18)" }}
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-60" style={{ backgroundImage: accentGradient }} />
      <div className="pointer-events-none absolute inset-0 bg-white/60" />
      <div className="pointer-events-none absolute -left-20 top-10 h-40 w-40 rounded-full bg-white/60 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-6 h-44 w-44 rounded-full bg-white/50 blur-3xl" />

      <input type="hidden" name="slug" value={slug} />

      <div className="relative grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm font-medium text-slate-600">
          Nombre completo
          <input
            type="text"
            name="name"
            required
            placeholder="¿Quién confirma?"
            className="rounded-2xl border border-white/70 bg-white/90 px-4 py-3 text-base text-slate-800 shadow-inner shadow-white/40 outline-none transition focus:border-slate-300 focus:shadow-lg"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-slate-600">
          Correo electrónico
          <input
            type="email"
            name="email"
            required
            placeholder="tu@email.com"
            className="rounded-2xl border border-white/70 bg-white/90 px-4 py-3 text-base text-slate-800 shadow-inner shadow-white/40 outline-none transition focus:border-slate-300 focus:shadow-lg"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-slate-600">
          Cantidad de invitados
          <input
            type="number"
            name="guests"
            required
            min={1}
            max={10}
            defaultValue={1}
            className="rounded-2xl border border-white/70 bg-white/90 px-4 py-3 text-base text-slate-800 shadow-inner shadow-white/40 outline-none transition focus:border-slate-300 focus:shadow-lg"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-slate-600 sm:col-span-2">
          Mensaje especial (opcional)
          <textarea
            name="message"
            rows={4}
            placeholder="Comparte alergias, restricciones o un mensaje cariñoso"
            className="resize-none rounded-2xl border border-white/70 bg-white/90 px-4 py-3 text-base text-slate-800 shadow-inner shadow-white/40 outline-none transition focus:border-slate-300 focus:shadow-lg"
          />
        </label>
      </div>

      <div className="relative mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <SubmitButton accentColor={accentColor} />
        {state.status === "success" && (
          <motion.p
            key="success"
            className="rounded-full bg-white/70 px-4 py-2 text-sm font-medium text-slate-700 shadow-inner shadow-white/40"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {state.message}
          </motion.p>
        )}
        {state.status === "error" && (
          <motion.p
            key="error"
            className="rounded-full bg-rose-100/80 px-4 py-2 text-sm font-medium text-rose-700 shadow-inner shadow-white/40"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {state.message}
          </motion.p>
        )}
      </div>
    </motion.form>
  );
}
