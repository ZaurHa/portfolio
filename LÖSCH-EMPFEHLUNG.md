# Lösch-Empfehlung: Unbenutzte oder doppelte Komponenten/Dateien

**1. Doppelte Sternenkomponenten:**
- `components/RealStarfield.tsx` (falls du nur eine Sternenkomponente nutzt)

**2. Nicht verlinkte Demo-Seiten:**
- `app/dashboard/page.tsx` (falls du kein Dashboard brauchst)
- `music-player-demo/` (falls du die Musik-Player-Demo nicht brauchst)

**3. Nicht verwendete ThemeProvider:**
- `components/ThemeProvider.tsx` (falls du kein Theme-Switching nutzt)

**4. Nicht verwendete Bilder:**
- Prüfe `public/images/` auf alte oder nicht eingebundene Bilder (z.B. Mockups, die nirgends verwendet werden)

**5. Sonstiges:**
- Prüfe weitere Demo-/Testdateien oder Utility-Komponenten, die nicht importiert werden.

> Tipp: Vor dem Löschen ggf. ein Backup machen oder die Dateien erst umbenennen/verschieben, um sicherzugehen! 