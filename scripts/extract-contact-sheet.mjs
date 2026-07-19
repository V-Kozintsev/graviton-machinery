import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const sourceDir = path.join(root, 'public/images/source');
const sheet = path.join(sourceDir, 'contact-sheet.png');

const cells = [
  'hero',
  'excavator',
  'loader',
  'bulldozer',
  'crane',
  'road',
  'skid',
  'delivery',
  'service',
];

const metadata = await sharp(sheet).metadata();
const cellWidth = Math.floor((metadata.width ?? 1536) / 3);
const cellHeight = Math.floor((metadata.height ?? 1024) / 3);

for (const [index, name] of cells.entries()) {
  const left = (index % 3) * cellWidth;
  const top = Math.floor(index / 3) * cellHeight;
  await sharp(sheet)
    .extract({ left, top, width: cellWidth, height: cellHeight })
    .resize({ width: 1600, height: 1067, fit: 'cover' })
    .png({ compressionLevel: 9 })
    .toFile(path.join(sourceDir, `${name}.png`));
}
