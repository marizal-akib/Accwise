"use client";

import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { useRef, useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AccwiseMetalMark } from "@/components/ui/accwise-metal-mark";
import { cn } from "@/lib/utils";

interface FeatureItem {
  id: number;
  title: string;
  description: string;
}

interface Feature197Props {
  features: FeatureItem[];
}

const defaultFeatures: FeatureItem[] = [
  {
    id: 1,
    title: "How does the callback work?",
    description:
      "Send your details and ACCWISE can respond through the phone or email routes listed on this site.",
  },
  {
    id: 2,
    title: "What is the Free Accounting Health Check?",
    description:
      "It is a first conversation to understand your accountancy, tax, payroll, VAT, CIS, bookkeeping, or HMRC enquiry concern.",
  },
];

const visualRevealVariants: Variants = {
  hidden: { opacity: 0, scale: 0.985, y: 72 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 1.45,
      ease: [0.5, 1, 0.5, 1],
    },
  },
};

const glowRevealVariants: Variants = {
  hidden: { opacity: 0, scale: 0.94, y: 36 },
  visible: {
    opacity: 0.08,
    scale: 1,
    y: 0,
    transition: {
      delay: 0.08,
      duration: 1.25,
      ease: [0.5, 1, 0.5, 1],
    },
  },
};

const Feature197 = ({
  features = defaultFeatures,
}: Feature197Props) => {
  const visualRef = useRef<HTMLDivElement | null>(null);
  const isVisualInView = useInView(visualRef, { amount: 0.22, once: true });
  const shouldReduceMotion = useReducedMotion();
  const showVisual = Boolean(shouldReduceMotion || isVisualInView);
  const firstFeatureValue = features[0] ? `item-${features[0].id}` : undefined;
  const [activeValue, setActiveValue] = useState<string | undefined>(
    firstFeatureValue,
  );
  const activeTabId =
    features.find((feature) => `item-${feature.id}` === activeValue)?.id ?? null;

  return (
    <section className="bg-accwise-offwhite/50 py-16 md:py-20">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-[1fr_0.82fr] lg:gap-10">
            <Accordion
              className="order-2 w-full overflow-hidden rounded-lg bg-white shadow-[0_18px_50px_rgba(22,37,66,0.08)] md:order-1"
              collapsible
              onValueChange={(value) => {
                setActiveValue(value || undefined);
              }}
              type="single"
              value={activeValue}
            >
              {features.map((tab) => (
                <AccordionItem
                  className="border-b-0 px-5"
                  key={tab.id}
                  value={`item-${tab.id}`}
                >
                  <AccordionTrigger
                    className="cursor-pointer py-5 text-left !no-underline"
                  >
                    <h3
                      className={cn(
                        "pr-4 text-lg font-semibold leading-snug transition",
                        tab.id === activeTabId
                          ? "text-accwise-navy"
                          : "text-accwise-charcoal/62",
                      )}
                    >
                      {tab.title}
                    </h3>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-base leading-7 text-accwise-charcoal/70">
                      {tab.description}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div
              className="relative order-1 flex min-h-[260px] items-center justify-center overflow-hidden md:order-2 md:min-h-[360px]"
              ref={visualRef}
            >
              <motion.div
                animate={
                  shouldReduceMotion
                    ? { opacity: 1, scale: 1, y: 0 }
                    : showVisual
                      ? "visible"
                      : "hidden"
                }
                className="relative flex aspect-square w-full max-w-[340px] transform-gpu items-center justify-center overflow-visible bg-transparent will-change-transform md:max-w-[440px]"
                initial={shouldReduceMotion ? false : "hidden"}
                variants={shouldReduceMotion ? undefined : visualRevealVariants}
              >
                <motion.div
                  aria-hidden="true"
                  animate={
                    shouldReduceMotion
                      ? { opacity: 0.08, scale: 1, y: 0 }
                      : showVisual
                        ? "visible"
                        : "hidden"
                  }
                  className="pointer-events-none absolute bottom-8 h-24 w-40 transform-gpu rounded-full bg-[radial-gradient(ellipse,rgba(34,111,177,0.16),rgba(76,157,225,0.08)_46%,transparent_74%)] will-change-transform"
                  initial={shouldReduceMotion ? false : "hidden"}
                  variants={shouldReduceMotion ? undefined : glowRevealVariants}
                />
                <AccwiseMetalMark
                  className="relative h-auto w-[90%]"
                  isActive={showVisual}
                  reduceMotion={Boolean(shouldReduceMotion)}
                />
              </motion.div>
            </div>
          </div>
      </div>
    </section>
  );
};

export { Feature197 };
