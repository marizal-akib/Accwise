export const contactDetails = {
  landline: "020 88 54 80 80",
  mobile: "077 29 202 909",
  email: "info@accwise.co.uk",
  domain: "www.accwise.co.uk",
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const footerServiceLine =
  "Self-Assessment | Bookkeeping | Payroll | VAT | Advisory";

export const serviceAreas = [
  {
    slug: "self-assessment-tax-return",
    shortLabel: "Self-Assessment",
    title: "Self-Assessment Tax Return",
    description:
      "Support preparing self-assessment tax return information and next steps.",
  },
  {
    slug: "payroll-management",
    shortLabel: "Payroll",
    title: "Payroll Management",
    description:
      "Payroll process support for employers and teams that need organised records.",
  },
  {
    slug: "corporation-tax",
    shortLabel: "Corporation Tax",
    title: "Corporation Tax",
    description:
      "Corporation tax enquiry support for companies and directors.",
  },
  {
    slug: "cis",
    shortLabel: "CIS",
    title: "CIS",
    description:
      "Construction Industry Scheme record and tax enquiry support.",
  },
  {
    slug: "vat",
    shortLabel: "VAT",
    title: "VAT",
    description:
      "VAT record keeping and return enquiry support for VAT-registered businesses.",
  },
  {
    slug: "bookkeeping",
    shortLabel: "Bookkeeping",
    title: "Bookkeeping",
    description:
      "Bookkeeping support to keep financial records organised and easier to understand.",
  },
  {
    slug: "sole-trader-account",
    shortLabel: "Sole Trader",
    title: "Sole Trader Account",
    description:
      "Accountancy support for sole traders and self-employed clients.",
  },
  {
    slug: "partnership-account",
    shortLabel: "Partnership",
    title: "Partnership Account",
    description:
      "Accountancy support for partnership records and filing requirements.",
  },
  {
    slug: "limited-company-account",
    shortLabel: "Limited Company",
    title: "Limited Company Account",
    description:
      "Accounts support for limited companies and owner-managed businesses.",
  },
  {
    slug: "charity-account",
    shortLabel: "Charity",
    title: "Charity Account",
    description:
      "Accountancy enquiry route for charities and not-for-profit records.",
  },
  {
    slug: "company-formation",
    shortLabel: "Company Formation",
    title: "Company Formation",
    description:
      "Company formation enquiry support for new limited company setup.",
  },
  {
    slug: "confirmation-statement",
    shortLabel: "Confirmation Statement",
    title: "Confirmation Statement",
    description:
      "Confirmation statement enquiry support for company filing responsibilities.",
  },
  {
    slug: "hmrc-investigations-and-enquiries",
    shortLabel: "HMRC Enquiries",
    title: "HMRC Investigations and Enquiries",
    description:
      "A clear route to discuss HMRC investigation and enquiry concerns.",
  },
  {
    slug: "business-advisory",
    shortLabel: "Business Advisory",
    title: "Business Advisory",
    description:
      "Practical business advisory conversations around accounting and financial next steps.",
  },
  {
    slug: "benefit-advice",
    shortLabel: "Benefit Advice",
    title: "Benefit Advice",
    description:
      "Benefit advice enquiry route where support is available and appropriate.",
  },
];

export const serviceNavLinks = serviceAreas.map((service) => ({
  href: `/services#${service.slug}`,
  label: service.shortLabel,
  title: service.title,
}));

export const mobileServiceLinks = serviceNavLinks;

export const commitments = [
  "Self-employed & companies accepted",
  "Remote & on site working available",
  "Fixed and/or variable pricing structures",
  "Trusted, confidential & professional",
];

export const audienceGroups = [
  "Self-employed clients",
  "Limited companies",
  "Sole traders",
  "Partnerships",
  "Charities",
  "CIS contractors",
  "VAT-registered businesses",
  "Growing companies",
];

export const faqItems = [
  {
    question: "How does the callback work?",
    answer:
      "Send your details and ACCWISE can respond through the provisional phone or email routes listed on this site.",
  },
  {
    question: "What is the Free Accounting Health Check?",
    answer:
      "It is a first conversation to understand your accountancy, tax, payroll, VAT, CIS, bookkeeping, or HMRC enquiry concern before any next step is agreed.",
  },
  {
    question: "Can ACCWISE help with self-assessment tax returns?",
    answer:
      "Self-Assessment Tax Return is listed on the business card as a service area. Final launch wording still needs client approval.",
  },
  {
    question: "Can ACCWISE support payroll management?",
    answer:
      "Payroll Management is listed on the business card as a service area for enquiry routing.",
  },
  {
    question: "Can ACCWISE help with corporation tax, VAT, and CIS?",
    answer:
      "Corporation Tax, VAT, and CIS are listed on the business card and should be presented as practical enquiry routes until the exact scope is confirmed.",
  },
  {
    question: "Can ACCWISE help with bookkeeping and accounts?",
    answer:
      "Bookkeeping, sole trader accounts, partnership accounts, limited company accounts, and charity accounts are listed on the business card.",
  },
  {
    question: "Can ACCWISE help with company formation and confirmation statements?",
    answer:
      "Company Formation and Confirmation Statement support are listed on the business card as service areas.",
  },
  {
    question: "Can ACCWISE help with HMRC investigations and enquiries?",
    answer:
      "HMRC Investigations and Enquiries is listed on the business card. Visitors should be directed to request a callback with their main concern.",
  },
  {
    question: "Does ACCWISE offer remote or on-site support?",
    answer:
      "The business card states remote and on site working is available, with fixed and/or variable pricing structures.",
  },
  {
    question: "What should I prepare before a consultation?",
    answer:
      "Bring your main concern, business type, current accounting setup, relevant deadlines, and the best contact details for a reply.",
  },
];
