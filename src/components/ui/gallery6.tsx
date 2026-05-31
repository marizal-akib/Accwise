"use client";

/* eslint-disable @next/next/no-img-element */

import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { LiquidButtonLink } from "@/components/ui/liquid-glass-button";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export interface GalleryItem {
  id: string;
  title: string;
  summary: string;
  url: string;
  image: string;
}

interface Gallery6Props {
  heading?: string;
  demoUrl?: string;
  demoLabel?: string;
  items?: GalleryItem[];
}

const defaultItems: GalleryItem[] = [
  {
    id: "item-1",
    title: "Self-Assessment Tax Return",
    summary:
      "Support preparing and organising information for a self-assessment tax return enquiry.",
    url: "/contact",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=80",
  },
];

const revealContainerVariants: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const revealItemVariants: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: (index = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      damping: 20,
      delay: Number(index) * 0.07,
      stiffness: 120,
      type: "spring",
    },
  }),
};

function Gallery6({
  heading = "Accountancy services",
  demoUrl = "/contact",
  demoLabel = "Request a callback",
  items = defaultItems,
}: Gallery6Props) {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!carouselApi) {
      return;
    }

    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
    };

    updateSelection();
    carouselApi.on("reInit", updateSelection);
    carouselApi.on("select", updateSelection);

    return () => {
      carouselApi.off("reInit", updateSelection);
      carouselApi.off("select", updateSelection);
    };
  }, [carouselApi]);

  return (
    <motion.section
      className="overflow-hidden py-20"
      initial={shouldReduceMotion ? false : "hidden"}
      variants={shouldReduceMotion ? undefined : revealContainerVariants}
      viewport={{ once: true, amount: 0.18 }}
      whileInView={shouldReduceMotion ? undefined : "visible"}
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
        <motion.div
          className="mb-8 flex flex-col justify-between gap-8 md:mb-14 md:flex-row md:items-end lg:mb-16"
          initial={shouldReduceMotion ? false : "hidden"}
          variants={shouldReduceMotion ? undefined : revealItemVariants}
          viewport={{ once: true, amount: 0.35 }}
          whileInView={shouldReduceMotion ? undefined : "visible"}
        >
          <div>
            <h2 className="max-w-2xl text-4xl font-bold leading-tight text-accwise-navy sm:text-5xl">
              {heading}
            </h2>
            <LiquidButtonLink
              className="mt-5"
              href={demoUrl}
              showArrow
              variant="secondary"
            >
              {demoLabel}
            </LiquidButtonLink>
          </div>
          <div className="flex shrink-0 items-center justify-start gap-2">
            <Button
              aria-label="Previous service"
              className="size-12 rounded-full"
              disabled={!canScrollPrev}
              onClick={() => {
                carouselApi?.scrollPrev();
              }}
              size="icon"
              variant="outline"
            >
              <ArrowLeft aria-hidden="true" className="size-5" />
            </Button>
            <Button
              aria-label="Next service"
              className="size-12 rounded-full"
              disabled={!canScrollNext}
              onClick={() => {
                carouselApi?.scrollNext();
              }}
              size="icon"
              variant="outline"
            >
              <ArrowRight aria-hidden="true" className="size-5" />
            </Button>
          </div>
        </motion.div>
      </div>
      <div className="w-full">
        <Carousel
          className="relative md:left-[-1rem]"
          opts={{
            align: "start",
            breakpoints: {
              "(max-width: 768px)": {
                dragFree: true,
              },
            },
          }}
          setApi={setCarouselApi}
        >
          <CarouselContent className="-mr-4 ml-8 2xl:ml-[max(8rem,calc(50vw-700px+1rem))] 2xl:mr-[max(0rem,calc(50vw-700px-1rem))]">
            {items.map((item, index) => (
              <CarouselItem
                className="pl-4 md:basis-[316px] md:max-w-[316px]"
                key={item.id}
              >
                <motion.div
                  className="h-full"
                  custom={index}
                  initial={shouldReduceMotion ? false : "hidden"}
                  variants={shouldReduceMotion ? undefined : revealItemVariants}
                  viewport={{ once: true, amount: 0.22 }}
                  whileInView={shouldReduceMotion ? undefined : "visible"}
                >
                  <a
                    className="group flex h-full flex-col justify-between rounded-md bg-white shadow-[0_24px_55px_rgba(22,37,66,0.09)]"
                    href={item.url}
                  >
                    <div>
                      <div className="flex aspect-[3/2] overflow-hidden rounded-t-md">
                        <div className="relative h-full w-full origin-bottom transition duration-300 group-hover:scale-105">
                          {/* The source block intentionally uses a plain image element. */}
                          <img
                            alt={item.title}
                            className="h-full w-full object-cover object-center"
                            src={item.image}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col items-center p-6 text-center">
                      <div className="mb-3 min-h-16 break-words text-xl font-semibold leading-tight text-accwise-navy lg:text-2xl">
                        {item.title}
                      </div>
                      <div className="mb-8 line-clamp-3 text-sm leading-6 text-muted-foreground md:text-base">
                        {item.summary}
                      </div>
                      <div className="mt-auto flex items-center justify-center text-sm font-semibold text-accwise-green">
                        Ask about this service
                        <ArrowRight
                          aria-hidden="true"
                          className="ml-2 size-5 transition-transform group-hover:translate-x-1"
                        />
                      </div>
                    </div>
                  </a>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </motion.section>
  );
}

export { Gallery6 };
