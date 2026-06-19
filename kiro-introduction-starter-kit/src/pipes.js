import { MIN_PIPE_Y, MAX_PIPE_Y, PIPE_WIDTH } from './constants.js';

export function spawnPipe(canvasWidth) {
  return { x: canvasWidth, gapY: MIN_PIPE_Y + Math.random() * (MAX_PIPE_Y - MIN_PIPE_Y), passed: false };
}

export function advancePipes(pipes, dt, speed) {
  return pipes.map(p => ({ ...p, x: p.x - speed * dt }));
}

export function shouldSpawn(pipes, canvasWidth, spacing) {
  return pipes.length === 0 || pipes[pipes.length - 1].x < canvasWidth - spacing;
}

export function recyclePipes(pipes) {
  return pipes.filter(p => p.x > -PIPE_WIDTH);
}
