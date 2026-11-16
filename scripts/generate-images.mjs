/**
 * Renders the raster brand assets (Open Graph card, Apple touch icon) from
 * inline SVG so there are no binary blobs to hand-maintain in the repo.
 * Colours mirror src/styles/tokens.css — cobalt block, amber accent.
 * Run with: node scripts/generate-images.mjs
 */
import { writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const BLOCK = '#10224b';
const AMBER = '#f0a52e';
const BONE = '#f4f6fb';
const BONE_MUTED = '#a8b3cc';
const BONE_FAINT = '#74819f';
const HAIRLINE = '#22325c';

/**
 * Monogram: a capital "P" drawn as geometry rather than type, so it does not
 * depend on a font being installed. Mirrors public/favicon.svg.
 */
const monogram = (scale) => `
  <g transform="scale(${scale})">
    <rect x="18" y="12" width="8" height="40" rx="1" fill="${BONE}"/>
    <path d="M24 15.5h8a11 11 0 0 1 0 22h-8" fill="none" stroke="${AMBER}" stroke-width="7"/>
  </g>`;

/** The wordmark: `prog` in bone, `nox` in amber. */
const wordmark = (x, y, size) =>
  `<text x="${x}" y="${y}" font-family="Helvetica, Arial, sans-serif" font-size="${size}" font-weight="700" letter-spacing="${-size * 0.04}" fill="${BONE}">Prog<tspan fill="${AMBER}">nox</tspan></text>`;

const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="cobalt" cx="88%" cy="6%" r="80%">
      <stop offset="0%" stop-color="#2b4fd8" stop-opacity="0.45"/>
      <stop offset="100%" stop-color="#2b4fd8" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="warm" cx="8%" cy="96%" r="70%">
      <stop offset="0%" stop-color="${AMBER}" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="${AMBER}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="${BLOCK}"/>
  <rect width="1200" height="630" fill="url(#cobalt)"/>
  <rect width="1200" height="630" fill="url(#warm)"/>

  ${wordmark(80, 128, 46)}

  <text x="80" y="288" font-family="Helvetica, Arial, sans-serif" font-size="92" font-weight="700" letter-spacing="-4" fill="${BONE}">Data. <tspan fill="${AMBER}">Answered.</tspan></text>
  <text x="80" y="384" font-family="Helvetica, Arial, sans-serif" font-size="92" font-weight="700" letter-spacing="-4" fill="${BONE_MUTED}">Ahead of time.</text>

  <text x="80" y="462" font-family="Helvetica, Arial, sans-serif" font-size="29" fill="${BONE_MUTED}">Real-time pipelines. Plain-English answers. A read on what happens next.</text>

  <rect x="80" y="520" width="1040" height="1" fill="${HAIRLINE}"/>
  <text x="80" y="570" font-family="Helvetica, Arial, sans-serif" font-size="25" letter-spacing="3" fill="${BONE_FAINT}">OBSRV &#215; UNQUERY &#183; FROM SANKETIKA</text>
</svg>`;

const touchIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180">
  <rect width="180" height="180" rx="40" fill="${BLOCK}"/>
  ${monogram(180 / 64)}
</svg>`;

for (const [name, svg] of [
  ['public/og.png', og],
  ['public/apple-touch-icon.png', touchIcon],
]) {
  const buf = await sharp(Buffer.from(svg)).png().toBuffer();
  await writeFile(name, buf);
  console.log(`wrote ${name} (${(buf.length / 1024).toFixed(1)} KB)`);
}
