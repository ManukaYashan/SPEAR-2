/**
 * Shared Framer Motion variant definitions.
 * Typed to satisfy Framer Motion's strict Variants type.
 */

import type { Variants } from "framer-motion";

/**
 * Custom cubic-bezier as a named function type that Framer Motion accepts.
 * We use a `type` assertion via the `as const` easing name approach instead
 * of a raw number tuple, which newer Framer Motion versions reject for Variants.
 */

export const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: "easeOut",
    },
  },
};

export const fadeInVariant: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 1,
      ease: "easeOut",
    },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

export const staggerContainerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};
