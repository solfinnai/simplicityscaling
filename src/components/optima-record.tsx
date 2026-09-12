import { SectionCta } from "@/components/section-cta";
import { caseStudy } from "@/lib/case-study";

export function OptimaRecord() {
  return (
    <section id="optima-record" className="border-t border-neutral-200 bg-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
        <p className="eyebrow">{caseStudy.eyebrow}</p>
        <h2 className="mt-5 max-w-3xl text-3xl tracking-tight sm:text-4xl lg:text-5xl">
          {caseStudy.heading}
        </h2>
        <p className="mt-6 max-w-3xl text-lg font-medium leading-relaxed text-neutral-700">
          {caseStudy.lede}
        </p>
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-neutral-600">
          {caseStudy.intro.map((paragraph) => (
            <p key={paragraph.slice(0, 28)}>{paragraph}</p>
          ))}
        </div>

        <dl className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {caseStudy.stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-neutral-200 bg-neutral-50 px-5 py-6"
            >
              <dt className="font-accent text-[0.7rem] font-bold tracking-[0.14em] text-accent uppercase">
                {stat.label}
              </dt>
              <dd className="mt-3 font-accent text-4xl font-bold tracking-tight text-neutral-950">
                {stat.value}
              </dd>
              <p className="mt-2 text-sm leading-relaxed text-neutral-500">{stat.note}</p>
            </div>
          ))}
        </dl>

        <h3 className="mt-16 text-2xl tracking-tight">{caseStudy.tableHeading}</h3>
        <div className="mt-6 overflow-hidden rounded-2xl border border-neutral-200">
          <table className="w-full text-left text-sm">
            <tbody>
              {caseStudy.table.map((row) => (
                <tr key={row.q} className="border-b border-neutral-200 last:border-b-0">
                  <th className="w-[36%] bg-neutral-50 px-4 py-4 align-top font-accent font-bold text-neutral-900 sm:px-5">
                    {row.q}
                  </th>
                  <td className="px-4 py-4 text-neutral-600 sm:px-5">{row.a}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="mt-16 text-2xl tracking-tight">{caseStudy.timelineHeading}</h3>
        <ol className="mt-8 space-y-0">
          {caseStudy.timeline.map((item) => (
            <li
              key={item.year}
              className="grid gap-3 border-l-2 border-accent/40 py-5 pl-5 sm:grid-cols-[7rem_minmax(0,1fr)]"
            >
              <p className="font-accent text-sm font-bold text-accent">{item.year}</p>
              <div>
                <p className="text-base leading-relaxed text-neutral-800">{item.body}</p>
                <p className="mt-2 font-accent text-[0.7rem] font-bold tracking-[0.12em] text-neutral-500 uppercase">
                  {item.evidence}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <h3 className="mt-16 text-2xl tracking-tight">{caseStudy.movesHeading}</h3>
        <ol className="mt-8 grid gap-5 md:grid-cols-2">
          {caseStudy.moves.map((move) => (
            <li key={move.n} className="rounded-2xl border border-neutral-200 p-6">
              <p className="font-accent text-xs font-bold tracking-[0.18em] text-accent">
                {move.n}
              </p>
              <h4 className="mt-2 text-xl tracking-tight">{move.title}</h4>
              <p className="mt-3 text-base leading-relaxed text-neutral-600">{move.body}</p>
            </li>
          ))}
        </ol>

        <h3 className="mt-16 text-2xl tracking-tight">{caseStudy.resultsHeading}</h3>
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-neutral-600">
          {caseStudy.results.map((paragraph) => (
            <p key={paragraph.slice(0, 28)}>{paragraph}</p>
          ))}
        </div>

        <h3 className="mt-16 text-2xl tracking-tight">{caseStudy.lessonsHeading}</h3>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-neutral-600">
          {caseStudy.lessonsIntro}
        </p>
        <ol className="mt-6 max-w-3xl space-y-4">
          {caseStudy.lessons.map((lesson, index) => (
            <li key={lesson.slice(0, 24)} className="flex gap-3 text-base leading-relaxed text-neutral-700">
              <span className="font-accent text-sm font-bold text-accent">{index + 1}.</span>
              <span>{lesson}</span>
            </li>
          ))}
        </ol>

        <h3 className="mt-16 text-2xl tracking-tight">{caseStudy.faqHeading}</h3>
        <dl className="mt-8 max-w-3xl space-y-6">
          {caseStudy.faq.map((item) => (
            <div key={item.q}>
              <dt className="font-accent text-lg font-bold tracking-tight text-neutral-950">
                {item.q}
              </dt>
              <dd className="mt-2 text-base leading-relaxed text-neutral-600">{item.a}</dd>
            </div>
          ))}
        </dl>

        <h3 className="mt-16 text-2xl tracking-tight">{caseStudy.sourcesHeading}</h3>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-neutral-600">
          {caseStudy.sourcesIntro}
        </p>
        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          {caseStudy.sourceGroups.map((group) => (
            <li key={group.title} className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
              <p className="font-accent text-sm font-bold text-neutral-950">{group.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">{group.body}</p>
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-neutral-500">
          {caseStudy.sourcesClose}
        </p>

        <SectionCta eventLabel="record_book" className="mt-12" />
      </div>
    </section>
  );
}
