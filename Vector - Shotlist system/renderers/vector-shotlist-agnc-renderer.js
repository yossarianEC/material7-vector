/*
  Vector — Shotlist AGNC Renderer
  Deterministic placeholder renderer for Material 7 AGNC shotlists.

  Principle:
  - AI interprets.
  - Code renders.
  - GitHub publishes.

  This file does not generate strategy, copy, layout, CSS, or JS.
  It only replaces known {{PLACEHOLDER}} tokens in the canonical template.
*/

const VECTOR_AGNC_REQUIRED_FIELDS = [
  'CLIENTE',
  'FECHA',
  'RESUMEN_CORTO',
  'LOCACION',
  'HORA_INICIO',
  'PRIORIDAD_VISUAL',
  'SI_DECIR_01',
  'SI_DECIR_02',
  'SI_DECIR_03',
  'SI_DECIR_04',
  'NO_DECIR_01',
  'NO_DECIR_02',
  'NO_DECIR_03',
  'NO_DECIR_04',
  'INTRO_01_TITULO',
  'INTRO_01',
  'INTRO_02_TITULO',
  'INTRO_02',
  'INTRO_03_TITULO',
  'INTRO_03',
  'INTRO_04_TITULO',
  'INTRO_04',
  'BENEFICIO_01_TITULO',
  'BENEFICIO_01',
  'BENEFICIO_02_TITULO',
  'BENEFICIO_02',
  'BENEFICIO_03_TITULO',
  'BENEFICIO_03',
  'BENEFICIO_04_TITULO',
  'BENEFICIO_04',
  'CTA_01_TITULO',
  'CTA_01',
  'CTA_02_TITULO',
  'CTA_02',
  'CTA_03_TITULO',
  'CTA_03',
  'CTA_04_TITULO',
  'CTA_04',
  'BROLL_PRODUCTO',
  'BROLL_USO_PROCESO',
  'BROLL_DETALLE',
  'BROLL_CONTEXTO',
  'BROLL_CIERRE',
  'QUOTE_TEXT',
  'QUOTE_SOURCE'
];

const VECTOR_AGNC_RISKY_CLAIMS = [
  'garantiza',
  'garantizado',
  'garantizada',
  'garantizados',
  'guarantee',
  'guaranteed',
  'líder',
  'lider',
  'el mejor',
  'la mejor',
  'los mejores',
  'las mejores',
  'best',
  'best in market',
  'el más barato',
  'el mas barato',
  'la más barata',
  'la mas barata',
  'perfecto',
  'perfecta',
  'perfectos',
  'perfectas',
  'perfect',
  'impecable',
  'flawless',
  'pristine',
  'resultado asegurado',
  'resultado garantizado',
  'número uno',
  'numero uno',
  'number one',
  'superior',
  'permanente',
  'permanent',
  'eterno',
  'eterna',
  'forever',
  'como nuevo',
  'como nueva',
  'like new',
  'cliente satisfecho',
  'clientes satisfechos',
  'duradero',
  'duradera',
  'duraderos',
  'duraderas',
  'óptimas condiciones',
  'optimas condiciones',
  'seamless',
  'flawless finish',
  'perfect fit'
];

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function normalizeValue(value) {
  if (value === null || value === undefined) return '';
  return String(value).trim();
}

function getMissingRequiredFields(data) {
  return VECTOR_AGNC_REQUIRED_FIELDS.filter((key) => normalizeValue(data[key]) === '');
}

function findUnreplacedPlaceholders(html) {
  const matches = html.match(/{{\s*[A-Z0-9_]+\s*}}/g) || [];
  return Array.from(new Set(matches));
}

function findRiskyPositiveClaims(data) {
  const issues = [];

  Object.entries(data || {}).forEach(([key, rawValue]) => {
    const value = normalizeValue(rawValue);
    if (!value) return;

    // Risky terms are allowed inside NO_DECIR fields because those fields are explicit guardrails.
    if (key.startsWith('NO_DECIR_')) return;

    const lower = value.toLowerCase();
    VECTOR_AGNC_RISKY_CLAIMS.forEach((term) => {
      if (lower.includes(term.toLowerCase())) {
        issues.push({ field: key, term, value });
      }
    });
  });

  return issues;
}

function renderAgncShotlist(template, data, options = {}) {
  if (!template || typeof template !== 'string') {
    throw new Error('Missing canonical AGNC template string.');
  }

  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    throw new Error('Missing approved AGNC JSON object.');
  }

  const missingFields = getMissingRequiredFields(data);
  const riskyPositiveClaims = findRiskyPositiveClaims(data);
  const allowRiskyPositiveClaims = Boolean(options.allowRiskyPositiveClaims);

  if (riskyPositiveClaims.length > 0 && !allowRiskyPositiveClaims) {
    return {
      ok: false,
      error: 'Risky positive claims found. Renderer refused to create final HTML.',
      missingFields,
      riskyPositiveClaims,
      html: null
    };
  }

  let html = template.replace(/{{\s*([A-Z0-9_]+)\s*}}/g, (_match, key) => {
    const value = normalizeValue(data[key]);
    return value ? escapeHtml(value) : '[PENDIENTE]';
  });

  const unreplacedPlaceholders = findUnreplacedPlaceholders(html);

  const startsCorrectly = html.trimStart().startsWith('<!DOCTYPE html>');
  const endsCorrectly = html.trimEnd().endsWith('</html>');

  return {
    ok: startsCorrectly && endsCorrectly && unreplacedPlaceholders.length === 0,
    html,
    missingFields,
    riskyPositiveClaims,
    unreplacedPlaceholders,
    checks: {
      startsWithDoctype: startsCorrectly,
      endsWithHtml: endsCorrectly,
      hasCssLink: html.includes('/Vector%20-%20Shotlist%20system/assets/shotlists/material7-shotlist-agnc.css'),
      hasPrintScript: html.includes('/Vector%20-%20Shotlist%20system/assets/shotlists/material7-shotlist-print.js'),
      hasInlineStyleTag: /<style[\s>]/i.test(html),
      hasExternalCdn: /https?:\/\/(?!material7\.com\/wp-content\/images\/profile\.jpg)/i.test(html)
    }
  };
}

function renderAgncShotlistHtml(template, data, options = {}) {
  const result = renderAgncShotlist(template, data, options);
  if (!result.ok) {
    throw new Error(JSON.stringify(result, null, 2));
  }
  return result.html;
}

if (typeof module !== 'undefined') {
  module.exports = {
    VECTOR_AGNC_REQUIRED_FIELDS,
    VECTOR_AGNC_RISKY_CLAIMS,
    escapeHtml,
    renderAgncShotlist,
    renderAgncShotlistHtml,
    getMissingRequiredFields,
    findUnreplacedPlaceholders,
    findRiskyPositiveClaims
  };
}
