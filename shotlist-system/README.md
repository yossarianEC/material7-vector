# Legacy Shotlist System — Manual Builder

This folder is the older/manual V1 shotlist builder.

It is kept for reference and for any existing public/client-facing files that still depend on the old blue/green template flow.

## Canonical system

New AGNC shotlist work should use:

```txt
/Vector - Shotlist system/
```

That folder contains the current agent-led architecture:

```txt
AI interprets.
Code renders.
GitHub publishes.
```

## Legacy V1 structure

```txt
shotlist-system/
  data/
    example-shotlist.json
  docs/
    sop.md
  scripts/
    vector-shotlist-builder.js
  styles/
    material7-shotlist.css
  templates/
    blue.html
    green.html
```

## Legacy rule

Generate the blue internal shotlist first. Generate the green client/talent guide from the same structured data.

## Legacy publishing

Generated HTML files historically belong in:

```txt
/shotlists/
```

Public URL pattern:

```txt
https://studio.material7.com/shotlists/file-name.html
```

Do not delete `/shotlists/` while active client HTML still lives there.

## Legacy builder

Open:

```txt
/vector/shotlist-builder.html
```

Load the example JSON, edit campaign data, preview the blue and green documents, then download the generated HTML files.

## Cleanup note

This folder should not be expanded unless intentionally maintaining legacy output. Prefer improving the canonical Vector AGNC system instead.
