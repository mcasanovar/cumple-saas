"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigationStore } from "@/hooks/use-navigation-loader";

export function NavigationLoader() {
  const isLoading = useNavigationStore((state: any) => state.isLoading);
  const setIsLoading = useNavigationStore((state: any) => state.setIsLoading);
  const pathname = usePathname();

  useEffect(() => {
    // Reset loading state when pathname changes
    setIsLoading(false);
  }, [pathname, setIsLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/80 backdrop-blur-md"
        >
          <div className="relative h-24 w-24">
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-[#E63946]/20"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-t-[#E63946]"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl">🎉</span>
            </div>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 text-lg font-medium text-[#1A1A1A]"
          >
            Preparando tu dashboard...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
