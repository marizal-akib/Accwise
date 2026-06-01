"use client";

import { animate, svg } from "animejs";
import { useEffect, useRef } from "react";

export function useLucideDrawerAnimation() {
  const root = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const rootElement = root.current;

    if (!rootElement) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const svgElements = rootElement.querySelectorAll<SVGGeometryElement>(
      [
        "[data-accwise-icon-motion] path",
        "[data-accwise-icon-motion] circle",
        "[data-accwise-icon-motion] polyline",
        "[data-accwise-icon-motion] line",
        "[data-accwise-icon-motion] rect",
        "path[data-accwise-icon-motion]",
        "circle[data-accwise-icon-motion]",
        "polyline[data-accwise-icon-motion]",
        "line[data-accwise-icon-motion]",
        "rect[data-accwise-icon-motion]",
      ].join(", "),
    );

    if (svgElements.length === 0) {
      return;
    }

    svgElements.forEach((element) => element.classList.add("line"));

    let animation: ReturnType<typeof animate> | null = null;
    let observer: IntersectionObserver | null = null;

    const startAnimation = () => {
      if (animation) {
        return;
      }

      animation = animate(svg.createDrawable(svgElements), {
        alternate: true,
        draw: ["0 0.05", "0.05 1"],
        duration: 2600,
        ease: "inOutQuad",
        loop: true,
        playbackRate: 1,
      });
    };

    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            startAnimation();
            observer?.disconnect();
          }
        },
        { rootMargin: "0px 0px -10% 0px", threshold: 0.25 },
      );
      observer.observe(rootElement);
    } else {
      startAnimation();
    }

    return () => {
      observer?.disconnect();
      animation?.revert();
    };
  }, []);

  return root;
}
