import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  ClipboardList,
  FileText,
  MessagesSquare,
} from "lucide-react";
import { CtaLink } from "@/components/CtaLink";
import { PageHero } from "@/components/PageHero";
import { RevealGroup, RevealItem } from "@/components/ui/reveal-motion";
import { serviceAreas } from "@/lib/site-data";

type ServiceDetailPageProps = {
  params: Promise<{ slug: string }>;
};

const serviceImages = [
  "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=2200&q=80",
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=2200&q=80",
  "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=2200&q=80",
  "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=2200&q=80",
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2200&q=80",
  "https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=2200&q=80",
];

const relatedServiceRoutes = [
  { href: "/services/self-assessment-tax-return", label: "Self-Assessment" },
  { href: "/services/payroll-management", label: "Payroll" },
  { href: "/services/vat", label: "VAT" },
];

function getService(slug: string) {
  return serviceAreas.find((service) => service.slug === slug);
}

function getServiceImage(slug: string) {
  const serviceIndex = serviceAreas.findIndex((service) => service.slug === slug);
  return serviceImages[Math.max(serviceIndex, 0) % serviceImages.length];
}

export function generateStaticParams() {
  return serviceAreas.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: ServiceDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    return {
      title: "Service not found",
    };
  }

  return {
    title: service.title,
    description: service.overview,
  };
}

export default async function ServiceDetailPage({
  params,
}: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <PageHero
        actions={
          <>
            <CtaLink href="/contact#callback-form" size="lg">
              Request a callback
            </CtaLink>
            <CtaLink href="/services" size="lg" variant="light">
              All services
            </CtaLink>
          </>
        }
        description={service.overview}
        eyebrow="ACCWISE service route"
        image={getServiceImage(service.slug)}
        title={service.title}
        variant="image"
      />

      <section className="bg-white">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
          <RevealGroup className="grid gap-8 lg:grid-cols-[0.78fr_1fr] lg:items-start">
            <RevealItem>
              <div className="sticky top-32 rounded-lg border border-accwise-border bg-white p-6 shadow-[0_18px_52px_rgba(22,37,66,0.08)]">
                <Link
                  className="inline-flex items-center gap-2 text-sm font-bold text-accwise-blue transition hover:text-accwise-green"
                  href="/services"
                >
                  <ArrowLeft aria-hidden="true" className="size-4" />
                  Back to services
                </Link>
                <h2 className="mt-6 text-3xl font-bold leading-tight text-accwise-navy">
                  Start with a clear, practical first conversation.
                </h2>
                <p className="mt-4 text-base leading-7 text-accwise-charcoal/75">
                  {service.callbackCopy}
                </p>
                <CtaLink
                  className="mt-7 w-full"
                  href="/contact#callback-form"
                  variant="primary"
                >
                  Request a callback
                </CtaLink>
              </div>
            </RevealItem>

            <RevealItem>
              <div className="grid gap-6">
                <article className="rounded-lg bg-[#f3f5f8] p-6 shadow-[0_16px_48px_rgba(22,37,66,0.06)]">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex size-11 items-center justify-center rounded-full bg-accwise-blue/12 text-accwise-blue">
                      <MessagesSquare aria-hidden="true" className="size-5" />
                    </span>
                    <h2 className="text-2xl font-bold text-accwise-navy">
                      What ACCWISE can help discuss
                    </h2>
                  </div>
                  <ul className="mt-6 grid gap-3">
                    {service.discussionPoints.map((point) => (
                      <li
                        className="flex gap-3 rounded-md bg-white p-4 text-sm leading-6 text-accwise-charcoal/76"
                        key={point}
                      >
                        <CheckCircle2
                          aria-hidden="true"
                          className="mt-0.5 size-5 shrink-0 text-accwise-green"
                          strokeWidth={1.9}
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </article>

                <article className="rounded-lg bg-white p-6 shadow-[0_16px_48px_rgba(22,37,66,0.08)]">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex size-11 items-center justify-center rounded-full bg-accwise-green/12 text-accwise-green">
                      <ClipboardList aria-hidden="true" className="size-5" />
                    </span>
                    <h2 className="text-2xl font-bold text-accwise-navy">
                      Records to prepare
                    </h2>
                  </div>
                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {service.recordsToPrepare.map((record) => (
                      <li
                        className="rounded-md border border-accwise-border bg-white px-4 py-3 text-sm leading-6 text-accwise-charcoal/75"
                        key={record}
                      >
                        {record}
                      </li>
                    ))}
                  </ul>
                </article>

                <article className="rounded-lg bg-accwise-navy p-6 text-white shadow-[0_18px_58px_rgba(22,37,66,0.18)]">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex size-11 items-center justify-center rounded-full bg-white/10 text-white">
                      <FileText aria-hidden="true" className="size-5" />
                    </span>
                    <h2 className="text-2xl font-bold">
                      How the first conversation works
                    </h2>
                  </div>
                  <ol className="mt-6 grid gap-4">
                    {service.firstConversationSteps.map((step, index) => (
                      <li
                        className="grid grid-cols-[2.5rem_1fr] gap-3 text-sm leading-6 text-white/76"
                        key={step}
                      >
                        <span className="inline-flex size-10 items-center justify-center rounded-full bg-white text-sm font-bold text-accwise-navy">
                          {index + 1}
                        </span>
                        <span className="pt-2">{step}</span>
                      </li>
                    ))}
                  </ol>
                </article>
              </div>
            </RevealItem>
          </RevealGroup>
        </div>
      </section>

      <section className="bg-[#f3f5f8]">
        <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-6 lg:px-8">
          <RevealGroup className="grid gap-8 lg:grid-cols-[0.85fr_1fr] lg:items-center">
            <RevealItem>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-accwise-green">
                Related routes
              </p>
              <h2 className="mt-4 text-3xl font-bold leading-tight text-accwise-navy sm:text-4xl">
                Looking for a different ACCWISE service?
              </h2>
            </RevealItem>
            <RevealItem>
              <div className="grid gap-3 sm:grid-cols-3">
                {relatedServiceRoutes.map((route) => (
                  <Link
                    className="rounded-lg bg-white px-5 py-4 text-sm font-bold text-accwise-navy shadow-[0_14px_34px_rgba(22,37,66,0.07)] transition hover:-translate-y-1 hover:text-accwise-green hover:shadow-[0_20px_48px_rgba(22,37,66,0.11)]"
                    href={route.href}
                    key={route.href}
                  >
                    {route.label}
                  </Link>
                ))}
              </div>
            </RevealItem>
          </RevealGroup>
        </div>
      </section>

      <section className="bg-white">
        <RevealGroup className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-5 py-16 sm:px-6 lg:px-8">
          <RevealItem>
            <h2 className="max-w-3xl text-3xl font-bold leading-tight text-accwise-navy sm:text-5xl">
              Ready to discuss {service.shortLabel.toLowerCase()} support?
            </h2>
          </RevealItem>
          <RevealItem>
            <p className="max-w-2xl text-base leading-7 text-accwise-charcoal/75 sm:text-lg sm:leading-8">
              Share the main concern, deadline and best contact details. ACCWISE
              can then respond through the phone or email routes listed on this
              site.
            </p>
          </RevealItem>
          <RevealItem>
            <div className="flex flex-col gap-4 sm:flex-row">
              <CtaLink href="/contact#callback-form">
                Request a callback
              </CtaLink>
              <CtaLink href="/services" variant="secondary">
                View all services
              </CtaLink>
            </div>
          </RevealItem>
        </RevealGroup>
      </section>
    </>
  );
}
