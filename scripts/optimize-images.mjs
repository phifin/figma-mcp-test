/**
 * Converts raster assets under public/ to WebP (resize + quality tuned per asset type).
 * Originals are backed up to assets/image-sources/ (gitignored) before removal from public/.
 *
 * Usage: npm run optimize:images
 *        npm run optimize:images -- --dry-run
 */

import { createHash } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const rootDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = path.join(rootDir, "public");
const backupDir = path.join(rootDir, "assets/image-sources");
const manifestPath = path.join(rootDir, "scripts/.image-optimize-manifest.json");

const dryRun = process.argv.includes("--dry-run");
const force = process.argv.includes("--force");

const rasterPattern = /\.(png|jpe?g)$/i;

/** @param {string} relativePath POSIX path from public/ */
function getProfile(relativePath) {
  const name = relativePath.toLowerCase();

  if (name.includes("/certs/") || name.startsWith("certs/")) {
    return { maxWidth: 320, quality: 90 };
  }
  if (/payment-(card|bank|wallet)-correct|payment-main/.test(name)) {
    return { maxWidth: 1920, quality: 85 };
  }
  if (/logo-|bank-|\/wallet-/.test(name)) {
    return { maxWidth: 512, quality: 88 };
  }
  if (/product-showcase|\/device-|step-\d|ai-assistant/.test(name)) {
    return { maxWidth: 1280, quality: 86 };
  }
  if (/get-started|hero-blur|cta-base|ready-with-unipay|ecosystem-/.test(name)) {
    return { maxWidth: 1920, quality: 85 };
  }
  return { maxWidth: 1920, quality: 85 };
}

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)));
      continue;
    }
    if (rasterPattern.test(entry.name)) {
      files.push(fullPath);
    }
  }

  return files;
}

async function fileHash(filePath) {
  const buffer = await fs.readFile(filePath);
  return createHash("sha256").update(buffer).digest("hex");
}

async function loadManifest() {
  try {
    const raw = await fs.readFile(manifestPath, "utf8");
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

async function saveManifest(manifest) {
  await fs.mkdir(path.dirname(manifestPath), { recursive: true });
  await fs.writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
}

async function backupSource(sourcePath, relativePath) {
  const target = path.join(backupDir, relativePath);
  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.copyFile(sourcePath, target);
}

async function optimizeFile(sourcePath) {
  const relativePath = path.relative(publicDir, sourcePath).split(path.sep).join("/");
  const outputPath = sourcePath.replace(rasterPattern, ".webp");
  const { maxWidth, quality } = getProfile(relativePath);

  const input = sharp(sourcePath, { failOn: "none" });
  const metadata = await input.metadata();
  const resizeWidth =
    metadata.width && metadata.width > maxWidth ? maxWidth : undefined;

  const pipeline = input.rotate().resize({
    width: resizeWidth,
    withoutEnlargement: true,
  });

  if (dryRun) {
    const before = (await fs.stat(sourcePath)).size;
    const buffer = await pipeline
      .webp({
        quality,
        effort: 4,
        smartSubsample: true,
      })
      .toBuffer();

    return {
      relativePath,
      skipped: false,
      dryRun: true,
      before,
      after: buffer.length,
      maxWidth,
      quality,
      dimensions: `${metadata.width ?? "?"}x${metadata.height ?? "?"}`,
    };
  }

  await pipeline
    .webp({
      quality,
      effort: 4,
      smartSubsample: true,
    })
    .toFile(outputPath);

  await backupSource(sourcePath, relativePath);
  await fs.unlink(sourcePath);

  return {
    relativePath,
    skipped: false,
    outputPath,
    before: (await fs.stat(path.join(backupDir, relativePath))).size,
    after: (await fs.stat(outputPath)).size,
    maxWidth,
    quality,
  };
}

async function main() {
  const files = await walk(publicDir);
  const manifest = await loadManifest();
  let converted = 0;
  let skipped = 0;
  let savedBytes = 0;
  const rows = [];

  for (const sourcePath of files) {
    const relativePath = path.relative(publicDir, sourcePath).split(path.sep).join("/");
    const webpPath = sourcePath.replace(rasterPattern, ".webp");

    if (!force) {
      try {
        const webpStat = await fs.stat(webpPath);
        const sourceStat = await fs.stat(sourcePath);
        if (webpStat.mtimeMs >= sourceStat.mtimeMs) {
          skipped += 1;
          continue;
        }
      } catch {
        // WebP missing — continue.
      }
    }

    const hash = await fileHash(sourcePath);
    if (!force && manifest[relativePath]?.hash === hash) {
      try {
        await fs.access(webpPath);
        skipped += 1;
        continue;
      } catch {
        // Manifest hit but WebP missing — re-run.
      }
    }

    const result = await optimizeFile(sourcePath);
    converted += 1;
    savedBytes += result.before - result.after;
    rows.push(result);

    if (!dryRun) {
      manifest[relativePath] = { hash, webp: relativePath.replace(rasterPattern, ".webp") };
    }
  }

  if (!dryRun) {
    await saveManifest(manifest);
  }

  rows.sort((a, b) => b.before - b.after - (a.before - a.after));

  console.log(
    dryRun
      ? `[dry-run] Would optimize ${converted} file(s), skip ${skipped}.`
      : `Optimized ${converted} file(s), skipped ${skipped}.`,
  );
  console.log(
    `Estimated savings: ${(savedBytes / 1024 / 1024).toFixed(1)} MB (${dryRun ? "dry-run" : "written"})`,
  );

  for (const row of rows.slice(0, 15)) {
    const ratio = ((1 - row.after / row.before) * 100).toFixed(0);
    console.log(
      `  ${row.relativePath}: ${(row.before / 1024 / 1024).toFixed(2)}MB → ${(row.after / 1024 / 1024).toFixed(2)}MB (-${ratio}%) [max ${row.maxWidth}px, q${row.quality}]`,
    );
  }

  if (rows.length > 15) {
    console.log(`  … and ${rows.length - 15} more`);
  }

  if (!dryRun && converted > 0) {
    console.log(`\nOriginals backed up to assets/image-sources/`);
    console.log(`Commit the new .webp files under public/ before deploying.`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
