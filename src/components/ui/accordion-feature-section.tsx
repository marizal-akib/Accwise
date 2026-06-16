"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

interface FeatureItem {
  id: number;
  title: string;
  image: string;
  description: string;
}

interface Feature197Props {
  features: FeatureItem[];
}

const defaultFeatures: FeatureItem[] = [
  {
    id: 1,
    title: "How does the callback work?",
    image: "/assets/brand/accwise-logo-mark.png",
    description:
      "Send your details and ACCWISE can respond through the provisional phone or email routes listed on this site.",
  },
  {
    id: 2,
    title: "What is the Free Accounting Health Check?",
    image: "/assets/brand/accwise-logo-mark.png",
    description:
      "It is a first conversation to understand your accountancy, tax, payroll, VAT, CIS, bookkeeping, or HMRC enquiry concern.",
  },
];

const Feature197 = ({
  features = defaultFeatures,
}: Feature197Props) => {
  const visualRef = useRef<HTMLDivElement | null>(null);
  const isVisualInView = useInView(visualRef, { amount: 0.42, once: true });
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
                  showVisual
                    ? {
                        filter: "blur(0px) brightness(1)",
                        opacity: 1,
                        scale: 1,
                        y: 0,
                      }
                    : {
                        filter: "blur(8px) brightness(1.18)",
                        opacity: 0,
                        scale: 0.86,
                        y: 54,
                      }
                }
                className="relative flex aspect-square w-full max-w-[280px] items-center justify-center overflow-visible bg-transparent md:max-w-[360px]"
                initial={shouldReduceMotion ? false : undefined}
                transition={{
                  duration: 0.68,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <motion.div
                  aria-hidden="true"
                  animate={
                    showVisual
                      ? { opacity: [0, 0.42, 0], scale: [0.62, 1.06, 1.28], y: [34, -8, -18] }
                      : { opacity: 0, scale: 0.62, y: 34 }
                  }
                  className="pointer-events-none absolute bottom-8 h-32 w-32 rounded-full bg-[radial-gradient(circle,rgba(76,157,225,0.46),rgba(76,157,225,0.18)_48%,transparent_72%)] blur-md"
                  initial={false}
                  transition={{
                    duration: 0.82,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
                <Image
                  alt="ACCWISE Accountants logo mark"
                  className="relative h-auto w-[78%] object-contain drop-shadow-[0_24px_48px_rgba(76,157,225,0.14)]"
                  height={720}
                  src="/assets/brand/accwise-logo-mark.png"
                  width={720}
                />
              </motion.div>
            </div>
          </div>
      </div>
    </section>
  );
};

export { Feature197 };
