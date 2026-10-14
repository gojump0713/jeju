// HF-I09 OG(1200×630) / SNS(1080×1080) 합성 (작업지시서 5.6, 12장)
// 사용: npm run og   (설치된 Chrome 필요, playwright-core devDependency)
// 배경: assets/masters/hf-i09-og-master-v01.png, CI: reference/Tilonsoft CI_W.png
import { copyFile, mkdtemp, rm, stat } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { chromium } from 'playwright-core';
import sharp from 'sharp';

const OUT = 'public/assets/og';
const work = await mkdtemp(path.join(tmpdir(), 'og-'));
await copyFile('scripts/og/og.html', path.join(work, 'og.html'));
await copyFile('assets/masters/hf-i09-og-master-v01.png', path.join(work, 'bg.png'));
await sharp('reference/Tilonsoft CI_W.png').trim({ threshold: 1 }).png().toFile(path.join(work, 'ci-white.png'));

const browser = await chromium.launch({ channel: 'chrome' });
for (const [name, w, h] of [
  ['og-v01', 1200, 630],
  ['sns-v01', 1080, 1080],
]) {
  const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
  await page.goto(`${pathToFileURL(path.join(work, 'og.html'))}?w=${w}&h=${h}`, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  const png = await page.screenshot({ type: 'png' });
  const out = path.join(OUT, `hf-i09-${name}.jpg`);
  await sharp(png).jpeg({ quality: 88, mozjpeg: true }).toFile(out);
  console.log(`${out}  ${w}x${h}  ${((await stat(out)).size / 1024).toFixed(0)}KB`);
  await page.close();
}
await browser.close();
await rm(work, { recursive: true, force: true });
