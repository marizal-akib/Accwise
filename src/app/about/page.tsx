import type { Metadata } from "next";
import Image from "next/image";
import {
  CheckCircle2,
  ClipboardList,
  FileText,
  PhoneCall,
  Shield,
  UsersRound,
} from "lucide-react";
import { CtaLink } from "@/components/CtaLink";
import { PageHero } from "@/components/PageHero";
import { audienceGroups, commitments } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about ACCWISE Accountants' practical approach to accounting support for self-employed clients, companies, sole traders, partnerships, charities and individuals.",
};

const aboutHeroImage =
  "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=2200&q=80";

const approachImage =
  "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80";

const processCards = [
  {
    title: "Share the concern",
    copy: "Start with the accounting, tax, payroll, VAT, CIS, filing or HMRC enquiry issue that needs attention.",
    icon: PhoneCall,
  },
  {
    title: "Prepare the records",
    copy: "Bring the business type, current records, important deadlines and the best route for a reply.",
    icon: ClipboardList,
  },
  {
    title: "Agree the next step",
    copy: "ACCWISE can respond with a practical accountancy route before any wider work is agreed.",
    icon: CheckCircle2,
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        actions={
          <>
            <CtaLink href="/contact#callback-form" size="lg">
              Request a callback
            </CtaLink>
            <CtaLink href="/services" size="lg" variant="light">
              Explore services
            </CtaLink>
          </>
        }
        description="ACCWISE gives businesses and individuals a direct route to talk through accountancy, tax, payroll, VAT, CIS, bookkeeping, company filing and advisory questions."
        eyebrow="Practical accountancy support"
        image={aboutHeroImage}
        title="Clear, practical accounting support"
        variant="image"
      />

      <section className="bg-white">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-5 py-20 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:py-24">
          <div className="relative min-h-[500px]">
            <div
              className="accwise-photo-reveal absolute left-0 top-8 h-80 w-[78%] rounded-md bg-cover bg-center shadow-[0_30px_80px_rgba(22,37,66,0.16)]"
              style={{
                backgroundImage: `linear-gradient(180deg,rgba(22,37,66,0.03),rgba(22,37,66,0.1)), url(${approachImage})`,
              }}
            />
            <div className="accwise-card-reveal absolute bottom-4 right-0 w-[68%] rounded-md bg-white p-6 shadow-[0_24px_60px_rgba(22,37,66,0.12)]">
              <Image
                alt="ACCWISE Accountants"
                className="h-auto w-full"
                height={1093}
                src="/assets/brand/accwise-logo.png"
                width={1398}
              />
              <div className="mt-6 grid gap-3">
                {commitments.slice(0, 3).map((commitment) => (
                  <div className="flex items-start gap-3" key={commitment}>
                    <CheckCircle2
                      aria-hidden="true"
                      className="mt-0.5 size-5 shrink-0 text-accwise-green"
                      strokeWidth={1.9}
                    />
                    <p className="text-sm font-semibold leading-6 text-accwise-charcoal/75">
                      {commitment}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-accwise-green">
              ACCWISE approach
            </p>
            <h2 className="mt-4 text-4xl font-bold leading-tight text-accwise-navy sm:text-5xl">
              Practical accountancy support for growing businesses.
            </h2>
            <p className="mt-5 text-lg leading-8 text-accwise-charcoal/78">
              ACCWISE is built around enquiry routes for SMEs, self-employed
              clients, sole traders, companies, partnerships, charities, payroll
              teams, VAT/CIS clients and individuals needing accounting or tax
              support.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                ["Clarity", "Make accounting and tax conversations easier to understand."],
                ["Responsiveness", "Give visitors a direct route to request a callback."],
                ["Practical guidance", "Focus on useful next steps rather than generic claims."],
                ["Factual scope", "Keep the page focused on services, enquiry routes and verifiable details."],
              ].map(([title, copy]) => (
                <article
                  className="rounded-lg bg-white p-5 shadow-[0_16px_42px_rgba(22,37,66,0.07)]"
                  key={title}
                >
                  <h3 className="text-lg font-bold text-accwise-navy">
                    {title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-accwise-charcoal/70">
                    {copy}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-accwise-navy text-white">
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 py-20 sm:px-6 lg:grid-cols-[0.86fr_1.14fr] lg:px-8 lg:py-24">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/45">
              Creative process
            </p>
            <h2 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">
              How ACCWISE keeps the first conversation practical
            </h2>
            <p className="mt-5 text-lg leading-8 text-white/68">
              Each conversation starts with the practical accountancy need,
              then moves toward the records, deadlines and next step that matter
              most.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {processCards.map((card, index) => {
              const Icon = card.icon;

              return (
                <article
                  className="rounded-md bg-white/[0.06] p-6 transition duration-300 hover:-translate-y-1 hover:bg-white/[0.1]"
                  key={card.title}
                >
                  <div className="flex size-12 items-center justify-center rounded-full bg-white/10 text-white">
                    <Icon aria-hidden="true" className="size-6" />
                  </div>
                  <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-white/42">
                    Step {index + 1}
                  </p>
                  <h3 className="mt-3 text-xl font-bold">{card.title}</h3>
                  <p className="mt-4 text-sm leading-6 text-white/68">
                    {card.copy}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#f3f5f8]">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-5 py-20 sm:px-6 lg:grid-cols-[1fr_0.8fr] lg:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-accwise-green">
              Who ACCWISE helps
            </p>
            <h2 className="mt-4 text-4xl font-bold leading-tight text-accwise-navy sm:text-5xl">
              Built around real enquiry routes
            </h2>
            <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
              {audienceGroups.map((group) => (
                <div
                  className="rounded-md bg-white p-4 text-sm font-semibold leading-6 text-accwise-charcoal/72 shadow-[0_14px_34px_rgba(22,37,66,0.06)]"
                  key={group}
                >
                  {group}
                </div>
              ))}
            </div>
          </div>
          <aside className="rounded-lg bg-white p-8 shadow-[0_24px_80px_rgba(22,37,66,0.08)]">
            <div className="flex size-12 items-center justify-center rounded-full bg-accwise-blue/8 text-accwise-green">
              <Shield aria-hidden="true" className="size-6" />
            </div>
            <h3 className="mt-6 text-2xl font-bold text-accwise-navy">
              Clear service boundaries
            </h3>
            <p className="mt-4 leading-7 text-accwise-charcoal/72">
              The site stays focused on verified service routes and direct
              enquiry actions. Additional office, regulatory or credential
              details can be added when ACCWISE chooses to publish them.
            </p>
            <ul className="mt-6 grid gap-3 text-sm leading-6 text-accwise-charcoal/75">
              <li className="flex gap-3">
                <FileText
                  aria-hidden="true"
                  className="mt-0.5 size-5 shrink-0 text-accwise-green"
                />
                Official legal or footer company name
              </li>
              <li className="flex gap-3">
                <FileText
                  aria-hidden="true"
                  className="mt-0.5 size-5 shrink-0 text-accwise-green"
                />
                Office address and opening hours if shown
              </li>
              <li className="flex gap-3">
                <Shield
                  aria-hidden="true"
                  className="mt-0.5 size-5 shrink-0 text-accwise-green"
                />
                Regulatory or credential wording
              </li>
              <li className="flex gap-3">
                <UsersRound
                  aria-hidden="true"
                  className="mt-0.5 size-5 shrink-0 text-accwise-green"
                />
                Team, founder, client feedback or review claims
              </li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-5 pt-14 pb-36 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-accwise-green">
              Quick contact
            </p>
            <h2 className="mt-3 text-3xl font-bold text-accwise-navy">
              Ready to speak to ACCWISE?
            </h2>
          </div>
          <CtaLink href="/contact#callback-form">Request a callback</CtaLink>
        </div>
      </section>
    </>
  );
}
