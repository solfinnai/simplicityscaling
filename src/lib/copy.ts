import { SITE } from "@/lib/site";

/** Approved LP copy v1. Typographic structure only. Do not rewrite. */
export const copy = {
  browser: {
    title: SITE.title,
    meta: SITE.description,
  },
  nav: {
    book: "Book session",
    caseStudy: "Optima case study",
  },
  hero: {
    eyebrow: "The System Behind the Scale",
    h1: "A small radio test became a national system.",
    paragraphs: [
      "In 2012, Simplicity began working with Optima Tax Relief on a radio program in the low thousands per week. Calls came in. The team learned what prospects asked and where demand showed up. By 2015, Inc. reported 26,006% three-year revenue growth for Optima’s ranking period, No. 3 overall on the Inc. 500 and No. 1 in Financial Services. Optima returned to the Inc. list for six more consecutive years (2015–2021).",
      "Optima built the service organization. Simplicity helped build and scale the media and brand system that generated demand.",
    ],
    thesis: "The number is the evidence. The system is the story.",
    primaryCta: "See if this system fits your category",
    secondaryCta: "Book a strategy session",
    caseStudy: `${SITE.caseStudyLabel} →`,
  },
  proofChips: [
    { id: "C01", label: "Inc. 26,006% (2015 period)" },
    { id: "C02", label: "Inc. 500 No. 3 / No. 1 Financial Services (2015)" },
    { id: "C03", label: "Inc. list seven consecutive years 2015–2021" },
  ],
  fourMoves: {
    heading: "Four moves. One accountable loop.",
    intro:
      "The Optima work reads as a feedback loop: prove response, build recognition, read demand, then improve the next buy. Budget scales from that loop. Channel count alone does not.",
    items: [
      {
        n: "01",
        title: "Prove response",
        body: "Start narrow enough to diagnose. The test must produce calls, appointments, enrollments, or orders you trust.",
      },
      {
        n: "02",
        title: "Build recognition",
        body: "In high-need, low-trust categories, creative earns credibility while it asks for action.",
      },
      {
        n: "03",
        title: "Read demand",
        body: "Inquiries, questions, markets, creatives, branded search, landing behavior, and call quality in one picture.",
      },
      {
        n: "04",
        title: "Improve the next buy",
        body: "Send revenue economics back into allocation. Expand capacity with growth.",
      },
    ],
  },
  categories: {
    heading: "Same operating clarity. Different response event.",
    panels: [
      {
        id: "finance-legal",
        title: "Finance and legal",
        response:
          "Qualified call → enrollment, application, or signed case.",
        engagement:
          "Bounded TV / CTV / audio response test, approved creative, eligibility or process pages, source-to-outcome tracking in states you can serve.",
      },
      {
        id: "local",
        title: "Local consultations",
        response:
          "Call or form → booked consultation → completed, paid job or treatment.",
        engagement:
          "One-market launch or expansion with demonstration creative, service-area pages, cost-per-appointment reporting.",
      },
      {
        id: "products",
        title: "Products and memberships",
        response:
          "Exposure → landing behavior → paid customer or enrollment (repeat / contribution where finance shares it).",
        engagement:
          "CTV / audio demonstrations, landing variants, holdout or incrementality on one acquisition cohort.",
      },
    ],
  },
  offer: {
    heading: "A bounded test with senior operators",
    body: "We design and run a defined test: one market or one product line, creative and media matched to your response event, landing and tracking that keep source context, and a readout finance and sales can argue with.",
    floor:
      "For companies already spending, or ready to spend, on the order of $100,000+ per month in purchased media.",
    bullets: [
      "TV, CTV, radio, podcast, digital audio where they fit",
      "Creative for trust-sensitive and demonstration-heavy categories",
      "Landing pages and search capture on the same promise as the spot",
      "Call / appointment / enrollment / order measurement into the next buy",
      "Handoff into Simplicity sales for scope and pricing",
    ],
  },
  soft: {
    heading: "Get the System scorecard",
    body: "One page: the four moves, response-event checklist by category, evidence required before scale.",
    submit: "Get the System scorecard",
  },
  hard: {
    heading: "Book a strategy session",
    body: "Tell us the category, spend band, and what broke in the last ninety days. A senior operator reviews it. Qualified sessions route to Simplicity sales.",
    submit: "Request my strategy session",
    microcopy:
      "We respond within one business day. No automated drip from this form.",
  },
  evidence: {
    heading: "How we treat evidence",
    body: "Inc. rankings and growth rates are independent public record for the years named. Campaign history from 2012 is an agency record. Optima built the operation; Simplicity helped build and scale demand.",
    link: "Full Optima case study on simplicitymedia.com",
  },
  footer: {
    line: `A Simplicity Media operating system · ${SITE.location} · ${SITE.phoneDisplay} · ${SITE.email}`,
    copyright:
      "© 2026 Simplicity Media. Optima Tax Relief is a client. Rankings and growth figures attributed to Inc. as stated. No Optima revenue figures are published on this site.",
    caseStudy: "Optima case study (main site)",
    book: "Book a session",
  },
} as const;
