"use client";

import { copy } from "@/lib/copy";
import { CATEGORIES_SOFT } from "@/lib/forms";

import { fieldA11y, FormField, controlClass } from "./form-field";
import { Honeypot } from "./honeypot";
import { readTurnstileToken, TurnstileField } from "./turnstile";
import { useFormDraft } from "./use-form-draft";
import { useLeadForm } from "./use-lead-form";

const INITIAL = {
  firstName: "",
  email: "",
  company: "",
  category: "",
};

export function SoftForm() {
  const { state, formError, fieldErrors, markStart, submit } = useLeadForm("soft");
  const { values, update, clear } = useFormDraft("soft", INITIAL);

  return (
    <section id="scorecard" className="border-t border-neutral-200">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:py-24">
        <div>
          <p className="eyebrow">Soft CTA</p>
          <h2 className="mt-5 text-3xl tracking-tight sm:text-4xl">
            {copy.soft.heading}
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed font-medium text-neutral-600">
            {copy.soft.body}
          </p>
        </div>
        <form
          className="relative space-y-5 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-7"
          noValidate
          method="post"
          action="/api/lead"
          onFocus={markStart}
          onSubmit={(event) => {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            void submit({
              firstName: String(data.get("firstName") || ""),
              email: String(data.get("email") || ""),
              company: String(data.get("company") || ""),
              category: String(data.get("category") || ""),
              website: String(data.get("website") || ""),
              turnstileToken: readTurnstileToken(),
            }).then((ok) => {
              if (ok) clear();
            });
          }}
        >
          <Honeypot />
          {formError ? (
            <p className="text-sm text-danger" role="alert">
              {formError}
            </p>
          ) : null}
          <FormField id="soft-first-name" label="First name" required error={fieldErrors.firstName}>
            <input
              id="soft-first-name"
              name="firstName"
              autoComplete="given-name"
              required
              defaultValue={values.firstName}
              onInput={(event) => update("firstName", event.currentTarget.value)}
              aria-invalid={fieldA11y("soft-first-name", fieldErrors.firstName).invalid || undefined}
              aria-describedby={fieldA11y("soft-first-name", fieldErrors.firstName).describedBy}
              className={controlClass}
            />
          </FormField>
          <FormField id="soft-email" label="Work email" required error={fieldErrors.email}>
            <input
              id="soft-email"
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              required
              defaultValue={values.email}
              onInput={(event) => update("email", event.currentTarget.value)}
              aria-invalid={fieldA11y("soft-email", fieldErrors.email).invalid || undefined}
              aria-describedby={fieldA11y("soft-email", fieldErrors.email).describedBy}
              className={controlClass}
            />
          </FormField>
          <FormField id="soft-company" label="Company" required error={fieldErrors.company}>
            <input
              id="soft-company"
              name="company"
              autoComplete="organization"
              required
              defaultValue={values.company}
              onInput={(event) => update("company", event.currentTarget.value)}
              aria-invalid={fieldA11y("soft-company", fieldErrors.company).invalid || undefined}
              aria-describedby={fieldA11y("soft-company", fieldErrors.company).describedBy}
              className={controlClass}
            />
          </FormField>
          <FormField id="soft-category" label="Category" required error={fieldErrors.category}>
            <select
              id="soft-category"
              name="category"
              required
              defaultValue={values.category}
              onInput={(event) => update("category", event.currentTarget.value)}
              aria-invalid={fieldA11y("soft-category", fieldErrors.category).invalid || undefined}
              aria-describedby={fieldA11y("soft-category", fieldErrors.category).describedBy}
              className={controlClass}
            >
              <option value="">Select a category</option>
              {CATEGORIES_SOFT.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </FormField>
          <TurnstileField />
          <button
            type="submit"
            disabled={state === "submitting"}
            className="btn-primary w-full disabled:opacity-60 sm:w-auto"
          >
            {state === "submitting" ? "Sending…" : copy.soft.submit}
          </button>
        </form>
      </div>
    </section>
  );
}
