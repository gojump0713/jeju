// eDM 통이미지 합성 — 600px 폭 디자인을 2배율(1200px)로 렌더링해 한 장의 JPG로 저장
// 사용: npm run edm   (설치된 Chrome 필요, playwright-core devDependency)
// 텍스트·프로그램 원본: src/data/event.ts / 템플릿: scripts/edm/edm.html / 메일 본문: public/eDM.html
import { copyFile, mkdir, mkdtemp, rm, stat } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { chromium } from 'playwright-core';
import sharp from 'sharp';
import { event, footer, program, services } from '../src/data/event.ts';

const OUT = 'public/assets/edm';
const HF = 'public/assets/hf';
const SERVICE_IMAGES = {
  'HF-I04': 'hf-i04-dstationx-v01-800w.webp',
  'HF-I05': 'hf-i05-tos-v01-800w.webp',
  'HF-I06': 'hf-i06-kstory-v01-800w.webp',
  'HF-I07': 'hf-i07-town-v01-800w.webp',
};

const work = await mkdtemp(path.join(tmpdir(), 'edm-'));
await copyFile('scripts/edm/edm.html', path.join(work, 'edm.html'));
await copyFile(`${HF}/hf-v01-hero-desktop-poster-v01-1280w.webp`, path.join(work, 'bg.webp'));
for (const s of services)
  await copyFile(`${HF}/${SERVICE_IMAGES[s.assetId]}`, path.join(work, `svc-${s.assetId}.webp`));
await sharp('reference/Tilonsoft CI_W.png')
  .trim({ threshold: 1 })
  .png()
  .toFile(path.join(work, 'ci-white.png'));
await mkdir(OUT, { recursive: true });

const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage({ viewport: { width: 600, height: 800 }, deviceScaleFactor: 2 });
await page.addInitScript((data) => (window.EDM = data), { event, footer, program, services });
await page.goto(pathToFileURL(path.join(work, 'edm.html')).href, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
const png = await page.screenshot({ type: 'png', fullPage: true });
await browser.close();

const out = path.join(OUT, 'edm-v01.jpg');
const { width, height } = await sharp(png).jpeg({ quality: 85, mozjpeg: true }).toFile(out);
console.log(`${out}  ${width}x${height}  ${((await stat(out)).size / 1024).toFixed(0)}KB`);
await rm(work, { recursive: true, force: true });
