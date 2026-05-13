export function resizeCanvas(canvas, width, height) {
  if (!canvas) return null;

  const dpr = window.devicePixelRatio || 1;
  const backingWidth = Math.round(width * dpr);
  const backingHeight = Math.round(height * dpr);

  const sameLogical =
    canvas._logicalWidth === width &&
    canvas._logicalHeight === height &&
    canvas._dpr === dpr;

  if (sameLogical) {
    return canvas.getContext("2d");
  }

  canvas._logicalWidth = width;
  canvas._logicalHeight = height;
  canvas._dpr = dpr;

  canvas.width = backingWidth;
  canvas.height = backingHeight;

  canvas.style.width = width + "px";
  canvas.style.height = height + "px";

  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // Scale so draw calls can stay in logical scene units.
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.scale(dpr, dpr);

  return ctx;
}