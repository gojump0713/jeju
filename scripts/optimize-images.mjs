// Higgsfield 마스터(assets/masters) → 웹 최적화 WebP(public/assets/hf) 변환 (작업지시서 9.1)
// 사용: node scripts/optimize-images.mjs
// 마스터 파일명 규칙: hf-<id>-<name>-master-v<nn>.png → 출력: hf-<id>-<name>-v<nn>.webp (+ -800w 반응형)
import { readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const SRC = 'assets/masters';
const OUT = 'public/assets/hf';

// ID별 [출력 폭 목록, 납품 비율]. 첫 폭이 기본본, 나머지는 srcset용. 비율이 다르면 중앙 크롭.
const SPECS = {
  'hf-v01': [[1920, 1280], 16 / 9], // HF-V01-P desktop poster
  'hf-i01': [[1080, 720], 9 / 16],
  'hf-i02': [[1800, 1200], 3 / 2],
  'hf-i03': [[1920, 1200], 16 / 9],
  'hf-i04': [[1200, 800], 4 / 3],
  'hf-i05': [[1200, 800], 4 / 3],
  'hf-i06': [[1200, 800], 4 / 3],
  'hf-i07': [[1200, 800], 4 / 3],
  'hf-i08': [[1920, 1200], 16 / 9],
  'hf-i09': [[1200], 1200 / 630], // OG 배경 — CI·행사정보 합성 전 원판
};

const files = (await readdir(SRC)).filter((f) => /-master-v\d+\.png$/.test(f));

for (const file of files) {
  const id = file.slice(0, 6);
  const spec = SPECS[id];
  if (!spec) continue;
  const [widths, ratio] = spec;
  const base = file.replace('-master', '').replace(/\.png$/, '');
  for (const [i, w] of widths.entries()) {
    const out = path.join(OUT, i === 0 ? `${base}.webp` : `${base}-${w}w.webp`);
    const info = await sharp(path.join(SRC, file))
      .resize({ width: w, height: Math.round(w / ratio), fit: 'cover', withoutEnlargement: true })
      .webp({ quality: 80, effort: 6 })
      .toFile(out);
    const kb = ((await stat(out)).size / 1024).toFixed(0);
    console.log(`${out}  ${info.width}x${info.height}  ${kb}KB`);
  }
}
