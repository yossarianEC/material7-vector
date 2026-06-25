# Vector

Vector is the public/static publishing layer for modules in the Vector product ecosystem.

- **Domain:** `vector.material7.com`
- **Parent company:** Material7
- **Product ecosystem:** Vector
- **Active module:** Commercial Shotlists

## Structure

- `commercial-shotlists/` — public Commercial Shotlists index and clean guide URLs.
- `nano/` — Vector Nano public module placeholder.
- `diagnostics/` — Diagnostics public module placeholder.
- `client-systems/` — Client Systems public module placeholder.
- `assets/` — shared public CSS, JavaScript, images, and logos.
- `_system/` — source files and build tools organized by module.
- `_docs/` — global Vector operating and QA documentation.

## Source rule

The source of truth for each module lives in `_system/[module-name]/`.

Generated browser-facing files are outputs. Do not hand-edit generated module pages unless it is an emergency.

## Public rule

Browser-facing modules use clean root paths such as `/commercial-shotlists/`.

Legacy URLs may remain only as lightweight redirects to preserve existing links.

## Commercial Shotlists build

From the repository root:

```bash
python _system/commercial-shotlists/build.py
```

To convert one intake file and rebuild the public module:

```bash
python _system/commercial-shotlists/build.py intake-file-id
```
