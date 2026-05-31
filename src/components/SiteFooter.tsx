import Image from "next/image";
import Link from "next/link";
import { AnimatedWaveDivider } from "@/components/AnimatedWaveDivider";
import { contactDetails, footerServiceLine, navLinks } from "@/lib/site-data";

export function SiteFooter() {
  return (
    <footer className="relative z-10 bg-white text-accwise-charcoal">
      <AnimatedWaveDivider className="-translate-y-full" position="top" variant="white" />
      <div className="text-accwise-charcoal">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-12 sm:px-6 lg:grid-cols-[1.2fr_0.7fr_0.7fr] lg:px-8">
          <div>
            <Image
              alt="ACCWISE Accountants"
              className="h-auto w-64 max-w-full"
              height={72}
              src="/assets/brand/accwise-logo.svg"
              width={320}
            />
            <p className="mt-5 max-w-md text-sm leading-7 text-accwise-charcoal/72">
              Practical accountancy, bookkeeping, payroll, VAT and advisory
              support for self-employed clients, companies and organisations.
            </p>
            <p className="mt-5 font-mono text-sm tracking-wide text-accwise-blue">
              {footerServiceLine}
            </p>
          </div>
          <nav aria-label="Footer navigation">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-accwise-blue/72">
              Pages
            </h2>
            <ul className="mt-4 grid gap-3 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    className="text-accwise-charcoal/72 transition hover:text-accwise-green"
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  className="text-accwise-charcoal/72 transition hover:text-accwise-green"
                  href="/free-consultation"
                >
                  Free Accounting Health Check
                </Link>
              </li>
            </ul>
          </nav>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-accwise-blue/72">
              Contact
            </h2>
            <div className="mt-4 grid gap-3 text-sm text-accwise-charcoal/72">
              <a
                className="hover:text-accwise-green"
                href={`tel:${contactDetails.landline.replaceAll(" ", "")}`}
              >
                {contactDetails.landline}
              </a>
              <a
                className="hover:text-accwise-green"
                href={`tel:${contactDetails.mobile.replaceAll(" ", "")}`}
              >
                {contactDetails.mobile}
              </a>
              <a
                className="hover:text-accwise-green"
                href={`mailto:${contactDetails.email}`}
              >
                {contactDetails.email}
              </a>
              <span>{contactDetails.domain}</span>
            </div>
            <p className="mt-5 text-xs leading-6 text-accwise-charcoal/52">
              Contact details and legal footer wording are pending final client
              confirmation.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
