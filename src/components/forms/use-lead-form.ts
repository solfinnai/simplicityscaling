"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { track } from "@/lib/analytics";
import { loadPersistedUtms, mergeUtms, persistUtms, readUtmsFromSearch } from "@/lib/utm";

type SubmitState = "idle" | "submitting" | "error";

function currentUtms() {
  const fromUrl = readUtmsFromSearch(window.location.search);
  persistUtms(fromUrl);
  return mergeUtms(fromUrl, loadPersistedUtms());
}

export function useLeadForm(formType: "soft" | "hard") {
  const router = useRouter();
  const [started, setStarted] = useState(false);
  const [state, setState] = useState<SubmitState>("idle");
  const [formError, setFormError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  function markStart() {
    if (started) return;
    setStarted(true);
    track("form_start", { form: formType });
  }

  async function submit(body: Record<string, unknown>): Promise<boolean> {
    setState("submitting");
    setFormError("");
    setFieldErrors({});

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...body,
          ...currentUtms(),
          formType,
          pageUri: window.location.href,
        }),
      });
      const json = (await response.json()) as {
        ok?: boolean;
        error?: string;
        fields?: Record<string, string>;
      };

      if (!response.ok || !json.ok) {
        setState("error");
        setFieldErrors(json.fields || {});
        setFormError(json.error || "Please check the form and try again.");
        track("form_error", { form: formType });
        return false;
      }

      track("form_success", { form: formType });
      router.push(`/thanks?type=${formType}`);
      return true;
    } catch {
      setState("error");
      setFormError(
        "We could not send this request. Email info@simplicitymedia.com or call (949) 749-0200.",
      );
      track("form_error", { form: formType });
      return false;
    }
  }

  return {
    state,
    formError,
    fieldErrors,
    markStart,
    submit,
  };
}
