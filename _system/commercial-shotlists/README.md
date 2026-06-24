# Commercial Shotlists

Commercial Shotlists is the first live Vector Studio module. It converts structured campaign intake into client-safe commercial recording guides.

## Source layout

- `intake/` — operator intake JSON files.
- `data/` — structured shotlist JSON; this is the content source of truth.
- `template.html` — reusable client-facing guide template.
- `schema.json` — Commercial Shotlist JSON Schema.
- `build.py` — intake conversion, guide rendering, public index generation, and legacy redirects.

## Public output

- `/commercial-shotlists/` — generated module index.
- `/commercial-shotlists/[guide-slug]/` — generated clean guide URL.

Generated HTML is output, not source of truth. Do not hand-edit it unless it is an emergency.

## Create a new shotlist

1. Copy `intake/_starter-intake.json`.
2. Rename it with lowercase kebab-case.
3. Fill the required metadata, aperturas, beneficios, and CTAs.
4. Run from the repository root:

```bash
python _system/commercial-shotlists/build.py intake-file-id
```

The build creates or updates structured data, generates every public guide, refreshes the module index, and maintains old-link redirects.

To rebuild from existing structured data only:

```bash
python _system/commercial-shotlists/build.py
```

## QA

Before publishing:

- confirm client, project, date, and audience
- review aperturas, beneficios, and CTAs
- confirm no unresolved template tokens
- confirm internal notes are not visible
- check desktop, mobile, and print preview
- confirm the module index links to the correct clean URL
- confirm the legacy URL redirects to the clean URL

## Do not

- Do not treat generated HTML as source.
- Do not expose `internal_notes` publicly.
- Do not add fields outside the schema without updating `schema.json`.
- Do not restore legacy source folders or renderers.
