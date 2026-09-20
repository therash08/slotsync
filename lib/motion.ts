import { Variants, Transition } from "framer-motion";

export const EASINGS = {
  easeOut: [0.16, 1, 0.3, 1] as const,
  easeInOut: [0.65, 0, 0.35, 1] as const,
  smooth: [0.25, 0.1, 0.25, 1] as const,
};

export const TIMINGS = {
  micro: 0.2, // 200ms
  card: 0.3, // 300ms
  section: 0.5, // 500ms
  hero: 0.65, // 650ms
};

export const TRANSITIONS: Record<string, Transition> = {
  micro: { duration: TIMINGS.micro, ease: EASINGS.easeOut },
  card: { duration: TIMINGS.card, ease: EASINGS.easeOut },
  section: { duration: TIMINGS.section, ease: EASINGS.easeOut },
  hero: { duration: TIMINGS.hero, ease: EASINGS.easeOut },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: TIMINGS.section,
      ease: EASINGS.easeOut,
      delay: custom * 0.08,
    },
  }),
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (custom = 0) => ({
    opacity: 1,
    transition: {
      duration: TIMINGS.card,
      ease: EASINGS.easeOut,
      delay: custom * 0.05,
    },
  }),
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (custom = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: TIMINGS.card,
      ease: EASINGS.easeOut,
      delay: custom * 0.06,
    },
  }),
};

export const slideFromRight: Variants = {
  hidden: { opacity: 0, x: 24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: TIMINGS.card,
      ease: EASINGS.easeOut,
    },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 6 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.25,
      ease: EASINGS.easeOut,
    },
  },
  exit: {
    opacity: 0,
    y: -4,
    transition: {
      duration: 0.18,
      ease: EASINGS.easeOut,
    },
  },
};
