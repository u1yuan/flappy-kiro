import { CANVAS_WIDTH, CANVAS_HEIGHT, GHOST_X, GHOST_SIZE, PIPE_SPACING, FOOTER_HEIGHT } from './constants.js';
import { applyGravity, flap, clampY } from './physics.js';
import { spawnPipe, advancePipes, shouldSpawn, recyclePipes } from './pipes.js';
import { checkCollision } from './collision.js';
import { updateScore, getSpeed } from './score.js';
import { getHighScore, setHighScore } from './storage.js';
import { createInput } from './input.js';
import { createClouds, updateClouds, drawClouds } from './background.js';
import { drawSky, drawGhost, drawPipe, drawHUD, drawReady, drawGameOver } from './render.js';

function playScoreSfx(audioCtx) {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.type = 'square';
  osc.frequency.setValueAtTime(880, audioCtx.currentTime);
  osc.frequency.setValueAtTime(1175, audioCtx.currentTime + 0.05);
  gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.15);
}

export function createGame(canvas, assets) {
  const ctx = canvas.getContext('2d');
  let audioCtx;
  let state = 'READY', ghost, pipes, score, highScore, clouds, lastTime;

  function reset() {
    ghost = { y: CANVAS_HEIGHT / 2, vy: 0 };
    pipes = [];
    score = 0;
    highScore = getHighScore();
    clouds = createClouds();
  }
  reset();

  const input = createInput(canvas);
  input.onFlap(() => {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (state === 'READY') { state = 'PLAYING'; ghost = flap(ghost); assets.jumpSfx.play().catch(() => {}); }
    else if (state === 'PLAYING') { ghost = flap(ghost); assets.jumpSfx.play().catch(() => {}); }
    else { reset(); state = 'READY'; }
  });

  function loop(time) {
    const dt = Math.min((time - (lastTime || time)) / 1000, 0.05);
    lastTime = time;

    if (state === 'PLAYING') {
      ghost = applyGravity(ghost, dt);
      ghost = clampY(ghost, CANVAS_HEIGHT - FOOTER_HEIGHT - GHOST_SIZE);
      const speed = getSpeed(score);
      pipes = advancePipes(pipes, dt, speed);
      if (shouldSpawn(pipes, CANVAS_WIDTH, PIPE_SPACING)) pipes.push(spawnPipe(CANVAS_WIDTH));
      pipes = recyclePipes(pipes);
      const earned = updateScore(GHOST_X, pipes);
      if (earned > 0 && audioCtx) playScoreSfx(audioCtx);
      score += earned;
      const rect = { x: GHOST_X, y: ghost.y, w: GHOST_SIZE, h: GHOST_SIZE };
      if (checkCollision(rect, pipes, CANVAS_HEIGHT, FOOTER_HEIGHT)) {
        state = 'GAME_OVER';
        if (score > highScore) { highScore = score; setHighScore(score); }
        assets.gameOverSfx.play().catch(() => {});
      }
    }

    updateClouds(clouds, dt);

    drawSky(ctx);
    drawClouds(ctx, clouds);
    for (const p of pipes) drawPipe(ctx, p);
    drawGhost(ctx, assets.ghost, GHOST_X, ghost.y, ghost.vy);
    drawHUD(ctx, score, highScore);
    if (state === 'READY') drawReady(ctx);
    if (state === 'GAME_OVER') drawGameOver(ctx, score);

    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
}
