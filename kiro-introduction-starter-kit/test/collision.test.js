import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { checkCollision } from '../src/collision.js';

describe('collision', () => {
  const pipe = { x: 200, gapY: 300 };

  it('no collision when ghost in gap', () => {
    const ghost = { x: 200, y: 270, w: 32, h: 32 };
    assert.equal(checkCollision(ghost, [pipe], 600, 40), false);
  });

  it('collision when ghost overlaps top pipe', () => {
    const ghost = { x: 200, y: 100, w: 32, h: 32 };
    assert.equal(checkCollision(ghost, [pipe], 600, 40), true);
  });

  it('collision when ghost overlaps bottom pipe', () => {
    const ghost = { x: 200, y: 400, w: 32, h: 32 };
    assert.equal(checkCollision(ghost, [pipe], 600, 40), true);
  });

  it('collision at floor', () => {
    const ghost = { x: 100, y: 560, w: 32, h: 32 };
    assert.equal(checkCollision(ghost, [], 600, 40), true);
  });

  it('collision at ceiling', () => {
    const ghost = { x: 100, y: -5, w: 32, h: 32 };
    assert.equal(checkCollision(ghost, [], 600, 40), true);
  });
});
