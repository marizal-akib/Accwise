"use client";

import {
  Calculator,
  CalendarDays,
  Check,
  PhoneCall,
  PoundSterling,
  Shield,
} from "lucide-react";

import { useLucideDrawerAnimation } from "@/components/ui/lucide-icon-drawer";

const featureCards = [
  {
    title: "Reduce Tax Stress",
    description:
      "We help you understand what you owe, what you can claim, and what needs to be submitted before deadlines.",
    icon: <TaxStressIcon />,
  },
  {
    title: "Stay HMRC Ready",
    description:
      "Accounts, payroll, VAT, and MTD support designed to keep your records clean and compliant.",
    icon: <HmrcReadyIcon />,
  },
  {
    title: "Speak to an Accountant",
    description:
      "Use the free consultation form and get clear guidance without wasting time searching online.",
    icon: <AccountantIcon />,
  },
];

function TaxStressIcon() {
  return (
    <>
      <Calculator
        aria-hidden="true"
        className="accwise-icon-static size-12 overflow-visible text-accwise-blue sm:size-14"
        strokeWidth={1.8}
      />
      <PoundSterling
        aria-hidden="true"
        className="accwise-icon-accent accwise-icon-accent-float absolute -right-1 top-1 size-6 text-accwise-green"
        data-accwise-icon-motion="true"
        strokeWidth={2.2}
      />
    </>
  );
}

function HmrcReadyIcon() {
  return (
    <>
      <Shield
        aria-hidden="true"
        className="accwise-icon-static size-12 overflow-visible text-accwise-blue sm:size-14"
        strokeWidth={1.8}
      />
      <Check
        aria-hidden="true"
        className="accwise-icon-accent accwise-icon-accent-pulse absolute left-1/2 top-1/2 size-6 -translate-x-1/2 -translate-y-1/2 text-accwise-green"
        data-accwise-icon-motion="true"
        strokeWidth={2.5}
      />
    </>
  );
}

function AccountantIcon() {
  return (
    <>
      <CalendarDays
        aria-hidden="true"
        className="accwise-icon-static size-12 overflow-visible text-accwise-blue sm:size-14"
        strokeWidth={1.8}
      />
      <PhoneCall
        aria-hidden="true"
        className="accwise-icon-accent accwise-icon-accent-float absolute -right-1 top-0 size-6 text-accwise-green"
        data-accwise-icon-motion="true"
        strokeWidth={2.2}
      />
    </>
  );
}

export function FeatureCards() {
  const root = useLucideDrawerAnimation();

  return (
    <section className="relative z-10 bg-white">
      <div
        className="mx-auto grid w-full max-w-6xl gap-x-10 gap-y-12 px-5 pb-16 pt-8 sm:grid-cols-2 sm:px-6 md:pt-10 lg:grid-cols-3 lg:px-8"
        ref={root}
      >
        {featureCards.map((card) => (
          <article
            className="grid grid-cols-[auto_1fr] items-start gap-5 rounded-none bg-transparent p-0 sm:gap-6 lg:gap-7 [&:nth-child(3)]:sm:col-span-2 [&:nth-child(3)]:sm:mx-auto [&:nth-child(3)]:sm:max-w-[34rem] [&:nth-child(3)]:lg:col-span-1 [&:nth-child(3)]:lg:mx-0 [&:nth-child(3)]:lg:max-w-none"
            key={card.title}
          >
            <span
              aria-hidden="true"
              className="relative inline-flex size-20 items-center justify-center text-accwise-blue sm:size-[5.5rem] lg:size-24"
            >
              {card.icon}
            </span>
            <div className="min-w-0 pt-1">
              <h2 className="text-2xl font-bold leading-tight text-accwise-navy sm:text-[1.7rem] lg:text-2xl xl:text-[1.72rem]">
                {card.title}
              </h2>
              <p className="mt-3 max-w-[34rem] text-base leading-7 text-accwise-charcoal/68 sm:text-lg sm:leading-8 lg:text-base lg:leading-7 xl:text-lg xl:leading-8">
                {card.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
