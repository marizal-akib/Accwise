import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import test from "node:test";

const root = process.cwd();

function read(relativePath) {
  return readFileSync(path.join(root, relativePath), "utf8");
}

function readTextTree(relativePath) {
  const start = path.join(root, relativePath);
  const chunks = [];

  function walk(filePath) {
    const stat = statSync(filePath);

    if (stat.isDirectory()) {
      for (const entry of readdirSync(filePath)) {
        walk(path.join(filePath, entry));
      }
      return;
    }

    if (/\.(css|mjs|ts|tsx|svg)$/.test(filePath)) {
      chunks.push(readFileSync(filePath, "utf8"));
    }
  }

  walk(start);
  return chunks.join("\n");
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

test("phase 1 required routes exist", () => {
  [
    "src/app/page.tsx",
    "src/app/services/page.tsx",
    "src/app/services/[slug]/page.tsx",
    "src/app/about/page.tsx",
    "src/app/faqs/page.tsx",
    "src/app/contact/page.tsx",
    "src/app/free-consultation/page.tsx",
  ].forEach((routePath) => {
    assert.equal(existsSync(path.join(root, routePath)), true, `${routePath} is missing`);
  });
});

test("ACCWISE official PNG brand assets replace provisional draft assets", () => {
  [
    "public/assets/brand/accwise-logo.png",
    "public/assets/brand/accwise-logo-mark.png",
  ].forEach((assetPath) => {
    assert.equal(existsSync(path.join(root, assetPath)), true, `${assetPath} is missing`);
  });

  [
    "public/assets/brand/accwise-logo.svg",
    "public/assets/brand/accwise-logo-mark.svg",
    "public/assets/brand/accwise-logo-hero.svg",
    "public/assets/brand/accwise-logo-horizontal.png",
  ].forEach((assetPath) => {
    assert.equal(existsSync(path.join(root, assetPath)), false, `${assetPath} should be removed`);
  });

  const source = readTextTree("src");
  const globals = read("src/app/globals.css");

  [
    "/assets/brand/accwise-logo.png",
    "#4c9de1",
    "#3d8aea",
    "#64b73b",
    "#5ca535",
  ].forEach((brandValue) => {
    assert.match(`${source}\n${globals}`.toLowerCase(), new RegExp(escapeRegExp(brandValue)));
  });

  [
    "accwise-logo.svg",
    "accwise-logo-mark.svg",
    "accwise-logo-hero.svg",
    "accwise-logo-horizontal.png",
    "#214b70",
    "#2f6f35",
    "#72b84b",
    "rgba(33,75,112",
    "rgba(47,111,53",
    "draft rebuilt",
    "pending official",
  ].forEach((draftValue) => {
    assert.doesNotMatch(`${source}\n${globals}`.toLowerCase(), new RegExp(escapeRegExp(draftValue)));
  });
});

test("global layout uses ACCWISE metadata and shared chrome", () => {
  const layout = read("src/app/layout.tsx");
  const header = read("src/components/SiteHeader.tsx");

  assert.match(layout, /ACCWISE Accountants/);
  assert.match(layout, /<SiteHeader \/>/);
  assert.match(layout, /<SiteFooter \/>/);
  assert.match(header, /Request a callback/);
  assert.doesNotMatch(layout, /Create Next App/);
});

test("home page replaces the scaffold with ACCWISE copy", () => {
  const page = read("src/app/page.tsx");

  assert.match(page, /Accounting Built Around Modern Businesses/);
  assert.match(page, /Free Accounting Health Check/);
  assert.match(page, /<FeatureCards \/>/);
  assert.doesNotMatch(page, /To get started, edit the page\.tsx file/);
  assert.doesNotMatch(page, /Deploy Now/);
});

test("home feature cards use final copy and old-style Lucide animated accent icons", () => {
  const featureCards = read("src/components/FeatureCards.tsx");
  const animationHook = read("src/components/ui/lucide-icon-drawer.tsx");
  const globals = read("src/app/globals.css");
  const packageJson = read("package.json");

  [
    "Reduce Tax Stress",
    "We help you understand what you owe, what you can claim, and what needs to be submitted before deadlines.",
    "Stay HMRC Ready",
    "Accounts, payroll, VAT, and MTD support designed to keep your records clean and compliant.",
    "Speak to an Accountant",
    "Use the free consultation form and get clear guidance without wasting time searching online.",
    "TaxStressIcon",
    "HmrcReadyIcon",
    "AccountantIcon",
    "Calculator",
    "PoundSterling",
    "Shield",
    "Check",
    "CalendarDays",
    "PhoneCall",
    "accwise-icon-static",
    "accwise-icon-accent",
    "data-accwise-icon-motion",
  ].forEach((copy) => {
    assert.match(featureCards, new RegExp(copy.replaceAll("?", "\\?")));
  });

  assert.match(animationHook, /prefers-reduced-motion: reduce/);
  assert.match(animationHook, /IntersectionObserver/);
  assert.match(animationHook, /startAnimation/);
  assert.match(animationHook, /\[data-accwise-icon-motion\] path/);
  assert.match(animationHook, /svgElements\.length === 0/);
  assert.match(animationHook, /svg\.createDrawable/);
  assert.doesNotMatch(animationHook, /svg path, svg circle, svg polyline, svg line, svg rect/);
  assert.match(globals, /@keyframes accwise-icon-accent-float/);
  assert.match(globals, /@keyframes accwise-icon-accent-pulse/);
  assert.match(packageJson, /"animejs"/);
});

test("home page includes the Crafto-inspired section sequence", () => {
  const page = read("src/app/page.tsx");

  [
    "ACCOUNTS • TAX • PAYROLL • BUSINESS SUPPORT",
    "Accounts • Tax Returns • VAT • Payroll • CIS • MTD",
    "Where Financial Precision Meets Personal Service",
    "Understanding your accountancy service routes.",
    "WHO WE HELP",
    "Accounting support for the businesses and individuals we work with",
    "Common reasons to contact ACCWISE",
    "faqFeatureItems",
    "Ready for clearer accounts and tax support?",
  ].forEach((copy) => {
    assert.match(page, new RegExp(copy.replaceAll("?", "\\?")));
  });

  assert.match(page, /<AnimatedWaveDivider variant="white" \/>/);
  assert.doesNotMatch(page, /<AnimatedWaveDivider className="h-20" variant="white" \/>/);
  assert.doesNotMatch(page, /for visitors who want practical next steps/);
});

test("site data includes accountancy card services and commitments", () => {
  const siteData = read("src/lib/site-data.ts");

  [
    "Self-Assessment Tax Return",
    "Payroll Management",
    "Corporation Tax",
    "CIS",
    "VAT",
    "Bookkeeping",
    "Sole Trader Account",
    "Partnership Account",
    "Limited Company Account",
    "Charity Account",
    "Company Formation",
    "Confirmation Statement",
    "HMRC Investigations and Enquiries",
    "Business Advisory",
      "Benefit Advice",
    "Self-employed & companies accepted",
    "Remote & on site working available",
    "Fixed and/or variable pricing structures",
    "Trusted, confidential & professional",
    "discussionPoints",
    "recordsToPrepare",
    "firstConversationSteps",
    "callbackCopy",
  ].forEach((copy) => {
    assert.match(siteData, new RegExp(copy.replaceAll("&", "\\&")));
  });
});

test("minimal shadcn gallery carousel files and dependencies exist", () => {
  [
    "src/components/AboutSupportBars.tsx",
    "src/components/AnimatedWaveDivider.tsx",
    "src/components/ui/button.tsx",
    "src/components/ui/carousel.tsx",
    "src/components/ui/card.tsx",
    "src/components/ui/gallery6.tsx",
    "src/components/ui/icon-set.tsx",
    "src/components/ui/lucide-icon-drawer.tsx",
    "src/components/ui/testimonial-slider.tsx",
    "src/lib/utils.ts",
  ].forEach((filePath) => {
    assert.equal(existsSync(path.join(root, filePath)), true, `${filePath} is missing`);
  });

  const packageJson = read("package.json");
  [
    "lucide-react",
    "@radix-ui/react-slot",
    "class-variance-authority",
    "embla-carousel-react",
    "framer-motion",
    "animejs",
    "clsx",
    "tailwind-merge",
  ].forEach((dependency) => {
    assert.match(packageJson, new RegExp(`"${dependency}"`));
  });

  const homePage = read("src/app/page.tsx");

  assert.match(homePage, /<Gallery6/);
  assert.match(homePage, /<TestimonialSlider/);
});

test("homepage client situations section is factual and animated", () => {
  const page = read("src/app/page.tsx");
  const slider = read("src/components/ui/testimonial-slider.tsx");

  [
    "clientSituations",
    "Common reasons to contact ACCWISE",
    "Common enquiry routes",
    "Choose the route closest to your situation, then request a callback so ACCWISE can talk through records, deadlines and next steps.",
    "Self-assessment support",
    "Limited company support",
    "Payroll support",
    "VAT and MTD support",
    "Business support",
    "Discuss with ACCWISE",
  ].forEach((copy) => {
    assert.match(page, new RegExp(copy.replaceAll("?", "\\?")));
  });

  assert.doesNotMatch(page, /without presenting unverified reviews/);
  assert.doesNotMatch(page, /case-study claims/);

  [
    "TestimonialSlider",
    "framer-motion",
    "ChevronLeft",
    "ChevronRight",
    "Quote",
    "prefers-reduced-motion",
    "CLIENT SITUATION",
    "client-situation-slider",
    "text-base font-semibold leading-7",
    "sm:text-lg sm:leading-8",
  ].forEach((copy) => {
    assert.match(slider, new RegExp(copy.replaceAll("-", "\\-")));
  });

  [
    "mockTestimonials",
    "Mock testimonial layout",
    "Sample feedback only",
    "Replace with approved client reviews before launch.",
    "SAMPLE TESTIMONIAL",
    "Safe proof pattern",
    "Service routes without fake case studies",
    "Route {index + 1}",
    "Guy Hawkins",
    "Karla Lynn",
    "Jane Cooper",
    "Robert Chen",
    "Sarah Miller",
    "@guyhawkins",
    "Highly recommend",
    "exceeded my expectations",
  ].forEach((unsafeCopy) => {
    assert.doesNotMatch(`${page}\n${slider}`, new RegExp(unsafeCopy.replaceAll("?", "\\?")));
  });
});

test("homepage shared chrome avoids hard section separator borders", () => {
  const footer = read("src/components/SiteFooter.tsx");
  const header = read("src/components/SiteHeader.tsx");
  const homePage = read("src/app/page.tsx");
  const faqFeature = read("src/components/ui/accordion-feature-section.tsx");

  assert.doesNotMatch(footer, /border-t border-accwise-border/);
  assert.doesNotMatch(header, /border-b border-accwise-border/);
  assert.doesNotMatch(header, /border-b border-transparent/);
  assert.doesNotMatch(homePage, /gap-px/);
  assert.doesNotMatch(homePage, /border border-accwise-border/);
  assert.doesNotMatch(faqFeature, /border border-accwise-border/);
  assert.match(faqFeature, /border-b-0 px-5/);
  assert.match(faqFeature, /faqVisualInViewOptions/);
  assert.match(faqFeature, /amount: 0\.52/);
  assert.match(faqFeature, /margin: "0px 0px -18% 0px"/);
  assert.match(faqFeature, /useInView\(visualRef, faqVisualInViewOptions\)/);
  assert.doesNotMatch(faqFeature, /blur\(/);
  assert.doesNotMatch(faqFeature, /blur-sm/);
  assert.match(faqFeature, /AccwiseMetalMark/);
});

test("brand polish uses darker hero overlays and removes public draft wording", () => {
  const homePage = read("src/app/page.tsx");
  const pageHero = read("src/components/PageHero.tsx");
  const contactPage = read("src/app/contact/page.tsx");
  const header = read("src/components/SiteHeader.tsx");
  const iconGrid = read("src/components/ui/icon-set.tsx");
  const publicSource = readTextTree("src");

  [
    "rgba(22,37,66,0.94)",
    "rgba(22,37,66,0.78)",
    "rgba(22,37,66,0.62)",
    "rgba(76,157,225,0.14)",
    "rgba(100,183,59,0.12)",
  ].forEach((brandValue) => {
    assert.match(`${homePage}\n${pageHero}\n${contactPage}`, new RegExp(escapeRegExp(brandValue)));
  });

  [
    "rgba(76,157,225,0.42)",
    "rgba(76,157,225,0.36)",
    "rgba(22,37,66,0.25)",
    "rgba(100,183,59,0.28)",
    "rgba(100,183,59,0.26)",
    "rgba(100,183,59,0.22)",
  ].forEach((oldValue) => {
    assert.doesNotMatch(`${homePage}\n${pageHero}\n${contactPage}`, new RegExp(escapeRegExp(oldValue)));
  });

  assert.match(header, /bg-white\/88/);
  assert.match(header, /min-h-\[4\.5rem\]/);
  assert.match(header, /sm:min-h-24/);
  assert.match(header, /h-14 w-auto sm:h-20 lg:h-\[5\.5rem\]/);
  assert.match(header, /top-\[4\.5rem\]/);
  assert.match(header, /min-h-\[calc\(100vh-4\.5rem\)\]/);
  assert.match(iconGrid, /hover:bg-accwise-blue/);
  assert.doesNotMatch(iconGrid, /#1558c8/);

  [
    "Sample feedback only",
    "Mock testimonial layout",
    "SAMPLE TESTIMONIAL",
    "provisional contact",
    "pending client approval",
    "launch wording",
    "production launch",
  ].forEach((draftPhrase) => {
    assert.doesNotMatch(publicSource, new RegExp(escapeRegExp(draftPhrase), "i"));
  });
});

test("mobile homepage hero keeps content but uses compact mobile rhythm", () => {
  const homePage = read("src/app/page.tsx");

  assert.match(homePage, /min-h-\[100svh\]/);
  assert.match(homePage, /sm:min-h-screen/);
  assert.match(homePage, /pb-20 pt-24/);
  assert.match(homePage, /sm:pb-28 sm:pt-32/);
  assert.match(homePage, /px-3 py-1\.5/);
  assert.match(homePage, /text-\[0\.68rem\]/);
  assert.match(homePage, /tracking-\[0\.14em\]/);
  assert.match(homePage, /sm:px-4 sm:py-2 sm:text-xs/);
  assert.match(homePage, /text-\[2\.6rem\]/);
  assert.match(homePage, /sm:text-6xl/);
  assert.match(homePage, /lg:text-7xl/);
  assert.match(homePage, /text-base leading-7/);
  assert.match(homePage, /sm:text-xl sm:leading-9/);
  assert.match(homePage, /text-\[0\.72rem\]/);
  assert.match(homePage, /tracking-\[0\.13em\]/);
  assert.match(homePage, /sm:text-sm sm:tracking-\[0\.18em\]/);
  assert.match(homePage, /Accounts • Tax Returns • VAT • Payroll • CIS • MTD/);
  assert.doesNotMatch(homePage, /hidden sm:block[^"]*Accounts • Tax Returns/);
  assert.doesNotMatch(homePage, /sm:hidden[^"]*Accounts • Tax Returns/);
});

test("FAQ callback visual uses a live metallic SVG mark", () => {
  const page = read("src/app/page.tsx");
  const faqFeature = read("src/components/ui/accordion-feature-section.tsx");
  const metalMark = read("src/components/ui/accwise-metal-mark.tsx");

  assert.match(faqFeature, /import \{ AccwiseMetalMark \}/);
  assert.match(faqFeature, /<AccwiseMetalMark/);
  assert.match(faqFeature, /max-w-\[340px\]/);
  assert.match(faqFeature, /md:max-w-\[440px\]/);
  assert.match(faqFeature, /w-\[90%\]/);
  assert.match(faqFeature, /visualRevealVariants: Variants/);
  assert.match(faqFeature, /glowRevealVariants: Variants/);
  assert.match(faqFeature, /opacity: 1/);
  assert.match(faqFeature, /scale: 1/);
  assert.match(faqFeature, /scale: 0\.985/);
  assert.match(faqFeature, /y: 72/);
  assert.match(faqFeature, /duration: 1\.45/);
  assert.match(faqFeature, /ease: \[0\.5, 1, 0\.5, 1\]/);
  assert.match(faqFeature, /opacity: 0\.08/);
  assert.match(faqFeature, /scale: 0\.94/);
  assert.match(faqFeature, /y: 36/);
  assert.match(faqFeature, /delay: 0\.08/);
  assert.match(faqFeature, /duration: 1\.25/);
  assert.match(faqFeature, /transform-gpu/);
  assert.match(faqFeature, /will-change-transform/);
  assert.match(faqFeature, /amount: 0\.52/);
  assert.match(faqFeature, /margin: "0px 0px -18% 0px"/);
  assert.match(faqFeature, /useInView\(visualRef, faqVisualInViewOptions\)/);
  assert.doesNotMatch(faqFeature, /amount: 0\.22/);
  assert.doesNotMatch(faqFeature, /y: \[280, 190, 105, 42, 0\]/);
  assert.doesNotMatch(faqFeature, /duration: 2\.6/);
  assert.doesNotMatch(faqFeature, /times: \[0, 0\.25, 0\.55, 0\.82, 1\]/);
  assert.doesNotMatch(faqFeature, /blur-sm/);
  assert.match(faqFeature, /useReducedMotion/);
  assert.doesNotMatch(faqFeature, /next\/image/);
  assert.doesNotMatch(faqFeature, /accwise-logo-mark\.png/);
  assert.doesNotMatch(page, /image: "\/assets\/brand\/accwise-logo-mark\.png"/);

  assert.match(metalMark, /role="img"/);
  assert.match(metalMark, /aria-label="ACCWISE Accountants logo mark"/);
  assert.match(metalMark, /officialMarkSrc = "\/assets\/brand\/accwise-logo-mark\.png"/);
  assert.match(metalMark, /accwise-metal-ring/);
  assert.match(metalMark, /accwise-metal-aw/);
  assert.match(metalMark, /accwise-metal-light-sweep/);
  assert.match(metalMark, /perspective: "900px"/);
  assert.match(metalMark, /transform-gpu will-change-transform/);
  assert.match(metalMark, /rotateX: shouldAnimateMetal \? \[0, 6, 0, -6, 0\] : 0/);
  assert.match(metalMark, /rotateY: shouldAnimateMetal \? \[0, -14, 0, 14, 0\] : 0/);
  assert.doesNotMatch(metalMark, /<motion\.svg/);
  assert.doesNotMatch(metalMark, /<motion\.g/);
  assert.doesNotMatch(metalMark, /<motion\.rect/);
  assert.doesNotMatch(metalMark, /scaleX: shouldAnimateMetal/);
  assert.doesNotMatch(metalMark, /scaleY: shouldAnimateMetal/);
  assert.doesNotMatch(metalMark, /x: shouldAnimateMetal \? \[0, -1\.5/);
  assert.doesNotMatch(metalMark, /y: shouldAnimateMetal \? \[0, 1\.5/);
  assert.match(metalMark, /duration: 6\.8/);
  assert.match(metalMark, /duration: 3\.6/);
});

test("homepage polish uses adapted ACCWISE badge, centered service cards, and white footer", () => {
  const page = read("src/app/page.tsx");
  const badge = read("src/components/ui/award-badge.tsx");
  const gallery = read("src/components/ui/gallery6.tsx");
  const footer = read("src/components/SiteFooter.tsx");
  const globals = read("src/app/globals.css");
  const practicalVisual = read("src/components/PracticalVisual.tsx");

  assert.match(page, /<AwardBadge label="Practical approach" \/>/);
  assert.match(practicalVisual, /Trusted, confidential and professional accountancy support/);
  assert.match(page, /<PracticalVisual imageUrl={aboutImage} \/>/);
  assert.match(badge, /Practical approach/);
  assert.doesNotMatch(badge, /Product Hunt|Golden Kitty|product-of-the-day/i);
  assert.match(gallery, /md:basis-\[316px\] md:max-w-\[316px\]/);
  assert.match(gallery, /whileInView=\{shouldReduceMotion \? undefined : "visible"\}/);
  assert.match(gallery, /viewport=\{\{ once: true, amount: 0\.18 \}\}/);
  assert.match(gallery, /variants=\{shouldReduceMotion \? undefined : revealItemVariants\}/);
  assert.match(gallery, /items-center p-6 text-center/);
  assert.match(gallery, /justify-center text-sm font-semibold/);
  assert.match(practicalVisual, /useInView\(root, \{ amount: 0\.25, once: true \}\)/);
  assert.match(practicalVisual, /const canReveal = isLoaded && \(isInView \|\| shouldReduceMotion\)/);
  assert.match(footer, /bg-white text-accwise-charcoal/);
  assert.doesNotMatch(footer, /-mt-24/);
  assert.doesNotMatch(footer, /pt-24/);
  assert.doesNotMatch(footer, /<div className="bg-white text-accwise-charcoal">/);
  assert.match(footer, /w-56 max-w-full/);
  assert.match(globals, /@keyframes accwise-skeleton-shimmer/);
});

test("homepage about section keeps visual card and uses two animated brand bars", () => {
  const page = read("src/app/page.tsx");
  const aboutBars = read("src/components/AboutSupportBars.tsx");
  const practicalVisual = read("src/components/PracticalVisual.tsx");

  assert.match(page, /<AboutSupportBars \/>/);
  assert.match(page, /<PracticalVisual imageUrl=\{aboutImage\} \/>/);
  assert.match(aboutBars, /CLARITY/);
  assert.match(aboutBars, /COMPLIANCE/);
  assert.match(aboutBars, /#4C9DE1/);
  assert.match(aboutBars, /#64B73B/);
  assert.match(aboutBars, /useInView\(root, \{ amount: 0\.35, once: true \}\)/);
  assert.match(aboutBars, /useReducedMotion/);
  assert.match(aboutBars, /width: isFilled \? bar\.targetWidth : "0%"/);
  assert.match(aboutBars, /initial=\{shouldReduceMotion \? false : \{ width: "0%" \}\}/);
  assert.match(aboutBars, /delay: index \* 0\.18/);
  assert.match(aboutBars, /rounded-l-full/);
  assert.match(aboutBars, /rounded-r-none/);
  assert.match(aboutBars, /bg-transparent/);
  assert.match(aboutBars, /maskImage/);
  assert.match(aboutBars, /transparent 100%/);
  assert.match(aboutBars, /rgba\(76,157,225,0\)/);
  assert.match(aboutBars, /rgba\(100,183,59,0\)/);
  assert.doesNotMatch(page, /commitments\.map/);
  assert.doesNotMatch(page, /Accounts, Tax & VAT/);
  assert.doesNotMatch(page, /Self-assessment, company accounts, VAT and bookkeeping support\./);
  assert.doesNotMatch(page, /Payroll, CIS & MTD/);
  assert.doesNotMatch(page, /Payroll, contractor records, CIS returns and digital accounting support\./);
  assert.doesNotMatch(page, /Self-employed & companies accepted/);
  assert.doesNotMatch(page, /Remote & on site working available/);
  assert.doesNotMatch(page, /Fixed and\/or variable pricing structures/);
  assert.doesNotMatch(page, /Trusted, confidential & professional/);
  assert.doesNotMatch(aboutBars, /Accounts, Tax|Self-assessment|Payroll, CIS|contractor records/);
  assert.doesNotMatch(aboutBars, />\s*\d+%\s*</);
  assert.doesNotMatch(aboutBars, /percentage|percent/i);
  assert.doesNotMatch(aboutBars, /scaleX/);
  assert.match(practicalVisual, /Trusted, confidential and professional accountancy support/);
  assert.match(practicalVisual, /src="\/assets\/brand\/accwise-logo\.png"/);
});

test("mobile menu keeps services inside the Services dropdown and hides FAQ navigation", () => {
  const header = read("src/components/SiteHeader.tsx");
  const siteData = read("src/lib/site-data.ts");

  assert.match(header, /mobileServicesOpen/);
  assert.match(header, /mobile-services-menu/);
  assert.match(header, /className="flex-1 py-4 text-2xl font-semibold/);
  assert.match(header, /href=\{link\.href\}/);
  assert.match(header, /aria-label=\{mobileServicesOpen \? "Collapse services links" : "Expand services links"\}/);
  assert.doesNotMatch(header, /<p className="text-sm font-semibold uppercase tracking-\[0\.18em\] text-white\/50">\n                Services/);
  assert.doesNotMatch(siteData, /href: "\/faqs", label: "FAQs"/);
});

test("homepage replaces the template audience grid with the ACCWISE who we help icon grid", () => {
  const page = read("src/app/page.tsx");
  const iconGrid = read("src/components/ui/icon-set.tsx");
  const packageJson = read("package.json");

  [
    "WHO WE HELP",
    "Accounting support for the businesses and individuals we work with",
    "ACCWISE supports a range of clients including sole traders,",
    "Sole Traders",
    "Limited Companies",
    "Landlords & Property",
    "Startups & Small Businesses",
    "Contractors & CIS",
    "Individuals & Self-Assessment",
    "Employers & Payroll",
    "Making Tax Digital",
  ].forEach((copy) => {
    assert.match(page, new RegExp(copy.replaceAll("&", "\\&")));
  });

  [
    "UserRoundCheck",
    "Building2",
    "KeyRound",
    "Rocket",
    "HardHat",
    "Calculator",
    "UsersRound",
    "CloudCog",
  ].forEach((copy) => {
    assert.match(iconGrid, new RegExp(copy));
  });

  assert.match(page, /<IconGrid className="mt-14" items={whoWeHelpItems} \/>/);
  assert.match(iconGrid, /from "framer-motion"/);
  assert.match(iconGrid, /grid-cols-2 md:grid-cols-4/);
  assert.match(iconGrid, /hover:bg-accwise-blue/);
  assert.doesNotMatch(iconGrid, /#1558c8/);
  assert.match(iconGrid, /staggerChildren: 0\.08/);
  assert.match(iconGrid, /whileInView=\{shouldReduceMotion \? undefined : "visible"\}/);
  assert.match(iconGrid, /viewport=\{\{ once: true, amount: 0\.25 \}\}/);
  assert.doesNotMatch(iconGrid, /animate=\{shouldReduceMotion \? undefined : "visible"\}/);
  assert.match(packageJson, /"framer-motion"/);
  assert.doesNotMatch(page, /Audience grid/);
  assert.doesNotMatch(page, /Dark-section rhythm adapted from Crafto/);
});

test("animated wave dividers define motion and reduced-motion fallback", () => {
  const component = read("src/components/AnimatedWaveDivider.tsx");
  const globals = read("src/app/globals.css");

  assert.match(component, /craftoWaveStill/);
  assert.match(component, /accwise-wave-motion/);
  assert.match(component, /accwise-wave-static/);
  assert.match(component, /position\?: "top" \| "bottom"/);
  assert.match(component, /positionClasses/);
  assert.match(component, /top: "top-0"/);
  assert.doesNotMatch(component, /top: "top-\[-1px\]/);
  assert.doesNotMatch(component, /top: "top-0 rotate-180"/);
  assert.match(component, /attributeName="d"/);
  assert.match(component, /dur="3.2s"/);
  assert.match(component, /variant\?: "navy" \| "white"/);
  assert.match(globals, /prefers-reduced-motion: reduce/);
  assert.match(globals, /\.accwise-wave-motion \{\n    display: none !important;/);
  assert.match(globals, /\.accwise-wave-static \{\n    display: block !important;/);
});

test("shared footer owns the animated top wave on every route", () => {
  const footer = read("src/components/SiteFooter.tsx");
  const homePage = read("src/app/page.tsx");
  const aboutPage = read("src/app/about/page.tsx");
  const servicesPage = read("src/app/services/page.tsx");
  const contactPage = read("src/app/contact/page.tsx");
  const faqsPage = read("src/app/faqs/page.tsx");
  const freeConsultationPage = read("src/app/free-consultation/page.tsx");

  assert.match(footer, /import \{ AnimatedWaveDivider \}/);
  assert.match(footer, /<AnimatedWaveDivider className="-translate-y-full" position="top" variant="white" \/>/);
  assert.match(footer, /bg-white text-accwise-charcoal/);
  assert.doesNotMatch(footer, /-mt-24/);
  assert.doesNotMatch(footer, /pt-24/);
  [homePage, aboutPage, servicesPage, contactPage, faqsPage, freeConsultationPage].forEach((page) => {
    assert.doesNotMatch(page, /className="h-20" variant="white"/);
  });
});

test("final page sections reserve footer wave clearance", () => {
  const homePage = read("src/app/page.tsx");
  const aboutPage = read("src/app/about/page.tsx");
  const servicesPage = read("src/app/services/page.tsx");
  const contactPage = read("src/app/contact/page.tsx");
  const faqsPage = read("src/app/faqs/page.tsx");
  const freeConsultationPage = read("src/app/free-consultation/page.tsx");

  assert.match(homePage, /pt-20 pb-36/);
  assert.match(aboutPage, /pt-14 pb-36/);
  assert.match(servicesPage, /pt-20 pb-36/);
  assert.match(contactPage, /pt-20 pb-36/);
  assert.match(contactPage, /lg:pt-24 lg:pb-40/);
  assert.match(faqsPage, /pt-16 pb-36/);
  assert.match(freeConsultationPage, /pt-16 pb-36/);
});

test("minimal contact form avoids hard separator underlines", () => {
  const leadForm = read("src/components/LeadForm.tsx");
  const header = read("src/components/SiteHeader.tsx");

  assert.match(leadForm, /bg-white\/76/);
  assert.match(leadForm, /resize-none/);
  assert.doesNotMatch(leadForm, /border-b border-accwise-navy\/24/);
  assert.doesNotMatch(leadForm, /resize-y/);
  assert.doesNotMatch(header, /shadow-sm/);
});
test("lead forms use mailto and do not create a backend", () => {
  const contactForm = read("src/components/LeadForm.tsx");

  assert.match(contactForm, /mailto:info@accwise\.co\.uk/);
  assert.match(contactForm, /window\.location\.href/);
  assert.doesNotMatch(contactForm, /fetch\(/);
});

test("contact page follows the Crafto-inspired safe contact structure", () => {
  const contactPage = read("src/app/contact/page.tsx");
  const leadForm = read("src/components/LeadForm.tsx");
  const header = read("src/components/SiteHeader.tsx");

  [
    "Contact ACCWISE",
    "Speak to ACCWISE about your accounts, tax, payroll or VAT.",
    "Focused contact routes",
    "without adding unverified address, map,",
    "Looking for accountancy help?",
    "variant=\"minimal\"",
    "id=\"callback-form\"",
  ].forEach((copy) => {
    assert.match(contactPage, new RegExp(copy.replaceAll("?", "\\?")));
  });

  assert.match(contactPage, /<AnimatedWaveDivider variant="white" \/>/);
  assert.match(contactPage, /contactRoutes/);
  assert.doesNotMatch(contactPage, /PageHero/);
  assert.match(leadForm, /variant\?: "boxed" \| "minimal"/);
  assert.match(leadForm, /variant = "boxed"/);
  assert.match(leadForm, /variant === "minimal"/);
  ["/", "/about", "/contact"].forEach((route) => {
    assert.match(header, new RegExp(`pathname === "${route.replace("/", "\\/")}"`));
  });
  assert.match(header, /pathname\.startsWith\("\/services"\)/);
});

test("contact and services use restrained premium reveal motion", () => {
  const revealMotion = read("src/components/ui/reveal-motion.tsx");
  const contactPage = read("src/app/contact/page.tsx");
  const servicesPage = read("src/app/services/page.tsx");
  const pageHero = read("src/components/PageHero.tsx");
  const leadForm = read("src/components/LeadForm.tsx");

  [
    "\"use client\"",
    "framer-motion",
    "HeroContentReveal",
    "RevealGroup",
    "RevealItem",
    "useInView",
    "useReducedMotion",
    "staggerChildren",
    "y: 28",
    "duration: 0.85",
    "data-accwise-reveal-group",
    "data-accwise-reveal-item",
  ].forEach((copy) => {
    assert.match(revealMotion, new RegExp(escapeRegExp(copy)));
  });

  assert.match(contactPage, /import \{ HeroContentReveal, RevealGroup, RevealItem \}/);
  assert.match(contactPage, /<HeroContentReveal>/);
  assert.match(contactPage, /href="#callback-form"/);
  assert.match(contactPage, /href=\{`mailto:\$\{contactDetails\.email\}`\}/);
  assert.match(contactPage, /<RevealGroup/);
  assert.match(contactPage, /<RevealItem/);
  assert.match(contactPage, /via-white\/55/);
  assert.match(contactPage, /group-hover:left-\[120%\]/);

  assert.match(pageHero, /animated\?: boolean/);
  assert.match(pageHero, /animated = true/);
  assert.match(pageHero, /<HeroContentReveal>/);
  assert.match(servicesPage, /import \{ RevealGroup, RevealItem \}/);
  assert.match(servicesPage, /<RevealGroup/);
  assert.match(servicesPage, /<RevealItem/);
  assert.match(servicesPage, /group-hover:scale-\[1\.04\]/);
  assert.match(servicesPage, /via-white\/60/);

  assert.match(leadForm, /mailto:info@accwise\.co\.uk/);
  assert.doesNotMatch(leadForm, /fetch\(/);
  assert.doesNotMatch(contactPage, /fetch\(/);
  assert.doesNotMatch(servicesPage, /fetch\(/);
});

test("callback CTAs route directly to the callback form", () => {
  const callbackScroller = read("src/components/CallbackFormScrollHandler.tsx");
  const header = read("src/components/SiteHeader.tsx");
  const homePage = read("src/app/page.tsx");
  const aboutPage = read("src/app/about/page.tsx");
  const servicesPage = read("src/app/services/page.tsx");
  const contactPage = read("src/app/contact/page.tsx");

  [
    header,
    homePage,
    aboutPage,
    servicesPage,
  ].forEach((source) => {
    assert.match(source, /href="\/contact#callback-form"/);
  });

  assert.match(contactPage, /<CallbackFormScrollHandler \/>/);
  assert.match(contactPage, /href="#callback-form"/);
  assert.match(callbackScroller, /usePathname/);
  assert.match(callbackScroller, /scrollIntoView/);
  assert.match(callbackScroller, /#callback-form/);
  assert.match(callbackScroller, /\/contact#callback-form/);
});

test("header exposes Crafto-style services dropdown and shared service anchors", () => {
  const header = read("src/components/SiteHeader.tsx");
  const siteData = read("src/lib/site-data.ts");

  assert.match(siteData, /slug: "self-assessment-tax-return"/);
  assert.match(siteData, /serviceNavLinks/);
  assert.match(siteData, /href: `\/services\/\$\{service\.slug\}`/);
  assert.doesNotMatch(siteData, /href: `\/services#\$\{service\.slug\}`/);
  assert.match(header, /ServicesDropdown/);
  assert.match(header, /group\/services/);
  assert.match(header, /href="\/services"/);
  assert.match(header, /Open services menu/);
  assert.match(header, /href=\{service\.href\}/);
  assert.match(header, /mobileServiceLinks\.map/);
});

test("about and services use Crafto-style inner hero and wave divider", () => {
  const pageHero = read("src/components/PageHero.tsx");
  const aboutPage = read("src/app/about/page.tsx");
  const servicesPage = read("src/app/services/page.tsx");

  assert.match(pageHero, /variant\?: "simple" \| "image"/);
  assert.match(pageHero, /backgroundImage/);
  assert.match(pageHero, /<AnimatedWaveDivider variant="white" \/>/);
  assert.match(aboutPage, /eyebrow="Practical accountancy support"/);
  assert.match(servicesPage, /eyebrow="World class accountancy services"/);
  assert.match(aboutPage, /variant="image"/);
  assert.match(servicesPage, /variant="image"/);
});

test("services page uses stable service card anchors without the homepage carousel", () => {
  const servicesPage = read("src/app/services/page.tsx");
  const revealMotion = read("src/components/ui/reveal-motion.tsx");

  assert.match(servicesPage, /service\.slug/);
  assert.match(servicesPage, /id=\{service\.slug\}/);
  assert.match(servicesPage, /href=\{`\/services\/\$\{service\.slug\}`\}/);
  assert.match(servicesPage, /Learn more/);
  assert.doesNotMatch(servicesPage, /Ask about this service/);
  assert.match(servicesPage, /Accounting service routes/);
  assert.match(servicesPage, /Need help choosing the right accounting support\?/);
  assert.match(servicesPage, /fallbackVisible/);
  assert.match(revealMotion, /fallbackVisible\?: boolean/);
  assert.match(revealMotion, /fallbackDelayMs\?: number/);
  assert.match(revealMotion, /setFallbackVisible\(true\)/);
  assert.ok(
    servicesPage.indexOf("serviceAreas.map") < servicesPage.indexOf("commitments.map"),
    "commitments should render after service cards",
  );
  assert.doesNotMatch(servicesPage, /<Gallery6/);
});

test("service detail pages are statically generated with safe service content", () => {
  const serviceDetailPage = read("src/app/services/[slug]/page.tsx");
  const siteData = read("src/lib/site-data.ts");

  [
    "generateStaticParams",
    "generateMetadata",
    "notFound()",
    "PageHero",
    "discussionPoints",
    "recordsToPrepare",
    "firstConversationSteps",
    "Request a callback",
    "/contact#callback-form",
    "/services/self-assessment-tax-return",
    "/services/payroll-management",
    "/services/vat",
  ].forEach((copy) => {
    assert.match(`${serviceDetailPage}\n${siteData}`, new RegExp(escapeRegExp(copy)));
  });

  assert.match(serviceDetailPage, /params: Promise<\{ slug: string \}>/);
  assert.match(serviceDetailPage, /serviceAreas\.map\(\(service\) => \(\{ slug: service\.slug \}\)\)/);
  assert.doesNotMatch(serviceDetailPage, /fetch\(/);
});

test("about page follows the Crafto-inspired image, process, and safety structure", () => {
  const aboutPage = read("src/app/about/page.tsx");

  assert.match(aboutPage, /aboutHeroImage/);
  assert.match(aboutPage, /approachImage/);
  assert.match(aboutPage, /processCards/);
  assert.match(aboutPage, /How ACCWISE keeps the first conversation practical/);
  assert.match(aboutPage, /Clear service boundaries/);
  assert.doesNotMatch(aboutPage, /PageHero\\s*\\n\\s*description/);
});

test("inner page refresh does not introduce unsafe claims or copied Crafto assets", () => {
  const aboutPage = read("src/app/about/page.tsx");
  const servicesPage = read("src/app/services/page.tsx");
  const header = read("src/components/SiteHeader.tsx");
  const combined = `${aboutPage}\n${servicesPage}\n${header}`;

  [
    /testimonial/i,
    /award[- ]winning/i,
    /years? working experience/i,
    /professional membership/i,
    /demo-it-business/i,
    /themezaa/i,
    /crafto services/i,
    /about crafto/i,
  ].forEach((unsafePattern) => {
    assert.doesNotMatch(combined, unsafePattern);
  });
});
