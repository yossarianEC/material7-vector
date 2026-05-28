# Vector — Shotlist System

Vector Shotlist System is the canonical agent-led production workflow for Material 7 AGNC internal shotlists.

The user should never feel like they are filling a form. The user talks to the agent. The agent interprets, improves, challenges, and structures the data. Code then renders the approved data into the fixed AGNC template and prepares it for GitHub publishing.

## Core principle

AI interprets.  
Code renders.  
GitHub publishes.

## Canonical status

This folder is the source of truth for the current Vector AGNC shotlist workflow.

Legacy/manual builder files may still exist elsewhere in the repository for reference or backward compatibility, but new AGNC work should be designed from this folder unless a specific legacy file is being maintained.

## Current flow

1. **Vector — Shotlist Master** runs the conversation.
2. The Master asks smart production questions and improves weak answers.
3. The Master converts the approved conversation into AGNC JSON.
4. The hidden AGNC render tool fills the canonical HTML template.
5. The generated HTML is saved only after explicit user confirmation.

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

  /quote-pools/
    agnc-production-quotes.json

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
    generated AGNC source-output shotlists may go here when intentionally kept with the system
```

## Role separation

### Vector — Shotlist Master

Conversational. Strategic. User-facing.

It asks questions, recommends better answers, turns messy production context into clean approved AGNC data, selects a safe internal quote from the AGNC quote pool, and asks for approval before render/publish.

### Vector — Shotlist AGNC Render Tool

Hidden/internal. Deterministic. Not a chat experience.

It takes approved AGNC JSON, validates the data, fills the canonical template, refuses risky positive claims, and returns complete HTML.

### GitHub Studio

Stores the system source of truth: templates, CSS, JS, schemas, renderers, quote pools, tool specs, and generated shotlists.

## Publishing policy

Do not publish without explicit confirmation.

Preferred clean public output path:

```text
/shotlists/agnc/[client-slug]/[project-slug].html
```

Preferred source/system output path when keeping generated AGNC output inside this folder:

```text
/Vector - Shotlist system/shotlists/[client-slug]/[project-slug]-agnc.html
```

Avoid publishing final public links from paths with spaces when a cleaner public route is available.

## Rules

- Do not make the user fill JSON manually. JSON is the handoff format, not the user interface.
- Do not generate HTML manually in the Master agent.
- Do not publish without explicit user confirmation.
- Do not overwrite existing generated shotlists unless the user asks explicitly.
- Do not use external/famous quotes unless they are intentionally approved for the system.
- Prefer Material 7 original lines from `/quote-pools/agnc-production-quotes.json`.
- The renderer must remain deterministic: no strategy, no copywriting, no layout invention.
