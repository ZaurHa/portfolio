import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export const dynamic = 'force-dynamic';

const logoUrl = 'https://brandwerkx.de/images/brandwerkxweiss.webp';
const siteUrl = 'https://brandwerkx.de';
const githubUrl = 'https://github.com/ZaurHa';
const cyan = '#00f7e4';
const dark = '#0b0c0f';

type Lang = 'de' | 'en';
type PackageKey = 'muster' | 'custom' | 'seo' | 'unklar';

const PACKAGE_LABELS: Record<PackageKey, string> = {
  muster: 'Muster-Website ab 490 €',
  custom: 'Custom-Website ab 990 €',
  seo: 'SEO & Wartung ab 99 €/Monat',
  unklar: 'Noch unklar',
};

type MailData = {
  name: string;
  email: string;
  phone: string;
  pkg: PackageKey | '';
  message: string;
  lang: Lang;
};

/** Escape user input before inserting it into HTML. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escapeMultiline(value: string): string {
  return escapeHtml(value).replace(/\r\n|\r|\n/g, '<br>');
}

function adminMailHtml({ name, email, phone, pkg, message, lang }: MailData) {
  const n = escapeHtml(name);
  const e = escapeHtml(email);
  const p = escapeHtml(phone);
  const telHref = escapeHtml(phone.replace(/[^\d+]/g, ''));
  return `
  <body style="background:${dark};color:#fff;font-family:Inter,Arial,sans-serif;padding:0;margin:0;">
    <div style="max-width:520px;margin:0 auto;background:${dark};border-radius:18px;overflow:hidden;box-shadow:0 4px 32px #000a;">
      <div style="padding:32px 32px 16px 32px;text-align:center;">
        <img src="${logoUrl}" alt="BrandWerkX" style="width:120px;margin-bottom:18px;"/>
        <h1 style="color:${cyan};font-size:1.5rem;margin:0 0 8px 0;letter-spacing:0.01em;">Neue Anfrage über dein Portfolio</h1>
        <div style="color:#b0b0b0;font-size:1.05rem;margin-bottom:18px;">Du hast eine neue Kontaktanfrage erhalten (Sprache: ${lang.toUpperCase()}).</div>
      </div>
      <div style="padding:0 32px 24px 32px;">
        <div style="background:#181a1f;border-radius:12px;padding:18px 20px 12px 20px;margin-bottom:18px;">
          <div style="font-size:1.08rem;color:${cyan};font-weight:600;margin-bottom:8px;">Kontaktdaten</div>
          <div style="margin-bottom:4px;"><b>Name:</b> ${n}</div>
          <div style="margin-bottom:4px;"><b>E-Mail:</b> <a href="mailto:${e}" style="color:${cyan};text-decoration:none;">${e}</a></div>
          ${phone ? `<div style="margin-bottom:4px;"><b>Telefon:</b> <a href="tel:${telHref}" style="color:${cyan};text-decoration:none;">${p}</a></div>` : ''}
        </div>
        <div style="background:#181a1f;border-radius:12px;padding:18px 20px 12px 20px;margin-bottom:18px;">
          <div style="font-size:1.08rem;color:${cyan};font-weight:600;margin-bottom:8px;">Projektdetails</div>
          ${pkg ? `<div style="margin-bottom:4px;"><b>Paket:</b> ${escapeHtml(PACKAGE_LABELS[pkg])}</div>` : ''}
          <div style="margin-bottom:4px;"><b>Nachricht:</b></div>
          <div style="background:#101114;border-radius:8px;padding:12px 14px;color:#e0e0e0;">${escapeMultiline(message)}</div>
        </div>
        <div style="text-align:center;margin:32px 0 0 0;">
          <a href="mailto:${e}" style="display:inline-block;background:${cyan};color:#181a1f;font-weight:600;padding:12px 28px;border-radius:8px;text-decoration:none;font-size:1.08rem;">Direkt antworten</a>
        </div>
      </div>
      <div style="background:#101114;padding:24px 32px 18px 32px;text-align:center;border-top:1px solid #23232a;margin-top:24px;">
        <a href="${siteUrl}" style="color:${cyan};text-decoration:none;font-weight:600;">brandwerkx.de</a> &nbsp;|&nbsp; <a href="${githubUrl}" style="color:${cyan};text-decoration:none;">GitHub</a>
        <div style="color:#888;font-size:0.98rem;margin-top:10px;">Diese E-Mail wurde automatisch generiert.</div>
      </div>
    </div>
  </body>
  `;
}

/**
 * Confirmation mail to the sender. Deliberately contains NO user-supplied free text
 * except the (escaped) first name, so the form can't be abused to send arbitrary content.
 */
function customerMailHtml(firstName: string, lang: Lang) {
  const fn = escapeHtml(firstName);
  const c = lang === 'en'
    ? {
        title: 'Thanks for your message',
        greeting: fn ? `Hi ${fn},` : 'Hi,',
        body: 'I have received your inquiry and will get back to you within 24 hours.',
        reach: 'Need to reach me sooner?',
        phone: 'Phone',
        footer: 'This email was generated automatically. If you did not send this inquiry, you can ignore it.',
      }
    : {
        title: 'Danke für deine Nachricht',
        greeting: fn ? `Hallo ${fn},` : 'Hallo,',
        body: 'ich habe deine Anfrage erhalten und melde mich innerhalb von 24 Stunden bei dir.',
        reach: 'Du willst mich schneller erreichen?',
        phone: 'Telefon',
        footer: 'Diese E-Mail wurde automatisch generiert. Falls du keine Anfrage gestellt hast, kannst du sie ignorieren.',
      };
  return `
  <body style="background:${dark};color:#fff;font-family:Inter,Arial,sans-serif;padding:0;margin:0;">
    <div style="max-width:520px;margin:0 auto;background:${dark};border-radius:18px;overflow:hidden;box-shadow:0 4px 32px #000a;">
      <div style="padding:32px 32px 16px 32px;text-align:center;">
        <img src="${logoUrl}" alt="BrandWerkX" style="width:120px;margin-bottom:18px;"/>
        <h1 style="color:${cyan};font-size:1.5rem;margin:0 0 8px 0;letter-spacing:0.01em;">${c.title}</h1>
      </div>
      <div style="padding:0 32px 24px 32px;">
        <div style="background:#181a1f;border-radius:12px;padding:18px 20px;margin-bottom:18px;color:#e0e0e0;">
          <p style="margin:0 0 10px 0;">${c.greeting}</p>
          <p style="margin:0;">${c.body}</p>
        </div>
        <div style="background:#181a1f;border-radius:12px;padding:18px 20px;margin-bottom:18px;">
          <div style="font-size:1.08rem;color:${cyan};font-weight:600;margin-bottom:8px;">${c.reach}</div>
          <div style="margin-bottom:4px;"><b>${c.phone}:</b> <a href="tel:+491728471641" style="color:${cyan};text-decoration:none;">0172 8471641</a></div>
          <div style="margin-bottom:4px;"><b>E-Mail:</b> <a href="mailto:brandwerkx@gmail.com" style="color:${cyan};text-decoration:none;">brandwerkx@gmail.com</a></div>
        </div>
      </div>
      <div style="background:#101114;padding:24px 32px 18px 32px;text-align:center;border-top:1px solid #23232a;margin-top:24px;">
        <a href="${siteUrl}" style="color:${cyan};text-decoration:none;font-weight:600;">brandwerkx.de</a>
        <div style="color:#888;font-size:0.98rem;margin-top:10px;">${c.footer}</div>
      </div>
    </div>
  </body>
  `;
}

const MSG = {
  de: {
    rateLimit: 'Zu viele Anfragen. Bitte warte 10 Minuten.',
    name: 'Bitte gib deinen Namen an (2–100 Zeichen).',
    email: 'Bitte gib eine gültige E-Mail-Adresse an.',
    message: 'Bitte schreib eine Nachricht mit 10 bis 5000 Zeichen.',
    phone: 'Bitte gib eine gültige Telefonnummer an (nur Ziffern, Leerzeichen, +, -, Klammern; max. 40 Zeichen).',
    pkg: 'Bitte wähle ein gültiges Paket aus.',
    invalid: 'Ungültige Anfrage.',
    sendFailed: 'Deine Nachricht konnte leider nicht gesendet werden. Bitte versuch es später erneut oder schreib mir direkt an brandwerkx@gmail.com.',
    success: 'Nachricht erfolgreich gesendet! Du bekommst gleich eine Bestätigung per E-Mail.',
  },
  en: {
    rateLimit: 'Too many requests. Please wait 10 minutes.',
    name: 'Please enter your name (2–100 characters).',
    email: 'Please enter a valid email address.',
    message: 'Please write a message between 10 and 5000 characters.',
    phone: 'Please enter a valid phone number (digits, spaces, +, -, parentheses only; max. 40 characters).',
    pkg: 'Please choose a valid package.',
    invalid: 'Invalid request.',
    sendFailed: 'Your message could not be sent. Please try again later or email me directly at brandwerkx@gmail.com.',
    success: 'Message sent successfully! You will receive a confirmation email shortly.',
  },
} as const;

// Simple email regex — no external dependency needed
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[\d\s+\-()/]*$/;
const PACKAGES: readonly PackageKey[] = ['muster', 'custom', 'seo', 'unklar'];
const MIN_FILL_TIME_MS = 3000;

function str(value: unknown, max = 10000): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

// ── Rate limiting (in-memory, per IP) ───────────────────────────────────────
// NOTE: On serverless platforms (e.g. Vercel) each instance has its own memory and
// instances are recycled, so this limit is only best effort, not a hard guarantee.
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT    = 5;          // max requests
const RATE_WINDOW   = 10 * 60 * 1000; // 10 minutes in ms

function checkRateLimit(ip: string): boolean {
  const now    = Date.now();
  const entry  = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  return true;
}

type Outcome =
  | { kind: 'success'; message: string }
  | { kind: 'error'; status: number; error: string };

async function readBody(request: NextRequest): Promise<{ body: Record<string, unknown>; isForm: boolean }> {
  const contentType = request.headers.get('content-type') ?? '';
  if (contentType.includes('application/x-www-form-urlencoded') || contentType.includes('multipart/form-data')) {
    const fd = await request.formData();
    const body: Record<string, unknown> = {};
    fd.forEach((value, key) => {
      if (typeof value === 'string') body[key] = value;
    });
    return { body, isForm: true };
  }
  const json = await request.json().catch(() => null);
  return { body: json && typeof json === 'object' ? (json as Record<string, unknown>) : {}, isForm: false };
}

async function handle(body: Record<string, unknown>, lang: Lang, ip: string): Promise<Outcome> {
  const t = MSG[lang];

  if (!checkRateLimit(ip)) {
    return { kind: 'error', status: 429, error: t.rateLimit };
  }

  // Spam protection: honeypot must be empty, and the form must not be submitted
  // faster than a human could fill it. Bots get a fake success, nothing is sent.
  const honeypot = str(body.website);
  const startedAt = Number(body.startedAt);
  if (honeypot || (Number.isFinite(startedAt) && startedAt > 0 && Date.now() - startedAt < MIN_FILL_TIME_MS)) {
    return { kind: 'success', message: t.success };
  }

  const name    = str(body.name, 200);
  const email   = str(body.email, 320);
  const phone   = str(body.phone, 100);
  const pkgRaw  = str(body.package, 50).toLowerCase();
  const message = str(body.message, 10000);

  if (name.length < 2 || name.length > 100) return { kind: 'error', status: 400, error: t.name };
  if (!email || email.length > 254 || !EMAIL_RE.test(email)) return { kind: 'error', status: 400, error: t.email };
  if (phone && (phone.length > 40 || !PHONE_RE.test(phone))) return { kind: 'error', status: 400, error: t.phone };
  if (pkgRaw && !(PACKAGES as readonly string[]).includes(pkgRaw)) return { kind: 'error', status: 400, error: t.pkg };
  if (message.length < 10 || message.length > 5000) return { kind: 'error', status: 400, error: t.message };
  const pkg = pkgRaw as PackageKey | '';

  const subjectName = name.replace(/[\r\n]+/g, ' ');

  // Ohne API-Key würde der Resend-Konstruktor werfen – das soll als sauberer 500 enden
  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY fehlt');
    return { kind: 'error', status: 500, error: t.sendFailed };
  }
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    // E-Mail an dich (Admin)
    const { error: adminError } = await resend.emails.send({
      from: 'Zaur Hatuev <zaur@brandwerkx.de>',
      to: ['brandwerkx@gmail.com'],
      replyTo: email,
      subject: `Neue Projektanfrage von ${subjectName}`,
      html: adminMailHtml({ name, email, phone, pkg, message, lang }),
    });
    if (adminError) {
      console.error('Admin-Mail fehlgeschlagen:', adminError);
      return { kind: 'error', status: 500, error: t.sendFailed };
    }
  } catch (error) {
    console.error('Admin-Mail fehlgeschlagen:', error);
    return { kind: 'error', status: 500, error: t.sendFailed };
  }

  // Bestätigungs-E-Mail an den Absender — Fehler hier sind nicht kritisch
  try {
    const firstName = name.split(/\s+/)[0] ?? '';
    const { error: confirmError } = await resend.emails.send({
      from: 'Zaur Hatuev <zaur@brandwerkx.de>',
      to: [email],
      subject: lang === 'en' ? 'Thanks for your message – BrandWerkX' : 'Danke für deine Nachricht – BrandWerkX',
      html: customerMailHtml(firstName, lang),
    });
    if (confirmError) console.error('Bestätigungs-Mail fehlgeschlagen:', confirmError);
  } catch (error) {
    console.error('Bestätigungs-Mail fehlgeschlagen:', error);
  }

  return { kind: 'success', message: t.success };
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    ?? request.headers.get('x-real-ip')
    ?? 'unknown';

  let body: Record<string, unknown> = {};
  let isForm = false;
  try {
    ({ body, isForm } = await readBody(request));
  } catch {
    return NextResponse.json({ error: MSG.de.invalid }, { status: 400 });
  }

  const lang: Lang = body.lang === 'en' ? 'en' : 'de';
  const outcome = await handle(body, lang, ip);

  if (isForm) {
    // No-JS fallback: redirect back to the contact page with a status flag
    const target = new URL(`/${lang}/kontakt`, request.url);
    target.searchParams.set(outcome.kind === 'success' ? 'sent' : 'error', '1');
    return NextResponse.redirect(target, 303);
  }

  if (outcome.kind === 'success') {
    return NextResponse.json({ success: true, message: outcome.message }, { status: 200 });
  }
  return NextResponse.json({ error: outcome.error }, { status: outcome.status });
}
