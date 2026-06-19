import { GRAVITY, FLAP_IMPULSE } from './constants.js';

export function applyGravity(state, dt) {
  return { ...state, y: state.y + state.vy * dt, vy: state.vy + GRAVITY * dt };
}

export function flap(state) {
  return { ...state, vy: FLAP_IMPULSE };
}

export function clampY(state, maxY) {
  if (state.y < 0) return { ...state, y: 0, vy: 0 };
  if (state.y > maxY) return { ...state, y: maxY, vy: 0 };
  return state;
}
