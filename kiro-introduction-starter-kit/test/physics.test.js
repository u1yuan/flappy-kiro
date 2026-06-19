import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { applyGravity, flap, clampY } from '../src/physics.js';

describe('physics', () => {
  it('applyGravity increases vy', () => {
    const result = applyGravity({ y: 100, vy: 0 }, 0.1);
    assert.ok(result.vy > 0);
    assert.ok(result.y >= 100);
  });

  it('flap sets vy negative', () => {
    const result = flap({ y: 100, vy: 50 });
    assert.ok(result.vy < 0);
  });

  it('clampY clamps at 0', () => {
    const result = clampY({ y: -10, vy: -50 }, 500);
    assert.equal(result.y, 0);
    assert.equal(result.vy, 0);
  });

  it('clampY clamps at maxY', () => {
    const result = clampY({ y: 600, vy: 50 }, 500);
    assert.equal(result.y, 500);
    assert.equal(result.vy, 0);
  });
});
