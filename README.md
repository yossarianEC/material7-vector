# Material 7 Studio

Material 7 Studio is the working repository for Vector-related publishing tools, templates, renderers, and generated commercial assets.

## Current active system

### Vector — Commercial Matrix Publisher

The active workflow creates a commercial recording matrix with:

- 3 intros
- 3 benefits
- 3 CTAs

The user approves the final matrix inside the Vector agent. After approval, the agent calls the `publish_commercial_matrix` TinyAction, which triggers the GitHub Actions workflow and publishes the rendered HTML output.

## Publishing architecture

The current architecture is intentionally simple:

```text
User approval
→ Vector agent
→ publish_commercial_matrix TinyAction
→ GitHub workflow_dispatch
→ renderer script
→ final HTML output
```

Key rule:

```text
AI interprets.
Code renders.
GitHub publishes.
```

The agent does not render HTML directly. It only collects, structures, and passes approved fields to the publishing tool.

## GitHub workflow

Active workflow:

```text
.github/workflows/publish-commercial-matrix.yml
```

The workflow accepts the commercial matrix as separate `workflow_dispatch` inputs:

- `CLIENTE`
- `PROYECTO`
- `FECHA`
- `RESUMEN_CORTO`
- `AUDIENCIA`
- `EDAD_SUGERIDA`
- `INTRO_01`
- `INTRO_02`
- `INTRO_03`
- `BENEFICIO_01`
- `BENEFICIO_02`
- `BENEFICIO_03`
- `CTA_01`
- `CTA_02`
- `CTA_03`

This avoids the older fragile JSON-inside-JSON payload pattern.

## Renderer

Publishing script:

```text
Vector - Shotlist system/scripts/publish-commercial-matrix.js
```

Renderer module:

```text
Vector - Shotlist system/renderers/vector-commercial-matrix-renderer.js
```

Template:

```text
Vector - Shotlist system/templates/commercial-matrix/material7-commercial-matrix-template.html
```

The script builds the matrix from GitHub workflow inputs, repairs common stripped Spanish accents when needed, renders the HTML, and writes the final file.

## Output folder

New generated commercial matrices are published to:

```text
Vector - Shotlist system/final_shotlists/
```

The old root `/shotlists` folder contains legacy outputs and should not be used for new commercial matrix publishing.

## TinyAction contract

Tool name:

```text
publish_commercial_matrix
```

The tool should be called only after the user explicitly approves the final matrix.

Required safety input:

```text
approved_to_publish = yes
```

The TinyAction should pass the 15 approved matrix fields directly into the GitHub workflow inputs. Do not send a single JSON blob or markdown block.

## Notes

- Preserve approved copy exactly during publishing.
- Do not rewrite, summarize, translate, or improve copy after approval.
- Keep Spanish accents/tildes in visible commercial copy.
- Slugs and filenames may remain ASCII-safe.
- Generated HTML files are committed automatically by GitHub Actions.
