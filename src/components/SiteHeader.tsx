"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { LiquidButtonLink } from "@/components/ui/liquid-glass-button";
import { mobileServiceLinks, navLinks, serviceNavLinks } from "@/lib/site-data";

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
    >
      {open ? (
        <path
          d="M6 6l12 12M18 6L6 18"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="2"
        />
      ) : (
        <path
          d="M4 7h16M4 12h16M4 17h16"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="2"
        />
      )}
    </svg>
  );
}

function ServicesDropdown({
  isOnHero,
  pathname,
}: {
  isOnHero: boolean;
  pathname: string;
}) {
  const [open, setOpen] = useState(false);
  const active = pathname === "/services";

  function closeDropdown() {
    setOpen(false);
  }

  return (
    <div
      className="group/services relative flex items-center"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={closeDropdown}
    >
      <Link
        className={`inline-flex items-center py-7 pr-1 transition ${
          isOnHero ? "hover:text-white/70" : "hover:text-accwise-green"
        } ${active ? (isOnHero ? "text-white" : "text-accwise-green") : ""}`}
        href="/services"
        onClick={closeDropdown}
      >
        Services
      </Link>
      <button
        aria-label="Open services menu"
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls="services-dropdown"
        className={`inline-flex h-9 w-6 items-center justify-center rounded-full transition ${
          isOnHero ? "hover:text-white/70" : "hover:text-accwise-green"
        } ${
          active ? (isOnHero ? "text-white" : "text-accwise-green") : ""
        } focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current`}
        onClick={() => setOpen(true)}
        type="button"
      >
        <ChevronDown
          aria-hidden="true"
          className={`size-3.5 transition duration-200 ${open ? "rotate-180" : ""}`}
          strokeWidth={2.2}
        />
      </button>
      <div
        className={`invisible absolute left-1/2 top-full w-[520px] -translate-x-1/2 translate-y-3 rounded-lg bg-white p-4 text-accwise-navy opacity-0 shadow-[0_26px_80px_rgba(22,37,66,0.16)] transition duration-200 group-hover/services:visible group-hover/services:translate-y-0 group-hover/services:opacity-100 group-focus-within/services:visible group-focus-within/services:translate-y-0 group-focus-within/services:opacity-100 ${
          open
            ? "visible translate-y-0 opacity-100"
            : ""
        }`}
        id="services-dropdown"
      >
        <div className="grid grid-cols-2 gap-1">
          <Link
            className="rounded-md px-4 py-3 text-sm font-bold text-accwise-navy transition hover:bg-accwise-offwhite/55 hover:text-accwise-green focus-visible:bg-accwise-offwhite/55 focus-visible:text-accwise-green focus-visible:outline-none"
            href="/services"
            onClick={closeDropdown}
          >
            All services
          </Link>
          {serviceNavLinks.map((service) => (
            <Link
              className="rounded-md px-4 py-3 text-sm font-semibold text-accwise-charcoal/72 transition hover:bg-accwise-offwhite/55 hover:text-accwise-green focus-visible:bg-accwise-offwhite/55 focus-visible:text-accwise-green focus-visible:outline-none"
              href={service.href}
              key={service.href}
              onClick={closeDropdown}
            >
              {service.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const overlaysHero =
    pathname === "/" ||
    pathname === "/about" ||
    pathname === "/services" ||
    pathname === "/contact";
  const isOnHero = overlaysHero && !scrolled && !open;

  useEffect(() => {
    if (!overlaysHero) {
      return;
    }

    const handleScroll = () => setScrolled(window.scrollY > 40);
    const frame = window.requestAnimationFrame(handleScroll);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [overlaysHero]);

  function closeMenu() {
    setOpen(false);
    setMobileServicesOpen(false);
  }

  return (
    <header
      className={`top-0 z-50 w-full transition duration-300 ${
        overlaysHero ? "fixed" : "sticky"
      } ${
        isOnHero
          ? "bg-white/95 text-accwise-navy shadow-none lg:bg-transparent lg:text-white"
          : "bg-white/92 text-accwise-navy shadow-none backdrop-blur"
      }`}
    >
      <div className="mx-auto flex min-h-20 w-full max-w-6xl items-center justify-between gap-4 px-5 sm:px-6 lg:px-8">
        <Link
          aria-label="ACCWISE Accountants home"
          className="shrink-0 transition"
          href="/"
          onClick={closeMenu}
        >
          <Image
            alt="ACCWISE Accountants"
            className={`h-auto w-44 sm:w-56 lg:w-64 ${
              isOnHero ? "lg:hidden" : ""
            }`}
            height={72}
            priority
            src="/assets/brand/accwise-logo.svg"
            width={300}
          />
          <Image
            alt="ACCWISE Accountants"
            className={`hidden h-auto w-44 sm:w-56 lg:w-64 ${
              isOnHero
                ? "lg:block drop-shadow-[0_6px_18px_rgba(0,0,0,0.32)]"
                : ""
            }`}
            height={72}
            priority
            src="/assets/brand/accwise-logo-hero.svg"
            width={300}
          />
        </Link>

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-7 text-sm font-semibold lg:flex"
        >
          {navLinks.map((link) =>
            link.href === "/services" ? (
              <ServicesDropdown
                isOnHero={isOnHero}
                key={link.href}
                pathname={pathname}
              />
            ) : (
              <Link
                className={`transition ${
                  isOnHero
                    ? "hover:text-white/70"
                    : "hover:text-accwise-green"
                } ${
                  pathname === link.href
                    ? isOnHero
                      ? "text-white"
                      : "text-accwise-green"
                    : ""
                }`}
                href={link.href}
                key={link.href}
              >
                {link.label}
              </Link>
            ),
          )}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LiquidButtonLink
            href="/contact"
            size="sm"
            variant={isOnHero ? "light" : "primary"}
          >
            Request a callback
          </LiquidButtonLink>
        </div>

        <button
          aria-controls="mobile-menu"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-accwise-border text-accwise-navy transition hover:border-accwise-green hover:text-accwise-green focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accwise-green lg:hidden"
          onClick={() => setOpen((current) => !current)}
          type="button"
        >
          <MenuIcon open={open} />
        </button>
      </div>

      {open ? (
        <div
          className="fixed inset-x-0 top-20 z-40 min-h-[calc(100vh-5rem)] bg-accwise-navy px-5 py-8 text-white lg:hidden"
          id="mobile-menu"
        >
          <nav aria-label="Mobile navigation" className="mx-auto max-w-6xl">
            <div className="grid gap-2">
              {navLinks.map((link) =>
                link.href === "/services" ? (
                  <div key={link.href}>
                    <div className="flex items-center justify-between gap-3">
                      <Link
                        className="flex-1 py-4 text-2xl font-semibold transition hover:text-white/75"
                        href={link.href}
                        onClick={closeMenu}
                      >
                        {link.label}
                      </Link>
                      <button
                        aria-controls="mobile-services-menu"
                        aria-expanded={mobileServicesOpen}
                        aria-label={mobileServicesOpen ? "Collapse services links" : "Expand services links"}
                        className="inline-flex h-14 w-14 items-center justify-center rounded-full text-white transition hover:bg-white/10 hover:text-white/75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                        onClick={() =>
                          setMobileServicesOpen((current) => !current)
                        }
                        type="button"
                      >
                        <ChevronDown
                          aria-hidden="true"
                          className={`size-6 transition ${
                            mobileServicesOpen ? "rotate-180" : ""
                          }`}
                          strokeWidth={2.2}
                        />
                      </button>
                    </div>
                    {mobileServicesOpen ? (
                      <div
                        className="grid grid-cols-2 gap-3 pb-4 pt-2"
                        id="mobile-services-menu"
                      >
                        {mobileServiceLinks.map((service) => (
                          <Link
                            className="rounded-lg border border-white/12 px-4 py-3 text-sm text-white/80 transition hover:bg-white/10 hover:text-white"
                            href={service.href}
                            key={service.href}
                            onClick={closeMenu}
                          >
                            {service.label}
                          </Link>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ) : (
                  <Link
                    className="py-4 text-2xl font-semibold transition hover:text-white/75"
                    href={link.href}
                    key={link.href}
                    onClick={closeMenu}
                  >
                    {link.label}
                  </Link>
                ),
              )}
            </div>

            <LiquidButtonLink
              className="mt-8 w-full"
              href="/contact"
              onClick={closeMenu}
              variant="white"
            >
              Request a callback
            </LiquidButtonLink>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
