import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('DEBUG: /api/contact aufgerufen', body);
    const { name, email, company, project, budget, message } = body;

    // Validierung
    if (!name || !email || !message) {
      console.log('DEBUG: Fehlende Felder', { name, email, message });
      return NextResponse.json(
        { error: 'Name, E-Mail und Nachricht sind erforderlich' },
        { status: 400 }
      );
    }

    // E-Mail an dich (als Webentwickler)
    const adminEmail = await resend.emails.send({
      from: 'brandwerkx@gmail.com', // Gmail als Absender
      to: ['brandwerkx@gmail.com'],
      subject: `Neue Projektanfrage von ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #06b6d4;">Neue Projektanfrage - BrandWerkX</h2>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Kontaktdaten</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>E-Mail:</strong> ${email}</p>
            ${company ? `<p><strong>Unternehmen:</strong> ${company}</p>` : ''}
          </div>

          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Projektdetails</h3>
            ${project ? `<p><strong>Projekttyp:</strong> ${project}</p>` : ''}
            ${budget ? `<p><strong>Budget:</strong> ${budget}</p>` : ''}
          </div>

          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Nachricht</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
            <p style="color: #666; font-size: 14px;">
              Diese E-Mail wurde über das Kontaktformular auf brandwerkx.de gesendet.
            </p>
          </div>
        </div>
      `,
    });

    // Bestätigungs-E-Mail an den Kunden
    const customerEmail = await resend.emails.send({
      from: 'brandwerkx@gmail.com', // Gmail als Absender
      to: [email],
      subject: 'Vielen Dank für Ihre Anfrage - BrandWerkX',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #06b6d4;">Vielen Dank für Ihre Anfrage!</h2>
          
          <p>Hallo ${name},</p>
          
          <p>vielen Dank für Ihre Projektanfrage bei BrandWerkX. Ich habe Ihre Nachricht erhalten und werde mich innerhalb von 24 Stunden bei Ihnen melden.</p>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Ihre Anfrage im Überblick:</h3>
            ${project ? `<p><strong>Projekttyp:</strong> ${project}</p>` : ''}
            ${budget ? `<p><strong>Budget-Rahmen:</strong> ${budget}</p>` : ''}
            <p><strong>Nachricht:</strong></p>
            <p style="white-space: pre-wrap; background: white; padding: 10px; border-radius: 4px;">${message}</p>
          </div>

          <h3 style="color: #333;">Nächste Schritte:</h3>
          <ol>
            <li>Ich analysiere Ihre Anforderungen</li>
            <li>Erstelle ein maßgeschneidertes Angebot</li>
            <li>Melde mich innerhalb von 24 Stunden bei Ihnen</li>
            <li>Besprechen wir Details und Zeitplan</li>
          </ol>

          <div style="background: #e3f2fd; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1976d2; margin-top: 0;">Während Sie warten...</h3>
            <p>Schauen Sie sich gerne meine <a href="https://brandwerkx.de/projekte" style="color: #1976d2;">Projekte</a> an oder lesen Sie mehr über meine <a href="https://brandwerkx.de/leistungen" style="color: #1976d2;">Leistungen</a>.</p>
          </div>

          <p>Bis bald!</p>
          <p><strong>Zaur Hatuev</strong><br>
          BrandWerkX - Webentwicklung & Design</p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
            <p style="color: #666; font-size: 14px;">
              BrandWerkX | Zaur Hatuev<br>
              Webentwicklung & UI/UX Design<br>
              <a href="https://brandwerkx.de" style="color: #666;">brandwerkx.de</a>
            </p>
          </div>
        </div>
      `,
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