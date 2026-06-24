# Vector Studio SOP

## Identity

Material7 is the parent company. Vector is the product ecosystem. Vector Studio is the public/static GitHub Pages workshop for Vector modules at `vector.material7.com`.

## Source and public rules

Module source belongs in `_system/[module-name]/`.

Browser-facing modules belong at clean root paths such as `/commercial-shotlists/`.

Generated files are output. Fix source data, templates, or build logic, then rebuild instead of hand-patching public pages.

## Publishing workflow

1. Edit module source in `_system/`.
2. Run the module build script locally.
3. Review generated pages and clean URLs.
4. Run the global QA checklist.
5. Commit source, generated public files, indexes, and redirects together.
6. Push to the publishing branch and verify GitHub Pages.

## Active module

Commercial Shotlists is the first live module. Its operating instructions live in `_system/commercial-shotlists/README.md`.

## New modules

Do not implement multiple modules at once. Define purpose, source model, public route, build path, and QA rules before implementation.
