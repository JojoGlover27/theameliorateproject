This request bundles ~12 distinct workstreams. Before I start writing code, a few decisions materially affect scope, cost, and quality — flagging them here.

## What I will build (once you confirm)

### 1. Community Voices — rewrite
- Remove "lightly edited" line, disclaimer, and per-card "Community member · Needs assessment respondent, 2025" attribution.
- Swap "I will recommend the platform only if…" for "I am always afraid of going to the place where I take my ARVs."
- Add the 6 new quotes you listed (total ~11 quotes).
- Rebuild as a premium 3-up circular carousel: center card larger + glowing gold border, side cards smaller/faded, arrows, dots, swipe, keyboard nav, 8s autoplay with hover/touch pause and a visible pause button (a11y).
- Quotes centralized in `src/data/testimonials.ts` so you can edit/add/reorder without touching the component ("CMS-ready" — full CMS would require Lovable Cloud; flag below).
- New intro paragraph you supplied. New footer copy + "Read the Full Needs Assessment" button linking to the new `/research/access-safety-anonymity-ghana` page.

### 2. Downloads section
- Remove all audience lines ("For donors, allies…", etc.) from the 3 cards.
- Replace generic file icon with a modern red PDF glyph.
- Move the whole Downloads block out of the homepage into the Resources page ("Information & Resources"). Remove from `Index.tsx`.

### 3. Footer + socials
- Instagram → `@amelioproject` (https://instagram.com/amelioproject)
- Facebook → `@amelioproject` (link kept as icon-only)
- Add TikTok `@amelioproject` (https://tiktok.com/@amelioproject)
- LinkedIn → https://www.linkedin.com/company/amelioproject
- Icon-only chips (no handle text), all open in new tab.
- Add NGO reg ID `CG004780126` and street address `PLT 12 BLK D, Apatrapa – Kumasi, Ghana` and `info@ameliorateproject.org` to the footer.

### 4. Tawk.to overlap
- Move BackToTop to `bottom-24 left-6` (opposite side from Tawk widget) so it never collides.

### 5. JSON-LD (NGO)
- Replace/augment the existing Organization JSON-LD in `index.html` with the NGO schema you provided.
- Fill `sameAs` with the confirmed IG/TikTok/FB/X/LinkedIn URLs.
- Use the live logo asset already in the repo (`ameliorate-logo.png`) for `logo`; use one Synapse/brand image for `image`. **No founder/Person tags.**
- Google Search Console reindex request is a manual step you'll need to do — I can't trigger it.

### 6. Our Team section
- Placed after FAQ on the homepage.
- Full-width Unsplash photo of an African community team, with **CSS-blurred faces** via an overlay technique. Honest caveat: CSS blur can't perfectly track faces — it will either blur the whole image softly, or I apply blur to detected face regions manually per-image. Best I can do without a face-detection pipeline is: pick an Unsplash photo where faces are already small/back-turned/silhouetted, then apply a soft targeted blur mask. **See question below.**
- Copy + "Get Involved" button → `/get-involved` (you have that page; "contact" section lives inside it).

### 7. Research & Publications hub
- New route `/research` with heading, intro, and category tabs. Only "Working Papers" and "Research Reports" active; others greyed with "Coming Soon" tooltip.
- New route `/research/access-safety-anonymity-ghana` — full needs assessment page with all sections, styled stat cards, demographics table, pull quotes with gold left border, citation box, citation notification form, sharing section, related publications link.
- New route `/research/anonymity-clinical-necessity` — full working paper with abstract, keyword tags, stat cards, feature blocks, references, author bio, AI + medical disclaimers, citation box, form, sharing, related.
- Brand palette applied on these pages only: `#3C14A0` deep purple, `#F0A028` gold, `#1428A0` royal blue (as scoped tokens on the research routes so I don't repaint the whole site).
- Add "Research" link to nav + footer.
- Citation notification form: submits via `mailto:info@ameliorateproject.org` with a pre-formatted body (no backend needed). If you want real form delivery I need to enable Lovable Cloud + an email edge function — flagging below.

### 8. Replace AI images with Unsplash — see big caveat below
- Blog covers, Get Involved hero, and any other AI-generated art swapped for Unsplash photos, loaded via Unsplash's CDN with `loading="lazy"`, `decoding="async"`, responsive `srcset`.

### 9. Performance pass for low-end Android / 2G-3G
- Add `loading="lazy" decoding="async"` to all non-LCP images; keep hero eager with `fetchpriority="high"`.
- Add `<link rel="preload" as="image">` for the LCP hero.
- Convert bundled JPGs to WebP + AVIF via `vite-imagetools` where practical.
- Reduce animation intensity: gate expensive framer-motion / entrance animations behind `prefers-reduced-motion` and simplify the rotating keywords bar.
- Route-level code-splitting: lazy-load `Blog`, `BlogPost`, `Research*`, `Media`, `Resources`, `GetInvolved`, `PrivacyPolicy`, `OurStory` via `React.lazy` — homepage bundle only ships Index deps.
- Remove any unused shadcn components from the bundle (tree-shaken already, but verify).

### 10. Add `info@ameliorateproject.org` to Contact section + footer + research pages.

---

## Questions I need answered before I start

**Q1 — Unsplash images and licensing.** Unsplash photos are free to use but I can't browse Unsplash from here or verify a specific photo's URL is stable. Two options:
- **(a) I hotlink Unsplash CDN URLs I select by search intent** — fastest, but if the photo is later removed by the photographer the image breaks.
- **(b) You paste 4–6 specific Unsplash URLs** (Team, needs-assessment cover, working-paper cover, get-involved hero, 2 blog covers) — most reliable.
- **(c) I keep the existing AI illustrations for now and only swap them once you supply URLs** — safe, but delays the "no AI images" goal.

**Q2 — Face blurring on the Team photo.** Without a face-detection pipeline I can't guarantee every face is blurred. Acceptable options:
- **(a) Pick an Unsplash photo where faces are naturally obscured** (back-turned, silhouette, hands only, wide shot). Recommended.
- **(b) Apply a global soft blur/desaturate to the whole image** (all faces safe, but photo loses impact).
- **(c) You supply the photo with faces already blurred** and I just place it.

**Q3 — Citation notification forms.** Two forms (one per research paper) collecting name/email/etc. Options:
- **(a) `mailto:` — opens the user's email client pre-filled with all fields.** No backend, works today. Downside: requires the user to have a configured mail app.
- **(b) Real form submission via Lovable Cloud edge function that emails info@ameliorateproject.org.** Requires enabling Lovable Cloud (free, one click) + a Resend API key from you.

**Q4 — "CMS integration" for testimonials.** True CMS = admin UI + DB. Options:
- **(a) Quotes live in a TypeScript file you (or I) edit** — zero infra, no login, quick.
- **(b) Full CMS via Lovable Cloud** — DB table + admin page behind login. Bigger build; needs Cloud enabled.

**Q5 — Confirm social URLs.** I'll use these unless you correct any:
- IG: `https://instagram.com/amelioproject`
- TikTok: `https://tiktok.com/@amelioproject`
- FB: keep existing `https://www.facebook.com/share/1EHfmvmVx/` **or** switch to `https://facebook.com/amelioproject`?
- LinkedIn: `https://www.linkedin.com/company/amelioproject`
- X: keep `https://x.com/amelioproject`

**Q6 — Scope check.** This is genuinely a lot. I can ship it as one large update, or split into two rounds:
- Round 1: Community Voices carousel, downloads/footer/socials/NGO details/JSON-LD/Tawk fix/Team section (~½ the work, immediately visible).
- Round 2: Research hub + two full publication pages + performance pass + image swap.

Do you want it all in one go, or split?

---

## Technical notes (skippable)

- Research pages use scoped CSS vars (`--research-purple`, etc.) inside a wrapper class so the site-wide theme stays intact.
- Carousel built on `embla-carousel-react` (already installed via shadcn) with autoplay plugin; respects `prefers-reduced-motion`.
- All new routes registered in `App.tsx` above the catch-all.
- Sitemap.xml updated with the 3 new research URLs.
- Meta tags per research route via `react-helmet-async` (needs install).
- `vite-imagetools` install for AVIF/WebP.

Please answer Q1–Q6 (short answers are fine) and I'll build.