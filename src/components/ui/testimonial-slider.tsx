"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

import { cn } from "@/lib/utils";

export interface Testimonial {
  context: string;
  id: number;
  name: string;
  quote: string;
  status: string;
}

interface TestimonialSliderProps {
  className?: string;
  description: string;
  eyebrow: string;
  heading: string;
  testimonials: Testimonial[];
}

const getVisibleCount = (width: number) => {
  if (width >= 1280) {
    return 3;
  }

  if (width >= 768) {
    return 2;
  }

  return 1;
};

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

export default function TestimonialSlider({
  className,
  description,
  eyebrow,
  heading,
  testimonials,
}: TestimonialSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);
  const [visibleCount, setVisibleCount] = useState(1);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const maxIndex = Math.max(0, testimonials.length - visibleCount);
  const activeIndex = Math.min(currentIndex, maxIndex);
  const canGoNext = activeIndex < maxIndex;
  const canGoPrev = activeIndex > 0;
  const slideCount = maxIndex + 1;
  const trackX = `-${activeIndex * (100 / visibleCount)}%`;

  const dots = useMemo(
    () => Array.from({ length: slideCount }, (_, index) => index),
    [slideCount],
  );

  useEffect(() => {
    const updateVisibleCount = () => {
      setVisibleCount(getVisibleCount(window.innerWidth));
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);

    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncReducedMotion = () => setShouldReduceMotion(media.matches);

    syncReducedMotion();
    media.addEventListener("change", syncReducedMotion);

    return () => media.removeEventListener("change", syncReducedMotion);
  }, []);

  useEffect(() => {
    if (shouldReduceMotion || !isAutoPlaying || maxIndex === 0) {
      return;
    }

    const timer = window.setInterval(() => {
      setCurrentIndex((index) => {
        const safeIndex = Math.min(index, maxIndex);
        return safeIndex >= maxIndex ? 0 : safeIndex + 1;
      });
    }, 4800);

    return () => window.clearInterval(timer);
  }, [isAutoPlaying, maxIndex, shouldReduceMotion]);

  useEffect(
    () => () => {
      if (resumeTimer.current) {
        clearTimeout(resumeTimer.current);
      }
    },
    [],
  );

  const pauseAutoPlay = useCallback(() => {
    setIsAutoPlaying(false);

    if (resumeTimer.current) {
      clearTimeout(resumeTimer.current);
    }

    resumeTimer.current = setTimeout(() => setIsAutoPlaying(true), 8000);
  }, []);

  const goNext = useCallback(() => {
    if (!canGoNext) {
      return;
    }

    setCurrentIndex(Math.min(activeIndex + 1, maxIndex));
    pauseAutoPlay();
  }, [activeIndex, canGoNext, maxIndex, pauseAutoPlay]);

  const goPrev = useCallback(() => {
    if (!canGoPrev) {
      return;
    }

    setCurrentIndex(Math.max(activeIndex - 1, 0));
    pauseAutoPlay();
  }, [activeIndex, canGoPrev, pauseAutoPlay]);

  const goToSlide = useCallback(
    (index: number) => {
      setCurrentIndex(index);
      pauseAutoPlay();
    },
    [pauseAutoPlay],
  );

  const handleDragEnd = useCallback(
    (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      const swipeThreshold = 32;

      if (info.offset.x < -swipeThreshold) {
        goNext();
      } else if (info.offset.x > swipeThreshold) {
        goPrev();
      }
    },
    [goNext, goPrev],
  );

  return (
    <section
      className={cn("overflow-hidden bg-[#eef5f0] text-accwise-navy", className)}
      data-testid="client-situation-slider"
    >
      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-6 lg:px-8">
        <motion.div
          className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          transition={{ duration: 0.55, ease: [0.37, 0, 0.63, 1] }}
          viewport={{ once: true, amount: 0.25 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
        >
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-accwise-green">
              {eyebrow}
            </p>
            <h2 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">
              {heading}
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-accwise-charcoal/72">
              {description}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              aria-label="Previous client situation"
              className={cn(
                "inline-flex size-12 items-center justify-center rounded-full bg-white text-accwise-navy shadow-[0_12px_32px_rgba(22,37,66,0.12)] transition",
                canGoPrev
                  ? "hover:bg-accwise-navy hover:text-white"
                  : "cursor-not-allowed opacity-45",
              )}
              disabled={!canGoPrev}
              onClick={goPrev}
              type="button"
            >
              <ChevronLeft aria-hidden="true" className="size-5" />
            </button>
            <button
              aria-label="Next client situation"
              className={cn(
                "inline-flex size-12 items-center justify-center rounded-full bg-accwise-navy text-white shadow-[0_12px_32px_rgba(22,37,66,0.18)] transition",
                canGoNext
                  ? "hover:bg-accwise-green"
                  : "cursor-not-allowed opacity-45",
              )}
              disabled={!canGoNext}
              onClick={goNext}
              type="button"
            >
              <ChevronRight aria-hidden="true" className="size-5" />
            </button>
          </div>
        </motion.div>

        <div className="relative mt-12">
          <div className="overflow-hidden">
            <motion.div
              animate={{ x: trackX }}
              className="flex"
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { damping: 22, stiffness: 80, type: "spring" }
              }
            >
              {testimonials.map((testimonial) => (
                <motion.article
                  className="min-w-0 shrink-0 basis-full px-2 md:basis-1/2 xl:basis-1/3"
                  drag={shouldReduceMotion ? false : "x"}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.18}
                  key={testimonial.id}
                  onDragEnd={handleDragEnd}
                  style={{ cursor: shouldReduceMotion ? "default" : "grab" }}
                  whileHover={shouldReduceMotion ? undefined : { y: -6 }}
                  whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                >
                  <div className="relative flex min-h-[320px] flex-col overflow-hidden rounded-md bg-white p-7 shadow-[0_24px_70px_rgba(22,37,66,0.1)]">
                    <Quote
                      aria-hidden="true"
                      className="absolute -left-3 -top-3 size-20 text-accwise-green/10"
                    />
                    <div className="relative">
                      <span className="inline-flex rounded-full bg-accwise-green/10 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-accwise-green">
                        CLIENT SITUATION
                      </span>
                      <p className="mt-6 text-base font-semibold leading-7 text-accwise-navy sm:text-lg sm:leading-8">
                        {testimonial.quote}
                      </p>
                    </div>
                    <div className="relative mt-auto flex items-center gap-4 pt-8">
                      <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-accwise-navy text-sm font-bold text-white">
                        {getInitials(testimonial.name)}
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-accwise-navy">
                          {testimonial.name}
                        </h3>
                        <p className="text-sm leading-6 text-accwise-charcoal/64">
                          {testimonial.context}
                        </p>
                        <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-accwise-green">
                          {testimonial.status}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
          <div className="mt-8 flex justify-center gap-2">
            {dots.map((index) => (
              <button
                aria-label={`Go to client situation ${index + 1}`}
                className={cn(
                  "h-2.5 rounded-full transition-all",
                  index === activeIndex
                    ? "w-8 bg-accwise-green"
                    : "w-2.5 bg-accwise-navy/20 hover:bg-accwise-navy/45",
                )}
                key={index}
                onClick={() => goToSlide(index)}
                type="button"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
