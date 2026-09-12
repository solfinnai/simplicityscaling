import { CtaArrow } from "@/components/cta-arrow";
import { HeaderBrand } from "@/components/header-brand";
import { copy } from "@/lib/copy";
import { SITE } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 h-[4.5rem] bg-white/90 backdrop-blur-md lg:h-[5.5rem]">
      <div className="border-b border-neutral-200/80">
        <div className="mx-auto flex h-[4.5rem] w-full max-w-[1400px] items-center justify-between gap-4 px-4 sm:px-6 lg:h-[5.5rem]">
          <HeaderBrand />
          <nav aria-label="Primary" className="flex shrink-0 items-center gap-3 sm:gap-5">
            <a
              href={SITE.caseStudyUrl}
              className="font-accent text-sm font-bold tracking-tight text-neutral-800 underline-offset-4 hover:text-accent hover:underline"
            >
              <span className="sm:hidden">Case study</span>
              <span className="hidden sm:inline">{copy.nav.caseStudy}</span>
            </a>
            <a href="#strategy-session" className="btn-primary !min-h-11 px-5 text-sm sm:px-6">
              {copy.nav.book}
              <CtaArrow className="hidden h-4 w-4 sm:block" />
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
