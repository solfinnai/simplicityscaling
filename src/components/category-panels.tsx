import { copy } from "@/lib/copy";

export function CategoryPanels() {
  return (
    <section id="category" className="border-t border-neutral-200">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
        <h2 className="max-w-2xl text-3xl tracking-tight sm:text-4xl">
          {copy.categories.heading}
        </h2>
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {copy.categories.panels.map((panel) => (
            <article
              key={panel.id}
              className="flex flex-col rounded-2xl border border-neutral-200 bg-white px-6 py-7 shadow-sm"
            >
              <h3 className="text-2xl tracking-tight">{panel.title}</h3>
              <p className="mt-6 font-accent text-[0.7rem] font-bold tracking-[0.16em] text-accent uppercase">
                Response event
              </p>
              <p className="mt-2 text-base leading-relaxed text-neutral-600">
                {panel.response}
              </p>
              <p className="mt-5 font-accent text-[0.7rem] font-bold tracking-[0.16em] text-accent uppercase">
                First engagement
              </p>
              <p className="mt-2 text-base leading-relaxed text-neutral-600">
                {panel.engagement}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
