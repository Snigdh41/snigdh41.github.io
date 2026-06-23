import { test } from 'node:test';
import assert from 'node:assert';
import { buildAutoReplyEmail, buildNotificationEmail, sanitize, isRateLimited, rateLimitMap } from './index.js';

test('isRateLimited() evicts expired items and respects size limits', () => {
  // Mock Date.now() to control time
  const originalDateNow = Date.now;

  try {
    let mockNow = 1000000000000; // Arbitrary start time
    Date.now = () => mockNow;

    // Clear the map initially to ensure clean state
    rateLimitMap.clear();

    // 1. Add some initial items
    isRateLimited('1.1.1.1');
    isRateLimited('2.2.2.2');
    assert.strictEqual(rateLimitMap.size, 2);

    // 2. Advance time past the expiration window (15 minutes = 15 * 60 * 1000 ms)
    mockNow += 16 * 60 * 1000;

    // 3. Trigger eviction (will only clean up during interval checks or max map size, wait we can just add a new item)
    // The cleanup interval is 1 min (60,000 ms), so mockNow jump of 16 mins > 1 min
    isRateLimited('3.3.3.3');

    // 1.1.1.1 and 2.2.2.2 should have been evicted, leaving only 3.3.3.3
    assert.strictEqual(rateLimitMap.size, 1);
    assert.ok(rateLimitMap.has('3.3.3.3'));

    // 4. Test max size behavior
    rateLimitMap.clear();

    // Fill up to 10000 (MAX_MAP_SIZE)
    for (let i = 0; i < 10000; i++) {
      rateLimitMap.set(`ip-${i}`, { windowStart: mockNow, count: 1 });
    }

    assert.strictEqual(rateLimitMap.size, 10000);

    // Adding 10001st item should trigger size limit protection
    // Since none are expired, the map should be cleared entirely to prevent OOM
    isRateLimited('10001.1.1.1');

    // Map was cleared, then the new item was added
    assert.strictEqual(rateLimitMap.size, 1);
    assert.ok(rateLimitMap.has('10001.1.1.1'));

  } finally {
    // Restore Date.now
    Date.now = originalDateNow;
    rateLimitMap.clear();
  }
});

test('sanitize() escapes HTML special characters', () => {
  const input = '<b> "Test" & Co. </b>';
  const expected = '&lt;b&gt; &quot;Test&quot; &amp; Co. &lt;/b&gt;';
  assert.strictEqual(sanitize(input), expected);
});

test('buildAutoReplyEmail() returns correct object', () => {
  const data = {
    name: 'John Doe',
    email: 'john@example.com',
    intent: 'Collaboration'
  };

  const result = buildAutoReplyEmail(data);

  assert.strictEqual(result.to, data.email);
  assert.ok(result.subject.includes(data.name));
  assert.ok(result.html.includes(`Hey ${data.name}`));
});

test('buildAutoReplyEmail() sanitizes input in HTML', () => {
  const data = {
    name: '<script>alert("xss")</script>',
    email: 'test@example.com',
    intent: 'Just Vibes ☕'
  };

  const result = buildAutoReplyEmail(data);
  const sanitizedName = sanitize(data.name);

  assert.ok(result.html.includes(sanitizedName));
  assert.ok(!result.html.includes(data.name));
});

test('buildNotificationEmail() uses correct emoji for Job Opportunity', () => {
  const data = {
    name: 'HR Manager',
    email: 'hr@company.com',
    intent: 'Job Opportunity',
    message: 'We have an opening for you!'
  };

  const result = buildNotificationEmail(data);

  assert.ok(result.subject.startsWith('💼'));
  assert.ok(result.html.includes('💼 Job Opportunity'));
});

test('buildNotificationEmail() uses correct emoji for Collaboration', () => {
  const data = {
    name: 'Partner',
    email: 'partner@startup.io',
    intent: 'Collaboration',
    message: 'Let us work together.'
  };

  const result = buildNotificationEmail(data);

  assert.ok(result.subject.startsWith('🤝'));
  assert.ok(result.html.includes('🤝 Collaboration'));
});

test('buildNotificationEmail() uses default emoji for others', () => {
  const data = {
    name: 'Friend',
    email: 'friend@gmail.com',
    intent: 'Just Vibes ☕',
    message: 'How is it going?'
  };

  const result = buildNotificationEmail(data);

  assert.ok(result.subject.startsWith('☕'));
  assert.ok(result.html.includes('☕ Just Vibes ☕'));
});

test('buildNotificationEmail() sanitizes all inputs', () => {
  const data = {
    name: '<b>Bad</b>',
    email: 'bad@email.com">',
    intent: 'Collaboration',
    message: '"><img src=x onerror=alert(1)>'
  };

  const result = buildNotificationEmail(data);

  assert.ok(result.subject.includes(sanitize(data.name)));
  assert.ok(result.html.includes(sanitize(data.name)));
  assert.ok(result.html.includes(sanitize(data.email)));
  assert.ok(result.html.includes(sanitize(data.message)));

  assert.ok(!result.html.includes(data.name));
  assert.ok(!result.html.includes(data.message));
});
