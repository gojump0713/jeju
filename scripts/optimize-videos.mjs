// Higgsfield 영상 마스터(assets/masters) → 웹용 무음 MP4(public/assets/hf) 변환 (작업지시서 9.1)
// 사용: node scripts/optimize-videos.mjs   (ffmpeg가 PATH에 있어야 함)
// 마스터: hf-v0N-<name>-master-v<nn>.mp4 → 출력: hf-v0N-<name>-v<nn>.mp4
// H.264 / 오디오 제거 / faststart / 원본 fps 유지(24~30) / 크기 예산 초과 시 CRF를 올려 재인코딩
import { execFileSync } from 'node:child_process';
import { readdir, stat } from 'node:fs/promises';
import path from 'node:path';

const SRC = 'assets/masters';
const OUT = 'public/assets/hf';

// ID별 [출력 크기, 용량 목표(MB)]
const SPECS = {
  'hf-v01': ['1920:1080', 4],
  'hf-v02': ['1920:1080', 4],
  'hf-v03': ['720:1280', 2],
};

const files = (await readdir(SRC)).filter((f) => /-master-v\d+\.mp4$/.test(f));

for (const file of files) {
  const spec = SPECS[file.slice(0, 6)];
  if (!spec) continue;
  const [size, budgetMB] = spec;
  const out = path.join(OUT, file.replace('-master', ''));
  for (const crf of [22, 25, 28, 31]) {
    execFileSync('ffmpeg', [
      '-y', '-loglevel', 'error',
      '-i', path.join(SRC, file),
      '-an',
      '-vf', `scale=${size}:force_original_aspect_ratio=increase,crop=${size}`,
      '-c:v', 'libx264', '-preset', 'slow', '-crf', String(crf),
      '-pix_fmt', 'yuv420p', '-profile:v', 'high',
      '-movflags', '+faststart',
      out,
    ]);
    const mb = (await stat(out)).size / 1024 / 1024;
    console.log(`${out}  crf=${crf}  ${mb.toFixed(2)}MB`);
    if (mb <= budgetMB) break;
  }
}
