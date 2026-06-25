# New Commercial Shotlist SOP

## Purpose

This SOP explains how to create, render, review, publish, and share a new commercial shotlist using the Vector Commercial Shotlist System.

The system flow is:

```text
intake JSON
→ structured shotlist JSON
→ generated HTML
→ generated index
→ public link
```

## Folder paths

Intake files live here:

`data/vector/products/commercial-shotlists/intake/`

Structured shotlist JSON files are generated here:

`data/vector/products/commercial-shotlists/`

Generated HTML files are created here:

`output/vector/products/commercial-shotlists/`

The generated public index lives here:

`output/vector/products/commercial-shotlists/index.html`

## Step 1 — Create a new intake file

Copy the starter intake file:

`data/vector/products/commercial-shotlists/intake/_starter-intake.json`

Rename the copy using lowercase kebab-case.

Format:

`client-campaign-topic-yyyy-mm-dd.json`

Example:

`detail-sport-ppf-interior-2026-06-23.json`

## Step 2 — Fill the intake fields

Required fields:

- `client_name`
- `campaign_topic`
- `project_name`
- `date`
- `audience_label`
- at least one `apertura` with text
- at least one `beneficio` with text
- at least one `cta` with text

Optional fields:

- `audience_age_range`
- `summary`
- `recording_instructions`
- `visual_notes`
- `audio_notes`
- `internal_notes`
- `client_notes`

If `recording_instructions` is left empty, the builder uses the default recording instruction.

## Step 3 — Run the operator pipeline

From the repository root, run:

```bash
node scripts/vector/products/commercial-shotlists/build-and-render-commercial-shotlist.js intake-file-id
```

Omit `.json`.

Example:

```bash
node scripts/vector/products/commercial-shotlists/build-and-render-commercial-shotlist.js detail-sport-ppf-interior-2026-06-23
```

This creates or updates:

`data/vector/products/commercial-shotlists/detail-sport-ppf-interior-2026-06-23.json`

and:

`output/vector/products/commercial-shotlists/detail-sport-ppf-interior-2026-06-23.html`

The pipeline also refreshes:

`output/vector/products/commercial-shotlists/index.html`

## Step 4 — Open and review the generated HTML

Open the generated HTML file locally in the browser.

Check:

- Client name is correct.
- Project name is correct.
- Date is correct.
- Audience is correct.
- Aperturas are correct.
- Beneficios are correct.
- CTAs are correct.
- No unresolved template tokens are visible.
- Internal notes are not visible in the client-facing output.
- The page visually matches the Vector shotlist style.
- Print preview looks clean.

## Step 5 — Check the generated index

Open:

`output/vector/products/commercial-shotlists/index.html`

Confirm:

- The new shotlist appears.
- The newest shotlists are listed first.
- The button opens the correct guide.
- Starter, schema, intake, and example files are not shown as real client work.

## Step 6 — Commit and push

Commit these files:

- new intake JSON
- generated structured JSON
- generated HTML
- regenerated `index.html`

Commit message format:

`Add [client] [campaign/topic] commercial shotlist`

Example:

`Add Detail Sport PPF Interior commercial shotlist`

Push to main.

## Step 7 — Share public link

After GitHub Pages updates, use:

`https://vector.material7.com/output/vector/products/commercial-shotlists/file-id.html`

Example:

`https://vector.material7.com/output/vector/products/commercial-shotlists/detail-sport-ppf-interior-2026-06-23.html`

The public index is:

`https://vector.material7.com/output/vector/products/commercial-shotlists/`

## Rules

- Rebuild generated HTML from source whenever possible.
- Use structured JSON as the source of truth.
- Regenerate the index through the pipeline.
- Keep generated output clean, public-facing, and free of internal notes.

## Recovery rule

If generated output looks wrong, fix the source:

- intake JSON
- structured JSON
- template
- renderer

Then run the pipeline again.
