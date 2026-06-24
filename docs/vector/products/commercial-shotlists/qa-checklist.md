# Commercial Shotlist QA Checklist

## Purpose

This checklist is used before publishing or sending a generated commercial shotlist.

## Data checks

* JSON file exists in `data/vector/products/commercial-shotlists/`.
* JSON id matches the filename.
* Required fields are present.
* Date uses `YYYY-MM-DD`.
* Audience label is present.
* Recording instructions are present.
* At least one apertura exists.
* At least one beneficio exists.
* At least one CTA exists.
* Copy blocks have clear ids.
* Copy text does not contain accidental placeholders.
* No real client data is placed in example files.

## Template checks

* Template exists in `templates/vector/products/commercial-shotlists/`.
* Template does not contain real campaign copy.
* Template uses renderer placeholders intentionally.
* Template does not reference old legacy paths.
* Template does not reference `Vector - Shotlist system`.
* Template does not reference old `shotlists` folders.

## Renderer checks

* Renderer runs from the repo root.
* Renderer accepts the shotlist id as an argument.
* Renderer reads JSON from the data folder.
* Renderer reads the shared template.
* Renderer writes HTML to the output folder.
* Renderer escapes HTML from JSON values.
* Renderer removes empty optional sections cleanly.
* Renderer leaves no unresolved placeholders in generated output.

## Visual checks

* Page loads in browser.
* Metadata cards display correctly.
* Instrucciones de grabación card displays correctly.
* Aperturas section displays correctly.
* Beneficios section displays correctly.
* CTAs section displays correctly.
* Pills read:

  * APERTURAS
  * BENEFICIOS
  * CIERRES
* Cards are readable.
* Layout works on desktop.
* Layout works on mobile.
* Print preview is clean.
* Generated page looks client-safe.

## Publishing checks

* Generated HTML is in `output/vector/products/commercial-shotlists/`.
* Output filename matches the shotlist id.
* Output file should not be manually edited unless it is an emergency.
* Commit includes source data, template changes if any, renderer changes if any, and generated output.

## Do-not rules

* Do not publish generated files with unresolved placeholders.
* Do not manually edit generated HTML as the normal workflow.
* Do not restore legacy folders.
* Do not create automation before manual rendering works reliably.
