const { spawnSync } = require("child_process");
const path = require("path");

const repositoryRoot = path.resolve(__dirname, "..", "..", "..", "..");
const buildScript = path.join(repositoryRoot, "_system", "commercial-shotlists", "build.py");
const allowedArgs = new Set(["--force"]);
const args = process.argv.slice(2);

if (args.some((arg) => arg === "-h" || arg === "--help" || !allowedArgs.has(arg))) {
  console.error("Usage: node scripts/vector/products/commercial-shotlists/render-commercial-shotlist.js [--force]");
  process.exit(args.some((arg) => arg === "-h" || arg === "--help") ? 0 : 1);
}

const result = spawnSync("python", [buildScript, ...args], {
  cwd: repositoryRoot,
  encoding: "utf8",
  stdio: "inherit",
});

process.exit(result.status ?? 1);
