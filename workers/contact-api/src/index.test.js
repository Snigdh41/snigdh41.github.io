import { test } from 'node:test';
import assert from 'node:assert';
import { buildAutoReplyEmail, buildNotificationEmail, sanitize, validateBody } from './index.js';

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

test('validateBody() returns empty array for valid input', () => {
  const body = {
    name: 'Jane Doe',
    email: 'jane@example.com',
    intent: 'Collaboration',
    message: 'This is a valid test message.'
  };
  const errors = validateBody(body);
  assert.deepStrictEqual(errors, []);
});

test('validateBody() returns error for missing or invalid name', () => {
  assert.ok(validateBody({ email: 'test@example.com', intent: 'Collaboration', message: 'Valid message here.' }).some(e => e.includes('Name is required')));
  assert.ok(validateBody({ name: 'A', email: 'test@example.com', intent: 'Collaboration', message: 'Valid message here.' }).some(e => e.includes('Name is required')));
  assert.ok(validateBody({ name: 123, email: 'test@example.com', intent: 'Collaboration', message: 'Valid message here.' }).some(e => e.includes('Name is required')));
});

test('validateBody() returns error for missing or invalid email', () => {
  const base = { name: 'Jane Doe', intent: 'Collaboration', message: 'Valid message here.' };
  assert.ok(validateBody(base).some(e => e.includes('valid email')));
  assert.ok(validateBody({ ...base, email: 'invalid-email' }).some(e => e.includes('valid email')));
  assert.ok(validateBody({ ...base, email: 'missing@domain' }).some(e => e.includes('valid email')));
});

test('validateBody() returns error for missing or invalid intent', () => {
  const base = { name: 'Jane Doe', email: 'jane@example.com', message: 'Valid message here.' };
  assert.ok(validateBody(base).some(e => e.includes('Intent must be one of')));
  assert.ok(validateBody({ ...base, intent: 'Unknown Intent' }).some(e => e.includes('Intent must be one of')));
});

test('validateBody() returns error for missing or invalid message', () => {
  const base = { name: 'Jane Doe', email: 'jane@example.com', intent: 'Collaboration' };
  assert.ok(validateBody(base).some(e => e.includes('Message is required')));
  assert.ok(validateBody({ ...base, message: 'Too short' }).some(e => e.includes('Message is required')));
  assert.ok(validateBody({ ...base, message: 123 }).some(e => e.includes('Message is required')));
});

test('validateBody() returns error for excessively long message', () => {
  const longMessage = 'A'.repeat(2001);
  const base = { name: 'Jane Doe', email: 'jane@example.com', intent: 'Collaboration', message: longMessage };
  assert.ok(validateBody(base).some(e => e.includes('under 2000 characters')));
});

test('validateBody() returns multiple errors for multiple missing fields', () => {
  const errors = validateBody({});
  assert.strictEqual(errors.length, 4); // Missing name, email, intent, message
  assert.ok(errors.some(e => e.includes('Name is required')));
  assert.ok(errors.some(e => e.includes('valid email')));
  assert.ok(errors.some(e => e.includes('Intent must be one of')));
  assert.ok(errors.some(e => e.includes('Message is required')));
});
