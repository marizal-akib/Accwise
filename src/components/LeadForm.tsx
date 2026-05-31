"use client";

import { useState } from "react";
import { LiquidButton } from "@/components/ui/liquid-glass-button";

type LeadFormProps = {
  source: "callback" | "health-check";
  submitLabel?: string;
  variant?: "boxed" | "minimal";
};

const sourceLabels = {
  callback: "Callback request",
  "health-check": "Free Accounting Health Check request",
};

function getField(formData: FormData, name: string) {
  return String(formData.get(name) ?? "").trim();
}

export function LeadForm({
  source,
  submitLabel = "Send enquiry",
  variant = "boxed",
}: LeadFormProps) {
  const [status, setStatus] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const formData = new FormData(form);
    const name = getField(formData, "name");
    const businessType = getField(formData, "businessType");
    const email = getField(formData, "email");
    const phone = getField(formData, "phone");
    const mainConcern = getField(formData, "mainConcern");

    const subject = `${sourceLabels[source]} from ${name}`;
    const body = [
      sourceLabels[source],
      "",
      `Name: ${name}`,
      `Business type: ${businessType}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      "",
      "Main concern:",
      mainConcern,
      "",
      "Note: This temporary website form opens a prefilled email and does not store enquiry details.",
    ].join("\n");

    const mailto = `mailto:info@accwise.co.uk?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    setStatus("Opening your email app with the enquiry details.");
    window.location.href = mailto;
  }

  const isMinimal = variant === "minimal";
  const inputClass = isMinimal
    ? "mt-3 min-h-12 w-full rounded-md border-0 bg-white/76 px-4 text-base text-accwise-charcoal outline-none transition placeholder:text-accwise-charcoal/45 focus:bg-white focus:ring-4 focus:ring-accwise-green/12"
    : "mt-2 min-h-12 w-full rounded-lg border border-accwise-border bg-white px-4 text-base text-accwise-charcoal outline-none transition placeholder:text-accwise-charcoal/45 focus:border-accwise-blue focus:ring-4 focus:ring-accwise-blue/10";
  const labelClass = isMinimal
    ? "text-xs font-bold uppercase tracking-[0.08em] text-accwise-navy"
    : "text-sm font-semibold text-accwise-navy";

  return (
    <form
      className={
        isMinimal
          ? "grid gap-7"
          : "grid gap-5 rounded-lg border border-accwise-border bg-white p-5 shadow-sm sm:p-6"
      }
      onSubmit={handleSubmit}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className={labelClass}>
          Name
          <input className={inputClass} name="name" required type="text" />
        </label>
        <label className={labelClass}>
          Business Type
          <input
            className={inputClass}
            name="businessType"
            placeholder="Company, sole trader..."
            required
            type="text"
          />
        </label>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className={labelClass}>
          Email
          <input className={inputClass} name="email" required type="email" />
        </label>
        <label className={labelClass}>
          Phone
          <input className={inputClass} name="phone" required type="tel" />
        </label>
      </div>
      <label className={labelClass}>
        Main Concern
        <textarea
          className={`${inputClass} min-h-32 resize-none py-3`}
          name="mainConcern"
          required
        />
      </label>
      <div
        className={
          isMinimal
            ? "grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center"
            : "grid gap-4"
        }
      >
        <p className="text-sm leading-6 text-accwise-charcoal/70">
          These details are used to respond to the enquiry. Final privacy
          wording is pending client approval.
        </p>
        <LiquidButton className="w-full sm:w-fit" showArrow type="submit">
          {submitLabel}
        </LiquidButton>
      </div>
      {status ? (
        <p className="text-sm font-medium text-accwise-green" role="status">
          {status}
        </p>
      ) : null}
    </form>
  );
}
