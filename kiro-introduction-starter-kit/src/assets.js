export function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}
export function loadAudio(src) {
  const audio = new Audio(src);
  audio.preload = 'auto';
  return audio;
}
