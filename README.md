# ACCWISE Accountants Website

Next.js website build for ACCWISE Accountants.

## Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS 4
- shadcn-compatible local UI primitives
- Framer Motion, Anime.js, Lucide icons

## Routes

- `/` - homepage
- `/services` - service routes and anchors
- `/about` - firm approach and provisional launch-safety copy
- `/contact` - callback enquiry form
- `/faqs` - FAQ accordion
- `/free-consultation` - QR landing page for the Free Accounting Health Check

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Checks

```bash
npm run test:site
npm run lint
npm run build
```

## Content Safety Notes

- ACCWISE business-card details are used as provisional source material.
- Do not add unconfirmed qualifications, regulatory memberships, awards, addresses, review counts, guarantees, or real testimonials unless approved by the client.
- Homepage testimonials are currently mock/sample placeholders and are visibly labelled for replacement before launch.
- Crafto was used only as a structure and rhythm reference; do not copy Crafto assets, code, copy, testimonials, or exact identity.

## Assets

Public web assets used by the app live under `public/assets/`.

Raw collected source assets and Brain-Vault planning notes are intentionally kept outside this website repo.
