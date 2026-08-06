## 2026-05-08 - RequestAnimationFrame Debouncing
**Learning:** High-frequency events like `mousemove` cause significant layout thrashing when triggering synchronous DOM reads (`getBoundingClientRect`) and writes (`style.setProperty`).
**Action:** Always wrap high-frequency DOM manipulation tasks in a `requestAnimationFrame` and cancel any pending frames, effectively synchronizing execution with the display refresh rate to avoid main thread blocking.

## 2026-05-12 - Consolidate IntersectionObservers
**Learning:** Instantiating multiple `IntersectionObserver` instances with the identical configuration to observe separate elements creates unnecessary memory overhead and redundant callback executions during scroll events.
**Action:** When observing multiple elements with identical logic and boundaries, batch them into a single `IntersectionObserver` instance to improve overall performance.

## 2026-05-13 - Global Observer Caching
**Learning:** Instantiating multiple IntersectionObserver instances for common interactions (like scroll reveals on multiple components) creates unnecessary memory overhead.
**Action:** Use a module-level `Map` to cache IntersectionObserver instances by their configuration (like `threshold`), and a `WeakMap` to store per-element callbacks. This heavily reduces object creation and memory overhead by allowing multiple elements to share a single observer under the hood.

## 2026-05-20 - Concurrent Cloudflare Worker API Requests
**Learning:** Sequential execution of independent external API requests (like multiple email sends via Resend) in Cloudflare Workers causes accumulated latency, blocking the execution thread and extending the overall response time for the client.
**Action:** Always identify independent asynchronous operations and execute them concurrently using `Promise.all()` to minimize total latency and maximize performance.
