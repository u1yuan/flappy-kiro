export function createInput(canvas) {
  let callback = null;
  const trigger = (e) => { e.preventDefault(); callback?.(); };
  const onKey = (e) => { if (e.code === 'Space') trigger(e); };
  document.addEventListener('keydown', onKey);
  canvas.addEventListener('mousedown', trigger);
  canvas.addEventListener('touchstart', trigger);
  return {
    onFlap(cb) { callback = cb; },
    destroy() {
      document.removeEventListener('keydown', onKey);
      canvas.removeEventListener('mousedown', trigger);
      canvas.removeEventListener('touchstart', trigger);
    }
  };
}
