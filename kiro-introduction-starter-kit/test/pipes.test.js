import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { spawnPipe, advancePipes, shouldSpawn, recyclePipes } from '../src/pipes.js';

describe('pipes', () => {
  it('spawnPipe returns valid object', () => {
    const p = spawnPipe(800);
    assert.equal(p.x, 800);
    assert.ok(p.gapY >= 80);
    assert.equal(p.passed, false);
  });

  it('advancePipes moves left', () => {
    const pipes = [{ x: 400, gapY: 300, passed: false }];
    const result = advancePipes(pipes, 1, 180);
    assert.equal(result[0].x, 220);
  });

  it('shouldSpawn true when empty', () => {
    assert.ok(shouldSpawn([], 800, 220));
  });

  it('shouldSpawn true when last pipe moved enough', () => {
    assert.ok(shouldSpawn([{ x: 500 }], 800, 220));
  });

  it('shouldSpawn false when last pipe too close', () => {
    assert.ok(!shouldSpawn([{ x: 650 }], 800, 220));
  });

  it('recyclePipes removes off-screen', () => {
    const pipes = [{ x: -60 }, { x: 100 }];
    assert.equal(recyclePipes(pipes).length, 1);
  });
});
