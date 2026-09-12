import Image from "next/image";

import { CtaArrow } from "@/components/cta-arrow";
import { CtaLink } from "@/components/cta-link";
import { copy } from "@/lib/copy";

const spanClass = {
  wide: "sm:col-span-8",
  square: "sm:col-span-4",
  third: "sm:col-span-4",
} as const;

export function ProductionFloor() {
  return (
    <section
      id="production"
      className="border-t border-neutral-800 bg-[#0c1033] text-white"
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
        <p className="eyebrow !border-white/15 !bg-white/10 !text-white/80">
          {copy.production.eyebrow}
        </p>
        <h2 className="mt-5 max-w-3xl text-3xl tracking-tight text-white sm:text-4xl">
          {copy.production.heading}
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed font-medium text-white/70 sm:text-lg">
          {copy.production.intro}
        </p>

        <ul className="mt-12 grid gap-3 sm:grid-cols-12">
          {copy.production.stills.map((still) => (
            <li
              key={still.src}
              className={`group relative overflow-hidden rounded-2xl bg-black/40 ${spanClass[still.span]}`}
            >
              <div
                className="relative"
                style={{ aspectRatio: `${still.width} / ${still.height}` }}
              >
                <Image
                  src={still.src}
                  alt={still.alt}
                  width={still.width}
                  height={still.height}
                  sizes={
                    still.span === "wide"
                      ? "(min-width: 640px) 66vw, 100vw"
                      : "(min-width: 640px) 33vw, 100vw"
                  }
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <p className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-4 pb-3 pt-10 text-sm font-medium text-white">
                {still.caption}
              </p>
            </li>
          ))}
        </ul>

        <p className="mt-4 text-xs tracking-wide text-white/45">
          {copy.production.note}
        </p>
        <CtaLink
          href="#strategy-session"
          eventLabel="production_book"
          className="btn-primary mt-8 !bg-white !text-neutral-950 hover:!bg-neutral-100"
        >
          {copy.hero.secondaryCta}
          <CtaArrow />
        </CtaLink>
      </div>
    </section>
  );
}
