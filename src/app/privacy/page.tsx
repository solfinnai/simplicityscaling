import type { Metadata } from "next";

import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy | Simplicity Media",
  description:
    "How Simplicity Media collects and uses information submitted on simplicityscaling.com.",
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
      <p className="eyebrow">Privacy</p>
      <h1 className="mt-5 text-4xl tracking-tight">
        How we handle information on this site
      </h1>
      <div className="mt-8 space-y-6 text-base leading-relaxed text-neutral-600">
        <p>
          This page covers forms on simplicityscaling.com, an owned-domain
          acquisition site operated by Simplicity Media in {SITE.location}.
        </p>
        <h2 className="text-2xl tracking-tight text-ink">What we collect</h2>
        <p>
          The scorecard form collects work email, first name, company, and
          category. The strategy session form collects full name, work email,
          company, role, category, monthly purchased media, primary channels,
          what you need the next media dollar to fix, and how you heard about
          this page. Both forms also store hidden campaign parameters (UTMs and
          common click IDs) when they are present in the URL.
        </p>
        <h2 className="text-2xl tracking-tight text-ink">Why we collect it</h2>
        <p>
          Scorecard requests help us send the System scorecard and understand
          category fit. Strategy session requests go to Simplicity sales (James
          Fink / business development) so a senior operator can review the
          request and respond within one business day.
        </p>
        <h2 className="text-2xl tracking-tight text-ink">Who receives it</h2>
        <p>
          Submissions are processed by Simplicity Media and, when configured, by
          HubSpot as our CRM. If HubSpot keys are not configured, submissions
          are stored through the documented fallback (Formspree or a local mock
          log) so the form still validates and captures every field.
        </p>
        <h2 className="text-2xl tracking-tight text-ink">Marketing use</h2>
        <p>
          Strategy session (hard) submissions are not enrolled in an automated
          marketing drip. Scorecard (soft) submissions may be used to deliver
          the requested page and related follow-up. We do not sell this
          information.
        </p>
        <h2 className="text-2xl tracking-tight text-ink">Spam protection</h2>
        <p>
          Forms include a honeypot field. Cloudflare Turnstile may run when
          site and secret keys are configured.
        </p>
        <h2 className="text-2xl tracking-tight text-ink">Contact</h2>
        <p>
          Questions:{" "}
          <a className="text-accent underline-offset-4 hover:underline" href={`mailto:${SITE.email}`}>
            {SITE.email}
          </a>
          {" or "}
          <a className="text-accent underline-offset-4 hover:underline" href={SITE.phoneHref}>
            {SITE.phoneDisplay}
          </a>
          .
        </p>
      </div>
    </article>
  );
}
