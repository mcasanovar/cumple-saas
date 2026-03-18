import type { Variants } from "framer-motion";

import { easeOutQuart } from "./constants";

export const frameVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: easeOutQuart,
    },
  },
  exit: {
    opacity: 0,
    scale: 1.1,
    transition: {
      duration: 0.5,
      ease: easeOutQuart,
    },
  },
};

export const headingVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0.3 + index * 0.15,
      ease: easeOutQuart,
    },
  }),
  exit: {
    opacity: 0,
    y: -12,
    transition: {
      duration: 0.4,
      ease: easeOutQuart,
    },
  },
};
