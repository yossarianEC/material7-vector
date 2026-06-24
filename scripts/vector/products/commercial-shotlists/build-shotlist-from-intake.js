const fs = require("fs");
const path = require("path");

const intakeId = process.argv[2];

if (!intakeId) {
  console.error(
    "Missing intake id. Usage: node scripts/vector/products/commercial-shotlists/build-shotlist-from-intake.js <intake-id>",
  );
  process.exit(1);
}

if (!/^_?[a-z0-9]+(?:-[a-z0-9]+)*$/.test(intakeId)) {
  console.error("Invalid intake id. Use lowercase kebab-case without a .json extension.");
  process.exit(1);
}

const repositoryRoot = path.resolve(__dirname, "..", "..", "..", "..");
const intakePath = path.join(
  repositoryRoot,
  "data",
  "vector",
  "products",
  "commercial-shotlists",
  "intake",
  `${intakeId}.json`,
);
const outputDirectory = path.join(
  repositoryRoot,
  "data",
  "vector",
  "products",
  "commercial-shotlists",
);

const defaultRecordingInstructions =
  "Hable despacio y con pausas. Deje un segundo de silencio antes y después de cada frase para facilitar los cortes en edición.";

function readIntake(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    console.error(`Unable to load intake data: ${filePath}`);
    console.error(error.message);
    process.exit(1);
  }
}

function requireText(intake, field) {
  const value = intake[field];

  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`Missing required intake field: ${field}`);
  }

  return value.trim();
}

function normalizeId(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function buildCopyBlocks(items, singularName, fieldName) {
  if (!Array.isArray(items)) {
    throw new Error(`Missing required intake field: ${fieldName}`);
  }

  const blocks = items
    .filter((item) => item && typeof item.text === "string" && item.text.trim() !== "")
    .map((item, index) => {
      const block = {
        id: `${singularName}-${String(index + 1).padStart(2, "0")}`,
        text: item.text.trim(),
      };

      if (typeof item.label === "string" && item.label.trim() !== "") {
        block.label = item.label.trim();
      }

      if (typeof item.notes === "string" && item.notes.trim() !== "") {
        block.notes = item.notes.trim();
      }

      return block;
    });

  if (blocks.length === 0) {
    throw new Error(`At least one ${singularName} with text is required.`);
  }

  return blocks;
}

function readOptionalText(intake, field) {
  const value = intake[field];
  return typeof value === "string" ? value.trim() : "";
}

function readNotes(intake, field) {
  const value = intake[field];

  if (value === undefined) {
    return [];
  }

  if (!Array.isArray(value) || value.some((item) => typeof item !== "string")) {
    throw new Error(`${field} must be an array of strings.`);
  }

  return value;
}

function buildShotlist(intake) {
  const client = requireText(intake, "client_name");
  const campaignTopic = requireText(intake, "campaign_topic");
  const project = requireText(intake, "project_name");
  const date = requireText(intake, "date");
  const audienceLabel = requireText(intake, "audience_label");

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    throw new Error("Invalid date. Use YYYY-MM-DD.");
  }

  const id = normalizeId(`${client} ${campaignTopic} ${date}`);

  if (!id) {
    throw new Error("Unable to generate a shotlist id from the intake fields.");
  }

  return {
    id,
    client,
    project,
    date,
    audience: {
      label: audienceLabel,
      age_range: readOptionalText(intake, "audience_age_range"),
    },
    summary: readOptionalText(intake, "summary"),
    recording_instructions:
      readOptionalText(intake, "recording_instructions") || defaultRecordingInstructions,
    aperturas: buildCopyBlocks(intake.aperturas, "apertura", "aperturas"),
    beneficios: buildCopyBlocks(intake.beneficios, "beneficio", "beneficios"),
    ctas: buildCopyBlocks(intake.ctas, "cta", "ctas"),
    visual_notes: readNotes(intake, "visual_notes"),
    audio_notes: readNotes(intake, "audio_notes"),
    internal_notes: readNotes(intake, "internal_notes"),
    client_notes: readNotes(intake, "client_notes"),
  };
}

const intake = readIntake(intakePath);
let shotlist;

try {
  shotlist = buildShotlist(intake);
} catch (error) {
  console.error(`Invalid intake data: ${error.message}`);
  process.exit(1);
}

const outputPath = path.join(outputDirectory, `${shotlist.id}.json`);

if (fs.existsSync(outputPath)) {
  console.error(`Shotlist data already exists: ${path.relative(repositoryRoot, outputPath)}`);
  process.exit(1);
}

fs.mkdirSync(outputDirectory, { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(shotlist, null, 2)}\n`, "utf8");

console.log(`Created shotlist data: ${path.relative(repositoryRoot, outputPath).replaceAll("\\", "/")}`);
