# Project architecture
- Keep TRANSform's invitation, workshop records and resource records in one typed frontend data module; publish only approved events and verified resources to prevent accidental disclosure of drafts.
- Reuse the existing Amelio navigation, footer and UI controls for initiative pages; isolate initiative additions rather than rebuilding shared branding.
- Proxy Lovable's asset-serving path to the hosted app during Vite development; asset pointers remain same-origin in production while local previews can render the same CDN media.