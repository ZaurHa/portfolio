import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const logoUrl = 'https://brandwerkx.vercel.app/images/brandwerkxweiss.webp';
const siteUrl = 'https://brandwerkx.vercel.app';
const githubUrl = 'https://github.com/ZaurHa';
const cyan = '#00f7e4';
const dark = '#0b0c0f';

type MailData = {
  name: string;
  email?: string;
  company?: string;
  project?: string;
  budget?: string;
  message: string;
};

function adminMailHtml({ name, email, company, project, budget, message }: MailData) {
  return `
  <body style="background:${dark};color:#fff;font-family:Inter,Arial,sans-serif;padding:0;margin:0;">
    <div style="max-width:520px;margin:0 auto;background:${dark};border-radius:18px;overflow:hidden;box-shadow:0 4px 32px #000a;">
      <div style="padding:32px 32px 16px 32px;text-align:center;">
        <img src="${logoUrl}" style="width:120px;margin-bottom:18px;"/>
        <h1 style="color:${cyan};font-size:1.5rem;margin:0 0 8px 0;letter-spacing:0.01em;">Neue Anfrage über dein Portfolio</h1>
        <div style="color:#b0b0b0;font-size:1.05rem;margin-bottom:18px;">Du hast eine neue Kontaktanfrage erhalten.</div>
      </div>
      <div style="padding:0 32px 24px 32px;">
        <div style="background:#181a1f;border-radius:12px;padding:18px 20px 12px 20px;margin-bottom:18px;">
          <div style="font-size:1.08rem;color:${cyan};font-weight:600;margin-bottom:8px;">📧 Kontaktdaten</div>
          <div style="margin-bottom:4px;"><b>Name:</b> ${name}</div>
          <div style="margin-bottom:4px;"><b>E-Mail:</b> <a href="mailto:${email}" style="color:${cyan};text-decoration:none;">${email}</a></div>
          ${company ? `<div style="margin-bottom:4px;"><b>Unternehmen:</b> ${company}</div>` : ''}
        </div>
        <div style="background:#181a1f;border-radius:12px;padding:18px 20px 12px 20px;margin-bottom:18px;">
          <div style="font-size:1.08rem;color:${cyan};font-weight:600;margin-bottom:8px;">📝 Projektdetails</div>
          ${project ? `<div style="margin-bottom:4px;"><b>Projekttyp:</b> ${project}</div>` : ''}
          ${budget ? `<div style="margin-bottom:4px;"><b>Budget:</b> ${budget}</div>` : ''}
          <div style="margin-bottom:4px;"><b>Nachricht:</b></div>
          <div style="background:#101114;border-radius:8px;padding:12px 14px;color:#e0e0e0;white-space:pre-line;">${message}</div>
        </div>
        <div style="text-align:center;margin:32px 0 0 0;">
          <a href="mailto:${email}" style="display:inline-block;background:${cyan};color:#181a1f;font-weight:600;padding:12px 28px;border-radius:8px;text-decoration:none;font-size:1.08rem;">Direkt antworten</a>
        </div>
      </div>
      <div style="background:#101114;padding:24px 32px 18px 32px;text-align:center;border-top:1px solid #23232a;margin-top:24px;">
        <a href="${siteUrl}" style="color:${cyan};text-decoration:none;font-weight:600;">brandwerkx.vercel.app</a> &nbsp;|&nbsp; <a href="${githubUrl}" style="color:${cyan};text-decoration:none;">GitHub</a>
        <div style="color:#888;font-size:0.98rem;margin-top:10px;">Diese E-Mail wurde automatisch generiert.</div>
      </div>
    </div>
  </body>
  `;
}

function customerMailHtml({ name, project, budget, message }: MailData) {
  return `
  <body style="background:${dark};color:#fff;font-family:Inter,Arial,sans-serif;padding:0;margin:0;">
    <div style="max-width:520px;margin:0 auto;background:${dark};border-radius:18px;overflow:hidden;box-shadow:0 4px 32px #000a;">
      <div style="padding:32px 32px 16px 32px;text-align:center;">
        <img src="${logoUrl}" style="width:120px;margin-bottom:18px;"/>
        <h1 style="color:${cyan};font-size:1.5rem;margin:0 0 8px 0;letter-spacing:0.01em;">Danke für deine Nachricht</h1>
        <div style="color:#b0b0b0;font-size:1.05rem;margin-bottom:18px;">Ich habe deine Anfrage erhalten und melde mich so schnell wie möglich bei dir!</div>
      </div>
      <div style="padding:0 32px 24px 32px;">
        <div style="background:#181a1f;border-radius:12px;padding:18px 20px 12px 20px;margin-bottom:18px;">
          <div style="font-size:1.08rem;color:${cyan};font-weight:600;margin-bottom:8px;">📝 Deine Anfrage</div>
          ${project ? `<div style="margin-bottom:4px;"><b>Projekttyp:</b> ${project}</div>` : ''}
          ${budget ? `<div style="margin-bottom:4px;"><b>Budget:</b> ${budget}</div>` : ''}
          <div style="margin-bottom:4px;"><b>Nachricht:</b></div>
          <div style="background:#101114;border-radius:8px;padding:12px 14px;color:#e0e0e0;white-space:pre-line;">${message}</div>
        </div>
        <div style="text-align:center;margin:32px 0 0 0;">
          <a href="mailto:zaur@brandwerkx.de" style="display:inline-block;background:${cyan};color:#181a1f;font-weight:600;padding:12px 28px;border-radius:8px;text-decoration:none;font-size:1.08rem;">Direkt antworten</a>
        </div>
      </div>
      <div style="background:#101114;padding:24px 32px 18px 32px;text-align:center;border-top:1px solid #23232a;margin-top:24px;">
        <a href="${siteUrl}" style="color:${cyan};text-decoration:none;font-weight:600;">brandwerkx.vercel.app</a> &nbsp;|&nbsp; <a href="${githubUrl}" style="color:${cyan};text-decoration:none;">GitHub</a>
        <div style="color:#888;font-size:0.98rem;margin-top:10px;">Diese E-Mail wurde automatisch generiert.</div>
      </div>
    </div>
  </body>
  `;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('DEBUG: /api/contact aufgerufen', body);
    const { name, email, company, project, budget, message } = body;

    if (!name || !email || !message) {
      console.log('DEBUG: Fehlende Felder', { name, email, message });
      return NextResponse.json(
        { error: 'Name, E-Mail und Nachricht sind erforderlich' },
        { status: 400 }
      );
    }

    // E-Mail an dich (Admin)
    await resend.emails.send({
      from: 'Zaur Hatuev <zaur@brandwerkx.de>',
      to: ['zaur@brandwerkx.de'],
      subject: `Neue Projektanfrage von ${name}`,
      html: adminMailHtml({ name, email, company, project, budget, message }),
    });

    // Bestätigungs-E-Mail an den Kunden
    await resend.emails.send({
      from: 'Zaur Hatuev <zaur@brandwerkx.de>',
      to: [email],
      subject: 'Danke für deine Nachricht – BrandWerkX',
      html: customerMailHtml({ name, project, budget, message }),
    });

    return NextResponse.json(
      { 
        success: true, 
        message: 'Nachricht erfolgreich gesendet! Sie erhalten eine Bestätigung per E-Mail.' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('E-Mail-Fehler:', error);
    return NextResponse.json(
      { 
        error: 'Fehler beim Senden der E-Mail. Bitte versuchen Sie es später erneut oder kontaktieren Sie mich direkt.' 
      },
      { status: 500 }
    );
  }
} 