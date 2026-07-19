import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const sourceDir = path.join(root, 'public/images/source');
const outDir = path.join(root, 'public/images/optimized');
const sizes = [480, 768, 1200, 1600];

await fs.mkdir(outDir, { recursive: true });
const files = (await fs.readdir(sourceDir)).filter((file) => file.endsWith('.png'));

for (const file of files) {
  const name = path.basename(file, '.png');
  const input = path.join(sourceDir, file);
  for (const size of sizes) {
    const resized = sharp(input).resize({ width: size, withoutEnlargement: true });
    await resized.clone().webp({ quality: 82 }).toFile(path.join(outDir, `${name}-${size}.webp`));
    await resized.clone().avif({ quality: 58 }).toFile(path.join(outDir, `${name}-${size}.avif`));
  }
}

const stats = await Promise.all((await fs.readdir(outDir)).map(async (file) => {
  const stat = await fs.stat(path.join(outDir, file));
  return `${file}: ${Math.round(stat.size / 1024)} KB`;
}));
console.log(stats.join('\n'));
