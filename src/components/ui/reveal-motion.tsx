"use client";

import { Children, type ReactNode, useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";

type HeroContentRevealProps = {
  children: ReactNode;
};

type RevealGroupProps = {
  children: ReactNode;
  className?: string;
  amount?: number;
  fallbackDelayMs?: number;
  fallbackVisible?: boolean;
  staggerDelay?: number;
};

type RevealItemProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

const motionEase: [number, number, number, number] = [0.5, 1, 0.5, 1];

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay,
      duration: 0.85,
      ease: motionEase,
    },
  }),
};

function groupVariants(staggerDelay: number): Variants {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };
}

export function HeroContentReveal({ children }: HeroContentRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      animate="visible"
      data-accwise-hero-reveal="true"
      initial={shouldReduceMotion ? false : "hidden"}
      variants={groupVariants(0.08)}
    >
      {Children.toArray(children).map((child, index) => (
        <motion.div custom={index * 0.05} key={index} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}

export function RevealGroup({
  amount = 0.24,
  children,
  className = "",
  fallbackDelayMs = 900,
  fallbackVisible = false,
  staggerDelay = 0.08,
}: RevealGroupProps) {
  const root = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(root, { amount, once: true });
  const shouldReduceMotion = useReducedMotion();
  const [hasFallbackVisible, setFallbackVisible] = useState(false);
  const isVisible = Boolean(shouldReduceMotion || isInView || hasFallbackVisible);

  useEffect(() => {
    if (!fallbackVisible || shouldReduceMotion || isInView) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setFallbackVisible(true);
    }, fallbackDelayMs);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [fallbackDelayMs, fallbackVisible, isInView, shouldReduceMotion]);

  return (
    <motion.div
      animate={isVisible ? "visible" : "hidden"}
      className={className}
      data-accwise-reveal-group="true"
      initial={shouldReduceMotion ? false : "hidden"}
      ref={root}
      variants={groupVariants(staggerDelay)}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className = "",
  delay = 0,
}: RevealItemProps) {
  return (
    <motion.div
      className={className}
      custom={delay}
      data-accwise-reveal-item="true"
      variants={itemVariants}
    >
      {children}
    </motion.div>
  );
}
