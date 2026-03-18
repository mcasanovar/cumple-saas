"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;
const SECOND_IN_MS = 1000;
const MINUTE_IN_MS = SECOND_IN_MS * 60;
const HOUR_IN_MS = MINUTE_IN_MS * 60;
const DAY_IN_MS = HOUR_IN_MS * 24;

type CountdownProps = {
  targetDateISO: string;
};

type CountdownSnapshot = {
  totalMs: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const defaultSnapshot: CountdownSnapshot = {
  totalMs: 0,
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
};

function calculateSnapshot(targetDate: Date, now = Date.now()): CountdownSnapshot {
  const totalMs = targetDate.getTime() - now;
  const clamped = Math.max(totalMs, 0);

  const days = Math.floor(clamped / DAY_IN_MS);
  const hours = Math.floor((clamped % DAY_IN_MS) / HOUR_IN_MS);
  const minutes = Math.floor((clamped % HOUR_IN_MS) / MINUTE_IN_MS);
  const seconds = Math.floor((clamped % MINUTE_IN_MS) / SECOND_IN_MS);

  return {
    totalMs: clamped,
    days,
    hours,
    minutes,
    seconds,
  };
}

export function CountdownTimer({ targetDateISO }: CountdownProps) {
  const targetDate = useMemo(() => new Date(targetDateISO), [targetDateISO]);
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const update = () => {
      setNow(Date.now());
    };

    const kickoff = window.setTimeout(update, 0);
    const interval = window.setInterval(update, 1000);

    return () => {
      window.clearTimeout(kickoff);
      window.clearInterval(interval);
    };
  }, []);

  const snapshot = useMemo(
    () =>
      now === null
        ? defaultSnapshot
        : calculateSnapshot(targetDate, now),
    [now, targetDate],
  );

  const isCompleted = snapshot.totalMs <= 0;

  return (
    <motion.div
      className="grid w-full grid-cols-4 gap-3 rounded-3xl border border-white/10 bg-white/15 p-3 text-white backdrop-blur-xl sm:gap-4 sm:p-4"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: easeOutExpo }}
    >
      {["Días", "Horas", "Min", "Seg"].map((label, index) => {
        const value = [snapshot.days, snapshot.hours, snapshot.minutes, snapshot.seconds][index];

        return (
          <div
            key={label}
            className="flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-white/20 to-white/5 px-2 py-3 text-center shadow-inner shadow-white/10 sm:px-3 sm:py-4"
          >
            <span className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {value.toString().padStart(2, "0")}
            </span>
            <span className="mt-1 text-xs uppercase tracking-[0.2em] text-white/70">
              {label}
            </span>
          </div>
        );
      })}
      {isCompleted && (
        <motion.div
          className="col-span-4 mt-3 rounded-2xl bg-black/30 px-4 py-3 text-center text-sm font-medium text-white/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.2 }}
        >
          ¡Es hoy! Nos vemos para celebrar.
        </motion.div>
      )}
    </motion.div>
  );
}
