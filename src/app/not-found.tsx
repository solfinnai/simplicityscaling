import Link from "next/link";

export default function NotFound() {
  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-20 sm:px-6">
      <h1 className="text-4xl tracking-tight">This page is not on the funnel.</h1>
      <p className="mt-4 text-base text-neutral-600">
        Return to the System Behind the Scale, or read the Optima case study.
      </p>
      <div className="mt-8">
        <Link
          href="/"
          className="btn-primary"
        >
          Back to the system
        </Link>
      </div>
    </article>
  );
}
