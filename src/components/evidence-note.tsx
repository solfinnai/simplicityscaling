import { copy } from "@/lib/copy";
import { SITE } from "@/lib/site";

export function EvidenceNote() {
  return (
    <section className="border-t border-neutral-200">
      <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="text-2xl tracking-tight sm:text-3xl">
          {copy.evidence.heading}
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed font-medium text-neutral-600">
          {copy.evidence.body}
        </p>
        <p className="mt-4">
          <a
            href={SITE.caseStudyPath}
            className="text-sm font-bold text-accent underline-offset-4 hover:underline"
          >
            {copy.evidence.link}
          </a>
        </p>
      </div>
    </section>
  );
}
