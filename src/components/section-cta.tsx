import { CtaArrow } from "@/components/cta-arrow";
import { CtaLink } from "@/components/cta-link";
import { copy } from "@/lib/copy";

export function SectionCta({
  eventLabel,
  className = "",
}: {
  eventLabel: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <CtaLink href="#strategy-session" eventLabel={eventLabel} className="btn-primary">
        {copy.hero.secondaryCta}
        <CtaArrow />
      </CtaLink>
    </div>
  );
}
