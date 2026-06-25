#!/usr/bin/env python3
"""Build the Vector Studio Commercial Shotlists public module."""

from __future__ import annotations

import html
import json
import re
import sys
import unicodedata
from pathlib import Path


SCRIPT_PATH = Path(__file__).resolve()
SOURCE_DIR = SCRIPT_PATH.parent
ROOT = SCRIPT_PATH.parents[2]
INTAKE_DIR = SOURCE_DIR / "intake"
DATA_DIR = SOURCE_DIR / "data"
TEMPLATE_PATH = SOURCE_DIR / "template.html"
PUBLIC_DIR = ROOT / "commercial-shotlists"
LEGACY_DIR = ROOT / "output" / "vector" / "products" / "commercial-shotlists"

DEFAULT_RECORDING_INSTRUCTIONS = (
    "Hable despacio y con pausas. Deje un segundo de silencio antes y después "
    "de cada frase para facilitar los cortes en edición."
)

LOOP_KEYS = (
    "aperturas",
    "beneficios",
    "ctas",
    "visual_notes",
    "audio_notes",
    "internal_notes",
    "client_notes",
)


def escape_html(value: object) -> str:
    return html.escape("" if value is None else str(value), quote=True)


def get_value(source: object, key: str) -> object:
    value = source
    for part in key.split("."):
        if not isinstance(value, dict):
            return ""
        value = value.get(part, "")
    return value


def render_values(block: str, values: dict[str, object]) -> str:
    pattern = re.compile(r"{{\s*([a-zA-Z0-9_.]+)\s*}}")
    return pattern.sub(lambda match: escape_html(get_value(values, match.group(1))), block)


def render_raw_values(block: str, values: dict[str, object]) -> str:
    pattern = re.compile(r"{{{\s*([a-zA-Z0-9_.]+)\s*}}}")
    return pattern.sub(lambda match: str(get_value(values, match.group(1))), block)


def render_conditionals(template: str, data: dict[str, object]) -> str:
    pattern = re.compile(
        r"{{#if\s+([a-zA-Z0-9_.]+)}}([\s\S]*?){{/if}}",
        re.MULTILINE,
    )

    def replace(match: re.Match[str]) -> str:
        value = get_value(data, match.group(1))
        should_render = bool(value)
        return match.group(2) if should_render else ""

    return pattern.sub(replace, template)


def render_loops(template: str, data: dict[str, object]) -> str:
    rendered = template
    for key in LOOP_KEYS:
        pattern = re.compile(r"{{#each\s+" + re.escape(key) + r"}}([\s\S]*?){{/each}}")
        items = data.get(key, [])
        if not isinstance(items, list):
            items = []

        def replace(match: re.Match[str], loop_items: list[object] = items) -> str:
            blocks: list[str] = []
            for index, item in enumerate(loop_items, start=1):
                if isinstance(item, dict):
                    values = {**item, "index": index}
                else:
                    values = {"this": item, "index": index}
                blocks.append(render_values(match.group(1), values))
            return "".join(blocks)

        rendered = pattern.sub(replace, rendered)
    return rendered


def render_template(template: str, data: dict[str, object]) -> str:
    data = {**data, "modifier_section_html": render_modifier_section(data.get("modifiers", []))}
    rendered = render_conditionals(template, data)
    rendered = render_loops(rendered, data)
    rendered = render_raw_values(rendered, data)
    rendered = render_values(rendered, data)
    rendered = re.sub(r"[ \t]+$", "", rendered, flags=re.MULTILINE)
    rendered = re.sub(r"\n{3,}", "\n\n", rendered)
    return rendered


def render_modifier_section(modifiers: object) -> str:
    if not isinstance(modifiers, list) or not modifiers:
        return ""

    modifier_cards: list[str] = []
    for modifier_index, modifier in enumerate(modifiers, start=1):
        if not isinstance(modifier, dict):
            continue

        variations = modifier.get("variations", [])
        variation_cards: list[str] = []
        if isinstance(variations, list):
            for variation_index, variation in enumerate(variations, start=1):
                if not isinstance(variation, dict):
                    continue
                variation_cards.append(
                    f'''
                <article class="modifier-variation" data-number="{escape_html(variation_index)}">
                  <p class="take-meta"><span>{escape_html(variation.get("id", ""))}</span><span>{escape_html(variation.get("label", ""))}</span></p>
                  <p class="take-text">&quot;{escape_html(variation.get("text", ""))}&quot;</p>
                  <p class="take-notes">{escape_html(variation.get("notes", ""))}</p>
                </article>'''
                )

        modifier_cards.append(
            f'''
            <article class="modifier-card">
              <div class="modifier-card__head">
                <p class="take-meta"><span>{escape_html(modifier.get("id", ""))}</span></p>
                <h3>{escape_html(modifier.get("label", ""))}</h3>
                <p class="modifier-usage">{escape_html(modifier.get("usage", ""))}</p>
              </div>
              <div class="modifier-variation-list">{''.join(variation_cards)}
              </div>
            </article>'''
        )

    if not modifier_cards:
        return ""

    return f'''
        <section class="section modifier-section">
          <div class="section-header"><h2>Bloque opcional: Modificadores</h2><span class="section-kicker modifier">Modificadores opcionales</span></div>
          <div class="modifier-list">{''.join(modifier_cards)}
          </div>
        </section>'''


def load_json(path: Path) -> dict[str, object]:
    try:
        value = json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as error:
        raise ValueError(f"Unable to read {path.relative_to(ROOT)}: {error}") from error
    if not isinstance(value, dict):
        raise ValueError(f"Expected a JSON object in {path.relative_to(ROOT)}")
    return value


def require_text(source: dict[str, object], field: str) -> str:
    value = source.get(field)
    if not isinstance(value, str) or not value.strip():
        raise ValueError(f"Missing required field: {field}")
    return value.strip()


def optional_text(source: dict[str, object], field: str) -> str:
    value = source.get(field)
    return value.strip() if isinstance(value, str) else ""


def read_notes(source: dict[str, object], field: str) -> list[str]:
    value = source.get(field, [])
    if not isinstance(value, list) or any(not isinstance(item, str) for item in value):
        raise ValueError(f"{field} must be an array of strings")
    return value


def normalize_id(value: str) -> str:
    normalized = unicodedata.normalize("NFD", value)
    normalized = "".join(char for char in normalized if unicodedata.category(char) != "Mn")
    normalized = normalized.lower()
    normalized = re.sub(r"[^a-z0-9]+", "-", normalized)
    return normalized.strip("-")


def build_copy_blocks(items: object, singular: str, field: str) -> list[dict[str, str]]:
    if not isinstance(items, list):
        raise ValueError(f"Missing required intake field: {field}")
    blocks: list[dict[str, str]] = []
    for item in items:
        if not isinstance(item, dict):
            continue
        text = item.get("text")
        if not isinstance(text, str) or not text.strip():
            continue
        block = {"id": f"{singular}-{len(blocks) + 1:02d}", "text": text.strip()}
        label = item.get("label")
        notes = item.get("notes")
        if isinstance(label, str) and label.strip():
            block["label"] = label.strip()
        if isinstance(notes, str) and notes.strip():
            block["notes"] = notes.strip()
        blocks.append(block)
    if not blocks:
        raise ValueError(f"At least one {singular} with text is required")
    return blocks


def build_modifiers(items: object) -> list[dict[str, object]]:
    if items is None:
        return []
    if not isinstance(items, list):
        raise ValueError("modifiers must be an array when present")

    modifiers: list[dict[str, object]] = []
    for modifier_index, item in enumerate(items, start=1):
        if not isinstance(item, dict):
            raise ValueError("Each modifier must be an object")

        label = item.get("label")
        if not isinstance(label, str) or not label.strip():
            raise ValueError(f"Modifier {modifier_index} is missing required label")

        variations = item.get("variations")
        if not isinstance(variations, list):
            raise ValueError(f"Modifier {modifier_index} must include variations")

        modifier_variations: list[dict[str, str]] = []
        for variation_index, variation in enumerate(variations, start=1):
            if not isinstance(variation, dict):
                raise ValueError(f"Modifier {modifier_index} variation {variation_index} must be an object")
            text = variation.get("text")
            if not isinstance(text, str) or not text.strip():
                continue
            built_variation = {
                "id": f"modifier-{modifier_index:02d}-variation-{len(modifier_variations) + 1:02d}",
                "text": text.strip(),
            }
            variation_label = variation.get("label")
            variation_notes = variation.get("notes")
            if isinstance(variation_label, str) and variation_label.strip():
                built_variation["label"] = variation_label.strip()
            if isinstance(variation_notes, str) and variation_notes.strip():
                built_variation["notes"] = variation_notes.strip()
            modifier_variations.append(built_variation)

        if not modifier_variations:
            raise ValueError(f"Modifier {modifier_index} must include at least one variation with text")

        modifier = {
            "id": f"modifier-{modifier_index:02d}",
            "label": label.strip(),
            "variations": modifier_variations,
        }
        usage = item.get("usage")
        if isinstance(usage, str) and usage.strip():
            modifier["usage"] = usage.strip()
        modifiers.append(modifier)

    return modifiers


def build_from_intake(intake_id: str) -> Path:
    if not re.fullmatch(r"_?[a-z0-9]+(?:-[a-z0-9]+)*", intake_id):
        raise ValueError("Intake id must use lowercase kebab-case without .json")
    intake_path = INTAKE_DIR / f"{intake_id}.json"
    intake = load_json(intake_path)
    client = require_text(intake, "client_name")
    campaign_topic = require_text(intake, "campaign_topic")
    project = require_text(intake, "project_name")
    date = require_text(intake, "date")
    audience_label = require_text(intake, "audience_label")
    if not re.fullmatch(r"\d{4}-\d{2}-\d{2}", date):
        raise ValueError("Date must use YYYY-MM-DD")
    shotlist_id = normalize_id(f"{client} {campaign_topic} {date}")
    shotlist = {
        "id": shotlist_id,
        "client": client,
        "project": project,
        "date": date,
        "audience": {
            "label": audience_label,
            "age_range": optional_text(intake, "audience_age_range"),
        },
        "summary": optional_text(intake, "summary"),
        "recording_instructions": (
            optional_text(intake, "recording_instructions")
            or DEFAULT_RECORDING_INSTRUCTIONS
        ),
        "aperturas": build_copy_blocks(intake.get("aperturas"), "apertura", "aperturas"),
        "beneficios": build_copy_blocks(intake.get("beneficios"), "beneficio", "beneficios"),
        "modifiers": build_modifiers(intake.get("modifiers")),
        "ctas": build_copy_blocks(intake.get("ctas"), "cta", "ctas"),
        "visual_notes": read_notes(intake, "visual_notes"),
        "audio_notes": read_notes(intake, "audio_notes"),
        "internal_notes": read_notes(intake, "internal_notes"),
        "client_notes": read_notes(intake, "client_notes"),
    }
    output_path = DATA_DIR / f"{shotlist_id}.json"
    output_path.write_text(json.dumps(shotlist, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Created shotlist data: {output_path.relative_to(ROOT).as_posix()}")
    return output_path


def validate_shotlist(data: dict[str, object], path: Path) -> None:
    for field in (
        "id",
        "client",
        "project",
        "date",
        "audience",
        "recording_instructions",
        "aperturas",
        "beneficios",
        "ctas",
    ):
        if field not in data:
            raise ValueError(f"{path.name} is missing required field: {field}")
    if path.name != f"{data['id']}.json":
        raise ValueError(f"{path.name} does not match its id: {data['id']}")


def public_slug(shotlist_id: str) -> str:
    return re.sub(r"-\d{4}-\d{2}-\d{2}$", "", shotlist_id)


def load_shotlists() -> list[dict[str, object]]:
    shotlists: list[dict[str, object]] = []
    for path in sorted(DATA_DIR.glob("*.json")):
        if path.name.startswith("_") or path.name == "example-commercial-shotlist.json":
            continue
        data = load_json(path)
        validate_shotlist(data, path)
        data["public_slug"] = public_slug(str(data["id"]))
        shotlists.append(data)
    slugs = [str(item["public_slug"]) for item in shotlists]
    if len(slugs) != len(set(slugs)):
        raise ValueError("Multiple shotlists resolve to the same clean public slug")
    return sorted(shotlists, key=lambda item: str(item["date"]), reverse=True)


def audience_text(shotlist: dict[str, object]) -> str:
    audience = shotlist.get("audience", {})
    if not isinstance(audience, dict):
        return ""
    values = [audience.get("label"), audience.get("age_range")]
    return " · ".join(str(value).strip() for value in values if isinstance(value, str) and value.strip())


def render_index(shotlists: list[dict[str, object]]) -> str:
    cards: list[str] = []
    for shotlist in shotlists:
        audience = audience_text(shotlist)
        summary = shotlist.get("summary") if isinstance(shotlist.get("summary"), str) else ""
        cards.append(
            f'''<article class="guide-card"><div class="guide-card__accent"></div><div class="guide-card__body">
              <p class="client-name">{escape_html(shotlist["client"])}</p>
              <h2>{escape_html(shotlist["project"])}</h2>
              <div class="guide-meta"><time datetime="{escape_html(shotlist["date"])}">{escape_html(shotlist["date"])}</time>{f'<span>{escape_html(audience)}</span>' if audience else ''}</div>
              {f'<p class="summary">{escape_html(summary)}</p>' if summary else ''}
              <a class="guide-link" href="./{escape_html(shotlist["public_slug"])}/">Abrir guía</a>
            </div></article>'''
        )
    return f'''<!--
Generated by Vector Studio Commercial Shotlists build.
Do not manually edit this file unless it is an emergency.
Source: _system/commercial-shotlists/data/
-->
<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><meta name="description" content="Guías comerciales generadas por Vector Studio." /><title>Commercial Shotlists · Vector Studio</title><link rel="stylesheet" href="/assets/css/main.css" /></head><body>
<div class="toolbar"><div class="toolbar-brand"><img class="toolbar-logo" src="/assets/logos/material7.jpg" alt="Material7" /><div><strong>Vector Studio - Guías comerciales</strong></div></div></div>
<main class="document"><section class="page"><div class="top-bar"></div><div class="page-inner"><div class="brand-bubble"><img src="/assets/logos/material7.jpg" alt="Material7" /></div><h1>Guías de grabación comercial</h1><p class="subtitle">Guías generadas para producción, grabación y revisión comercial.</p><div class="divider"></div><section class="guide-grid" aria-label="Guías comerciales disponibles">{''.join(cards)}</section><p class="system-note">Generated output from the Vector Commercial Shotlist System.</p></div></section></main></body></html>
'''


def redirect_html(target: str, title: str) -> str:
    canonical = f"https://vector.material7.com{target}"
    return f'''<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8" /><meta http-equiv="refresh" content="0; url={escape_html(target)}" /><link rel="canonical" href="{escape_html(canonical)}" /><title>{escape_html(title)}</title></head><body><p>Esta página se movió. <a href="{escape_html(target)}">Abrir la nueva ubicación</a>.</p></body></html>
'''


def build_public() -> None:
    template = TEMPLATE_PATH.read_text(encoding="utf-8")
    shotlists = load_shotlists()
    PUBLIC_DIR.mkdir(parents=True, exist_ok=True)
    LEGACY_DIR.mkdir(parents=True, exist_ok=True)
    for shotlist in shotlists:
        slug = str(shotlist["public_slug"])
        guide_dir = PUBLIC_DIR / slug
        guide_dir.mkdir(parents=True, exist_ok=True)
        guide_path = guide_dir / "index.html"
        guide_path.write_text(render_template(template, shotlist), encoding="utf-8")
        legacy_path = LEGACY_DIR / f"{shotlist['id']}.html"
        legacy_path.write_text(
            redirect_html(f"/commercial-shotlists/{slug}/", "Guía comercial movida"),
            encoding="utf-8",
        )
        print(f"Created guide: {guide_path.relative_to(ROOT).as_posix()}")
    (PUBLIC_DIR / "index.html").write_text(render_index(shotlists), encoding="utf-8")
    (LEGACY_DIR / "index.html").write_text(
        redirect_html("/commercial-shotlists/", "Commercial Shotlists moved"),
        encoding="utf-8",
    )
    (LEGACY_DIR / "example-commercial-shotlist.html").write_text(
        redirect_html("/commercial-shotlists/", "Example guide moved"),
        encoding="utf-8",
    )
    print(f"Created index: {(PUBLIC_DIR / 'index.html').relative_to(ROOT).as_posix()}")


def main() -> int:
    args = [arg for arg in sys.argv[1:] if arg != "--force"]
    if len(args) > 1:
        print("Usage: python _system/commercial-shotlists/build.py [intake-id] [--force]", file=sys.stderr)
        return 1
    try:
        if len(args) == 1:
            build_from_intake(args[0])
        build_public()
    except (OSError, ValueError) as error:
        print(f"Build failed: {error}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
