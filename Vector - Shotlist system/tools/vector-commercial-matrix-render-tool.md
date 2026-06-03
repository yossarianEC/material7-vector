# Vector — Commercial Matrix Render Tool

Deterministic internal renderer for Material 7 commercial matrix pages.

## Principle

AI interprets.  
Code renders.  
GitHub publishes.

This tool is not the user-facing agent. It does not interview, improve copy, create strategy, create layouts, or publish by itself.

## Input

The tool receives one approved commercial matrix JSON object with these required fields:

```json
{
  "CLIENTE": "Cenit",
  "PROYECTO": "Campaña limpieza de piscinas",
  "FECHA": "Referencia actual",
  "RESUMEN_CORTO": "Guía breve para grabar comerciales sobre el servicio.",
  "INTRO_01": "...",
  "INTRO_02": "...",
  "INTRO_03": "...",
  "BENEFICIO_01": "...",
  "BENEFICIO_02": "...",
  "BENEFICIO_03": "...",
  "CTA_01": "...",
  "CTA_02": "...",
  "CTA_03": "..."
}
```

## Canonical template

```text
/Vector - Shotlist system/templates/commercial-matrix/material7-commercial-matrix-template.html
```

## Renderer

```text
/Vector - Shotlist system/renderers/vector-commercial-matrix-renderer.js
```

## Schema

```text
/Vector - Shotlist system/schemas/commercial-matrix.schema.json
```

## Output

The renderer returns complete HTML only after:

1. required fields exist,
2. placeholders are replaced,
3. the result starts with `<!DOCTYPE html>`,
4. the result ends with `</html>`,
5. no `{{PLACEHOLDER}}` tokens remain.

## Rules

- Do not store final HTML inside the user-facing agent.
- Do not paste the full HTML into a TinyCommand Transformer as the long-term source of truth.
- Use GitHub template + deterministic renderer as the canonical path.
- Do not publish without explicit user confirmation.
- Keep the commercial matrix small: 3 intros, 3 benefits, 3 CTAs.
- Do not rebuild the full AGNC shotlist workflow inside this tool.
