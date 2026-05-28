# Vector — Shotlist AGNC Render Tool

## Purpose

This is the hidden/internal deterministic render tool for the Vector AGNC Shotlist System.

It receives approved AGNC JSON from **Vector — Shotlist Master**, validates it, fills the canonical Material 7 AGNC HTML template, and returns complete HTML ready for confirmed GitHub publishing.

The user should not interact with this tool directly.

## Core principle

AI interprets.  
Code renders.  
GitHub publishes.

## Inputs

The tool requires:

1. Approved AGNC JSON matching:

```text
/Vector - Shotlist system/schemas/agnc-shotlist.schema.json
```

2. Canonical template:

```text
/Vector - Shotlist system/templates/shotlists/material7-shotlist-agnc-template.html
```

3. Renderer logic:

```text
/Vector - Shotlist system/renderers/vector-shotlist-agnc-renderer.js
```

## Output

The tool returns complete HTML.

The returned HTML must:

- Start with `<!DOCTYPE html>`.
- End with `</html>`.
- Have no unreplaced `{{PLACEHOLDER}}` tokens.
- Include the canonical AGNC CSS link.
- Include the canonical print JS script.
- Escape user-provided values before insertion.
- Refuse risky positive claims unless an operator intentionally overrides the guardrail.

## Behavior rules

- Do not write strategy.
- Do not invent copy.
- Do not change layout.
- Do not add inline CSS.
- Do not add external CDNs.
- Do not publish by itself unless the surrounding tool flow has explicit user confirmation.
- Do not overwrite existing files unless the user explicitly requested an overwrite.

## Risky claims

Risky positive claims are allowed only in `NO_DECIR_*` fields because those fields describe what must not be said.

If risky terms appear in positive/content fields, the render should fail and return the risky field, term, and value.

## Preferred publishing paths

Clean public output path:

```text
/shotlists/agnc/[client-slug]/[project-slug].html
```

System-local output path when intentionally keeping generated AGNC output with the Vector source:

```text
/Vector - Shotlist system/shotlists/[client-slug]/[project-slug]-agnc.html
```

Avoid public URLs with spaces when a cleaner route is available.

## Failure conditions

The tool fails if:

- Approved AGNC JSON is missing.
- Required fields are empty.
- Risky positive claims are detected outside `NO_DECIR_*`.
- The template is missing.
- Placeholders remain unreplaced.
- Output does not start/end as a complete HTML document.
- The canonical CSS or print JS references are missing.

## Non-goals

This tool is not the Master agent.

It does not ask questions, improve production strategy, select quotes, rewrite copy, or decide what should be published.
