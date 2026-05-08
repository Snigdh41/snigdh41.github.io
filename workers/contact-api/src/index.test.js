import { test } from 'node:test';
import assert from 'node:assert';
import { buildAutoReplyEmail, buildNotificationEmail, sanitize } from './index.js';

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
