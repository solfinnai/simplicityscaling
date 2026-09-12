export type AnalyticsEvent =
  | "cta_click"
  | "form_start"
  | "form_success"
  | "form_error";

export function track(event: AnalyticsEvent, detail: Record<string, string | boolean | number> = {}) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("ss:event", { detail: { event, ...detail } }));
  const dataLayer = (window as Window & { dataLayer?: Record<string, unknown>[] }).dataLayer;
  dataLayer?.push({ event: `ss_${event}`, ...detail });
  if (process.env.NODE_ENV !== "production") {
    console.info("[analytics]", event, detail);
  }
}
