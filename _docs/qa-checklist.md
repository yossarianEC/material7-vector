# Vector QA Checklist

## Domain and branding

- `vector.material7.com` loads.
- Homepage title and header say Vector.
- Material7 is described only as the parent company or logo brand.

## Public routes

- Homepage Commercial Shotlists card opens `/commercial-shotlists/`.
- Commercial Shotlists index lists real guides newest first.
- Every guide opens at `/commercial-shotlists/[guide-slug]/`.
- Old output URLs redirect to their clean replacements.

## Visual and functional QA

- Current Material7 logo loads.
- Shared CSS and image paths are not broken.
- Desktop and mobile layouts remain readable.
- Guide print button works.
- Print preview is clean.
- No unresolved template tokens appear.
- No internal notes appear on public pages.

## Build QA

- `python _system/commercial-shotlists/build.py` succeeds.
- The build regenerates guides and the Commercial Shotlists index.
- Structured data remains the source of truth.
- Generated pages are not hand-patched.
