import Image from "next/image";

import { copy } from "@/lib/copy";
import { SITE } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-neutral-950 text-neutral-300">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-80"
      >
        <div
          className="absolute bottom-[10%] left-[15%] h-48 w-96 rounded-full opacity-35 blur-3xl"
          style={{ background: "#2190DC" }}
        />
        <div
          className="absolute right-[15%] bottom-[10%] h-48 w-96 rounded-full opacity-25 blur-3xl"
          style={{ background: "#d4621a" }}
        />
      </div>
      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-12 sm:px-6">
        <Image
          src="https://simplicitymedia.com/images/simplicity-logo.webp"
          alt="Simplicity Media"
          width={200}
          height={37}
          className="h-8 w-auto brightness-0 invert"
        />
        <p className="max-w-xl font-accent text-lg font-bold text-white">
          A Simplicity Media operating system
        </p>
        <div className="flex flex-col gap-2 text-sm text-neutral-400">
          <p>
            {SITE.address}
            <br />
            {SITE.cityLine}
          </p>
          <p>
            <a className="hover:text-white" href={SITE.phoneHref}>
              {SITE.phoneDisplay}
            </a>
            {" · "}
            <a className="hover:text-white" href={`mailto:${SITE.email}`}>
              {SITE.email}
            </a>
          </p>
          <p className="flex flex-wrap gap-x-4 gap-y-2">
            <a href={SITE.caseStudyPath} className="hover:text-white">
              {copy.footer.caseStudy}
            </a>
            <a href="#strategy-session" className="hover:text-white">
              {copy.footer.book}
            </a>
            <a href="/privacy" className="hover:text-white">
              Privacy
            </a>
          </p>
        </div>
        <p className="max-w-3xl text-xs leading-relaxed text-neutral-500">
          {copy.footer.copyright}
        </p>
      </div>
      <div
        className="relative z-10 overflow-hidden"
        style={{ height: "clamp(56px, 10vw, 140px)" }}
        aria-hidden
      >
        <p
          className="select-none text-center font-accent font-bold whitespace-nowrap text-white"
          style={{
            fontSize: "clamp(60px, 14vw, 220px)",
            lineHeight: 1,
            letterSpacing: "-0.02em",
            opacity: 0.08,
          }}
        >
          simplicity
        </p>
      </div>
    </footer>
  );
}
