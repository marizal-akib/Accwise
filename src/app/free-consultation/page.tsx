import type { Metadata } from "next";
import { LeadForm } from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "Free Accounting Health Check",
  description:
    "Start a free accounting health check enquiry with ACCWISE Accountants through the email form.",
};

export default function FreeConsultationPage() {
  return (
    <section className="bg-accwise-offwhite/55">
      <div className="mx-auto grid min-h-[calc(100vh-5rem)] w-full max-w-6xl items-center gap-10 px-5 pt-16 pb-36 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accwise-green">
            QR destination
          </p>
          <h1 className="mt-4 text-4xl font-bold leading-tight text-accwise-navy sm:text-6xl">
            Free Accounting Health Check
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-accwise-charcoal/78">
            Share your details and main concern so ACCWISE can understand what
            kind of accounting, tax, payroll or records support you want to
            discuss.
          </p>
          <p className="mt-5 text-sm leading-6 text-accwise-charcoal/65">
            Details are used to respond to the enquiry. No third-party CRM,
            payment provider or marketing platform is connected through this
            form.
          </p>
        </div>
        <LeadForm
          source="health-check"
          submitLabel="Start Free Accounting Health Check"
        />
      </div>
    </section>
  );
}
