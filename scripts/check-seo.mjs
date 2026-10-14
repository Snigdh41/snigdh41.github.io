import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
const root = resolve('out');
const read = file => readFileSync(resolve(root, file), 'utf8');
const sitemap = read('sitemap.xml');
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
assert.ok(urls.length >= 7, 'Sitemap must include home, writing index, and every published article');
assert.equal(new Set(urls).size, urls.length, 'Sitemap URLs must be unique');
const articles = [];
for (const url of urls) {
  const { pathname, origin } = new URL(url);
  assert.equal(origin, 'https://snigdhsharma.in');
  const file = pathname === '/' ? 'index.html' : `${pathname.slice(1)}.html`;
  assert.ok(existsSync(resolve(root, file)), `Missing exported page: ${file}`);
  const html = read(file);
  const canonicals = [...html.matchAll(/<link\b[^>]*rel="canonical"[^>]*>/g)];
  assert.equal(canonicals.length, 1, `${file}: exactly one canonical required`);
  assert.ok(canonicals[0][0].includes(`href="${url}"`), `${file}: canonical must point to itself`);
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `${file}: one primary heading required`);
  assert.match(html, /<meta name="description" content="[^"]+"/);
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(match => JSON.parse(match[1]));
  if (pathname.startsWith('/insights/')) {
    articles.push(url);
    const post = schemas.find(schema => schema['@type'] === 'BlogPosting');
    assert.equal(post?.mainEntityOfPage?.['@id'], url);
    assert.ok(post.author?.name && post.datePublished);
    const visibleMarkup = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '');
    assert.ok(!visibleMarkup.includes('undefined'), `${file}: undefined content found`);
    for (const match of html.matchAll(/href="#([^"]+)"/g)) {
      assert.ok(html.includes(`id="${match[1]}"`), `${file}: missing anchor ${match[1]}`);
    }
  }
}
const feed = read('feed.xml');
assert.equal((feed.match(/<item>/g) || []).length, articles.length, 'RSS must include every article');
for (const url of articles) assert.ok(feed.includes(`<guid isPermaLink="true">${url}</guid>`));
assert.ok(read('robots.txt').includes('Sitemap: https://snigdhsharma.in/sitemap.xml'));
assert.ok(read('insights.html').includes('application/rss+xml'));
console.log(`SEO export checks passed: ${urls.length} pages, ${articles.length} articles, one canonical per page, valid article JSON-LD, working anchors, complete RSS.`);
