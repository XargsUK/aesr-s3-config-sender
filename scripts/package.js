import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";
import archiver from "archiver";

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const browser = process.argv[2];
if (!browser || !["chrome", "firefox"].includes(browser)) {
  console.error("Please specify browser: chrome or firefox");
  process.exit(1);
}

const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");
const extensionDir = path.join(distDir, "extension");
const manifestSource = path.join(
  rootDir,
  "src",
  "manifest",
  `manifest-${browser}.json`
);
const manifestDest = path.join(extensionDir, "manifest.json");
const outputZip = path.join(distDir, `aesr-s3-config-sender-${browser}.zip`);

// Copy manifest file
fs.copyFileSync(manifestSource, manifestDest);

// Create zip file
const output = fs.createWriteStream(outputZip);
const archive = archiver("zip", {
  zlib: { level: 9 },
});

output.on("close", () => {
  console.log(`${browser} extension has been packaged: ${outputZip}`);
  console.log(`Total bytes: ${archive.pointer()}`);
});

archive.on("error", (err) => {
  throw err;
});

archive.pipe(output);

// Add all files from extension directory
archive.directory(extensionDir, false);

archive.finalize();
