# Snigdh Sharma — portfolio and engineering lab

[Portfolio](https://snigdhsharma.in) · [Technical writing](https://snigdhsharma.in/insights) · [RSS](https://snigdhsharma.in/feed.xml)

## Interactive AI agent authorization lab

What happens when an AI agent proposes an unauthorized tool call? This browser lab lets you change four controls and inspect seven synthetic scenarios: tenant isolation, tool scope, exact approval, and revoked access, alongside two legitimate operations.

**[Try the agent security lab](https://snigdhsharma.in/labs/agent-security)** · **[Read the experiment and results](https://snigdhsharma.in/insights/agent-tool-authorization-lab)**

- Inspect the proposed call, policy checks, and simulated effects.
- Remove individual controls to reproduce authorization failures.
- Export fixture results as JSON or run the same dependency-free engine locally.

With all four controls enabled, the seven fixtures match their expected decisions: five adverse actions blocked and two legitimate actions allowed. This is a deterministic authorization demonstration, not an LLM robustness benchmark or production security library. It makes no model or external API calls.

[Engine and fixtures](public/labs/agent-security-engine.mjs) · [19 executable tests](scripts/agent-security.test.mjs)

```sh
node --test scripts/agent-security.test.mjs
```

## Run the portfolio locally

```sh
npm ci
npm run dev
```

Validation: `npm test -- --runInBand`, `npm run test:lab`, and `npm run build && npm run test:seo`.

GitHub Actions builds the static site and deploys it to GitHub Pages on pushes to `main`.

## Notify search engines after publishing

The public `indexnow-key.txt` file proves site ownership for IndexNow; it is not an account credential. After a page is deployed, submit its canonical URL:

```sh
node scripts/submit-indexnow.mjs https://snigdhsharma.in/labs/agent-security
```

The script verifies the live ownership file and checks that each URL is a live canonical page on this domain before sending it to IndexNow. Submit only new or changed URLs. A successful submission confirms receipt, not indexing or ranking. See the [IndexNow protocol](https://www.indexnow.org/documentation).
