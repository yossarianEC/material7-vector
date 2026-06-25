const { spawnSync } = require("child_process");
const path = require("path");

const repositoryRoot = path.resolve(__dirname, "..", "..", "..", "..");
const buildScript = path.join(repositoryRoot, "_system", "commercial-shotlists", "build.py");
const args = process.argv.slice(2);

if (args.length === 0 || args.length > 2 || args.some((arg) => arg === "-h" || arg === "--help")) {
  console.error("Usage: node scripts/vector/products/commercial-shotlists/build-and-render-commercial-shotlist.js intake-id [--force]");
  process.exit(args.some((arg) => arg === "-h" || arg === "--help") ? 0 : 1);
}

const result = spawnSync("python", [buildScript, ...args], {
  cwd: repositoryRoot,
  encoding: "utf8",
  stdio: "inherit",
});

process.exit(result.status ?? 1);
