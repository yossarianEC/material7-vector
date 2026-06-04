const fs = require("fs");
const path = require("path");

const {
  renderCommercialMatrixHtml,
  getMissingRequiredFields
} = require("../renderers/vector-commercial-matrix-renderer.js");

const TEMPLATE_PATH = path.join(
  process.cwd(),
  "Vector - Shotlist system",
  "templates",
  "commercial-matrix",
  "material7-commercial-matrix-template.html"
);

const OUTPUT_ROOT = path.join(
  process.cwd(),
  "Vector - Shotlist system",
  "final_shotlists"
);

const OUTPUT_REPO_FOLDER = "Vector - Shotlist system/final_shotlists";

// TinyCommand may strip accented vowels entirely before the JSON reaches GitHub.
// Example: campaña -> campaa, instalación -> instalacin, más -> ms.
// Slugs stay ASCII, but visible commercial copy should repair common Spanish words.
const COMMON_SPANISH_ACCENT_REPAIRS = {
  // Missing-letter forms caused by stripped accented vowels / ñ.
  campaa: "campaña",
  campaas: "campañas",
  instalacin: "instalación",
  cotizacin: "cotización",
  revisin: "revisión",
  solucin: "solución",
  inversin: "inversión",
  opcin: "opción",
  opciones: "opciones",
  prctico: "práctico",
  prctica: "práctica",
  vehculo: "vehículo",
  vehculos: "vehículos",
  gua: "guía",
  guas: "guías",
  ms: "más",
  dao: "daño",
  daos: "daños",
  aos: "años",
  ao: "año",
  escribenos: "escríbenos",
  escrbenos: "escríbenos",
  electrnica: "electrónica",
  tcnico: "técnico",
  tcnica: "técnica",
  pgina: "página",
  pginas: "páginas",
  informacin: "información",
  descripcin: "descripción",
  produccin: "producción",
  comunicacin: "comunicación",
  promocin: "promoción",
  atencin: "atención",
  confirmacin: "confirmación",
  automatizacin: "automatización",
  catlogo: "catálogo",
  catlogos: "catálogos",
  cdigo: "código",
  cdigos: "códigos",
  tambin: "también",
  pas: "país",
  mvil: "móvil",
  rpido: "rápido",
  rpida: "rápida",
  bsico: "básico",
  bsica: "básica",
  botn: "botón",
  cmara: "cámara",
  mecnico: "mecánico",
  pblico: "público",
  pblica: "pública",
  crdito: "crédito",
  versin: "versión",
  edicin: "edición",
  diseo: "diseño",

  // Plain ASCII forms that should be accented in normal Spanish commercial copy.
  aereo: "aéreo",
  alicuota: "alícuota",
  alicuotas: "alícuotas",
  anos: "años",
  ano: "año",
  arbol: "árbol",
  area: "área",
  areas: "áreas",
  atencion: "atención",
  automatizacion: "automatización",
  basico: "básico",
  basica: "básica",
  boton: "botón",
  campana: "campaña",
  campanas: "campañas",
  camara: "cámara",
  catalogo: "catálogo",
  catalogos: "catálogos",
  codigo: "código",
  codigos: "códigos",
  comodin: "comodín",
  comunicacion: "comunicación",
  confirmacion: "confirmación",
  cotizacion: "cotización",
  cotizaciones: "cotizaciones",
  credito: "crédito",
  descripcion: "descripción",
  dia: "día",
  dias: "días",
  diseno: "diseño",
  edicion: "edición",
  electrico: "eléctrico",
  electronica: "electrónica",
  guia: "guía",
  guias: "guías",
  instalacion: "instalación",
  informacion: "información",
  inversion: "inversión",
  mas: "más",
  mecanico: "mecánico",
  movil: "móvil",
  opcion: "opción",
  pagina: "página",
  paginas: "páginas",
  pais: "país",
  practico: "práctico",
  practica: "práctica",
  produccion: "producción",
  promocion: "promoción",
  publico: "público",
  publica: "pública",
  rapido: "rápido",
  rapida: "rápida",
  revision: "revisión",
  solucion: "solución",
  telefono: "teléfono",
  tambien: "también",
  tecnico: "técnico",
  tecnica: "técnica",
  vehiculo: "vehículo",
  vehiculos: "vehículos",
  version: "versión",
  video: "video"
};

function fail(message) {
  console.error(message);
  process.exit(1);
}

function normalizeText(value) {
  return String(value ?? "").normalize("NFC").trim();
}

function applyOriginalCase(source, replacement) {
  if (source.toUpperCase() === source) {
    return replacement.toUpperCase();
  }

  if (source[0] && source[0].toUpperCase() === source[0]) {
    return replacement.charAt(0).toUpperCase() + replacement.slice(1);
  }

  return replacement;
}

function restoreCommonSpanishAccents(value) {
  let text = normalizeText(value);

  const repairEntries = Object.entries(COMMON_SPANISH_ACCENT_REPAIRS).sort(
    ([a], [b]) => b.length - a.length
  );

  for (const [plainWord, accentedWord] of repairEntries) {
    const pattern = new RegExp(`\\b${plainWord}\\b`, "gi");
    text = text.replace(pattern, (match) => applyOriginalCase(match, accentedWord));
  }

  return text;
}

function repairMatrixText(data) {
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return data;
  }

  const repaired = {};

  for (const [key, value] of Object.entries(data)) {
    repaired[key] = typeof value === "string" ? restoreCommonSpanishAccents(value) : value;
  }

  return repaired;
}

function slugify(value) {
  return normalizeText(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " y ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function getEcuadorTimestamp() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Guayaquil",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  }).formatToParts(new Date());

  const get = (type) => parts.find((part) => part.type === type)?.value || "";

  return `${get("year")}-${get("month")}-${get("day")}-${get("hour")}${get("minute")}`;
}

function parseMatrixJson(rawJson) {
  if (!rawJson || !normalizeText(rawJson)) {
    fail("approved_matrix_json is missing.");
  }

  try {
    return JSON.parse(rawJson);
  } catch (error) {
    fail(`approved_matrix_json is invalid JSON: ${error.message}`);
  }
}

function setGithubOutput(name, value) {
  const outputFile = process.env.GITHUB_OUTPUT;

  if (!outputFile) {
    console.log(`${name}=${value}`);
    return;
  }

  fs.appendFileSync(outputFile, `${name}<<EOF\n${value}\nEOF\n`);
}

const approvedMatrixJson = process.env.APPROVED_MATRIX_JSON;
const matrix = repairMatrixText(parseMatrixJson(approvedMatrixJson));

const missingFields = getMissingRequiredFields(matrix);

if (missingFields.length > 0) {
  fail(`Missing required commercial matrix fields: ${missingFields.join(", ")}`);
}

if (!fs.existsSync(TEMPLATE_PATH)) {
  fail(`Template not found at: ${TEMPLATE_PATH}`);
}

const template = fs.readFileSync(TEMPLATE_PATH, "utf8");
const html = renderCommercialMatrixHtml(template, matrix);

const clientSlug = slugify(matrix.CLIENTE);
const projectSlug = slugify(matrix.PROYECTO);
const timestamp = getEcuadorTimestamp();

if (!clientSlug || !projectSlug) {
  fail("Could not create valid client/project slug.");
}

const filePath = `${OUTPUT_REPO_FOLDER}/${clientSlug}-${projectSlug}-${timestamp}.html`;
const outputPath = path.join(process.cwd(), filePath);

fs.mkdirSync(OUTPUT_ROOT, { recursive: true });
fs.writeFileSync(outputPath, html, "utf8");

setGithubOutput("status", "published");
setGithubOutput("file_path", filePath);
setGithubOutput("message", "Commercial matrix rendered and written successfully.");
