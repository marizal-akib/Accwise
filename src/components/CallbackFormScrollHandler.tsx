"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const callbackFormId = "callback-form";
const callbackFormHash = "#callback-form";
const callbackFormPath = "/contact#callback-form";

function scrollToCallbackForm(behavior: ScrollBehavior) {
  const callbackForm = document.getElementById(callbackFormId);

  if (!callbackForm) {
    return;
  }

  callbackForm.scrollIntoView({
    behavior,
    block: "start",
  });
}

export function CallbackFormScrollHandler() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/contact") {
      return;
    }

    const scrollFromHash = (behavior: ScrollBehavior) => {
      if (window.location.hash !== callbackFormHash) {
        return;
      }

      requestAnimationFrame(() => scrollToCallbackForm(behavior));
    };

    const handleClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      if (!(event.target instanceof Element)) {
        return;
      }

      const link = event.target.closest(
        `a[href="${callbackFormHash}"], a[href="${callbackFormPath}"]`,
      );

      if (!link) {
        return;
      }

      event.preventDefault();

      if (window.location.hash !== callbackFormHash) {
        window.history.pushState(null, "", callbackFormHash);
      }

      scrollToCallbackForm("smooth");
    };

    const handleHashChange = () => scrollFromHash("smooth");

    scrollFromHash("auto");
    document.addEventListener("click", handleClick, true);
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      document.removeEventListener("click", handleClick, true);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [pathname]);

  return null;
}
