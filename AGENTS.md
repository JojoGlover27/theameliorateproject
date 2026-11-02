# Project architecture
- Keep TRANSform's invitation, impact figures, workshop recaps and resource records in one typed frontend data module; publish only approved events and verified resources to prevent accidental disclosure of drafts.
- Reuse the existing Amelio navigation, footer and UI controls for initiative pages; isolate initiative additions rather than rebuilding shared branding.
- Proxy Lovable's asset-serving path to the hosted app during Vite development; asset pointers remain same-origin in production while local previews can render the same CDN media.
- Use isolated TRANSform impact and recap views within the existing page; count up once with a static final-value fallback, render the recap gallery only from owner-supplied slides, and bundle those slide images with the site so they never depend on a separate image host.
