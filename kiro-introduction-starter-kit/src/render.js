import { CANVAS_WIDTH, CANVAS_HEIGHT, GHOST_SIZE, PIPE_WIDTH, PIPE_CAP_HEIGHT, GAP_HEIGHT, FOOTER_HEIGHT } from './constants.js';

const PX = 4; // pixel block size

export function drawSky(ctx) {
  ctx.imageSmoothingEnabled = false;
  // 8-bit gradient sky: 3 color bands
  const bands = ['#4ec0ca', '#6dcedb', '#87CEEB'];
  const bandH = Math.ceil((CANVAS_HEIGHT - FOOTER_HEIGHT) / bands.length);
  for (let i = 0; i < bands.length; i++) {
    ctx.fillStyle = bands[i];
    ctx.fillRect(0, i * bandH, CANVAS_WIDTH, bandH);
  }
}

export function drawGhost(ctx, img, x, y, vy) {
  ctx.save();
  ctx.imageSmoothingEnabled = false;
  ctx.translate(Math.floor(x + GHOST_SIZE / 2), Math.floor(y + GHOST_SIZE / 2));
  ctx.rotate(Math.min(Math.max(vy / 600, -0.4), 0.4));
  // Draw at integer coords for crisp pixels
  ctx.drawImage(img, -GHOST_SIZE / 2, -GHOST_SIZE / 2, GHOST_SIZE, GHOST_SIZE);
  ctx.restore();
}

export function drawPipe(ctx, pipe) {
  const floor = CANVAS_HEIGHT - FOOTER_HEIGHT;
  const topH = pipe.gapY - GAP_HEIGHT / 2;
  const botY = pipe.gapY + GAP_HEIGHT / 2;
  const x = Math.floor(pipe.x);

  // 8-bit pipe: body with highlight stripe and dark edge
  function drawPipeSegment(sx, sy, sw, sh) {
    // Dark outline
    ctx.fillStyle = '#145214';
    ctx.fillRect(sx, sy, sw, sh);
    // Main body
    ctx.fillStyle = '#2d8b2d';
    ctx.fillRect(sx + PX, sy, sw - PX * 2, sh);
    // Left highlight
    ctx.fillStyle = '#4caf4c';
    ctx.fillRect(sx + PX, sy, PX, sh);
    // Right shadow
    ctx.fillStyle = '#1a6b1a';
    ctx.fillRect(sx + sw - PX * 2, sy, PX, sh);
  }

  function drawCap(sx, sy) {
    // Cap is wider than body
    ctx.fillStyle = '#145214';
    ctx.fillRect(sx - PX, sy, PIPE_WIDTH + PX * 2, PIPE_CAP_HEIGHT);
    ctx.fillStyle = '#1f6b1f';
    ctx.fillRect(sx, sy + 1, PIPE_WIDTH, PIPE_CAP_HEIGHT - 2);
    // Highlight
    ctx.fillStyle = '#4caf4c';
    ctx.fillRect(sx + PX, sy + 2, PX, PIPE_CAP_HEIGHT - 4);
  }

  // Top pipe
  drawPipeSegment(x, 0, PIPE_WIDTH, topH - PIPE_CAP_HEIGHT);
  drawCap(x, topH - PIPE_CAP_HEIGHT);
  // Bottom pipe
  drawCap(x, botY);
  drawPipeSegment(x, botY + PIPE_CAP_HEIGHT, PIPE_WIDTH, floor - botY - PIPE_CAP_HEIGHT);
}

export function drawHUD(ctx, score, highScore) {
  // Dark 8-bit footer
  ctx.fillStyle = '#1a1a2e';
  ctx.fillRect(0, CANVAS_HEIGHT - FOOTER_HEIGHT, CANVAS_WIDTH, FOOTER_HEIGHT);
  // Top border line
  ctx.fillStyle = '#3a3a5e';
  ctx.fillRect(0, CANVAS_HEIGHT - FOOTER_HEIGHT, CANVAS_WIDTH, 2);

  ctx.fillStyle = '#fff';
  ctx.font = 'bold 16px monospace';
  ctx.textAlign = 'left';
  ctx.fillText(`SCORE: ${score}`, 16, CANVAS_HEIGHT - 14);
  ctx.textAlign = 'right';
  ctx.fillText(`HIGH: ${highScore}`, CANVAS_WIDTH - 16, CANVAS_HEIGHT - 14);
  ctx.textAlign = 'left';
}

export function drawReady(ctx) {
  ctx.fillStyle = 'rgba(0,0,0,0.5)';
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  // 8-bit text box
  const bx = CANVAS_WIDTH / 2 - 160, by = CANVAS_HEIGHT / 2 - 40;
  ctx.fillStyle = '#1a1a2e';
  ctx.fillRect(bx, by, 320, 80);
  ctx.strokeStyle = '#4ec0ca';
  ctx.lineWidth = 3;
  ctx.strokeRect(bx, by, 320, 80);

  ctx.fillStyle = '#4ec0ca';
  ctx.font = 'bold 22px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('FLAPPY KIRO', CANVAS_WIDTH / 2, by + 32);
  ctx.fillStyle = '#fff';
  ctx.font = '14px monospace';
  ctx.fillText('PRESS SPACE TO START', CANVAS_WIDTH / 2, by + 58);
  ctx.textAlign = 'left';
}

export function drawGameOver(ctx, score) {
  ctx.fillStyle = 'rgba(0,0,0,0.6)';
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  // 8-bit dialog box
  const bx = CANVAS_WIDTH / 2 - 140, by = CANVAS_HEIGHT / 2 - 55;
  ctx.fillStyle = '#1a1a2e';
  ctx.fillRect(bx, by, 280, 110);
  ctx.strokeStyle = '#e74c3c';
  ctx.lineWidth = 3;
  ctx.strokeRect(bx, by, 280, 110);

  ctx.fillStyle = '#e74c3c';
  ctx.font = 'bold 24px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('GAME OVER', CANVAS_WIDTH / 2, by + 34);
  ctx.fillStyle = '#fff';
  ctx.font = '16px monospace';
  ctx.fillText(`SCORE: ${score}`, CANVAS_WIDTH / 2, by + 62);
  ctx.font = '12px monospace';
  ctx.fillStyle = '#aaa';
  ctx.fillText('PRESS SPACE TO RETRY', CANVAS_WIDTH / 2, by + 90);
  ctx.textAlign = 'left';
}
