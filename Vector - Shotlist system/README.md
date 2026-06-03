# Vector — Commercial Matrix System

Vector Commercial Matrix System is the canonical agent-led commercial copy workflow for Material 7.

The user should never feel like they are filling a form. The user talks to the agent. The agent interprets, guides, structures, and prepares a small approved commercial matrix. Code then renders the approved data into the fixed Material 7 commercial matrix template and prepares it for GitHub publishing.

## Core principle

AI interprets.  
Code renders.  
GitHub publishes.

## Canonical status

This folder is now the source of truth for the current Vector Commercial Matrix workflow.

The old AGNC/full shotlist workflow has been removed from this folder. Public generated files may still exist elsewhere in the repository until they can be reproduced safely by the new system.

## Current flow

1. **Vector — Commercial Matrix Publisher** runs the conversation.
2. The agent asks one natural question at a time.
3. The agent collects only the required commercial context.
4. The agent asks what tone the commercial copy should use for the final customer: `usted` or `tú`.
5. The agent collects audience and suggested age.
6. The agent creates an approved matrix with exactly:
   - 3 intros
   - 3 benefits
   - 3 CTAs
7. The approved matrix becomes structured JSON.
8. The deterministic renderer fills the canonical Material 7 commercial matrix template.
9. The generated HTML is published only after explicit user confirmation.

## Required renderer fields

```text
CLIENTE
PROYECTO
FECHA
RESUMEN_CORTO
AUDIENCIA
EDAD_SUGERIDA
INTRO_01
INTRO_02
INTRO_03
BENEFICIO_01
BENEFICIO_02
BENEFICIO_03
CTA_01
CTA_02
CTA_03
```

Note: commercial copy tone (`usted` or `tú`) is an internal copywriting setting used by the agent to write intros, benefits, and CTAs. It is not a renderer field and should not appear in the HTML metadata.

## Folder map

```text
/Vector - Shotlist system/
  /templates/
    /commercial-matrix/
      material7-commercial-matrix-template.html

  /renderers/
    vector-commercial-matrix-renderer.js

  /schemas/
    commercial-matrix.schema.json

  /tools/
    vector-commercial-matrix-render-tool.md

  /data/
    /test/
      commercial matrix test JSON may go here

  /shotlists/
    generated source-output commercial matrix files may go here when intentionally kept with the system
```

## Role separation

### Vector — Commercial Matrix Publisher

Conversational. User-facing. Guided.

It asks questions, suggests defaults, prepares the commercial matrix, checks for approval, and asks again before publishing.

It does not manually generate final HTML.

### Vector — Commercial Matrix Render Tool

Hidden/internal. Deterministic. Not a chat experience.

It takes approved commercial matrix JSON, validates the data, fills the canonical template, and returns complete HTML.

It does not write strategy, rewrite copy, ask questions, create design, or publish by itself.

### GitHub Studio

Stores the system source of truth: templates, schemas, renderers, tool specs, test data, and generated outputs.

## Publishing policy

Do not publish without explicit confirmation.

Preferred clean public output path:

```text
/shotlists/[client-slug]-[project-slug].html
```

Preferred source/system output path when keeping generated output inside this folder:

```text
/Vector - Shotlist system/shotlists/[client-slug]/[project-slug]-commercial-matrix.html
```

Avoid publishing final public links from paths with spaces when a cleaner public route is available.

## Rules

- Do not make the user fill JSON manually. JSON is the handoff format, not the user interface.
- Do not generate HTML manually in the user-facing agent.
- Do not store final HTML inside the agent instructions.
- Do not use TinyCommand Transformer text boxes as the long-term source of truth for templates.
- Do not publish without explicit user confirmation.
- Do not overwrite existing generated files unless the user asks explicitly.
- Keep the system lightweight: 3 intros, 3 benefits, 3 CTAs.
- Do not create B-roll, shot lists, schedules, locations, start times, or production notes in this workflow.
- The renderer must remain deterministic: no strategy, no copywriting, no layout invention.
- The GitHub template is the canonical design source.
- The agent is the interviewer/operator, not the renderer.
