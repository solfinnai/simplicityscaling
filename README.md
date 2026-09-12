# simplicityscaling.com

Owned-domain acquisition funnel for Simplicity Media.

**Campaign:** The System Behind the Scale  
**Proof:** Optima Tax Relief (approved claims only)  
**Primary conversion:** Qualified strategy session → Simplicity sales (James Fink / BD)  
**Main site role:** Reference only (`simplicitymedia.com/results/optima-tax-relief/`)

## Docs
- [PRD](docs/PRD.md) — product requirements (source of truth for build)
- [LP copy v1](content/lp-copy-v1.md) — approved copy
- [Claims register](claims/CLAIMS.md)
- [Design notes](design/NOTES.md)

## Stack

Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 + shadcn/ui primitives. Server route `POST /api/lead` validates every field, then sends to HubSpot Forms API v3, a Formspree-compatible endpoint, or a documented mock/file fallback.

This is a deployable Node/Next app (not a static export) so the form path stays first-party. Pages themselves are static marketing routes: `/`, `/privacy`, `/thanks`.

**Linear:** HEN-343, HEN-344 — Content Factory (Client #001: Simplicity)

## Branding

Visual chrome matches [www.simplicitymedia.com](https://www.simplicitymedia.com): Sora + Space Grotesk (self-hosted), official wordmark, white nav, black pill CTAs, accent `#2190DC`, logo orange `#ff884d`. See [design/NOTES.md](design/NOTES.md). Approved LP copy is unchanged.

## Public preview

**Live HTTPS:** [https://simplicityscaling.vercel.app](https://simplicityscaling.vercel.app)  
**Git repo:** [https://github.com/solfinnai/simplicityscaling](https://github.com/solfinnai/simplicityscaling)  
Local: `http://127.0.0.1:43127`

Vercel project `simplicityscaling` is linked to that GitHub repo. Deployment protection is off. Pushes to `main` publish production.

The Optima record lives on this page (`#optima-record`). Nav, hero, and footer do not send visitors to simplicitymedia.com. The primary action is booking a strategy session.

Page order: hero → four moves → bounded test → strategy session form → scorecard recovery → category panels → Optima record. The session form is two steps so the first ask is identity, not the full brief.

## Local preview

```bash
cp .env.example .env.local   # optional; mock fallback works with no secrets
npm install
npm run dev                  # http://127.0.0.1:43127
npm run claim-audit
npm run test:forms          # needs the dev server running
npm run build
```

Without HubSpot or Formspree keys, valid submits append JSON lines to `data/leads.jsonl` (gitignored) and still redirect to `/thanks`.

## Environment variables

| Variable | Required | Purpose |
|---|---|---|
| `HUBSPOT_PORTAL_ID` | for HubSpot | HubSpot portal / account ID |
| `HUBSPOT_SOFT_FORM_GUID` | for HubSpot soft | Scorecard form GUID |
| `HUBSPOT_HARD_FORM_GUID` | for HubSpot hard | Strategy session form GUID |
| `FORMSPREE_FORM_ID` | fallback | Formspree form id (`https://formspree.io/f/{id}`) |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | optional | Show Turnstile widget |
| `TURNSTILE_SECRET_KEY` | optional | Verify Turnstile server-side |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | optional | GA4 (events also fire on `dataLayer` / `ss:event`) |

Selection order: HubSpot (portal + matching form GUID) → Formspree → mock file.

## HubSpot property map

Create these contact / form fields before pointing production traffic. Internal names are what `/api/lead` posts to the Forms API.

| Internal name | Soft | Hard | Notes |
|---|---|---|---|
| `email` | yes | yes | Work email |
| `firstname` | yes | yes | Split from full name on hard |
| `lastname` | | yes | `"-"` if a single token |
| `company` | yes | yes | |
| `jobtitle` | | yes | Role |
| `category` | yes | yes | Finance & legal / Local consultations / Products & memberships / Other (hard only) |
| `form_type` | `soft` | `hard` | |
| `hubspot_tag` | `simplicityscaling_scorecard` | | Use a list or workflow on this value |
| `full_name` | | yes | |
| `monthly_purchased_media` | | yes | Under $50k … Over $1M |
| `primary_channels` | | yes | Semicolon-separated |
| `what_broke` | | yes | Open text |
| `how_heard` | | yes | Optima email / Optima LinkedIn / Simplicity LinkedIn / Referral / Other |
| `spend_below_floor` | | yes | `true` when band is Under $50k |
| `do_not_market` | | `true` | Hard form must **not** enroll a marketing drip |
| `marketing_drip` | `false` | `false` | |
| `hs_lead_source` | yes | yes | `simplicityscaling.com` |
| `utm_source` `utm_medium` `utm_campaign` `utm_term` `utm_content` | yes | yes | Hidden |
| `gclid` `fbclid` `msclkid` `li_fat_id` | yes | yes | Hidden when present |

**Hard-form drip:** configure the HubSpot form / workflow so `form_type=hard` or `do_not_market=true` never enters a marketing nurture. Soft form may deliver the scorecard.

**Under $50k:** still accept the submit. Flag `spend_below_floor`. Sales decides.

## Forms and spam

- Soft: work email, first name, company, category
- Hard: full name, work email, company, role, category, monthly purchased media, primary channels (multi), what broke, how heard, hidden UTMs
- Honeypot field `website` (if filled, request is dropped as spam and still returns success)
- Optional Turnstile when keys are set
- Thanks page: `/thanks?type=soft` or `/thanks?type=hard`

## Deploy

Hosted now on Vercel: [https://simplicityscaling.vercel.app](https://simplicityscaling.vercel.app).

**Forms on this preview:** mock fallback. HubSpot and Formspree keys are not set, so `POST /api/lead` validates, accepts the lead, logs `[lead:mock]`, and still redirects to `/thanks`. Leads are **not** landing in HubSpot yet.

Henry still needs these Vercel env vars to go live:

| Secret | Purpose |
|---|---|
| `HUBSPOT_PORTAL_ID` | HubSpot portal / account ID |
| `HUBSPOT_SOFT_FORM_GUID` | Scorecard form GUID |
| `HUBSPOT_HARD_FORM_GUID` | Strategy session form GUID |

Optional: `FORMSPREE_FORM_ID` (if HubSpot is delayed), `NEXT_PUBLIC_TURNSTILE_SITE_KEY` + `TURNSTILE_SECRET_KEY`, `NEXT_PUBLIC_GA_MEASUREMENT_ID`.

Also in HubSpot: create the property map below, and a hard-form workflow that never enrolls `do_not_market=true` / `form_type=hard` in a marketing drip. Sales notify / calendar is ops.

To redeploy: push `main` on the GitHub repo, or add `simplicityscaling.com` in the Vercel project domain settings.

## DNS cutover (Henry)

Remaining after this build:

1. Register / confirm `simplicityscaling.com`.
2. Point the apex and `www` to the host (Vercel: add the domain, copy A / CNAME records).
3. Wait for HTTPS.
4. Paste live HubSpot portal ID + both form GUIDs.
5. Confirm hard-form workflow does not drip.
6. Switch Optima LI/email and Content Factory CTAs to `https://simplicityscaling.com` with UTMs.

Preview is valid Definition of Done while DNS is pending. See PRD §11.1.

## Claim gate

USE C01–C03, C07, C09, C10. BANNED C04. HOLD C05, C06, C08 (no Alan Thicke name, footage, or jingle). Copy is implemented from `content/lp-copy-v1.md` without rewrite.
