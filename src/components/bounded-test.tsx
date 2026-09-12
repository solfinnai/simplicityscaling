import { copy } from "@/lib/copy";

export function BoundedTest() {
  return (
    <section className="border-t border-neutral-200 bg-white">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:py-24">
        <div>
          <h2 className="text-3xl tracking-tight sm:text-4xl">
            {copy.offer.heading}
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed font-medium text-neutral-600 sm:text-lg">
            {copy.offer.body}
          </p>
          <p className="mt-6 max-w-xl border-l-2 border-accent pl-4 text-base leading-relaxed text-neutral-900">
            {copy.offer.floor}
          </p>
        </div>
        <ul className="space-y-3 rounded-2xl border border-neutral-200 bg-neutral-50 p-6 text-base text-neutral-700">
          {copy.offer.bullets.map((bullet) => (
            <li key={bullet} className="flex gap-3">
              <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
