"use client";

import { useState } from "react";

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

            <div className="relative order-1 flex min-h-[260px] items-center justify-center overflow-hidden md:order-2 md:min-h-[360px]">
              <div className="relative flex aspect-square w-full max-w-[320px] items-center justify-center overflow-hidden bg-transparent md:max-w-[430px]">
                <video
                  aria-label="ACCWISE animated preview"
                  autoPlay
                  className="relative aspect-square w-full scale-[1.1] object-contain mix-blend-multiply [filter:brightness(1.18)_contrast(1.12)_saturate(1.05)] [mask-image:radial-gradient(circle,black_0%,black_58%,transparent_76%)] [-webkit-mask-image:radial-gradient(circle,black_0%,black_58%,transparent_76%)]"
                  loop
                  muted
                  playsInline
                >
                  <source
                    src="/assets/media/accwise-ring-preview.mp4"
                    type="video/mp4"
                  />
                </video>
              </div>
            </div>
          </div>
      </div>
    </section>
  );
};

export { Feature197 };
