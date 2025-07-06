# E-Mail-API Setup mit Resend

## 🚀 Schnellstart

### 1. Resend Account erstellen
1. Gehe zu [resend.com](https://resend.com)
2. Erstelle einen kostenlosen Account
3. Verifiziere deine E-Mail-Adresse

### 2. API Key generieren
1. Gehe zu "API Keys" im Dashboard
2. Klicke "Create API Key"
3. Kopiere den API Key

### 3. Domain verifizieren (optional, aber empfohlen)
1. Gehe zu "Domains" im Dashboard
2. Füge `brandwerkx.de` hinzu
3. Folge den DNS-Anweisungen

### 4. Environment-Variablen setzen
Erstelle eine `.env.local` Datei im Root-Verzeichnis:

```bash
# Resend API Key
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx

# Deine E-Mail-Adresse
ADMIN_EMAIL=brandwerkx@gmail.com
```

### 5. Testen
1. Starte den Development-Server: `npm run dev`
2. Gehe zu `/kontakt`
3. Fülle das Formular aus und teste den Versand

## 📧 E-Mail-Templates

Das System sendet automatisch:
- **Admin-E-Mail**: An dich mit allen Kontaktdaten
- **Kunden-E-Mail**: Bestätigung an den Kunden

## 🔧 Konfiguration

### E-Mail-Adressen ändern
In `app/api/contact/route.ts`:
```typescript
// Admin-E-Mail (empfängt alle Anfragen)
to: ['brandwerkx@gmail.com']

// Von-Adresse
from: 'BrandWerkX <kontakt@brandwerkx.de>'
```

### E-Mail-Templates anpassen
Die HTML-Templates sind in der API-Route definiert und können nach Bedarf angepasst werden.

## 💰 Kosten
- **Resend Free Tier**: 3.000 E-Mails/Monat kostenlos
- **Paid Plans**: Ab $20/Monat für mehr E-Mails

## 🛡️ Sicherheit
- API Keys sind in `.env.local` gespeichert (nicht in Git)
- E-Mail-Validierung implementiert
- Rate Limiting durch Resend

## 🚨 Troubleshooting

### E-Mail wird nicht gesendet
1. Prüfe API Key in `.env.local`
2. Prüfe Browser-Konsole für Fehler
3. Prüfe Resend Dashboard für Logs

### Domain-Verifizierung
Falls E-Mails nicht ankommen:
1. Verifiziere deine Domain bei Resend
2. Prüfe DNS-Einträge
3. Verwende temporär eine verifizierte Domain

## 📞 Support
- [Resend Documentation](https://resend.com/docs)
- [Resend Support](https://resend.com/support) 