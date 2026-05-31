"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  Building2,
  Calculator,
  CloudCog,
  HardHat,
  KeyRound,
  Rocket,
  UserRoundCheck,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

type IconGridIcon =
  | "building"
  | "calculator"
  | "cloud-cog"
  | "hard-hat"
  | "key"
  | "rocket"
  | "user-check"
  | "users";

export interface IconGridItem {
  icon: IconGridIcon;
  id: string;
  name: string;
}

interface IconGridProps {
  className?: string;
  items: IconGridItem[];
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      damping: 18,
      stiffness: 120,
      type: "spring",
    },
  },
};

const iconMap: Record<IconGridIcon, LucideIcon> = {
  building: Building2,
  calculator: Calculator,
  "cloud-cog": CloudCog,
  "hard-hat": HardHat,
  key: KeyRound,
  rocket: Rocket,
  "user-check": UserRoundCheck,
  users: UsersRound,
};

export function IconGrid({ className, items }: IconGridProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cn(
        "grid overflow-hidden rounded-none border-y border-white/12 sm:border-x",
        "grid-cols-2 md:grid-cols-4",
        className,
      )}
      initial={shouldReduceMotion ? false : "hidden"}
      variants={shouldReduceMotion ? undefined : containerVariants}
      viewport={{ once: true, amount: 0.25 }}
      whileInView={shouldReduceMotion ? undefined : "visible"}
    >
      {items.map((item, index) => (
        <IconGridCell
          index={index}
          item={item}
          itemCount={items.length}
          key={item.id}
          reduceMotion={shouldReduceMotion}
        />
      ))}
    </motion.div>
  );
}

function IconGridCell({
  index,
  item,
  itemCount,
  reduceMotion,
}: {
  index: number;
  item: IconGridItem;
  itemCount: number;
  reduceMotion: boolean | null;
}) {
  const Icon = iconMap[item.icon];

  return (
    <motion.div
      aria-label={item.name}
      className={cn(
        "group relative flex min-h-48 flex-col items-center justify-center gap-6",
        "border-white/12 px-5 py-10 text-center outline-none transition duration-300 ease-out",
        "hover:bg-[#1558c8] focus-visible:bg-[#1558c8] focus-visible:ring-2 focus-visible:ring-white/80",
        "motion-reduce:transition-none sm:min-h-56 lg:min-h-64",
        index % 2 === 0 ? "border-r" : "",
        index < itemCount - 2 ? "border-b" : "",
        "md:border-r md:border-b",
        index % 4 === 3 ? "md:border-r-0" : "",
        index >= itemCount - 4 ? "md:border-b-0" : "",
      )}
      tabIndex={0}
      variants={reduceMotion ? undefined : itemVariants}
    >
      <span className="flex size-13 items-center justify-center text-white transition duration-300 group-hover:scale-110 group-focus-visible:scale-110 motion-reduce:transition-none sm:size-16">
        <Icon aria-hidden="true" className="h-full w-full stroke-[1.25]" />
      </span>
      <span className="max-w-44 text-sm font-bold uppercase tracking-[0.06em] text-white sm:text-base">
        {item.name}
      </span>
    </motion.div>
  );
}
