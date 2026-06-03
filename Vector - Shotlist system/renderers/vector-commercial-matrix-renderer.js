/*
  Vector — Commercial Matrix Renderer
  Deterministic placeholder renderer for Material 7 commercial matrix pages.

  Principle:
  - AI interprets.
  - Code renders.
  - GitHub publishes.

  This file validates approved matrix data and replaces known {{PLACEHOLDER}}
  tokens in the canonical commercial matrix template.
*/

const VECTOR_COMMERCIAL_MATRIX_REQUIRED_FIELDS = [
  'CLIENTE',
  'PROYECTO',
  'FECHA',
  'RESUMEN_CORTO',
  'AUDIENCIA',
  'EDAD_SUGERIDA',
  'INTRO_01',
  'INTRO_02',
  'INTRO_03',
  'BENEFICIO_01',
  'BENEFICIO_02',
  'BENEFICIO_03',
  'CTA_01',
  'CTA_02',
  'CTA_03'
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
  return VECTOR_COMMERCIAL_MATRIX_REQUIRED_FIELDS.filter((key) => normalizeValue(data[key]) === '');
}

function findUnreplacedPlaceholders(html) {
  const matches = html.match(/{{\s*[A-Z0-9_]+\s*}}/g) || [];
  return Array.from(new Set(matches));
}

function renderCommercialMatrix(template, data) {
  if (!template || typeof template !== 'string') {
    throw new Error('Missing canonical commercial matrix template string.');
  }

  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    throw new Error('Missing approved commercial matrix JSON object.');
  }

  const missingFields = getMissingRequiredFields(data);

  if (missingFields.length > 0) {
    return {
      ok: false,
      error: 'Missing required commercial matrix fields.',
      missingFields,
      unreplacedPlaceholders: [],
      html: null
    };
  }

  const html = template.replace(/{{\s*([A-Z0-9_]+)\s*}}/g, (_match, key) => {
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
    unreplacedPlaceholders,
    checks: {
      startsWithDoctype: startsCorrectly,
      endsWithHtml: endsCorrectly,
      hasResumenCorto: html.includes('class="resumen-corto"'),
      hasAudience: html.includes('Audiencia'),
      hasAge: html.includes('EDAD_SUGERIDA') === false,
      hasToolbar: html.includes('class="toolbar"'),
      hasPrintButton: html.includes('window.print()'),
      hasMaterial7Logo: html.includes('https://material7.com/studio/profile.jpg')
    }
  };
}

function renderCommercialMatrixHtml(template, data) {
  const result = renderCommercialMatrix(template, data);
  if (!result.ok) {
    throw new Error(JSON.stringify(result, null, 2));
  }
  return result.html;
}

if (typeof module !== 'undefined') {
  module.exports = {
    VECTOR_COMMERCIAL_MATRIX_REQUIRED_FIELDS,
    escapeHtml,
    normalizeValue,
    getMissingRequiredFields,
    findUnreplacedPlaceholders,
    renderCommercialMatrix,
    renderCommercialMatrixHtml
  };
}
