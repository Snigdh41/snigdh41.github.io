## 2024-05-19 - Layout Thrashing in High-Frequency Events
**Learning:** Reading layout properties like `getBoundingClientRect()` synchronously during high-frequency events (like `mousemove`, `scroll`, or `resize`) blocks the main thread and causes severe layout thrashing.
**Action:** Always wrap these synchronous DOM reads and subsequent style updates in a `requestAnimationFrame` callback to synchronize them with the browser's render cycle, and mark event listeners with `{ passive: true }` when possible.
