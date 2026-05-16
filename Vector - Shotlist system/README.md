# Vector — Shotlist System

Vector Shotlist System is an agent-led production workflow for Material 7 shotlists.

The user should never feel like they are filling a form. The user talks to the agent. The agent interprets, improves, challenges, and structures the data. Code then renders the approved data into the fixed AGNC template and prepares it for GitHub publishing.

## Core principle

AI interprets.  
Code renders.  
GitHub publishes.

## Current flow

1. **Vector — Shotlist Master** runs the conversation.
2. The Master asks smart production questions and improves weak answers.
3. The Master converts the approved conversation into AGNC JSON.
4. The hidden AGNC render tool fills the canonical HTML template.
5. The generated HTML is saved under `/Vector - Shotlist system/shotlists/`.

## Folder map

```text
/Vector - Shotlist system/
  /agents/
    vector-shotlist-master-instructions.md

  /assets/
    /shotlists/
      material7-shotlist-agnc.css
      material7-shotlist-print.js

  /data/
    /test/
      agnc-detail-sport-ppf-ferrari-812.json

  /renderers/
    vector-shotlist-agnc-renderer.js

  /schemas/
    agnc-shotlist.schema.json

  /templates/
    /shotlists/
      material7-shotlist-agnc-template.html

  /tools/
    vector-shotlist-agnc-render-tool.md

  /shotlists/
    generated shotlists go here
```

## Role separation

### Vector — Shotlist Master

Conversational. Strategic. User-facing.

It asks questions, recommends better answers, turns messy production context into clean approved AGNC data, and asks for approval before render/publish.

### Vector — Shotlist AGNC Render Tool

Hidden/internal. Deterministic. Not a chat experience.

It takes approved AGNC JSON, fills the canonical template, and returns complete HTML.

### GitHub Studio

Stores the system source of truth: templates, CSS, JS, schemas, renderers, and generated shotlists.

## Rule

Do not make the user fill JSON manually. JSON is the handoff format, not the user interface.
