# Commercial Shotlist Operator Pipeline

## Purpose

The operator pipeline runs the complete local Commercial Shotlist build in one command:

```text
intake JSON
→ commercial shotlist JSON
→ generated HTML output
```

It calls the existing intake builder first and the existing HTML renderer second. This is a local operator tool, not GitHub automation.

## Intake files

Intake files live in:

`data/vector/products/commercial-shotlists/intake/`

Pass the intake filename without `.json` to the pipeline command.

## Shotlist data

The intake builder creates structured Commercial Shotlist JSON in:

`data/vector/products/commercial-shotlists/`

The generated id becomes the JSON filename. This data file is the source of truth for the shotlist.

## Generated HTML

The renderer creates the client-facing HTML in:

`output/vector/products/commercial-shotlists/`

Generated HTML is output, not source of truth. Do not manually edit it as the normal workflow.

## Command

Run the pipeline from the repository root:

```bash
node scripts/vector/products/commercial-shotlists/build-and-render-commercial-shotlist.js intake-id-here
```

Starter example:

```bash
node scripts/vector/products/commercial-shotlists/build-and-render-commercial-shotlist.js _starter-intake
```

The command prints the generated shotlist JSON path and generated HTML path when both steps succeed.

## Collision protection

The pipeline stops if the target shotlist JSON or generated HTML already exists. This prevents accidental overwrites and conflicting files.

Use a distinct intake identity for a new shotlist. If rebuilding an existing shotlist is intentional, review and manage the existing source and output files before running the pipeline again.

## QA before publishing

Open the generated HTML in a browser and run the Commercial Shotlist QA checklist before publishing or sending it.

QA documentation:

`docs/vector/products/commercial-shotlists/qa-checklist.md`
