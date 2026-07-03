# The Ameliorate Project — Build Plan

## Phase 2 (Deferred — Newsletter Admin & CMS)
Requested but not built yet. Resume when the user asks.

### Admin Dashboard (behind Lovable Cloud auth)
- Access model: TBD — user chose "Skip for now but record and save for later". Options later:
  email allowlist, first-user-is-admin, or role table.
- Routes: `/admin`, `/admin/subscribers`, `/admin/newsletters`, `/admin/newsletters/new`.
- Backend tables to add:
  - `subscribers` (id, email unique, source, tags text[], subscribed_at, unsubscribed_at, status)
  - `newsletters` (id, subject, html, preview_text, scheduled_at, sent_at, status, created_by)
  - `newsletter_sends` (id, newsletter_id, subscriber_email, status, resend_message_id, error, sent_at)
  - `user_roles` (id, user_id, role app_role)  — never on profiles.
- Features to build:
  - Subscribers: list, search, filter by tag/source, CSV export, remove.
  - Rich-text composer (Tiptap): images, buttons, links, headings, preview.
  - Send now or schedule (pg_cron worker via edge function).
  - Delivery status polling from Resend `/emails/:id` + webhook.
  - Segmenting by tag/preference groups.
  - "Send to Subscribers" button on each blog post & publication → auto-generates
    branded email with title, cover image, excerpt, "Read More" link.
  - Responsive Resend-hosted email template with logo, colors, footer, socials.

### Also deferred
- Subscribers table persistence in Cloud (currently we push directly to Resend Audience
  "Amelio Newsletter"; no local mirror).
- Rate limiting beyond per-instance memory (need a durable store).

## Phase 1 (Done)
- Newsletter Phase 1: signup forms on homepage, /newsletter page, footer, blog posts,
  research page. Edge function `newsletter-subscribe` → Resend Audience + welcome email.
- iOS 12 Safari: vite build target `es2017` + `safari12` for CSS/JS down-leveling.
- Get Involved hero + main hero image + swapped to Unsplash CDN.
- Privacy policy: newsletter subscriber-data clause added.
