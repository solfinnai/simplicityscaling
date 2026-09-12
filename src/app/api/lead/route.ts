import { ZodError } from "zod";

import { flattenFieldErrors } from "@/lib/forms";
import { parseLead, submitLead } from "@/lib/leads";

export const runtime = "nodejs";

function wantsHtml(request: Request) {
  const accept = request.headers.get("accept") || "";
  return accept.includes("text/html") && !accept.includes("application/json");
}

async function readPayload(request: Request) {
  const contentType = request.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return { payload: await request.json(), html: false };
  }
  if (
    contentType.includes("application/x-www-form-urlencoded") ||
    contentType.includes("multipart/form-data")
  ) {
    const form = await request.formData();
    const primaryChannels = form.getAll("primaryChannels").map(String).filter(Boolean);
    const payload = {
      formType: form.has("fullName") ? "hard" : "soft",
      firstName: String(form.get("firstName") || ""),
      fullName: String(form.get("fullName") || ""),
      email: String(form.get("email") || ""),
      company: String(form.get("company") || ""),
      role: String(form.get("role") || ""),
      category: String(form.get("category") || ""),
      monthlyPurchasedMedia: String(form.get("monthlyPurchasedMedia") || ""),
      primaryChannels,
      whatBroke: String(form.get("whatBroke") || ""),
      howHeard: String(form.get("howHeard") || ""),
      website: String(form.get("website") || ""),
    };
    return { payload, html: wantsHtml(request) };
  }
  throw new Error("Invalid body");
}

export async function POST(request: Request) {
  let payload: unknown;
  let html = false;
  try {
    const parsed = await readPayload(request);
    payload = parsed.payload;
    html = parsed.html;
  } catch {
    return Response.json(
      { ok: false, error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  try {
    const input = await parseLead(payload);
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      undefined;
    const result = await submitLead(input, { ip });
    if (html) {
      return Response.redirect(new URL(`/thanks?type=${result.formType}`, request.url), 303);
    }
    return Response.json(result);
  } catch (error) {
    if (error instanceof ZodError) {
      return Response.json(
        { ok: false, error: "Please fix the highlighted fields.", fields: flattenFieldErrors(error) },
        { status: 422 },
      );
    }
    if (error instanceof Error && error.name === "TurnstileError") {
      return Response.json(
        { ok: false, error: "Please complete the spam check and try again." },
        { status: 400 },
      );
    }
    console.error("[lead]", error);
    return Response.json(
      {
        ok: false,
        error:
          "We could not send this request. Email info@simplicitymedia.com or call (949) 749-0200.",
      },
      { status: 502 },
    );
  }
}
