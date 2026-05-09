## 2024-05-10 - High-Frequency Event Layout Thrashing
**Learning:** `mousemove` events can fire at extremely high rates (e.g., 1000Hz on gaming mice). Synchronously calling `getBoundingClientRect()` inside a raw `mousemove` event handler causes excessive layout recalculations and main thread blocking, severely degrading performance.
**Action:** Always throttle high-frequency events (like `mousemove`, `scroll`, `resize`) using `requestAnimationFrame` when updating the DOM or reading layout properties. Additionally, mark such event listeners with `{ passive: true }` when possible.
