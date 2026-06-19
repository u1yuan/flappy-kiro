import { loadImage, loadAudio } from './src/assets.js';
import { createGame } from './src/game.js';

const canvas = document.getElementById('game');
const assets = {
  ghost: await loadImage('assets/ghosty.png'),
  jumpSfx: loadAudio('assets/jump.wav'),
  gameOverSfx: loadAudio('assets/game_over.wav'),
};
createGame(canvas, assets);
