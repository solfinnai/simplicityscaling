"use client";

import { useEffect } from "react";

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";

export function TurnstileField() {
  useEffect(() => {
    if (!SITE_KEY) return;
    if (document.querySelector("script[data-ss-turnstile]")) return;
    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    script.async = true;
    script.dataset.ssTurnstile = "true";
    document.head.appendChild(script);
  }, []);

  if (!SITE_KEY) return null;

  return (
    <div
      className="cf-turnstile"
      data-sitekey={SITE_KEY}
      data-theme="light"
    />
  );
}

export function readTurnstileToken() {
  const input = document.querySelector<HTMLInputElement>(
    'input[name="cf-turnstile-response"]',
  );
  return input?.value || "";
}
