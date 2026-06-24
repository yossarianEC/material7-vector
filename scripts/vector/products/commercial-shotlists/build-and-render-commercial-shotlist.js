const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const intakeId = process.argv[2];

if (!intakeId) {
  console.error(
    "Missing intake id. Usage: node scripts/vector/products/commercial-shotlists/build-and-render-commercial-shotlist.js <intake-id>",
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
const shotlistDirectory = path.join(
  repositoryRoot,
  "data",
  "vector",
  "products",
  "commercial-shotlists",
);
const outputDirectory = path.join(
  repositoryRoot,
  "output",
  "vector",
  "products",
  "commercial-shotlists",
);
const intakeBuilderPath = path.join(__dirname, "build-shotlist-from-intake.js");
const rendererPath = path.join(__dirname, "render-commercial-shotlist.js");
const indexBuilderPath = path.join(__dirname, "build-commercial-shotlist-index.js");
const indexPath = path.join(outputDirectory, "index.html");

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
    console.error(`Missing required intake field: ${field}`);
    process.exit(1);
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

function relativePath(filePath) {
  return path.relative(repositoryRoot, filePath).replaceAll("\\", "/");
}

function runScript(scriptPath, argument) {
  const scriptArguments = argument ? [scriptPath, argument] : [scriptPath];
  const result = spawnSync(process.execPath, scriptArguments, {
    cwd: repositoryRoot,
    encoding: "utf8",
  });

  if (result.error) {
    console.error(`Unable to run ${path.basename(scriptPath)}: ${result.error.message}`);
    process.exit(1);
  }

  if (result.status !== 0) {
    if (result.stdout) {
      process.stdout.write(result.stdout);
    }
    if (result.stderr) {
      process.stderr.write(result.stderr);
    }
    process.exit(result.status ?? 1);
  }
}

const intake = readIntake(intakePath);
const clientName = requireText(intake, "client_name");
const campaignTopic = requireText(intake, "campaign_topic");
const date = requireText(intake, "date");
const shotlistId = normalizeId(`${clientName} ${campaignTopic} ${date}`);

if (!shotlistId) {
  console.error("Unable to generate a shotlist id from the intake fields.");
  process.exit(1);
}

const shotlistPath = path.join(shotlistDirectory, `${shotlistId}.json`);
const outputPath = path.join(outputDirectory, `${shotlistId}.html`);

if (fs.existsSync(shotlistPath)) {
  console.error(`Shotlist data already exists: ${relativePath(shotlistPath)}`);
  process.exit(1);
}

if (fs.existsSync(outputPath)) {
  console.error(`Generated HTML already exists: ${relativePath(outputPath)}`);
  process.exit(1);
}

runScript(intakeBuilderPath, intakeId);

if (!fs.existsSync(shotlistPath)) {
  console.error(`Intake builder did not create the expected file: ${relativePath(shotlistPath)}`);
  process.exit(1);
}

runScript(rendererPath, shotlistId);

if (!fs.existsSync(outputPath)) {
  console.error(`Renderer did not create the expected file: ${relativePath(outputPath)}`);
  process.exit(1);
}

runScript(indexBuilderPath);

if (!fs.existsSync(indexPath)) {
  console.error(`Index builder did not create the expected file: ${relativePath(indexPath)}`);
  process.exit(1);
}

console.log(`Created shotlist data: ${relativePath(shotlistPath)}`);
console.log(`Created generated HTML: ${relativePath(outputPath)}`);
console.log(`Updated shotlist index: ${relativePath(indexPath)}`);
