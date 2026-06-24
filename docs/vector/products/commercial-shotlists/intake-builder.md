# Commercial Shotlist Intake Builder

## Purpose

The intake builder is a bridge between future forms, spreadsheets, CRMs, or internal intake tools and the Commercial Shotlist data model.

Intake JSON contains simpler operator or client answers. It does not create HTML.

The builder converts those answers into valid Commercial Shotlist JSON. The renderer can create HTML from that shotlist data later.

## Pipeline

```text
intake JSON
→ intake builder
→ commercial shotlist JSON
→ renderer
→ generated HTML
```

## Input path

Intake files live in:

`data/vector/products/commercial-shotlists/intake/`

Start from `_starter-intake.json`, copy it, and rename the copy using lowercase kebab-case.

## Output path

The builder writes structured shotlist data to:

`data/vector/products/commercial-shotlists/`

It does not write to the HTML output folder and does not run the renderer automatically.

## Build command

Run the builder from the repository root and pass the intake filename without `.json`:

```bash
node scripts/vector/products/commercial-shotlists/build-shotlist-from-intake.js intake-id-here
```

Starter example:

```bash
node scripts/vector/products/commercial-shotlists/build-shotlist-from-intake.js _starter-intake
```

After reviewing the generated shotlist JSON, render it separately with its generated id:

```bash
node scripts/vector/products/commercial-shotlists/render-commercial-shotlist.js generated-shotlist-id
```

## ID generation

The builder generates the shotlist id from:

```text
client_name + campaign_topic + date
```

It converts the result to lowercase, removes accents and punctuation, replaces spaces with hyphens, collapses duplicate hyphens, and trims leading or trailing hyphens.

Example:

```text
Detail Sport + PPF Interior + 2026-06-23
→ detail-sport-ppf-interior-2026-06-23
```

The generated id becomes both the JSON `id` and the output data filename.

## Builder behavior

The builder:

* validates required intake fields
* removes copy blocks with empty text
* requires at least one apertura, one beneficio, and one CTA with text
* generates sequential copy-block ids
* keeps labels when provided
* applies the default recording instructions when the intake value is empty
* creates shotlist data only

If a shotlist data file with the generated id already exists, the builder stops instead of overwriting it.
