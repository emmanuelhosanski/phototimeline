import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import exifr from 'exifr';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');

const photosDir = path.join(root, 'public', 'photos');
const outputPath = path.join(root, 'src', 'data', 'photoManifest.json');

const supportedExtensions = new Set(['.jpg', '.jpeg', '.png', '.heic', '.webp']);

const walk = async (dir) => {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const resolved = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        return walk(resolved);
      }
      return resolved;
    }),
  );

  return files.flat();
};

const toIsoDate = (value) => {
  if (!value) return null;

  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString();
  }

  const parsed = new Date(value);
  if (!Number.isNaN(parsed.getTime())) {
    return parsed.toISOString();
  }

  return null;
};

const selectDate = (metadata) =>
  toIsoDate(metadata.DateTimeOriginal) ||
  toIsoDate(metadata.CreateDate) ||
  toIsoDate(metadata.ModifyDate) ||
  null;

const run = async () => {
  await fs.mkdir(path.dirname(outputPath), { recursive: true });

  let files = [];
  try {
    files = await walk(photosDir);
  } catch {
    console.error('No public/photos directory found. Create it first.');
    process.exit(1);
  }

  const imageFiles = files
    .filter((file) => supportedExtensions.has(path.extname(file).toLowerCase()))
    .sort((a, b) => a.localeCompare(b));

  const manifest = [];
  const missingDates = [];

  for (const absoluteFile of imageFiles) {
    const relativeFromPublic = path.relative(path.join(root, 'public'), absoluteFile).replaceAll(path.sep, '/');
    const webPath = `/${relativeFromPublic}`;

    try {
      const metadata = await exifr.parse(absoluteFile, true);
      const isoDate = selectDate(metadata || {});

      if (!isoDate) {
        missingDates.push(webPath);
        continue;
      }

      const fileBase = path.basename(absoluteFile, path.extname(absoluteFile));
      manifest.push({
        id: `${fileBase}-${manifest.length + 1}`,
        src: webPath,
        date: isoDate,
        label: fileBase,
      });
    } catch {
      missingDates.push(webPath);
    }
  }

  manifest.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  await fs.writeFile(outputPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');

  console.log(`Wrote ${manifest.length} photo entries to ${path.relative(root, outputPath)}`);
  if (missingDates.length > 0) {
    console.log('Skipped files without readable EXIF date metadata:');
    missingDates.forEach((file) => console.log(`- ${file}`));
  }
};

run();
