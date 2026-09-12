"use client";

import { useState } from "react";

import { copy } from "@/lib/copy";
import {
  CATEGORIES_HARD,
  CHANNELS,
  HEARD_ABOUT,
  SPEND_BANDS,
} from "@/lib/forms";

import { fieldA11y, FormField, controlClass } from "./form-field";
import { Honeypot } from "./honeypot";
import { readTurnstileToken, TurnstileField } from "./turnstile";
import { useFormDraft } from "./use-form-draft";
import { useLeadForm } from "./use-lead-form";

const INITIAL = {
  fullName: "",
  email: "",
  company: "",
  role: "",
  category: "",
  monthlyPurchasedMedia: "",
  primaryChannels: [] as string[],
  whatBroke: "",
  howHeard: "",
};

function readStepOne(form: HTMLFormElement) {
  const data = new FormData(form);
  return {
    fullName: String(data.get("fullName") || "").trim(),
    email: String(data.get("email") || "").trim(),
    company: String(data.get("company") || "").trim(),
    role: String(data.get("role") || "").trim(),
  };
}

export function HardForm() {
  const { state, formError, fieldErrors, markStart, submit } = useLeadForm("hard");
  const { values, update, clear } = useFormDraft("hard", INITIAL);
  const [step, setStep] = useState<1 | 2>(1);
  const [stepError, setStepError] = useState("");

  function toggleChannel(channel: string, checked: boolean) {
    const next = checked
      ? [...values.primaryChannels, channel]
      : values.primaryChannels.filter((item) => item !== channel);
    update("primaryChannels", next);
  }

  function continueToWork(form: HTMLFormElement) {
    const { fullName, email, company, role } = readStepOne(form);
    if (!fullName || !email || !company || !role || !email.includes("@")) {
      setStepError(copy.hard.stepError);
      return;
    }
    setStepError("");
    setStep(2);
    window.requestAnimationFrame(() => {
      document.getElementById("hard-category")?.focus();
    });
  }

  return (
    <section id="strategy-session" className="border-t border-neutral-200 bg-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <div className="max-w-2xl">
            <p className="eyebrow">{copy.hard.eyebrow}</p>
            <h2 className="mt-5 text-3xl tracking-tight sm:text-4xl">
              {copy.hard.heading}
            </h2>
            <p className="mt-5 text-base leading-relaxed font-medium text-neutral-600 sm:text-lg">
              {copy.hard.body}
            </p>
          </div>
          <ol className="space-y-4 rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
            {copy.hard.nextSteps.map((item, index) => (
              <li key={item.title} className="flex gap-3">
                <span className="font-accent text-sm font-bold text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-accent font-bold tracking-tight text-neutral-950">
                    {item.title}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-neutral-600">{item.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <form
          className="relative mt-10 space-y-6 rounded-2xl border border-neutral-200 bg-neutral-50 p-5 shadow-sm sm:p-8"
          noValidate
          method="post"
          action="/api/lead"
          onFocus={markStart}
          onSubmit={(event) => {
            event.preventDefault();
            if (step === 1) {
              continueToWork(event.currentTarget);
              return;
            }
            const data = new FormData(event.currentTarget);
            const primaryChannels = data
              .getAll("primaryChannels")
              .map(String)
              .filter(Boolean);
            void submit({
              fullName: String(data.get("fullName") || ""),
              email: String(data.get("email") || ""),
              company: String(data.get("company") || ""),
              role: String(data.get("role") || ""),
              category: String(data.get("category") || ""),
              monthlyPurchasedMedia: String(data.get("monthlyPurchasedMedia") || ""),
              primaryChannels,
              whatBroke: String(data.get("whatBroke") || ""),
              howHeard: String(data.get("howHeard") || ""),
              website: String(data.get("website") || ""),
              turnstileToken: readTurnstileToken(),
            }).then((ok) => {
              if (ok) clear();
            });
          }}
        >
          <Honeypot />
          <div className="flex flex-wrap items-center gap-3" aria-live="polite">
            <p className="font-accent text-xs font-bold tracking-[0.16em] text-neutral-500 uppercase">
              Step {step} of 2
            </p>
            <p className="font-accent text-sm font-bold text-neutral-950">
              {step === 1 ? copy.hard.step1 : copy.hard.step2}
            </p>
          </div>
          {formError ? (
            <p className="text-sm text-danger" role="alert">
              {formError}
            </p>
          ) : null}
          {stepError ? (
            <p className="text-sm text-danger" role="alert">
              {stepError}
            </p>
          ) : null}
          <div className={step === 1 ? "grid gap-5 md:grid-cols-2" : "hidden"}>
            <FormField id="hard-full-name" label="Full name" required error={fieldErrors.fullName}>
              <input
                id="hard-full-name"
                name="fullName"
                autoComplete="name"
                required
                defaultValue={values.fullName}
                onInput={(event) => update("fullName", event.currentTarget.value)}
                aria-invalid={fieldA11y("hard-full-name", fieldErrors.fullName).invalid || undefined}
                aria-describedby={fieldA11y("hard-full-name", fieldErrors.fullName).describedBy}
                className={controlClass}
              />
            </FormField>
            <FormField id="hard-email" label="Work email" required error={fieldErrors.email}>
              <input
                id="hard-email"
                name="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                required
                defaultValue={values.email}
                onInput={(event) => update("email", event.currentTarget.value)}
                aria-invalid={fieldA11y("hard-email", fieldErrors.email).invalid || undefined}
                aria-describedby={fieldA11y("hard-email", fieldErrors.email).describedBy}
                className={controlClass}
              />
            </FormField>
            <FormField id="hard-company" label="Company" required error={fieldErrors.company}>
              <input
                id="hard-company"
                name="company"
                autoComplete="organization"
                required
                defaultValue={values.company}
                onInput={(event) => update("company", event.currentTarget.value)}
                aria-invalid={fieldA11y("hard-company", fieldErrors.company).invalid || undefined}
                aria-describedby={fieldA11y("hard-company", fieldErrors.company).describedBy}
                className={controlClass}
              />
            </FormField>
            <FormField id="hard-role" label="Role" required error={fieldErrors.role}>
              <input
                id="hard-role"
                name="role"
                autoComplete="organization-title"
                required
                defaultValue={values.role}
                onInput={(event) => update("role", event.currentTarget.value)}
                aria-invalid={fieldA11y("hard-role", fieldErrors.role).invalid || undefined}
                aria-describedby={fieldA11y("hard-role", fieldErrors.role).describedBy}
                className={controlClass}
              />
            </FormField>
          </div>
          <div className={step === 2 ? "space-y-6" : "hidden"}>
            <div className="grid gap-5 md:grid-cols-2">
              <FormField id="hard-category" label="Category" required error={fieldErrors.category}>
                <select
                  id="hard-category"
                  name="category"
                  required
                  defaultValue={values.category}
                  onInput={(event) => update("category", event.currentTarget.value)}
                  aria-invalid={fieldA11y("hard-category", fieldErrors.category).invalid || undefined}
                  aria-describedby={fieldA11y("hard-category", fieldErrors.category).describedBy}
                  className={controlClass}
                >
                  <option value="">Select a category</option>
                  {CATEGORIES_HARD.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </FormField>
              <FormField
                id="hard-spend"
                label="Monthly purchased media"
                required
                error={fieldErrors.monthlyPurchasedMedia}
                hint="Under $50k still submits. We flag it as below the working floor."
              >
                <select
                  id="hard-spend"
                  name="monthlyPurchasedMedia"
                  required
                  defaultValue={values.monthlyPurchasedMedia}
                  onInput={(event) => update("monthlyPurchasedMedia", event.currentTarget.value)}
                  aria-invalid={
                    fieldA11y(
                      "hard-spend",
                      fieldErrors.monthlyPurchasedMedia,
                      "Under $50k still submits. We flag it as below the working floor.",
                    ).invalid || undefined
                  }
                  aria-describedby={
                    fieldA11y(
                      "hard-spend",
                      fieldErrors.monthlyPurchasedMedia,
                      "Under $50k still submits. We flag it as below the working floor.",
                    ).describedBy
                  }
                  className={controlClass}
                >
                  <option value="">Select a spend band</option>
                  {SPEND_BANDS.map((band) => (
                    <option key={band} value={band}>
                      {band}
                    </option>
                  ))}
                </select>
              </FormField>
            </div>
            <fieldset className="space-y-3">
              <legend className="text-sm font-medium text-ink">
                Primary channels
              </legend>
              {fieldErrors.primaryChannels ? (
                <p className="text-sm text-danger" role="alert">
                  {fieldErrors.primaryChannels}
                </p>
              ) : null}
              <div className="grid gap-2 sm:grid-cols-2">
                {CHANNELS.map((channel) => (
                  <label
                    key={channel}
                    className="flex min-h-11 items-center gap-3 rounded-md border border-ink/15 px-3 text-sm text-ink"
                  >
                    <input
                      type="checkbox"
                      name="primaryChannels"
                      value={channel}
                      defaultChecked={values.primaryChannels.includes(channel)}
                      onChange={(event) => toggleChannel(channel, event.target.checked)}
                      className="size-4 accent-accent"
                    />
                    {channel}
                  </label>
                ))}
              </div>
            </fieldset>
            <FormField
              id="hard-broke"
              label="What do you need the next media dollar to fix?"
              required
              error={fieldErrors.whatBroke}
            >
              <textarea
                id="hard-broke"
                name="whatBroke"
                required
                rows={5}
                defaultValue={values.whatBroke}
                onInput={(event) => update("whatBroke", event.currentTarget.value)}
                aria-invalid={fieldA11y("hard-broke", fieldErrors.whatBroke).invalid || undefined}
                aria-describedby={fieldA11y("hard-broke", fieldErrors.whatBroke).describedBy}
                className={`${controlClass} min-h-32 py-3`}
              />
            </FormField>
            <FormField
              id="hard-heard"
              label="How did you hear about this page?"
              required
              error={fieldErrors.howHeard}
            >
              <select
                id="hard-heard"
                name="howHeard"
                required
                defaultValue={values.howHeard}
                onInput={(event) => update("howHeard", event.currentTarget.value)}
                aria-invalid={fieldA11y("hard-heard", fieldErrors.howHeard).invalid || undefined}
                aria-describedby={fieldA11y("hard-heard", fieldErrors.howHeard).describedBy}
                className={controlClass}
              >
                <option value="">Select one</option>
                {HEARD_ABOUT.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </FormField>
          </div>
          <p className="text-sm text-muted">{copy.hard.microcopy}</p>
          <TurnstileField />
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {step === 1 ? (
              <button
                type="button"
                className="btn-primary"
                onClick={(event) => {
                  const form = event.currentTarget.closest("form");
                  if (form) continueToWork(form);
                }}
              >
                {copy.hard.continue}
              </button>
            ) : (
              <>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => {
                    setStep(1);
                    setStepError("");
                  }}
                >
                  {copy.hard.back}
                </button>
                <button
                  type="submit"
                  disabled={state === "submitting"}
                  className="btn-primary disabled:opacity-60"
                >
                  {state === "submitting" ? "Sending…" : copy.hard.submit}
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
