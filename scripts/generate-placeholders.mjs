import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const sourceDir = path.join(root, 'public/images/source');
const assets = [
  ['hero', 'Экскаватор и погрузчик на площадке', '#dca918'],
  ['excavator', 'Гусеничный экскаватор', '#e0ad1a'],
  ['loader', 'Фронтальный погрузчик', '#efb51d'],
  ['bulldozer', 'Бульдозер', '#d8a312'],
  ['crane', 'Автокран', '#e4b326'],
  ['road', 'Дорожный каток', '#f1bd2d'],
  ['skid', 'Мини-погрузчик', '#e9b11e'],
  ['delivery', 'Доставка техники тралом', '#31566f'],
  ['service', 'Сервис строительной техники', '#536b7a'],
];

await fs.mkdir(sourceDir, { recursive: true });

function svg(name, title, color) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1067" viewBox="0 0 1600 1067">
  <defs>
    <linearGradient id="sky" x1="0" x2="0" y1="0" y2="1"><stop stop-color="#eef3f6"/><stop offset="1" stop-color="#cfd8df"/></linearGradient>
    <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="saturate" values=".18"/><feComponentTransfer><feFuncA type="table" tableValues="0 .12"/></feComponentTransfer></filter>
  </defs>
  <rect width="1600" height="1067" fill="url(#sky)"/>
  <rect y="710" width="1600" height="357" fill="#87919a"/>
  <path d="M0 760c220-40 420-52 610-18 190 34 363 24 520-18 157-43 314-39 470 11v332H0z" fill="#68737c"/>
  <g opacity=".55" fill="#98a4ad"><rect x="70" y="360" width="280" height="250"/><rect x="1130" y="325" width="330" height="290"/><rect x="390" y="420" width="160" height="190"/></g>
  <g transform="translate(330 425)" stroke="#20252c" stroke-width="24" stroke-linecap="round" stroke-linejoin="round">
    <path d="M215 255h510l95 95H135z" fill="${color}"/>
    <circle cx="240" cy="390" r="86" fill="#20252c"/><circle cx="690" cy="390" r="86" fill="#20252c"/>
    <circle cx="240" cy="390" r="36" fill="#5d6872"/><circle cx="690" cy="390" r="36" fill="#5d6872"/>
    <path d="M340 230h200l70-150h-185z" fill="${color}"/>
    <path d="M525 95h220l168 106" fill="none"/>
    <path d="M900 198l120 78-90 48" fill="none"/>
    <path d="M190 250l-120 70h125" fill="none"/>
  </g>
  <g opacity=".18"><rect width="1600" height="1067" filter="url(#grain)"/></g>
  <title>${title}</title>
</svg>`;
}

for (const [name, title, color] of assets) {
  await sharp(Buffer.from(svg(name, title, color))).png().toFile(path.join(sourceDir, `${name}.png`));
}
