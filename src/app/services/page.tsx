import type { Metadata } from "next";
import { Building2, CheckCircle2, ClipboardCheck, FileSearch } from "lucide-react";
import { CtaLink } from "@/components/CtaLink";
import { PageHero } from "@/components/PageHero";
import { commitments, serviceAreas } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore ACCWISE Accountants service areas including self-assessment, payroll, corporation tax, CIS, VAT, bookkeeping, company filings, HMRC enquiries and advisory support.",
};

const servicesHeroImage =
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=2200&q=80";

const ctaImage =
  "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1800&q=80";

const serviceImages = [
  "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=900&q=80",
];

const serviceRouteHighlights = [
  {
    title: "Business-card source",
    copy: "Every service label is taken from the current ACCWISE card-back source.",
    icon: ClipboardCheck,
  },
  {
    title: "Safe service wording",
    copy: "Descriptions stay neutral until ACCWISE confirms final launch copy.",
    icon: FileSearch,
  },
  {
    title: "Clear enquiry route",
    copy: "Each service card moves the visitor toward a callback rather than a fake case result.",
    icon: Building2,
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        actions={
          <>
            <CtaLink href="/contact" size="lg">
              Request a callback
            </CtaLink>
            <CtaLink href="/free-consultation" size="lg" variant="light">
              Free Accounting Health Check
            </CtaLink>
          </>
        }
        description="Browse the ACCWISE service routes for self-assessment, payroll, corporation tax, CIS, VAT, bookkeeping, company filing, HMRC enquiry and advisory support."
        eyebrow="World class accountancy services"
        image={servicesHeroImage}
        title="Accounting services for modern businesses and individuals"
        variant="image"
      />

      <section className="bg-white">
        <div className="mx-auto grid w-full max-w-6xl gap-4 px-5 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
          {commitments.map((commitment) => (
            <article
              className="rounded-lg bg-white p-5 shadow-[0_16px_42px_rgba(22,37,66,0.07)]"
              key={commitment}
            >
              <CheckCircle2
                aria-hidden="true"
                className="size-6 text-accwise-green"
                strokeWidth={1.9}
              />
              <p className="mt-4 text-sm font-semibold leading-6 text-accwise-navy">
                {commitment}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#f3f5f8]">
        <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-6 lg:px-8 lg:py-24">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-accwise-green">
                Accounting service routes
              </p>
              <h2 className="mt-4 max-w-3xl text-4xl font-bold leading-tight text-accwise-navy sm:text-5xl">
                Choose the accountancy conversation that fits your situation.
              </h2>
            </div>
            <CtaLink href="/contact" variant="secondary">
              Ask about a service
            </CtaLink>
          </div>

          <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {serviceAreas.map((service, index) => (
              <article
                className="group scroll-mt-28 overflow-hidden rounded-md bg-white shadow-[0_24px_60px_rgba(22,37,66,0.09)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_90px_rgba(22,37,66,0.14)]"
                id={service.slug}
                key={service.slug}
              >
                <div className="relative aspect-[1.35] overflow-hidden">
                  <div
                    aria-hidden="true"
                    className="h-full w-full bg-cover bg-center transition duration-500 group-hover:scale-[1.035]"
                    style={{
                      backgroundImage: `linear-gradient(180deg,rgba(22,37,66,0.03),rgba(22,37,66,0.1)), url(${serviceImages[index % serviceImages.length]})`,
                    }}
                  />
                  <p className="absolute right-4 top-4 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-accwise-green shadow-[0_14px_34px_rgba(22,37,66,0.12)]">
                    ACCWISE
                  </p>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold leading-tight text-accwise-navy">
                    {service.title}
                  </h3>
                  <p className="mt-4 min-h-18 text-sm leading-6 text-accwise-charcoal/72">
                    {service.description}
                  </p>
                  <CtaLink
                    className="mt-6 w-full"
                    href="/contact"
                    variant="secondary"
                  >
                    Ask about this service
                  </CtaLink>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-accwise-navy text-white">
        <div className="mx-auto grid w-full max-w-6xl gap-5 px-5 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
          {serviceRouteHighlights.map((item) => {
            const Icon = item.icon;

            return (
              <article
                className="rounded-md bg-white/[0.06] p-6"
                key={item.title}
              >
                <Icon aria-hidden="true" className="size-8 text-white" />
                <h3 className="mt-5 text-xl font-bold">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/68">
                  {item.copy}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section
        className="relative overflow-hidden bg-accwise-navy bg-cover bg-center text-white"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(22,37,66,0.94), rgba(22,37,66,0.72)), url(${ctaImage})`,
        }}
      >
        <div className="mx-auto flex min-h-[420px] w-full max-w-6xl flex-col justify-center px-5 pt-20 pb-36 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/48">
            Quick contact
          </p>
          <h2 className="mt-4 max-w-3xl text-4xl font-bold leading-tight sm:text-6xl">
            Need help choosing the right accounting support?
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/72">
            Request a callback or start with the Free Accounting Health Check.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <CtaLink href="/contact" variant="light">
              Request a callback
            </CtaLink>
            <CtaLink href="/free-consultation" variant="light">
              Free Accounting Health Check
            </CtaLink>
          </div>
        </div>
      </section>
    </>
  );
}
