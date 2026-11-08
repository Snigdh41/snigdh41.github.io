## 2026-05-08 - RequestAnimationFrame Debouncing
**Learning:** High-frequency events like `mousemove` cause significant layout thrashing when triggering synchronous DOM reads (`getBoundingClientRect`) and writes (`style.setProperty`).
**Action:** Always wrap high-frequency DOM manipulation tasks in a `requestAnimationFrame` and cancel any pending frames, effectively synchronizing execution with the display refresh rate to avoid main thread blocking.

## 2026-05-12 - Consolidate IntersectionObservers
**Learning:** Instantiating multiple `IntersectionObserver` instances with the identical configuration to observe separate elements creates unnecessary memory overhead and redundant callback executions during scroll events.
**Action:** When observing multiple elements with identical logic and boundaries, batch them into a single `IntersectionObserver` instance to improve overall performance.

## 2026-05-13 - Global Observer Caching
**Learning:** Instantiating multiple IntersectionObserver instances for common interactions (like scroll reveals on multiple components) creates unnecessary memory overhead.
**Action:** Use a module-level `Map` to cache IntersectionObserver instances by their configuration (like `threshold`), and a `WeakMap` to store per-element callbacks. This heavily reduces object creation and memory overhead by allowing multiple elements to share a single observer under the hood.

## 2024-07-02 - Cloudflare Workers I/O Concurrency
**Learning:** In the Cloudflare Workers environment (`workers/contact-api`), sequential external network requests (like sending notification and auto-reply emails via Resend) needlessly block the single execution thread, accumulating latency and extending the total duration of the worker script, which negatively impacts user experience and increases worker execution duration costs.
**Action:** When making multiple independent network requests within a worker execution (e.g. hitting external APIs), always batch them concurrently using `Promise.all()` to ensure execution duration is bound by the slowest request, not the sum of all requests.
