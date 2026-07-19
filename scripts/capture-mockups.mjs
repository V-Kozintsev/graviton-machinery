import fs from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';

const root = process.cwd();
const out = path.join(root, 'docs/design/mockups');
await fs.mkdir(out, { recursive: true });

const base = process.env.GRAVITON_URL || 'http://127.0.0.1:4173/graviton-machinery/';
const shots = [
  ['design-board.png', 'design-board', 1440, 900],
  ['home-desktop.png', '', 1440, 900],
  ['home-tablet.png', '', 768, 1024],
  ['home-mobile.png', '', 390, 844],
  ['catalog-desktop.png', 'catalog', 1440, 900],
  ['catalog-tablet.png', 'catalog', 768, 1024],
  ['catalog-mobile.png', 'catalog', 390, 844],
  ['product-desktop.png', 'catalog/atlas-ex-220', 1440, 900],
  ['product-mobile.png', 'catalog/atlas-ex-220', 390, 844],
  ['request-desktop.png', 'request', 1440, 900],
  ['request-mobile.png', 'request', 390, 844],
  ['request-success.png', 'mockup/request-success', 390, 844],
  ['catalog-empty.png', 'catalog', 1440, 900],
  ['form-errors.png', 'mockup/form-errors', 390, 844],
  ['filters-mobile.png', 'catalog', 390, 844],
];

const browser = await chromium.launch();
const page = await browser.newPage();
for (const [file, hash, width, height] of shots) {
  await page.setViewportSize({ width, height });
  if (file.includes('request') || file === 'form-errors.png') {
    await page.goto(base, { waitUntil: 'networkidle' });
    await page.evaluate(() => localStorage.setItem('graviton-request', JSON.stringify([{ slug: 'atlas-ex-220', quantity: 1 }])));
  }
  await page.goto(new URL(hash, base).toString(), { waitUntil: 'networkidle' });
  if (file === 'filters-mobile.png') await page.getByRole('button', { name: /Фильтры/ }).click();
  if (file === 'catalog-empty.png') await page.locator('input[type="range"]').evaluate((el) => { el.value = '4000000'; el.dispatchEvent(new Event('input', { bubbles: true })); });
  if (file === 'form-errors.png') await page.getByRole('button', { name: /Отправить/ }).click().catch(() => {});
  await page.screenshot({ path: path.join(out, file), fullPage: false });
}
await browser.close();
