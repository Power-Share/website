import QRCode from 'qrcode';
import { writeFileSync } from 'fs';

const url = 'https://power-share.io/poella';
const teal = '#0ABAB5';
const navy = '#1A2332';

// Generate QR matrix
const qr = QRCode.create(url, { errorCorrectionLevel: 'H' });
const modules = qr.modules;
const size = modules.size;
const data = modules.data;

const cellSize = 12;
const padding = cellSize * 4;
const radius = cellSize * 0.38;
const totalSize = size * cellSize + padding * 2;

// Check if a module is part of a finder pattern (the three big corner squares)
function isFinderPattern(row, col) {
  // Top-left
  if (row < 7 && col < 7) return true;
  // Top-right
  if (row < 7 && col >= size - 7) return true;
  // Bottom-left
  if (row >= size - 7 && col < 7) return true;
  return false;
}

let dots = '';

for (let row = 0; row < size; row++) {
  for (let col = 0; col < size; col++) {
    if (data[row * size + col]) {
      const x = padding + col * cellSize;
      const y = padding + row * cellSize;
      const isFinder = isFinderPattern(row, col);

      if (isFinder) {
        // Finder patterns: square modules in navy
        dots += `<rect x="${x}" y="${y}" width="${cellSize}" height="${cellSize}" fill="${navy}"/>`;
      } else {
        // Data modules: rounded dots in teal
        const cx = x + cellSize / 2;
        const cy = y + cellSize / 2;
        dots += `<circle cx="${cx}" cy="${cy}" r="${radius}" fill="${teal}"/>`;
      }
    }
  }
}

// Build label text
const labelY = totalSize - padding / 2 + 4;
const label = `<text x="${totalSize / 2}" y="${labelY}" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="16" font-weight="600" fill="${navy}">power-share.io/poella</text>`;

const svg = `<?xml version="1.0" encoding="utf-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${totalSize} ${totalSize + 28}" width="${totalSize}" height="${totalSize + 28}">
  <rect width="${totalSize}" height="${totalSize + 28}" rx="20" fill="#ffffff"/>
  ${dots}
  ${label}
</svg>`;

writeFileSync('public/qr-poella.svg', svg);
console.log(`Branded QR: ${totalSize}x${totalSize + 28}px — public/qr-poella.svg`);

// --- Black & white version (same dot design) ---
let dotsBW = '';

for (let row = 0; row < size; row++) {
  for (let col = 0; col < size; col++) {
    if (data[row * size + col]) {
      const x = padding + col * cellSize;
      const y = padding + row * cellSize;

      if (isFinderPattern(row, col)) {
        dotsBW += `<rect x="${x}" y="${y}" width="${cellSize}" height="${cellSize}" fill="#000"/>`;
      } else {
        const cx = x + cellSize / 2;
        const cy = y + cellSize / 2;
        dotsBW += `<circle cx="${cx}" cy="${cy}" r="${radius}" fill="#000"/>`;
      }
    }
  }
}

const labelBW = `<text x="${totalSize / 2}" y="${labelY}" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="16" font-weight="600" fill="#000">power-share.io/poella</text>`;

const svgBW = `<?xml version="1.0" encoding="utf-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${totalSize} ${totalSize + 28}" width="${totalSize}" height="${totalSize + 28}">
  <rect width="${totalSize}" height="${totalSize + 28}" rx="20" fill="#ffffff"/>
  ${dotsBW}
  ${labelBW}
</svg>`;

writeFileSync('public/qr-poella-bw.svg', svgBW);
console.log(`B&W QR:     ${totalSize}x${totalSize + 28}px — public/qr-poella-bw.svg`);
