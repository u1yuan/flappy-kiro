import { CANVAS_WIDTH, CANVAS_HEIGHT } from './constants.js';

const PX = 4; // pixel block size for 8-bit look

// Cloud templates: 2D arrays where 1 = filled pixel block
const CLOUD_TEMPLATES = [
  [ // large fluffy cloud
    [0,0,1,1,1,1,0,0],
    [0,1,1,1,1,1,1,0],
    [1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1],
    [0,1,1,1,1,1,1,0],
  ],
  [ // medium cloud
    [0,1,1,1,1,0],
    [1,1,1,1,1,1],
    [1,1,1,1,1,1],
    [0,1,1,1,1,0],
  ],
  [ // small puffy cloud
    [0,1,1,0],
    [1,1,1,1],
    [1,1,1,1],
    [0,1,1,0],
  ],
  [ // wide flat cloud
    [0,0,1,1,1,1,1,0,0],
    [0,1,1,1,1,1,1,1,0],
    [1,1,1,1,1,1,1,1,1],
    [0,1,1,1,1,1,1,1,0],
  ],
];

export function createClouds() {
  const clouds = [];
  for (let i = 0; i < 8; i++) {
    const tpl = CLOUD_TEMPLATES[Math.floor(Math.random() * CLOUD_TEMPLATES.length)];
    clouds.push({
      x: Math.random() * CANVAS_WIDTH,
      y: 20 + Math.random() * 120,
      template: tpl,
      speed: 15 + Math.random() * 25, // varied parallax speeds
    });
  }
  return clouds;
}

export function updateClouds(clouds, dt) {
  for (const c of clouds) {
    c.x -= c.speed * dt;
    const w = (c.template[0]?.length || 4) * PX;
    if (c.x + w < 0) c.x = CANVAS_WIDTH + Math.random() * 60;
  }
}

export function drawClouds(ctx, clouds) {
  ctx.save();
  ctx.imageSmoothingEnabled = false;
  for (const c of clouds) {
    const tpl = c.template;
    for (let row = 0; row < tpl.length; row++) {
      for (let col = 0; col < tpl[row].length; col++) {
        if (tpl[row][col]) {
          // Main white block
          ctx.fillStyle = '#e8e8e8';
          ctx.fillRect(Math.floor(c.x) + col * PX, Math.floor(c.y) + row * PX, PX, PX);
          // Highlight on top-left pixel edge
          if (row === 0 || !tpl[row - 1][col]) {
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(Math.floor(c.x) + col * PX, Math.floor(c.y) + row * PX, PX, 1);
          }
          // Shadow on bottom edge
          if (row === tpl.length - 1 || !tpl[row + 1]?.[col]) {
            ctx.fillStyle = '#b0b0b0';
            ctx.fillRect(Math.floor(c.x) + col * PX, Math.floor(c.y) + (row + 1) * PX - 1, PX, 1);
          }
        }
      }
    }
  }
  ctx.restore();
}
