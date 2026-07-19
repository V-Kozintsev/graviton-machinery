import { chromium } from 'playwright';

const base = process.env.GRAVITON_URL || 'http://127.0.0.1:4173/graviton-machinery/';
const routes = ['', 'catalog', 'catalog/atlas-ex-220', 'request', 'contacts', '404'];
const sizes = [[1440, 900], [1024, 768], [768, 1024], [390, 844], [360, 800]];
const browser = await chromium.launch();
const page = await browser.newPage();
const errors = [];
page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()); });

for (const [width, height] of sizes) {
  await page.setViewportSize({ width, height });
  for (const route of routes) {
    await page.goto(new URL(route, base).toString(), { waitUntil: 'networkidle' });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
    if (overflow) throw new Error(`Horizontal overflow at ${width} ${route}`);
  }
}

if (errors.length) throw new Error(`Console errors:\n${errors.join('\n')}`);
await browser.close();
console.log('Visual audit passed');
