"use client";

import { useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type PracticalVisualProps = {
  imageUrl: string;
};

export function PracticalVisual({ imageUrl }: PracticalVisualProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const root = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(root, { amount: 0.25, once: true });
  const shouldReduceMotion = useReducedMotion();
  const canReveal = isLoaded && (isInView || shouldReduceMotion);

  useEffect(() => {
    let isCurrent = true;
    const image = new window.Image();
    const markLoaded = () => {
      if (isCurrent) {
        setIsLoaded(true);
      }
    };

    image.onload = markLoaded;
    image.onerror = markLoaded;
    image.src = imageUrl;

    return () => {
      isCurrent = false;
      image.onload = null;
      image.onerror = null;
    };
  }, [imageUrl]);

  return (
    <div className="relative min-h-[460px]" ref={root}>
      {!isLoaded ? (
        <div
          aria-hidden="true"
          className="accwise-visual-skeleton absolute inset-0 z-20 overflow-hidden rounded-md bg-white"
        >
          <div className="accwise-skeleton-shimmer absolute left-0 top-8 h-80 w-[78%] rounded-md bg-accwise-blue/10" />
          <div className="absolute bottom-0 right-0 w-[64%] rounded-md bg-white p-6 shadow-[0_24px_60px_rgba(22,37,66,0.1)]">
            <div className="accwise-skeleton-shimmer h-14 w-4/5 rounded-full bg-accwise-blue/10" />
            <div className="mt-8 grid gap-3">
              <div className="accwise-skeleton-shimmer h-3 w-full rounded-full bg-accwise-blue/10" />
              <div className="accwise-skeleton-shimmer h-3 w-11/12 rounded-full bg-accwise-blue/10" />
              <div className="accwise-skeleton-shimmer h-3 w-3/4 rounded-full bg-accwise-blue/10" />
            </div>
          </div>
        </div>
      ) : null}

      <div
        className={`accwise-photo-reveal absolute left-0 top-8 h-80 w-[78%] rounded-md bg-cover bg-center shadow-[0_30px_80px_rgba(22,37,66,0.16)] transition duration-700 ease-out ${
          canReveal
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-3 scale-[0.98] opacity-0"
        }`}
        style={{
          backgroundImage: `linear-gradient(180deg,rgba(22,37,66,0.04),rgba(22,37,66,0.1)), url(${imageUrl})`,
        }}
      />
      <div
        className={`accwise-card-reveal absolute bottom-0 right-0 w-[64%] rounded-md bg-white p-6 shadow-[0_24px_60px_rgba(22,37,66,0.12)] transition delay-150 duration-700 ease-out ${
          canReveal
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-5 scale-[0.98] opacity-0"
        }`}
      >
        <Image
          alt="ACCWISE Accountants"
          className="h-auto w-full"
          height={120}
          src="/assets/brand/accwise-logo.svg"
          width={520}
        />
        <p className="mt-5 text-sm leading-6 text-accwise-charcoal/68">
          Trusted, confidential and professional accountancy support, with
          flexible remote and on-site help for self-employed clients, companies
          and organisations.
        </p>
      </div>
    </div>
  );
}
