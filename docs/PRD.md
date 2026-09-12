# PRD v1.0 — simplicityscaling.com

**Product:** The System Behind the Scale (owned-domain acquisition funnel)  
**Company:** Simplicity Media only  
**Domain:** simplicityscaling.com  
**Status:** Approved for build — 2026-09-12  
**Linear:** [HEN-344](https://linear.app/henryfinnai/issue/HEN-344/prd-v10-simplicityscalingcom-system-behind-the-scale) (PRD) · [HEN-343](https://linear.app/henryfinnai/issue/HEN-343/build-simplicityscalingcom-lp-system-behind-the-scale) (build)  
**Notion:** Client: Simplicity Media bible · Funnel Brief · LP Copy v1 · this PRD page  
**Local (Henry Mac):** `~/Developer/simplicityscaling/docs/PRD.md`  
**Copy source:** `content/lp-copy-v1.md`  
**Claims source:** `claims/CLAIMS.md`

---

## 1. Executive summary

Build a single-purpose acquisition site on `simplicityscaling.com` that turns Optima Tax Relief proof into qualified strategy-session demand for Simplicity sales (James Fink / BD). The main corporate site is reference-only for the Optima case study. This site replaces Ads That Don't Suck as the primary Simplicity new-logo funnel.

Flow: Attention (Optima narrative) → category-matched understanding (A/B/C) → soft scorecard or hard strategy session → ICP qualify → James / BD handoff.

**Primary conversion:** Hard form → qualified strategy session.  
**Secondary conversion:** Soft form → System scorecard request.  
**Out of scope for this lane:** Closing the media deal.

---

## 2. Problem

Executive Intelligence holds a **$5,000/month retainer** (month 3 as of September 2026) to create attention, run funnels, and deliver qualified strategy-call handoffs. We do not close media deals.

**September lead bar:** one advertiser able to spend $50k+/month who will take a call, or three lower-tier qualified leads that become calls.

**Hard ICP floor for a “qualified” referral:** B2C financial, legal, or ecommerce (home services as stretch), with a credible path to **≥ $100k/month purchased media**, CTV-preferred. A lead is complete only when James has a referral packet and a call is booked or confirmed.

The prior Ads That Don't Suck funnel is built but its Formspree endpoint is still a placeholder. Attention from Content Factory and Optima list traffic has nowhere durable to land that (a) keeps claim control, (b) does not leak to the main homepage, and (c) captures spend + category + UTMs for sales.

---

## 3. Goals

1. Ship a production landing page from approved copy v1 (`content/lp-copy-v1.md`).
2. Soft + hard forms capture all required fields and UTMs, then post to HubSpot (or a documented fallback that still validates).
3. Route hard leads to sales with no automated marketing drip from the hard form.
4. Support Optima LinkedIn / email and Content Factory CTAs without main-site leakage.
5. Keep claim integrity via `claims/CLAIMS.md`.
6. Provide `/privacy` and `/thanks` so the funnel is legally and operationally complete.

### Non-goals (v1)

- No corporate site mirror or full-nav Simplicity Media site.
- No public P1 account name-drops until James / legal approve.
- No Alan Thicke name, footage, or jingle until C08 rights clearance (HOLD).
- No C05 / C06 figures (tax liabilities resolved; case counts) until verified (HOLD).
- No Optima revenue dollars or revenue multiples (C04 BANNED).
- No paid-buying automation, media buying console, or client login.
- No scorecard PDF generation in v1 (soft form captures demand; PDF is a later artifact).
- HubSpot remains CRM; this site is not a marketing automation platform.
- Calendar booking widget is post-qualify; v1 captures the request and promises a one-business-day response.

---

## 4. ICP segments (150-company book)

Shared ask: a **bounded test**, not a full AOR rip-and-replace. Creative + placement + measurement tied to a real response event.

| Segment | n | P1 | Who | Response event |
|---|---|---|---|---|
| A Finance & legal | 50 | 11 | Debt, tax, insurance, PI law, reverse mortgage | Qualified call → enrollment / application / signed case |
| B Local consultations | 50 | 25 | Remodel, HVAC, fertility, aesthetics, hearing, dental | Call or form → booked consultation → paid job or treatment |
| C Products & memberships | 50 | 21 | DTC beauty/wellness, telehealth, supplements, devices | Exposure → landing behavior → paid customer / enrollment |

**Offer floor on the page:** companies already spending, or ready to spend, on the order of $100,000+ per month in purchased media.  
**Form behavior:** Under $50k still submits and is flagged `spend_below_floor` (FR-4).

---

## 5. Thesis

**Campaign name:** The System Behind the Scale.

**Thesis (C10):** The number is the evidence. The system is the story.

**Proof story:** 2012 radio start in the low thousands per week (C07) → Inc. 26,006% three-year growth for the 2015 ranking period (C01) → Inc. 500 No. 3 overall and No. 1 Financial Services in 2015 (C02) → seven consecutive Inc. years 2015–2021 (C03). Contribution, not sole causation: Optima built the service organization; Simplicity helped build and scale the media and brand system (C09).

**Distribution (not built in this repo):** Optima LinkedIn + email, Simplicity LinkedIn / X from Content Factory, Henry outbound into the 150, optional paid later. Every click UTMs to this domain.

---

## 6. Information architecture

| Route | Purpose |
|---|---|
| `/` | Landing page (all LP sections) |
| `/privacy` | Privacy stub for form collection |
| `/thanks` | Confirmation; soft vs hard via `?type=soft` or `?type=hard` |

Optional later: scorecard PDF asset. Not a v1 route.

### LP section order

1. Minimal nav (Book session + case study text link)
2. Hero + proof chips
3. Four moves (Prove response, Build recognition, Read demand, Improve the next buy)
4. A/B/C panels (Finance & legal; Local consultations; Products & memberships)
5. Bounded test offer ($100k+/mo media)
6. Soft CTA scorecard form
7. Hard CTA strategy session form
8. Evidence method note
9. Footer (Irvine phone, email, Inc. attribution, no Optima revenue)

### Link policy

- Main site link **only** as Optima case study: https://simplicitymedia.com/results/optima-tax-relief/
- No primary CTAs to the Simplicity Media homepage
- Footer may repeat the case study link and Book a session

---

## 7. Functional requirements

### FR-1 Render approved copy

Render `content/lp-copy-v1.md` literally. LCP target < 2.5s on mobile. No invented Optima statistics.

### FR-2 Soft form

Fields: work email*, first name*, company*, category* (Finance & legal | Local consultations | Products & memberships).  
Destination: HubSpot with tag / source `simplicityscaling_scorecard`. Capture hidden UTMs. Honeypot and/or Turnstile.

### FR-3 Hard form

Fields: full name*, work email*, company*, role*, category* (A/B/C + Other), monthly purchased media*, primary channels (multi), “What do you need the next media dollar to fix?”*, how heard (Optima email | Optima LinkedIn | Simplicity LinkedIn | Referral | Other), hidden UTMs.  
Submit label: Request my strategy session.  
Microcopy: respond within one business day; **no automated drip** from this form.  
Notify sales (HubSpot workflow or email fallback). Do not enroll hard-form contacts in a marketing drip list.

### FR-4 Spend floor flag

Under $50k still submits. Set `spend_below_floor=true`. Do not block the request.

### FR-5 Case study link only

The only simplicitymedia.com URL used as a CTA is `/results/optima-tax-relief/`.

### FR-6 Analytics

Fire events for: page view, CTA click, form start, form success, form error. GA4 / plausible optional via env; always keep a first-party event hook.

### FR-7 Privacy

`/privacy` explains what is collected, why (strategy session / scorecard), who receives it (Simplicity Media / HubSpot), and that hard-form submits are not used for automated drip.

### FR-8 Accessibility

WCAG 2.2 AA for forms and the landing page: labeled fields, error text tied with `aria-describedby`, keyboard order, visible focus, contrast, target size, reduced-motion respect.

---

## 8. Non-functional requirements

| ID | Requirement | Target |
|---|---|---|
| NFR-1 | LCP (mobile) | < 2.5s |
| NFR-2 | INP | < 200ms |
| NFR-3 | CLS | < 0.1 |
| NFR-4 | Accessibility | WCAG 2.2 AA; Lighthouse a11y ≥ 90 |
| NFR-5 | Contrast | Text ≥ 4.5:1; large text ≥ 3:1 |
| NFR-6 | Mobile | Usable at 320px; forms single column; tap targets ≥ 44px |
| NFR-7 | Security | HTTPS; honeypot and/or Turnstile; no secrets in client bundle |
| NFR-8 | Privacy | No third-party pixels beyond documented analytics / HubSpot |
| NFR-9 | Claim control | Automated grep audit against banned/hold language |
| NFR-10 | Deploy | Preview URL without production DNS; production cutover documented |

---

## 9. Design requirements

Calm, senior-operator editorial. This is a page for CMOs and owners who already buy media, not a growth-hacking collage.

- **Tone:** Unhurried, numerate, operator. No exclamation marks. No stock “up and to the right” hero collage, no gradient orbs, no fake dashboards.
- **Hierarchy:** H1 and thesis line carry the page. Proof chips are facts, not trophies.
- **Type:** Editorial serif for display; readable grotesque for UI and forms. Sentence-case headlines matching approved copy.
- **Color:** Ink / paper / one restrained metal accent. High contrast. Avoid neon growth-green.
- **Layout:** Generous measure (~65–72ch). Desktop two-column only where it helps (proof chips, A/B/C). Mobile stacks. Sticky or compact nav with Book session always reachable.
- **Imagery:** Optional abstract system diagram or typographic proof. No spokesperson photos (C08). No client logos besides wordmark text.
- **Forms:** Visible labels (not placeholder-only). Grouped fieldsets. Errors in text, not color alone. Success is a dedicated `/thanks` route.
- **Motion:** Subtle, optional, `prefers-reduced-motion` respected.

See `design/NOTES.md`.

---

## 10. Tech recommendations

Non-binding. Prefer speed and claim control.

| Option | When |
|---|---|
| Next.js App Router (this build) | Need a first-party `/api/lead` with HubSpot + fallback on one deploy |
| Astro | If the form is 100% Formspree / HubSpot embed and the page is static |
| Static HTML/CSS/JS | Fastest file-level claim audit; pair with Formspree |

**Hosting:** Vercel or Netlify.  
**Forms:** HubSpot Forms API v3 when portal ID + form GUIDs exist. Else Formspree-compatible POST. Else documented mock / email fallback that still validates every field.  
**Spam:** Honeypot required. Cloudflare Turnstile optional via env.  
**Domain:** `simplicityscaling.com` (preview OK if DNS is not pointed).

---

## 11. Definition of Done

### 11.1 Build checklist

Check items that are achievable without production DNS. Note DNS remaining.

- [x] Source files present: README, PRD, LP copy, CLAIMS, design notes
- [x] `/` renders every LP section in approved order with approved copy
- [x] Claim audit clean: USE C01–C03, C07, C09, C10; no C04 / C05 / C06 / C08
- [x] Soft form validates and submits (documented mock fallback; HubSpot when env is set)
- [x] Hard form validates, captures multi-channel + UTMs, flags `spend_below_floor`
- [x] Hard form does not enroll a marketing drip (`do_not_market=true`; no drip list)
- [x] Honeypot present; Turnstile optional via env
- [x] `/privacy` live
- [x] `/thanks` distinguishes soft vs hard
- [x] Case study is the only main-site CTA
- [x] Minimal nav: Book session + case study
- [x] Mobile layout usable; form a11y labeled
- [x] README documents stack, env vars, HubSpot property map, deploy, DNS cutover
- [x] Preview URL live (dev/preview host; production DNS not required)
- [ ] Production DNS / HTTPS on simplicityscaling.com — **remaining until Henry points DNS**
- [ ] Live HubSpot portal + form GUIDs — **remaining until Henry supplies secrets**
- [ ] Sales notification workflow / calendar — **remaining (ops, not this build)**

### 11.2 Success metrics (ops, not this build)

- Soft: scorecard requests from Optima list
- Hard: strategy sessions requested with spend ≥ $100k path
- Sales: referrals accepted by James
- Content: influenced calls attributed via UTM

---

## 12. Risks

| Risk | Mitigation |
|---|---|
| Claim drift (C04 revenue, C08 talent) | Claims register + CI grep; copy file is source of truth |
| HubSpot keys missing at ship | Validating fallback path; secrets documented |
| DNS not pointed | Preview URL satisfies build DoD; cutover notes in README |
| Under-$50k noise | Accept + flag; sales decides; do not drip |
| Main-site leakage | No homepage CTA; case study URL only |
| Form spam | Honeypot + optional Turnstile |
| Soft form over-promise | v1 captures request; PDF is later; copy says “one page” not “instant download” if PDF is absent |

---

## 13. Dependencies

- Approved LP copy v1 (done)
- Claims & Sources workbook / `claims/CLAIMS.md` (done)
- Domain registration: simplicityscaling.com (Henry)
- HubSpot portal ID, soft form GUID, hard form GUID, optional private app token (Frank / Henry)
- Optional: `FORMSPREE_FORM_ID`, `TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY`, `LEAD_NOTIFY_EMAIL`
- James / BD intake process and calendar (post-qualify)
- Optima LI / email creative (Content Factory; not this repo)
- Legal review if any new Optima asset is added later

---

## 14. Build phases

| Phase | Work |
|---|---|
| 0 | Repo docs: README, PRD, copy, claims, design notes |
| 1 | Scaffold site; IA routes; typography; nav/footer |
| 2 | LP sections from approved copy; claim audit |
| 3 | Soft + hard forms, UTMs, honeypot, thanks/privacy, fallback |
| 4 | Preview, a11y pass, README env/DNS, handoff |

Later (not v1): scorecard PDF, HubSpot drip for **soft** only, calendar embed, paid media.

---

## 15. Handoff package

When this build is done, Henry / Frank / James receive:

1. This PRD and checked §11.1
2. `content/lp-copy-v1.md` as implemented
3. `claims/CLAIMS.md` plus audit result
4. README: stack, env, HubSpot property map, deploy, DNS
5. Preview URL
6. Form payload examples (soft / hard / below-floor)
7. Remaining secrets and DNS steps owned by Henry

Sales packet after a hard submit (ops): who booked, spend band, category, what broke, UTMs, `spend_below_floor`, suggested wedge.

---

## 16. Decision log

| Date | Decision |
|---|---|
| 2026-09-03 | Qualified lead = referral sent to James; Henry alone sends outreach |
| 2026-09-09 | Content Factory Client #001 Brain created |
| 2026-09-10 | ICP Target Book / three archetypes locked |
| 2026-09-12 | Customer journey written; Ads That Don't Suck remains legacy |
| 2026-09-12 | Domain locked: simplicityscaling.com |
| 2026-09-12 | Funnel brief: Optima-led owned-domain funnel; main site reference-only |
| 2026-09-12 | LP copy v1 drafted and approved for build |
| 2026-09-12 | PRD v1.0 approved (HEN-344); Cursor cloud agent to implement HEN-343 |
| 2026-09-12 | Claim gate: USE C01–C03, C07, C09, C10; BANNED C04; HOLD C05, C06, C08 |
| 2026-09-12 | Hard form: no automated marketing drip |
| 2026-09-12 | Under $50k submits with `spend_below_floor` |

---

## 17. Claim gate (repeat)

USE: C01, C02, C03, C07, C09, C10.  
BANNED: C04 (no Optima revenue $ or multiples).  
HOLD: C05, C06, C08 (no Alan Thicke name / footage / jingle).

Case study URL (reference only): https://simplicitymedia.com/results/optima-tax-relief/
