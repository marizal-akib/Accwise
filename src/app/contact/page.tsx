import type { Metadata } from "next";
import {
  CalendarCheck,
  Globe2,
  Mail,
  PhoneCall,
  Smartphone,
} from "lucide-react";
import { AnimatedWaveDivider } from "@/components/AnimatedWaveDivider";
import { LeadForm } from "@/components/LeadForm";
import { LiquidButtonLink } from "@/components/ui/liquid-glass-button";
import { contactDetails } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact ACCWISE Accountants or request a callback using the temporary email enquiry flow.",
};

const contactHeroImage =
  "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=2200&q=80";

const consultationImage =
  "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80";

const contactRoutes = [
  {
    title: "Call the office",
    label: contactDetails.landline,
    href: `tel:${contactDetails.landline.replaceAll(" ", "")}`,
    icon: PhoneCall,
    note: "Provisional landline from the current ACCWISE source material.",
  },
  {
    title: "Mobile callback",
    label: contactDetails.mobile,
    href: `tel:${contactDetails.mobile.replaceAll(" ", "")}`,
    icon: Smartphone,
    note: "Useful for urgent callback requests and quick first conversations.",
  },
  {
    title: "Email ACCWISE",
    label: contactDetails.email,
    href: `mailto:${contactDetails.email}`,
    icon: Mail,
    note: "Send enquiry details directly while the final form backend is pending.",
  },
  {
    title: "Website",
    label: contactDetails.domain,
    href: `https://${contactDetails.domain}`,
    icon: Globe2,
    note: "Public domain shown from the current business-card material.",
  },
];

export default function ContactPage() {
  return (
    <>
      <section
        className="relative flex min-h-[590px] items-center justify-center overflow-hidden bg-accwise-navy bg-cover bg-center px-5 pb-28 pt-32 text-center text-white sm:min-h-[640px] sm:px-6 lg:px-8"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(22,37,66,0.88), rgba(76,157,225,0.36), rgba(22,37,66,0.72)), url(${contactHeroImage})`,
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(100,183,59,0.22),transparent_30%)]" />
        <div className="relative mx-auto max-w-4xl">
          <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/16 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white/78 backdrop-blur">
            <Mail className="size-4" aria-hidden="true" />
            Accounts, tax, payroll and VAT support
          </p>
          <h1 className="mt-7 text-5xl font-bold leading-[1.02] text-white sm:text-6xl lg:text-7xl">
            Contact ACCWISE
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/76 sm:text-xl sm:leading-9">
            Request a callback or use the provisional contact details while the
            final ACCWISE enquiry route is confirmed.
          </p>
        </div>
        <AnimatedWaveDivider variant="white" />
      </section>

      <section className="bg-white">
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 py-20 sm:px-6 lg:grid-cols-[0.86fr_1.14fr] lg:px-8 lg:py-24">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="inline-flex rounded-full bg-accwise-blue/8 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-accwise-blue">
              Let&apos;s work together
            </p>
            <h2 className="mt-5 text-4xl font-bold leading-tight text-accwise-navy sm:text-5xl">
              Speak to ACCWISE about your accounts, tax, payroll or VAT.
            </h2>
            <p className="mt-5 text-lg leading-8 text-accwise-charcoal/72">
              Share your main concern and the best way to respond. The contact
              details below are shown as provisional until the client confirms
              launch wording.
            </p>
            <LiquidButtonLink className="mt-8" href="#callback-form" showArrow>
              Request a callback
            </LiquidButtonLink>
          </div>

          <div className="grid gap-6">
            <article className="grid overflow-hidden rounded-lg bg-white shadow-[0_26px_80px_rgba(22,37,66,0.1)] sm:grid-cols-[0.92fr_1fr]">
              <div
                aria-hidden="true"
                className="min-h-72 bg-cover bg-center sm:min-h-full"
                style={{
                  backgroundImage: `linear-gradient(180deg,rgba(22,37,66,0.08),rgba(22,37,66,0.1)), url(${consultationImage})`,
                }}
              />
              <div className="flex flex-col justify-center p-7 sm:p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accwise-green">
                  Contact details
                </p>
                <h3 className="mt-3 text-2xl font-bold text-accwise-navy">
                  Pending confirmation
                </h3>
                <p className="mt-3 text-sm leading-6 text-accwise-charcoal/68">
                  No office address, map location, professional membership, or
                  review claim is shown until ACCWISE confirms it for launch.
                </p>
              </div>
            </article>

            <div className="grid gap-6 md:grid-cols-2">
              {contactRoutes.map((route) => {
                const Icon = route.icon;

                return (
                  <article
                    className="group rounded-lg bg-white p-7 shadow-[0_24px_70px_rgba(22,37,66,0.09)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_90px_rgba(22,37,66,0.14)]"
                    key={route.title}
                  >
                    <Icon
                      aria-hidden="true"
                      className="size-8 text-accwise-green"
                      strokeWidth={1.8}
                    />
                    <h3 className="mt-5 text-xl font-bold text-accwise-navy">
                      {route.title}
                    </h3>
                    <a
                      className="mt-3 inline-block font-semibold text-accwise-charcoal underline decoration-accwise-charcoal/35 underline-offset-4 transition group-hover:text-accwise-blue"
                      href={route.href}
                    >
                      {route.label}
                    </a>
                    <p className="mt-4 text-sm leading-6 text-accwise-charcoal/66">
                      {route.note}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f3f5f8]" id="callback-form">
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 pt-20 pb-36 sm:px-6 lg:grid-cols-[0.85fr_1fr] lg:px-8 lg:pt-24 lg:pb-40">
          <aside className="rounded-lg bg-white p-8 shadow-[0_24px_80px_rgba(22,37,66,0.08)] sm:p-10">
            <p className="inline-flex items-center gap-2 rounded-full bg-accwise-blue/8 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-accwise-blue">
              <CalendarCheck className="size-4" aria-hidden="true" />
              Ready to help
            </p>
            <h2 className="mt-6 text-4xl font-bold leading-tight text-accwise-navy">
              What happens after you submit?
            </h2>
            <p className="mt-5 text-lg leading-8 text-accwise-charcoal/72">
              Your email app opens with the enquiry details. Send the email,
              then ACCWISE can respond through the confirmed contact route.
            </p>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <div>
                <p className="text-sm text-accwise-charcoal/58">
                  Call directly?
                </p>
                <a
                  className="mt-1 block font-bold text-accwise-navy"
                  href={`tel:${contactDetails.landline.replaceAll(" ", "")}`}
                >
                  {contactDetails.landline}
                </a>
              </div>
              <div>
                <p className="text-sm text-accwise-charcoal/58">
                  Need email support?
                </p>
                <a
                  className="mt-1 block font-bold text-accwise-navy"
                  href={`mailto:${contactDetails.email}`}
                >
                  {contactDetails.email}
                </a>
              </div>
            </div>
          </aside>

          <div>
            <h2 className="text-4xl font-bold leading-tight text-accwise-navy sm:text-5xl">
              Looking for accountancy help?
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-accwise-charcoal/70">
              Use the temporary callback form for your details and main concern.
              Nothing is stored or sent to a third-party service.
            </p>
            <div className="mt-10">
              <LeadForm
                source="callback"
                submitLabel="Request a callback"
                variant="minimal"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
