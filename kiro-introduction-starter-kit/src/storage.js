export function getHighScore() {
  return parseInt(localStorage.getItem('flappyKiroHigh') || '0', 10);
}
export function setHighScore(score) {
  localStorage.setItem('flappyKiroHigh', String(score));
}
