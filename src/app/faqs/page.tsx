import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { faqItems } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "FAQs",
  description:
    "Answers to common pre-contact questions about ACCWISE Accountants callback requests, free accounting health checks and service enquiry routes.",
};

export default function FaqsPage() {
  return (
    <>
      <PageHero
        description="A first set of practical answers for visitors before requesting a callback or starting the free accounting health check."
        title="Frequently asked questions"
      />
      <section className="bg-white">
        <div className="mx-auto w-full max-w-4xl px-5 pt-16 pb-36 sm:px-6 lg:px-8">
          <div className="grid gap-4">
            {faqItems.map((item) => (
              <details
                className="group rounded-lg border border-accwise-border bg-white p-5 shadow-sm"
                key={item.question}
              >
                <summary className="cursor-pointer list-none text-lg font-semibold text-accwise-navy marker:hidden">
                  <span className="inline-flex w-full items-center justify-between gap-4">
                    {item.question}
                    <span
                      aria-hidden="true"
                      className="text-2xl text-accwise-green transition group-open:rotate-45"
                    >
                      +
                    </span>
                  </span>
                </summary>
                <p className="mt-4 leading-7 text-accwise-charcoal/75">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
