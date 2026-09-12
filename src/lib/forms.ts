import { z } from "zod";

export const CATEGORIES_SOFT = [
  "Finance & legal",
  "Local consultations",
  "Products & memberships",
] as const;

export const CATEGORIES_HARD = [...CATEGORIES_SOFT, "Other"] as const;

export const SPEND_BANDS = [
  "Under $50k",
  "$50–100k",
  "$100–250k",
  "$250–500k",
  "$500k–$1M",
  "Over $1M",
] as const;

export const CHANNELS = [
  "TV",
  "CTV",
  "Radio",
  "Podcast",
  "Digital audio",
  "Paid search",
  "Paid social",
  "Other",
] as const;

export const HEARD_ABOUT = [
  "Optima email",
  "Optima LinkedIn",
  "Simplicity LinkedIn",
  "Referral",
  "Other",
] as const;

export const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid",
  "msclkid",
  "li_fat_id",
] as const;

export type UtmKey = (typeof UTM_KEYS)[number];

const emailSchema = z
  .string()
  .trim()
  .min(1, "Work email is required.")
  .email("Enter a valid work email.")
  .refine((value) => !value.toLowerCase().endsWith("@simplicityscaling.test"), {
    message: "Enter a valid work email.",
  });

const utmShape = UTM_KEYS.reduce(
  (acc, key) => {
    acc[key] = z.string().trim().max(200).optional().default("");
    return acc;
  },
  {} as Record<UtmKey, z.ZodDefault<z.ZodOptional<z.ZodString>>>,
);

export const utmSchema = z.object(utmShape);

export const softLeadSchema = z.object({
  formType: z.literal("soft"),
  firstName: z.string().trim().min(1, "First name is required.").max(80),
  email: emailSchema,
  company: z.string().trim().min(1, "Company is required.").max(120),
  category: z.enum(CATEGORIES_SOFT, {
    message: "Choose a category.",
  }),
  website: z.string().optional().default(""),
  turnstileToken: z.string().optional().default(""),
  pageUri: z.string().url().optional(),
  ...utmShape,
});

export const hardLeadSchema = z.object({
  formType: z.literal("hard"),
  fullName: z.string().trim().min(1, "Full name is required.").max(120),
  email: emailSchema,
  company: z.string().trim().min(1, "Company is required.").max(120),
  role: z.string().trim().min(1, "Role is required.").max(80),
  category: z.enum(CATEGORIES_HARD, {
    message: "Choose a category.",
  }),
  monthlyPurchasedMedia: z.enum(SPEND_BANDS, {
    message: "Choose a monthly purchased media band.",
  }),
  primaryChannels: z
    .array(z.enum(CHANNELS))
    .min(1, "Select at least one primary channel."),
  whatBroke: z
    .string()
    .trim()
    .min(8, "Tell us what you need the next media dollar to fix.")
    .max(2000),
  howHeard: z.enum(HEARD_ABOUT, {
    message: "Tell us how you heard about this page.",
  }),
  website: z.string().optional().default(""),
  turnstileToken: z.string().optional().default(""),
  pageUri: z.string().url().optional(),
  ...utmShape,
});

export type SoftLeadInput = z.infer<typeof softLeadSchema>;
export type HardLeadInput = z.infer<typeof hardLeadSchema>;
export type LeadInput = SoftLeadInput | HardLeadInput;

export function isSpendBelowFloor(band: string) {
  return band === "Under $50k";
}

export function splitName(fullName: string) {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) {
    return { firstname: parts[0], lastname: "-" };
  }
  return {
    firstname: parts[0],
    lastname: parts.slice(1).join(" "),
  };
}

export function flattenFieldErrors(error: z.ZodError) {
  const fieldErrors: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path.join(".") || "form";
    if (!fieldErrors[key]) fieldErrors[key] = issue.message;
  }
  return fieldErrors;
}
