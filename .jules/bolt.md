## 2025-02-09 - Mouse Event Throttling with rAF
**Learning:** The `useMouseGlow` hook read layout (`getBoundingClientRect()`) and modified custom properties on every single unthrottled `mousemove` event, which causes layout thrashing and harms main thread responsiveness when dealing with high polling rate mice.
**Action:** Always wrap high-frequency DOM read/write event listeners (like `mousemove`, `scroll`, and `resize`) in `window.requestAnimationFrame()`, and use a `ticking` flag to throttle updates to match the display refresh rate. Ensure `cancelAnimationFrame` is called on cleanup.
