import { BoundedTest } from "@/components/bounded-test";
import { CategoryPanels } from "@/components/category-panels";
import { EvidenceNote } from "@/components/evidence-note";
import { HardForm } from "@/components/forms/hard-form";
import { SoftForm } from "@/components/forms/soft-form";
import { FourMoves } from "@/components/four-moves";
import { Hero } from "@/components/hero";
import { OptimaRecord } from "@/components/optima-record";
import { ProductionFloor } from "@/components/production-floor";
import { StickyCta } from "@/components/sticky-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FourMoves />
      <ProductionFloor />
      <BoundedTest />
      <HardForm />
      <SoftForm />
      <CategoryPanels />
      <OptimaRecord />
      <EvidenceNote />
      <StickyCta />
    </>
  );
}
