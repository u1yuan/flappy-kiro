import { GAP_HEIGHT, PIPE_WIDTH } from './constants.js';

function rectsOverlap(a, b) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

export function checkCollision(ghostRect, pipes, canvasH, footerH) {
  const floor = canvasH - footerH;
  if (ghostRect.y < 0 || ghostRect.y + ghostRect.h >= floor) return true;
  for (const p of pipes) {
    const topRect = { x: p.x, y: 0, w: PIPE_WIDTH, h: p.gapY - GAP_HEIGHT / 2 };
    const botRect = { x: p.x, y: p.gapY + GAP_HEIGHT / 2, w: PIPE_WIDTH, h: floor - (p.gapY + GAP_HEIGHT / 2) };
    if (rectsOverlap(ghostRect, topRect) || rectsOverlap(ghostRect, botRect)) return true;
  }
  return false;
}
