import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { updateScore, getSpeed } from '../src/score.js';

describe('score', () => {
  it('updateScore marks passed pipes', () => {
    const pipes = [{ x: 50, passed: false }, { x: 300, passed: false }];
    const gained = updateScore(120, pipes);
    assert.equal(gained, 1);
    assert.equal(pipes[0].passed, true);
    assert.equal(pipes[1].passed, false);
  });

  it('updateScore ignores already passed', () => {
    const pipes = [{ x: 50, passed: true }];
    assert.equal(updateScore(120, pipes), 0);
  });

  it('getSpeed increases with score', () => {
    assert.ok(getSpeed(5) > getSpeed(0));
  });

  it('getSpeed caps at PIPE_SPEED + 100', () => {
    assert.equal(getSpeed(100), 280);
  });
});
