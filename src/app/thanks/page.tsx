import type { Metadata } from "next";
import Link from "next/link";

import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Thank you | Simplicity Media",
  description: "We received your request.",
  robots: { index: false, follow: false },
};

type ThanksSearch = {
  type?: string;
};

export default async function ThanksPage({
  searchParams,
}: {
  searchParams: Promise<ThanksSearch>;
}) {
  const { type } = await searchParams;
  const isHard = type === "hard";
  const isSoft = type === "soft";

  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-20 sm:px-6">
      <p className="eyebrow">
        {isHard ? "Strategy session" : isSoft ? "Scorecard" : "Request received"}
      </p>
      <h1 className="mt-5 text-4xl tracking-tight">
        {isHard
          ? "We have your strategy session request."
          : isSoft
            ? "We have your scorecard request."
            : "We have your request."}
      </h1>
      <div className="mt-6 space-y-4 text-base leading-relaxed text-neutral-600">
        {isHard ? (
          <>
            <p>
              A senior operator will review the category, spend band, and what
              you asked the next media dollar to fix. Qualified sessions route
              to Simplicity sales.
            </p>
            <p>We respond within one business day. No automated drip from this form.</p>
          </>
        ) : isSoft ? (
          <p>
            We will send the System scorecard: the four moves, a response-event
            checklist by category, and the evidence required before scale.
          </p>
        ) : (
          <p>
            If you meant to book a session or request the scorecard, return to
            the page and submit the form again.
          </p>
        )}
        <p>
          Direct line:{" "}
          <a className="text-accent underline-offset-4 hover:underline" href={SITE.phoneHref}>
            {SITE.phoneDisplay}
          </a>
          {" · "}
          <a className="text-accent underline-offset-4 hover:underline" href={`mailto:${SITE.email}`}>
            {SITE.email}
          </a>
        </p>
      </div>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        {isHard ? (
          <a href={SITE.phoneHref} className="btn-primary">
            Call {SITE.phoneDisplay}
          </a>
        ) : (
          <Link href="/#strategy-session" className="btn-primary">
            Book a strategy session
          </Link>
        )}
        <Link href={isHard ? "/" : "/#optima-record"} className="btn-secondary">
          {isHard ? "Back to the system" : "Read the Optima record"}
        </Link>
      </div>
    </article>
  );
}
