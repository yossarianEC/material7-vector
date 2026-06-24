const fs = require("fs");
const path = require("path");

const shotlistId = process.argv[2];

if (!shotlistId) {
  console.error(
    "Missing shotlist id. Usage: node scripts/vector/products/commercial-shotlists/render-commercial-shotlist.js <shotlist-id>",
  );
  process.exit(1);
}

if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(shotlistId)) {
  console.error("Invalid shotlist id. Use lowercase kebab-case without a .json extension.");
  process.exit(1);
}

const repositoryRoot = path.resolve(__dirname, "..", "..", "..", "..");
const dataPath = path.join(
  repositoryRoot,
  "data",
  "vector",
  "products",
  "commercial-shotlists",
  `${shotlistId}.json`,
);
const templatePath = path.join(
  repositoryRoot,
  "templates",
  "vector",
  "products",
  "commercial-shotlists",
  "commercial-shotlist-template.html",
);
const outputDirectory = path.join(
  repositoryRoot,
  "output",
  "vector",
  "products",
  "commercial-shotlists",
);
const outputPath = path.join(outputDirectory, `${shotlistId}.html`);

const loopKeys = [
  "aperturas",
  "beneficios",
  "ctas",
  "visual_notes",
  "audio_notes",
  "internal_notes",
  "client_notes",
];

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getValue(source, key) {
  return key.split(".").reduce((value, part) => value?.[part], source);
}

function renderValues(block, values) {
  return block.replace(/{{\s*([a-zA-Z0-9_.]+)\s*}}/g, (_match, key) => {
    return escapeHtml(getValue(values, key));
  });
}

function renderConditionals(template, data) {
  return template.replace(
    /{{#if\s+([a-zA-Z0-9_.]+)}}([\s\S]*?){{\/if}}/g,
    (_match, key, block) => {
      const value = getValue(data, key);
      const shouldRender = Array.isArray(value) ? value.length > 0 : Boolean(value);
      return shouldRender ? block : "";
    },
  );
}

function renderLoops(template, data) {
  let rendered = template;

  for (const key of loopKeys) {
    const loopPattern = new RegExp(
      `{{#each\\s+${key}}}([\\s\\S]*?){{\\/each}}`,
      "g",
    );
    const items = Array.isArray(data[key]) ? data[key] : [];

    rendered = rendered.replace(loopPattern, (_match, block) => {
      return items
        .map((item, itemIndex) => {
          const values =
            item !== null && typeof item === "object"
              ? { ...item, index: itemIndex + 1 }
              : { this: item, index: itemIndex + 1 };

          return renderValues(block, values);
        })
        .join("");
    });
  }

  return rendered;
}

function renderTemplate(template, data) {
  const withConditionals = renderConditionals(template, data);
  const withLoops = renderLoops(withConditionals, data);
  return renderValues(withLoops, data)
    .replace(/[ \t]+$/gm, "")
    .replace(/\n{3,}/g, "\n\n");
}

function readShotlistData(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    console.error(`Unable to load shotlist data: ${filePath}`);
    console.error(error.message);
    process.exit(1);
  }
}

function readTemplate(filePath) {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch (error) {
    console.error(`Unable to load HTML template: ${filePath}`);
    console.error(error.message);
    process.exit(1);
  }
}

const shotlistData = readShotlistData(dataPath);
const template = readTemplate(templatePath);
const outputHtml = renderTemplate(template, shotlistData);

fs.mkdirSync(outputDirectory, { recursive: true });
fs.writeFileSync(outputPath, outputHtml, "utf8");

console.log(`Commercial shotlist rendered: ${path.relative(repositoryRoot, outputPath)}`);
