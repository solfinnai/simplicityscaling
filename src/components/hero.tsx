import { BrandMark } from "@/components/brand-mark";
import { CtaArrow } from "@/components/cta-arrow";
import { CtaLink } from "@/components/cta-link";
import { copy } from "@/lib/copy";
import { SITE } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden lg:block"
        style={{
          background:
            "radial-gradient(ellipse at 70% 40%, rgba(33,144,220,0.12) 0%, rgba(33,144,220,0.06) 30%, rgba(255,136,77,0.04) 50%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <BrandMark
        className="pointer-events-none absolute right-4 bottom-6 h-[130px] w-[120px] opacity-[0.12] lg:right-[8%] lg:bottom-auto lg:top-1/2 lg:h-[min(420px,46vw)] lg:w-[min(390px,42vw)] lg:-translate-y-1/2 lg:opacity-[0.14]"
      />
      <div className="relative mx-auto grid w-full max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.9fr)] lg:py-20">
        <div>
          <p className="eyebrow">{copy.hero.eyebrow}</p>
          <h1 className="mt-6 max-w-3xl text-[2.35rem] leading-[0.98] tracking-tighter text-neutral-950 sm:text-5xl lg:text-[3.65rem]">
            {copy.hero.h1}
          </h1>
          <div className="mt-8 max-w-2xl space-y-5 text-base leading-relaxed font-medium text-neutral-600 sm:text-lg">
            {copy.hero.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
            <p className="font-accent text-xl font-bold tracking-tight text-neutral-950 sm:text-2xl">
              {copy.hero.thesis}
            </p>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <CtaLink
              href="#scorecard"
              eventLabel="hero_primary_scorecard"
              className="btn-primary"
            >
              {copy.hero.primaryCta}
              <CtaArrow />
            </CtaLink>
            <CtaLink
              href="#strategy-session"
              eventLabel="hero_secondary_session"
              className="btn-secondary"
            >
              {copy.hero.secondaryCta}
            </CtaLink>
          </div>
          <p className="mt-5">
            <CtaLink
              href={SITE.caseStudyUrl}
              eventLabel="hero_case_study"
              className="text-sm font-bold text-neutral-600 underline decoration-1 underline-offset-4 hover:text-neutral-950"
            >
              {copy.hero.caseStudy}
            </CtaLink>
          </p>
        </div>
        <aside aria-label="Independent record" className="lg:pt-16">
          <ul className="divide-y divide-neutral-200 border-y border-neutral-200 bg-white/70">
            {copy.proofChips.map((chip) => (
              <li key={chip.id} className="px-1 py-5">
                <p className="font-accent text-[0.7rem] font-bold tracking-[0.16em] text-accent uppercase">
                  {chip.id}
                </p>
                <p className="mt-1 font-accent text-xl font-bold leading-snug tracking-tight text-neutral-950 sm:text-2xl">
                  {chip.label}
                </p>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
