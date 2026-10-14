import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const origin = 'https://snigdhsharma.in';
const key = readFileSync(new URL('../public/indexnow-key.txt', import.meta.url), 'utf8').trim();
const keyLocation = `${origin}/indexnow-key.txt`;
const urls = [...new Set(process.argv.slice(2))];
assert.ok(urls.length > 0 && urls.length <= 10000, 'Supply the canonical URLs of newly published or changed pages.');
assert.match(key, /^[a-zA-Z0-9-]{8,128}$/);
for (const url of urls) {
  const parsed = new URL(url);
  assert.equal(parsed.origin, origin, 'Only this site may be submitted.');
  assert.ok(!parsed.search && !parsed.hash, 'Use canonical URLs without query strings or fragments.');
}
const ownership = await fetch(keyLocation, { signal: AbortSignal.timeout(30000) });
assert.equal(ownership.status, 200, 'The ownership file must be deployed first.');
assert.equal((await ownership.text()).trim(), key, 'Live ownership key does not match.');
for (const url of urls) {
  const page = await fetch(url, { signal: AbortSignal.timeout(30000) });
  assert.equal(page.status, 200, `Page must be live: ${url}`);
  const html = await page.text();
  const canonical = html.match(/<link\b[^>]*rel="canonical"[^>]*>/)?.[0];
  assert.ok(canonical?.includes(`href="${url}"`), `Expected self-canonical page: ${url}`);
}
const response = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: new URL(origin).host, key, keyLocation, urlList: urls }),
  signal: AbortSignal.timeout(30000),
});
const detail = (await response.text()).slice(0, 500);
assert.ok([200, 202].includes(response.status), `IndexNow rejected submission: HTTP ${response.status} ${detail}`);
console.log(JSON.stringify({
  submittedAt: new Date().toISOString(),
  status: response.status,
  result: response.status === 202 ? 'Received; key validation pending' : 'URLs received successfully',
  urls,
  note: 'Receipt does not guarantee crawling, indexing, or ranking.',
}, null, 2));
