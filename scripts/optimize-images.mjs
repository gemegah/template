import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const MAX_WIDTH = 1600;
const INPUT_RELATIVE_PATHS = [
  "public/images/image0.png",
  "public/images/image1.png",
  "public/images/image2.png",
];

function formatBytes(bytes) {
  if (!Number.isFinite(bytes)) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  let value = bytes;
  let unitIndex = 0;
  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }
  const precision = unitIndex === 0 ? 0 : unitIndex === 1 ? 1 : 2;
  return `${value.toFixed(precision)} ${units[unitIndex]}`;
}

async function ensureBackup(originalAbsolutePath) {
  const imagesDir = path.dirname(originalAbsolutePath);
  const originalsDir = path.join(imagesDir, "_originals");
  const fileName = path.basename(originalAbsolutePath);
  const backupAbsolutePath = path.join(originalsDir, fileName);

  await fs.mkdir(originalsDir, { recursive: true });

  try {
    await fs.access(backupAbsolutePath);
    return backupAbsolutePath;
  } catch {
    await fs.copyFile(originalAbsolutePath, backupAbsolutePath);
    return backupAbsolutePath;
  }
}

async function optimizePngInPlace(absolutePath) {
  const originalStat = await fs.stat(absolutePath);
  const backupPath = await ensureBackup(absolutePath);

  const pipeline = sharp(absolutePath);
  const metadata = await pipeline.metadata();

  const shouldResize = typeof metadata.width === "number" && metadata.width > MAX_WIDTH;
  const resized = shouldResize
    ? sharp(absolutePath).resize({ width: MAX_WIDTH, withoutEnlargement: true })
    : sharp(absolutePath);

  const outputBuffer = await resized.png({
    compressionLevel: 9,
    adaptiveFiltering: true,
  }).toBuffer();

  const tmpPath = `${absolutePath}.tmp`;
  await fs.writeFile(tmpPath, outputBuffer);
  await fs.rename(tmpPath, absolutePath);

  const optimizedStat = await fs.stat(absolutePath);

  return {
    backupPath,
    beforeBytes: originalStat.size,
    afterBytes: optimizedStat.size,
    resizedFrom: metadata.width ?? null,
    resizedTo: shouldResize ? MAX_WIDTH : null,
  };
}

async function main() {
  const cwd = process.cwd();
  const targets = INPUT_RELATIVE_PATHS.map((relativePath) =>
    path.resolve(cwd, relativePath),
  );

  let totalBefore = 0;
  let totalAfter = 0;

  console.log(`Optimizing ${targets.length} PNG(s) (max width ${MAX_WIDTH}px)`);

  for (const absolutePath of targets) {
    const relativePath = path.relative(cwd, absolutePath);

    try {
      await fs.access(absolutePath);
    } catch {
      throw new Error(`Missing file: ${relativePath}`);
    }

    const result = await optimizePngInPlace(absolutePath);
    totalBefore += result.beforeBytes;
    totalAfter += result.afterBytes;

    const delta = result.afterBytes - result.beforeBytes;
    const deltaLabel = delta <= 0 ? `-${formatBytes(Math.abs(delta))}` : `+${formatBytes(delta)}`;
    const resizeLabel =
      result.resizedTo && result.resizedFrom
        ? ` resized ${result.resizedFrom}px→${result.resizedTo}px`
        : "";

    console.log(
      `- ${relativePath}: ${formatBytes(result.beforeBytes)} → ${formatBytes(
        result.afterBytes,
      )} (${deltaLabel})${resizeLabel}; backup: ${path.relative(cwd, result.backupPath)}`,
    );
  }

  const totalDelta = totalAfter - totalBefore;
  const totalDeltaLabel =
    totalDelta <= 0 ? `-${formatBytes(Math.abs(totalDelta))}` : `+${formatBytes(totalDelta)}`;

  console.log(
    `Total: ${formatBytes(totalBefore)} → ${formatBytes(totalAfter)} (${totalDeltaLabel})`,
  );
}

await main();

