import { copy } from "@/lib/copy";

export function FourMoves() {
  return (
    <section id="system" className="border-t border-neutral-200 bg-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
        <h2 className="max-w-2xl text-3xl tracking-tight sm:text-4xl">
          {copy.fourMoves.heading}
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed font-medium text-neutral-600 sm:text-lg">
          {copy.fourMoves.intro}
        </p>
        <ol className="mt-12 grid gap-5 sm:grid-cols-2">
          {copy.fourMoves.items.map((item) => (
            <li
              key={item.n}
              className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 shadow-sm"
            >
              <p className="font-accent text-xs font-bold tracking-[0.18em] text-accent">
                {item.n}
              </p>
              <h3 className="mt-3 text-2xl tracking-tight">{item.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-neutral-600">
                {item.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
