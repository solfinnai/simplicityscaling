import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

import {
  hardLeadSchema,
  isSpendBelowFloor,
  softLeadSchema,
  splitName,
  type HardLeadInput,
  type LeadInput,
  type SoftLeadInput,
  UTM_KEYS,
} from "@/lib/forms";

export type LeadDestination = "hubspot" | "formspree" | "mock";

export type LeadRecord = {
  receivedAt: string;
  formType: "soft" | "hard";
  email: string;
  company: string;
  category: string;
  spendBelowFloor: boolean;
  marketingDrip: false;
  destination: LeadDestination;
  fields: Record<string, string | string[] | boolean>;
};

function env(name: string) {
  return process.env[name]?.trim() || "";
}

export function destinationFor(formType: "soft" | "hard"): LeadDestination {
  const portal = env("HUBSPOT_PORTAL_ID");
  const guid =
    formType === "soft"
      ? env("HUBSPOT_SOFT_FORM_GUID")
      : env("HUBSPOT_HARD_FORM_GUID");
  if (portal && guid) return "hubspot";
  if (env("FORMSPREE_FORM_ID")) return "formspree";
  return "mock";
}

export function toRecord(input: LeadInput, destination: LeadDestination): LeadRecord {
  const spendBelowFloor =
    input.formType === "hard"
      ? isSpendBelowFloor(input.monthlyPurchasedMedia)
      : false;

  const names =
    input.formType === "hard"
      ? splitName(input.fullName)
      : { firstname: input.firstName, lastname: "" };

  const fields: Record<string, string | string[] | boolean> = {
    email: input.email,
    firstname: names.firstname,
    lastname: names.lastname,
    company: input.company,
    category: input.category,
    form_type: input.formType,
    spend_below_floor: spendBelowFloor,
    marketing_drip: false,
    hs_lead_source: "simplicityscaling.com",
  };

  if (input.formType === "soft") {
    fields.hubspot_tag = "simplicityscaling_scorecard";
  } else {
    fields.jobtitle = input.role;
    fields.full_name = input.fullName;
    fields.monthly_purchased_media = input.monthlyPurchasedMedia;
    fields.primary_channels = input.primaryChannels;
    fields.what_broke = input.whatBroke;
    fields.how_heard = input.howHeard;
    fields.do_not_market = true;
  }

  for (const key of UTM_KEYS) {
    const value = input[key];
    if (value) fields[key] = value;
  }

  return {
    receivedAt: new Date().toISOString(),
    formType: input.formType,
    email: input.email,
    company: input.company,
    category: input.category,
    spendBelowFloor,
    marketingDrip: false,
    destination,
    fields,
  };
}

function hubspotFields(record: LeadRecord) {
  const entries: { objectTypeId: string; name: string; value: string }[] = [];
  for (const [name, value] of Object.entries(record.fields)) {
    if (value === "" || value === undefined) continue;
    const serialized = Array.isArray(value) ? value.join("; ") : String(value);
    entries.push({ objectTypeId: "0-1", name, value: serialized });
  }
  return entries;
}

async function submitHubSpot(record: LeadRecord, pageUri?: string) {
  const portal = env("HUBSPOT_PORTAL_ID");
  const guid =
    record.formType === "soft"
      ? env("HUBSPOT_SOFT_FORM_GUID")
      : env("HUBSPOT_HARD_FORM_GUID");
  const url = `https://api.hsforms.com/submissions/v3/integration/submit/${portal}/${guid}`;

  const body = {
    fields: hubspotFields(record),
    context: {
      pageUri: pageUri || `https://simplicityscaling.com/${record.formType}`,
      pageName:
        record.formType === "soft"
          ? "System scorecard"
          : "Strategy session",
    },
  };

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`HubSpot ${response.status}: ${text.slice(0, 400)}`);
  }
}

async function submitFormspree(record: LeadRecord) {
  const id = env("FORMSPREE_FORM_ID");
  const response = await fetch(`https://formspree.io/f/${id}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...record.fields,
      _subject:
        record.formType === "soft"
          ? "simplicityscaling scorecard"
          : "simplicityscaling strategy session",
      receivedAt: record.receivedAt,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Formspree ${response.status}: ${text.slice(0, 400)}`);
  }
}

async function writeMock(record: LeadRecord) {
  const dirs = process.env.VERCEL
    ? [path.join("/tmp", "simplicityscaling-leads")]
    : [path.join(process.cwd(), "data"), path.join("/tmp", "simplicityscaling-leads")];

  let persisted = false;
  for (const dir of dirs) {
    try {
      await mkdir(dir, { recursive: true });
      await appendFile(
        path.join(dir, "leads.jsonl"),
        `${JSON.stringify(record)}\n`,
        "utf8",
      );
      persisted = true;
      break;
    } catch {
      // Serverless / read-only filesystem: keep going and still accept the lead.
    }
  }

  console.info("[lead:mock]", {
    formType: record.formType,
    email: record.email,
    company: record.company,
    spendBelowFloor: record.spendBelowFloor,
    destination: "mock",
    persisted,
  });
}

async function verifyTurnstile(token: string, ip?: string) {
  const secret = env("TURNSTILE_SECRET_KEY");
  if (!secret) return true;
  if (!token) return false;

  const body = new URLSearchParams({
    secret,
    response: token,
  });
  if (ip) body.set("remoteip", ip);

  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      body,
    },
  );
  if (!response.ok) return false;
  const json = (await response.json()) as { success?: boolean };
  return Boolean(json.success);
}

export async function parseLead(payload: unknown) {
  const formType =
    typeof payload === "object" && payload && "formType" in payload
      ? (payload as { formType?: string }).formType
      : undefined;

  if (formType === "soft") return softLeadSchema.parse(payload);
  if (formType === "hard") return hardLeadSchema.parse(payload);
  throw new Error("Unknown form type.");
}

export async function submitLead(
  input: SoftLeadInput | HardLeadInput,
  options: { ip?: string } = {},
) {
  if (input.website) {
    return { ok: true as const, destination: "mock" as const, spam: true };
  }

  const turnstileRequired = Boolean(env("TURNSTILE_SECRET_KEY"));
  if (turnstileRequired) {
    const ok = await verifyTurnstile(input.turnstileToken || "", options.ip);
    if (!ok) {
      const error = new Error("Turnstile verification failed.");
      error.name = "TurnstileError";
      throw error;
    }
  }

  const destination = destinationFor(input.formType);
  const record = toRecord(input, destination);

  if (destination === "hubspot") {
    await submitHubSpot(record, input.pageUri);
  } else if (destination === "formspree") {
    await submitFormspree(record);
  } else {
    await writeMock(record);
  }

  return {
    ok: true as const,
    destination,
    spendBelowFloor: record.spendBelowFloor,
    formType: record.formType,
  };
}
