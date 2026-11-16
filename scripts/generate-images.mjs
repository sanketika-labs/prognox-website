/**
 * Renders the raster brand assets (Open Graph card, Apple touch icon) from
 * inline SVG so there are no binary blobs to hand-maintain in the repo.
 * Run with: node scripts/generate-images.mjs
 */
import { writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const MARK = `
  <defs>
    <linearGradient id="g" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0%" stop-color="#4a46c4"/>
      <stop offset="55%" stop-color="#5b5bd6"/>
      <stop offset="100%" stop-color="#22d3ee"/>
    </linearGradient>
  </defs>`;

const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  ${MARK}
  <radialGradient id="glow" cx="50%" cy="0%" r="75%">
    <stop offset="0%" stop-color="#5b5bd6" stop-opacity="0.55"/>
    <stop offset="60%" stop-color="#22d3ee" stop-opacity="0.12"/>
    <stop offset="100%" stop-color="#0b0e1a" stop-opacity="0"/>
  </radialGradient>
  <rect width="1200" height="630" fill="#0b0e1a"/>
  <rect width="1200" height="630" fill="url(#glow)"/>

  <rect x="80" y="86" width="74" height="74" rx="20" fill="url(#g)"/>
  <path d="M97 139L109 125L119 133L137 112" stroke="#fff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <circle cx="137" cy="112" r="6.5" fill="#fff"/>
  <text x="172" y="137" font-family="Helvetica, Arial, sans-serif" font-size="42" font-weight="600" fill="#eceefb">Prognox</text>

  <text x="80" y="300" font-family="Helvetica, Arial, sans-serif" font-size="82" font-weight="600" fill="#eceefb">Predictive intelligence</text>
  <text x="80" y="392" font-family="Helvetica, Arial, sans-serif" font-size="82" font-weight="600" fill="#22d3ee">on your data</text>

  <text x="80" y="470" font-family="Helvetica, Arial, sans-serif" font-size="30" fill="#a6abc8">Real-time pipelines. Plain-English answers. Forecasts that arrive early.</text>

  <rect x="80" y="520" width="1040" height="1" fill="#2a3048"/>
  <text x="80" y="570" font-family="Helvetica, Arial, sans-serif" font-size="26" fill="#767c9b">Obsrv + UnQuery, from Sanketika</text>
</svg>`;

const touchIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180">
  ${MARK}
  <rect width="180" height="180" rx="40" fill="url(#g)"/>
  <path d="M42 120L70 86L94 104L138 53" stroke="#fff" stroke-width="13" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <circle cx="138" cy="53" r="14" fill="#fff"/>
</svg>`;

for (const [name, svg] of [
  ['public/og.png', og],
  ['public/apple-touch-icon.png', touchIcon],
]) {
  const buf = await sharp(Buffer.from(svg)).png().toBuffer();
  await writeFile(name, buf);
  console.log(`wrote ${name} (${(buf.length / 1024).toFixed(1)} KB)`);
}
