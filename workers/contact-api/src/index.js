import { Resend } from 'resend';

// ── Constants ──────────────────────────────────────────────────
const ALLOWED_ORIGINS = [
  'https://snigdhsharma.in',
  'http://localhost:3000',
];

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX = 5;

const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

const VALID_INTENTS = ['Job Opportunity', 'Collaboration', 'Just Vibes ☕'];

const RECIPIENT_EMAIL = 'contact@snigdhsharma.in';
const SENDER_EMAIL = 'contact@snigdhsharma.in';
const SENDER_NAME = 'Snigdh Sharma';

// ── In-Memory Rate Limiter ─────────────────────────────────────
export const rateLimitMap = new Map();
let lastCleanup = Date.now();
const MAX_MAP_SIZE = 10000;
const CLEANUP_INTERVAL = 60 * 1000; // 1 minute

function cleanupRateLimitMap(now) {
  for (const [key, value] of rateLimitMap.entries()) {
    if (now - value.windowStart > RATE_LIMIT_WINDOW_MS) {
      rateLimitMap.delete(key);
    }
  }
  lastCleanup = now;
}

export function isRateLimited(ip) {
  const now = Date.now();

  if (now - lastCleanup > CLEANUP_INTERVAL) {
    cleanupRateLimitMap(now);
  }

  // Size limit protection to prevent OOM
  if (rateLimitMap.size >= MAX_MAP_SIZE && !rateLimitMap.has(ip)) {
    cleanupRateLimitMap(now);
    if (rateLimitMap.size >= MAX_MAP_SIZE) {
      rateLimitMap.clear();
    }
  }

  const entry = rateLimitMap.get(ip);

  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { windowStart: now, count: 1 });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return true;
  }

  entry.count++;
  return false;
}

// ── CORS Helpers ───────────────────────────────────────────────
function getCorsOrigin(request) {
  const origin = request.headers.get('Origin') || '';
  return ALLOWED_ORIGINS.includes(origin) ? origin : null;
}

function corsHeaders(origin) {
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  };
}

// ── Validation ─────────────────────────────────────────────────
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateBody(body) {
  const errors = [];

  if (!body.name || typeof body.name !== 'string' || body.name.trim().length < 2) {
    errors.push('Name is required (minimum 2 characters).');
  }
  if (!body.email || !EMAIL_REGEX.test(body.email)) {
    errors.push('A valid email address is required.');
  }
  if (!body.intent || !VALID_INTENTS.includes(body.intent)) {
    errors.push(`Intent must be one of: ${VALID_INTENTS.join(', ')}.`);
  }
  if (!body.message || typeof body.message !== 'string' || body.message.trim().length < 10) {
    errors.push('Message is required (minimum 10 characters).');
  }
  if (body.message && body.message.length > 2000) {
    errors.push('Message must be under 2000 characters.');
  }

  return errors;
}

export function sanitize(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ── Turnstile Verification ─────────────────────────────────────
async function verifyTurnstile(token, ip, secretKey) {
  const response = await fetch(TURNSTILE_VERIFY_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      secret: secretKey,
      response: token,
      remoteip: ip,
    }),
  });

  const result = await response.json();
  console.log('Turnstile verification result:', JSON.stringify(result));
  return result.success === true;
}

// ── Email Templates ────────────────────────────────────────────
export function buildNotificationEmail({ name, email, intent, message }) {
  const intentEmoji =
    intent === 'Job Opportunity' ? '💼' :
    intent === 'Collaboration' ? '🤝' : '☕';

  return {
    from: `${SENDER_NAME} Portfolio <${SENDER_EMAIL}>`,
    to: RECIPIENT_EMAIL,
    subject: `${intentEmoji} Coffee Chat Request — ${sanitize(name)}`,
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #13131a; border-radius: 16px; overflow: hidden; border: 1px solid #2a2a3a;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 32px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 24px;">☕ New Coffee Chat Request</h1>
        </div>
        <div style="padding: 32px; color: #f1f5f9;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; color: #94a3b8; font-size: 14px; vertical-align: top; width: 100px;">Name</td>
              <td style="padding: 12px 0; color: #f1f5f9; font-weight: 600;">${sanitize(name)}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; color: #94a3b8; font-size: 14px; vertical-align: top;">Email</td>
              <td style="padding: 12px 0;"><a href="mailto:${sanitize(email)}" style="color: #818cf8; text-decoration: none;">${sanitize(email)}</a></td>
            </tr>
            <tr>
              <td style="padding: 12px 0; color: #94a3b8; font-size: 14px; vertical-align: top;">Intent</td>
              <td style="padding: 12px 0; color: #f1f5f9;">${intentEmoji} ${sanitize(intent)}</td>
            </tr>
          </table>
          <div style="margin-top: 24px; padding: 20px; background: #1a1a25; border-radius: 12px; border: 1px solid #2a2a3a;">
            <p style="color: #94a3b8; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 12px 0;">Message</p>
            <p style="color: #f1f5f9; margin: 0; line-height: 1.6; white-space: pre-wrap;">${sanitize(message)}</p>
          </div>
          <div style="margin-top: 24px; text-align: center;">
            <a href="mailto:${sanitize(email)}" style="display: inline-block; padding: 12px 32px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; border-radius: 9999px; font-weight: 600; font-size: 14px;">Reply to ${sanitize(name)}</a>
          </div>
        </div>
        <div style="padding: 16px 32px; text-align: center; border-top: 1px solid #2a2a3a;">
          <p style="color: #64748b; font-size: 12px; margin: 0;">Sent via snigdhsharma.in contact form</p>
        </div>
      </div>
    `,
  };
}

export function buildAutoReplyEmail({ name, email, intent }) {
  return {
    from: `${SENDER_NAME} <${SENDER_EMAIL}>`,
    to: email,
    subject: `Thanks for reaching out, ${sanitize(name)}! ☕`,
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #13131a; border-radius: 16px; overflow: hidden; border: 1px solid #2a2a3a;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 32px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 24px;">☕ Chat Request Received!</h1>
        </div>
        <div style="padding: 32px; color: #f1f5f9;">
          <p style="font-size: 16px; line-height: 1.7; margin: 0 0 16px 0;">
            Hey ${sanitize(name)},
          </p>
          <p style="font-size: 16px; line-height: 1.7; margin: 0 0 16px 0;">
            Thanks for reaching out through my portfolio! I've received your message and I'll get back to you as soon as I can — typically within 48 hours.
          </p>
          <p style="font-size: 16px; line-height: 1.7; margin: 0 0 24px 0;">
            In the meantime, feel free to connect with me on LinkedIn:
          </p>
          <div style="text-align: center; margin: 24px 0;">
            <a href="https://www.linkedin.com/in/snigdh-sharma" style="display: inline-block; padding: 12px 32px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; border-radius: 9999px; font-weight: 600; font-size: 14px;">Connect on LinkedIn</a>
          </div>
          <p style="font-size: 16px; line-height: 1.7; margin: 24px 0 0 0;">
            Talk soon! ☕<br/>
            <strong>Snigdh Sharma</strong>
          </p>
        </div>
        <div style="padding: 16px 32px; text-align: center; border-top: 1px solid #2a2a3a;">
          <p style="color: #64748b; font-size: 12px; margin: 0;">This is an automated reply from <a href="https://snigdhsharma.in" style="color: #818cf8; text-decoration: none;">snigdhsharma.in</a></p>
        </div>
      </div>
    `,
  };
}

// ── Main Handler ───────────────────────────────────────────────
const worker = {
  async fetch(request, env) {
    const origin = getCorsOrigin(request);

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: origin ? corsHeaders(origin) : {},
      });
    }

    // Only accept POST to /contact
    const url = new URL(request.url);
    if (url.pathname !== '/contact') {
      return jsonResponse(404, { success: false, error: 'Not found.' }, origin);
    }
    if (request.method !== 'POST') {
      return jsonResponse(405, { success: false, error: 'Method not allowed.' }, origin);
    }

    // Rate limiting
    const clientIP = request.headers.get('CF-Connecting-IP') || 'unknown';
    console.log(`[contact] Request from IP: ${clientIP}, Origin: ${origin}`);

    if (isRateLimited(clientIP)) {
      console.log(`[contact] Rate limited: ${clientIP}`);
      return jsonResponse(429, {
        success: false,
        error: 'Too many requests. Please try again in a few minutes.',
      }, origin);
    }

    // Parse body
    let body;
    try {
      body = await request.json();
      console.log(`[contact] Form from: ${body.name} <${body.email}>, intent: ${body.intent}`);
    } catch {
      console.log('[contact] Failed to parse JSON body');
      return jsonResponse(400, { success: false, error: 'Invalid request body.' }, origin);
    }

    // Validate fields
    const validationErrors = validateBody(body);
    if (validationErrors.length > 0) {
      console.log('[contact] Validation errors:', validationErrors);
      return jsonResponse(422, {
        success: false,
        error: 'Validation failed.',
        details: validationErrors,
      }, origin);
    }

    // Verify Turnstile token
    const turnstileToken = body.turnstileToken;
    if (!turnstileToken) {
      console.log('[contact] No Turnstile token provided');
      return jsonResponse(400, {
        success: false,
        error: 'Please complete the CAPTCHA verification.',
      }, origin);
    }

    console.log('[contact] Verifying Turnstile token...');
    const turnstileValid = await verifyTurnstile(
      turnstileToken,
      clientIP,
      env.TURNSTILE_SECRET_KEY
    );

    if (!turnstileValid) {
      console.log('[contact] Turnstile verification FAILED');
      return jsonResponse(403, {
        success: false,
        error: 'CAPTCHA verification failed. Please try again.',
      }, origin);
    }
    console.log('[contact] Turnstile verification PASSED');

    // Send emails via Resend
    try {
      const resend = new Resend(env.RESEND_API_KEY);

      console.log('[contact] Sending notification and auto-reply emails concurrently...');
      const notificationEmail = buildNotificationEmail(body);
      const autoReplyEmail = buildAutoReplyEmail(body);

      // ⚡ Bolt: Execute independent network requests concurrently using Promise.all()
      // This overlaps the latency of the external API calls, reducing the overall execution time of the worker.
      const [notifResult, replyResult] = await Promise.all([
        resend.emails.send(notificationEmail),
        resend.emails.send(autoReplyEmail),
      ]);

      console.log('[contact] Notification result:', JSON.stringify(notifResult));
      console.log('[contact] Auto-reply result:', JSON.stringify(replyResult));

      console.log('[contact] ✅ All emails sent successfully');
      return jsonResponse(200, { success: true }, origin);
    } catch (err) {
      console.error('[contact] ❌ Email send failed:', err.message || err);
      return jsonResponse(500, {
        success: false,
        error: 'Something went wrong. Please try again later.',
      }, origin);
    }
  },
};

// ── Response Helper ────────────────────────────────────────────
function jsonResponse(status, data, origin) {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (origin) {
    Object.assign(headers, corsHeaders(origin));
  }

  return new Response(JSON.stringify(data), { status, headers });
}
export default worker;
