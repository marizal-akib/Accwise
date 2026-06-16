import { AnimatedWaveDivider } from "@/components/AnimatedWaveDivider";
import { AboutSupportBars } from "@/components/AboutSupportBars";
import { CtaLink } from "@/components/CtaLink";
import { FeatureCards } from "@/components/FeatureCards";
import { PracticalVisual } from "@/components/PracticalVisual";
import { Feature197 } from "@/components/ui/accordion-feature-section";
import { AwardBadge } from "@/components/ui/award-badge";
import { Gallery6, type GalleryItem } from "@/components/ui/gallery6";
import { IconGrid, type IconGridItem } from "@/components/ui/icon-set";
import TestimonialSlider, {
  type Testimonial,
} from "@/components/ui/testimonial-slider";
import { faqItems, serviceAreas } from "@/lib/site-data";

const heroImage =
  "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=2200&q=80";

const aboutImage =
  "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80";

const serviceImages = [
  "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=80",
];

const serviceGalleryItems: GalleryItem[] = serviceAreas.map((service, index) => ({
  id: `service-${index + 1}`,
  title: service.title,
  summary: service.description,
  url: "/contact",
  image: serviceImages[index % serviceImages.length],
}));

const clientSituations: Testimonial[] = [
  {
    context: "Self-assessment route",
    id: 1,
    name: "Sole trader enquiry",
    quote:
      "A practical route for discussing tax-return deadlines, records, allowable costs, and the next step for filing.",
    status: "Common enquiry route",
  },
  {
    context: "Limited company route",
    id: 2,
    name: "Company director enquiry",
    quote:
      "Support for company accounts, corporation tax, confirmation statements, and clear records for directors.",
    status: "Common enquiry route",
  },
  {
    context: "Payroll route",
    id: 3,
    name: "Employer enquiry",
    quote:
      "A route for discussing payroll management, employee records, payslips, and HMRC payroll obligations.",
    status: "Common enquiry route",
  },
  {
    context: "VAT route",
    id: 4,
    name: "VAT business enquiry",
    quote:
      "Help for VAT registration questions, returns, Making Tax Digital, and keeping VAT records organised.",
    status: "Common enquiry route",
  },
  {
    context: "Business advisory route",
    id: 5,
    name: "Business owner enquiry",
    quote:
      "A practical conversation for understanding business support needs before wider advisory work is agreed.",
    status: "Common enquiry route",
  },
];

const faqFeatureItems = faqItems.slice(0, 5).map((item, index) => ({
  description: item.answer,
  id: index + 1,
  title: item.question,
}));

const whoWeHelpItems: IconGridItem[] = [
  {
    icon: "user-check",
    id: "sole-traders",
    name: "Sole Traders",
  },
  {
    icon: "building",
    id: "limited-companies",
    name: "Limited Companies",
  },
  {
    icon: "key",
    id: "landlords-property",
    name: "Landlords & Property",
  },
  {
    icon: "rocket",
    id: "startups-small-businesses",
    name: "Startups & Small Businesses",
  },
  {
    icon: "hard-hat",
    id: "contractors-cis",
    name: "Contractors & CIS",
  },
  {
    icon: "calculator",
    id: "individuals-self-assessment",
    name: "Individuals & Self-Assessment",
  },
  {
    icon: "users",
    id: "employers-payroll",
    name: "Employers & Payroll",
  },
  {
    icon: "cloud-cog",
    id: "making-tax-digital",
    name: "Making Tax Digital",
  },
];

export default function Home() {
  return (
    <>
      <section
        className="relative min-h-screen overflow-hidden bg-accwise-navy bg-cover bg-center text-white"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(22,37,66,0.94) 0%, rgba(22,37,66,0.78) 48%, rgba(22,37,66,0.62) 100%), linear-gradient(135deg, rgba(76,157,225,0.14) 0%, rgba(100,183,59,0.08) 70%), url(${heroImage})`,
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_24%,rgba(100,183,59,0.12),transparent_28%)]" />
        <div className="relative mx-auto flex min-h-screen w-full max-w-6xl items-center px-5 pb-28 pt-32 sm:px-6 lg:px-8 lg:pt-28">
          <div className="max-w-3xl">
            <p className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/80 backdrop-blur">
              ACCOUNTS • TAX • PAYROLL • BUSINESS SUPPORT
            </p>
            <h1 className="mt-7 max-w-4xl text-5xl font-bold leading-[1.03] text-white sm:text-6xl lg:text-7xl">
              Accounting Built Around Modern Businesses
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-9 text-white/78">
              Practical accounting, tax, payroll, VAT, CIS and company support
              for sole traders, landlords, limited companies and growing
              businesses.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
              <CtaLink
                className="w-full sm:w-auto"
                href="/contact"
                size="lg"
              >
                Request a callback
              </CtaLink>
            </div>
            <p className="mt-5 text-sm font-semibold uppercase tracking-[0.18em] text-white/64">
              Accounts • Tax Returns • VAT • Payroll • CIS • MTD
            </p>
          </div>
        </div>
        <AnimatedWaveDivider variant="white" />
      </section>

      <FeatureCards />

      <section className="bg-white">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-5 py-20 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <PracticalVisual imageUrl={aboutImage} />
          <div>
            <AwardBadge label="Practical approach" />
            <h2 className="mt-5 text-4xl font-bold leading-tight text-accwise-navy sm:text-5xl">
              Where Financial Precision Meets Personal Service
            </h2>
            <p className="mt-5 text-lg leading-8 text-accwise-charcoal/78">
              ACCWISE supports self-employed clients, companies, sole traders,
              partnerships, charities and individuals with accountancy, tax,
              payroll, VAT, CIS, bookkeeping, company filing and advisory
              conversations. The site focuses on practical enquiry routes and
              clear next steps without adding unconfirmed review claims,
              memberships, awards or guarantees.
            </p>
            <AboutSupportBars />
          </div>
        </div>
      </section>

      <section className="bg-[#f3f5f8]">
        <Gallery6
          demoLabel="View all services"
          demoUrl="/services"
          heading="Understanding your accountancy service routes."
          items={serviceGalleryItems}
        />
      </section>

      <section className="bg-accwise-navy text-white">
        <div className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/45">
              WHO WE HELP
            </p>
            <h2 className="mt-5 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Accounting support for the businesses and individuals we work with
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-white/68 sm:text-lg">
              ACCWISE supports a range of clients including sole traders,
              limited companies, landlords, contractors, startups, and
              individuals who need practical help with tax, accounts, payroll
              and compliance.
            </p>
          </div>
          <IconGrid className="mt-14" items={whoWeHelpItems} />
        </div>
      </section>

      <TestimonialSlider
        description="These examples show common reasons visitors contact ACCWISE, without presenting unverified reviews or case-study claims."
        eyebrow="Common enquiry routes"
        heading="Situations ACCWISE can help you discuss"
        testimonials={clientSituations}
      />

      <Feature197 features={faqFeatureItems} />

      <section
        className="relative overflow-hidden bg-accwise-navy bg-cover bg-center text-white"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(22,37,66,0.94), rgba(22,37,66,0.72)), url(${heroImage})`,
        }}
      >
        <div className="mx-auto flex min-h-[420px] w-full max-w-6xl flex-col justify-center px-5 pt-20 pb-36 sm:px-6 lg:px-8">
          <h2 className="max-w-3xl text-4xl font-bold leading-tight sm:text-6xl">
            Ready for clearer accounts and tax support?
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/72">
            Request a callback or send the QR landing page enquiry for the Free
            Accounting Health Check.
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
