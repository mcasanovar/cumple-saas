"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { EVENT_ICONS } from "../../../constants";

export type IconSelectorProps = {
  selectedIcon: string;
  onIconSelect: (icon: string) => void;
  isOpen: boolean;
  onToggle: () => void;
};

export function IconSelector({ selectedIcon, onIconSelect, isOpen, onToggle }: IconSelectorProps) {
  return (
    <div className="relative">
      <button
        type="button"
        onClick={onToggle}
        className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-gray-300 bg-white text-2xl transition hover:border-purple-400 hover:bg-purple-50"
      >
        {selectedIcon || "🎉"}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50"
              onClick={onToggle}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 top-14 z-50 w-80 rounded-2xl border-2 border-gray-200 bg-white p-4 shadow-2xl"
            >
              <div className="mb-3 text-sm font-semibold text-gray-700">
                Selecciona un icono
              </div>
              <div className="grid max-h-64 grid-cols-8 gap-2 overflow-y-auto">
                {EVENT_ICONS.map((icon) => (
                  <button
                    key={icon}
                    type="button"
                    onClick={() => {
                      onIconSelect(icon);
                      onToggle();
                    }}
                    className={`flex h-10 w-10 items-center justify-center rounded-lg text-xl transition hover:bg-purple-100 hover:scale-110 ${
                      selectedIcon === icon ? "bg-purple-100 ring-2 ring-purple-500" : "bg-gray-50"
                    }`}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
