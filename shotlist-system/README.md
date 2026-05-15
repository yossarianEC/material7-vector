# Vector Shotlist System

Vector is the Material 7 master panel. This folder contains the reusable shotlist system that powers client-facing documents published through `studio.material7.com`.

## V1 Structure

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

## Core Rule

Generate the blue internal shotlist first. Generate the green client/talent guide from the same structured data.

## Publishing

Generated HTML files belong in:

```txt
/shotlists/
```

Public URL pattern:

```txt
https://studio.material7.com/shotlists/file-name.html
```

## Builder

Open:

```txt
/vector/shotlist-builder.html
```

Load the example JSON, edit campaign data, preview the blue and green documents, then download the generated HTML files.
