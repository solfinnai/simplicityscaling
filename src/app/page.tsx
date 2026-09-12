import { BoundedTest } from "@/components/bounded-test";
import { CategoryPanels } from "@/components/category-panels";
import { EvidenceNote } from "@/components/evidence-note";
import { HardForm } from "@/components/forms/hard-form";
import { SoftForm } from "@/components/forms/soft-form";
import { FourMoves } from "@/components/four-moves";
import { Hero } from "@/components/hero";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FourMoves />
      <CategoryPanels />
      <BoundedTest />
      <SoftForm />
      <HardForm />
      <EvidenceNote />
    </>
  );
}
