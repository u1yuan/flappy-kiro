import { PIPE_WIDTH, PIPE_SPEED } from './constants.js';

export function updateScore(ghostX, pipes) {
  let gained = 0;
  for (const p of pipes) {
    if (!p.passed && p.x + PIPE_WIDTH < ghostX) {
      p.passed = true;
      gained++;
    }
  }
  return gained;
}

export function getSpeed(score) {
  return PIPE_SPEED + Math.min(score * 5, 100);
}
