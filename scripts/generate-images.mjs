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

/** The bracketed signal from src/components/Logo.astro, drawn at `s` scale. */
const mark = (x, y, s) => `
  <g transform="translate(${x} ${y}) scale(${s})">
    <path d="M9 3H3v24h6M21 3h6v24h-6" stroke="${BONE}" stroke-opacity="0.4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <path d="M7.5 20.5L13 14l3.5 3L23 8.5" stroke="${AMBER}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <circle cx="23" cy="8.5" r="2.4" fill="${AMBER}"/>
  </g>`;

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

  ${mark(80, 78, 1.6)}
  <text x="166" y="128" font-family="Helvetica, Arial, sans-serif" font-size="40" font-weight="700" letter-spacing="-1.5" fill="${BONE}">prognox</text>

  <text x="80" y="288" font-family="Helvetica, Arial, sans-serif" font-size="92" font-weight="700" letter-spacing="-4" fill="${BONE}">Data. <tspan fill="${AMBER}">Answered.</tspan></text>
  <text x="80" y="384" font-family="Helvetica, Arial, sans-serif" font-size="92" font-weight="700" letter-spacing="-4" fill="${BONE_MUTED}">Ahead of time.</text>

  <text x="80" y="462" font-family="Helvetica, Arial, sans-serif" font-size="29" fill="${BONE_MUTED}">Real-time pipelines. Plain-English answers. A read on what happens next.</text>

  <rect x="80" y="520" width="1040" height="1" fill="${HAIRLINE}"/>
  <text x="80" y="570" font-family="Helvetica, Arial, sans-serif" font-size="25" letter-spacing="3" fill="${BONE_FAINT}">OBSRV &#215; UNQUERY &#183; FROM SANKETIKA</text>
</svg>`;

const touchIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180">
  <rect width="180" height="180" rx="40" fill="${BLOCK}"/>
  ${mark(30, 30, 4)}
</svg>`;

for (const [name, svg] of [
  ['public/og.png', og],
  ['public/apple-touch-icon.png', touchIcon],
]) {
  const buf = await sharp(Buffer.from(svg)).png().toBuffer();
  await writeFile(name, buf);
  console.log(`wrote ${name} (${(buf.length / 1024).toFixed(1)} KB)`);
}
