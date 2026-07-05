# The Ameliorate Project — Build Plan

## Phase 2 (Done — Newsletter Admin & CMS)

### Admin Dashboard (behind Lovable Cloud auth)
- Access model: **email allowlist** — automatically promotes verified users with
  `info@ameliorateproject.org` or `richeagle365@gmail.com` to admin via
  `grant_admin_for_allowlisted_email` trigger.
- Routes: `/admin/login`, `/admin`, `/admin/subscribers`, `/admin/newsletters`,
  `/admin/newsletters/new`, `/admin/newsletters/:id`.
- Backend tables: `user_roles` (with `app_role` enum + `has_role` security-definer
  helper), `subscribers`, `newsletters`, `newsletter_sends`. All RLS-locked to
  admins.
- Features shipped:
  - Overview dashboard (active / total subscribers, drafts, sent counts).
  - Subscribers: list, search, status filter, CSV export, remove.
  - Rich-text composer (Tiptap): H2/H3, bold/italic, lists, quote, links,
    images, styled CTA buttons. Live email preview panel.
  - Send Now via `send-newsletter` edge function (admin-verified, ~120ms throttle,
    per-recipient logging to `newsletter_sends`).
  - "Send test" to arbitrary email.
  - "Send to Subscribers" button on each blog post (admin-only) that prefills
    a new newsletter draft from the blog post's title, excerpt, cover image,
    and adds a Read More button linking back to the site.
  - Branded Resend-hosted template with logo header, cover image, footer,
    List-Unsubscribe header.
- `newsletter-subscribe` edge function now also mirrors signups into the
  local `subscribers` table via service role.

### Deferred (not requested)
- Scheduling (Send Now only for now).
- Tag-based segmenting UI.
- Resend webhook for bounce/complaint status back into `newsletter_sends`.
- Rate limiting across edge instances (currently per-instance memory).

## Phase 1 (Done)
- Newsletter Phase 1: signup forms on homepage, /newsletter page, footer, blog
  posts, research page. Edge function `newsletter-subscribe` → Resend Audience
  + welcome email.
- iOS 12 Safari: vite build target `es2017` + `safari12` for CSS/JS down-leveling.
- Get Involved hero + main hero image + swapped to Unsplash CDN.
- Privacy policy: newsletter subscriber-data clause added.
