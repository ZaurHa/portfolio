import type { MusterVersion } from "../../components/MusterShowcase";

// Zentrale Muster-Konfiguration — genutzt von /muster (Übersicht) und /muster/[kunde].
// Neue Branche: hier einen Eintrag ergänzen, die Anzahl der Versionen wird überall
// automatisch aus `versions.length` abgeleitet.

export interface KundenConfig {
  clientName: string;
  /** Branchenname für Überschriften/Metadaten */
  branche: string;
  /** Kurztitel für die Übersichtskarte */
  title: string;
  /** Kurzbeschreibung (ohne Versionsanzahl) für die Übersichtskarte */
  teaser: string;
  /** Mono-Chip auf der Übersichtskarte */
  tag?: string;
  icon: "wrench" | "bolt" | "sparkle";
  versions: MusterVersion[];
}

export const kundenConfig: Record<string, KundenConfig> = {
  klempner: {
    clientName: "Mustermann Klempner",
    branche: "Klempner & Sanitär",
    title: "Klempner",
    teaser: "SEO-optimiert für München & Umland",
    tag: "Demo",
    icon: "wrench",
    versions: [
      {
        id: "v1",
        label: "Version 1 — Warm & Serif",
        description: "Warme Creme- und Kupfertöne mit eleganter Serifen-Typografie. Traditionell und vertrauenswürdig.",
        src: "/muster/klempner/v1.html",
      },
      {
        id: "v2",
        label: "Version 2 — Modern Dark",
        description: "Dunkles Navy mit leuchtenden Akzenten. Stripe-inspiriert, auffällig.",
        src: "/muster/klempner/v2.html",
      },
      {
        id: "v3",
        label: "Version 3 — Editorial Grün",
        description: "Dunkelgrün mit klassischer Serif — ruhig, edel, maximal seriös.",
        src: "/muster/klempner/v3.html",
      },
      {
        id: "v4",
        label: "Version 4 — Brutalist",
        description: "Weiß mit Signal-Orange und Mono-Typografie. Direkt, technisch, unverwechselbar.",
        src: "/muster/klempner/v4.html",
      },
      {
        id: "v5",
        label: "Version 5 — Bold Dark",
        description: "Dunkel mit kräftigem Orange, fette Condensed-Typografie. Maximal auffällig.",
        src: "/muster/klempner/v5.html",
      },
      {
        id: "final",
        label: "Version 6 — SEO Final",
        description: "Beste Version: Klassisch in Blau & Weiß, SEO-optimiert, München & Umland, FAQ, Schema.org.",
        tag: "Empfohlen",
        src: "/muster/klempner/final.html",
      },
    ],
  },
  elektriker: {
    clientName: "Mustermann Elektro",
    branche: "Elektriker",
    title: "Elektriker",
    teaser: "E-Check, Notdienst, Smart Home",
    tag: "Neu",
    icon: "bolt",
    versions: [
      {
        id: "v1",
        label: "Version 1 — Bold Gelb",
        description: "Schwarz mit gelben Akzenten und riesiger Typografie. Auffällig und selbstbewusst.",
        src: "/muster/elektriker/v1.html",
      },
      {
        id: "v2",
        label: "Version 2 — Klassisch Blau",
        description: "Hell und seriös mit blauem Leistungs-Panel. Vertrauen auf den ersten Blick.",
        src: "/muster/elektriker/v2.html",
      },
      {
        id: "v3",
        label: "Version 3 — Poster Orange",
        description: "Dunkel mit Signal-Orange und Plakat-Typografie. Modern und markant.",
        tag: "Empfohlen",
        src: "/muster/elektriker/v3.html",
      },
    ],
  },
  kosmetik: {
    clientName: "Bella Beauté Studio",
    branche: "Kosmetikstudios",
    title: "Kosmetikstudio",
    teaser: "Wimpern, Pflege, Permanent Make-up",
    tag: "Neu",
    icon: "sparkle",
    versions: [
      {
        id: "v1",
        label: "Version 1 — Rose & Cream",
        description: "Warm, feminin, einladend. Rosa Akzente auf cremefarbenem Hintergrund.",
        src: "/muster/kosmetik/v1.html",
      },
      {
        id: "v2",
        label: "Version 2 — Luxury Dark",
        description: "Schwarz mit Goldakzenten — premium und exklusiv.",
        src: "/muster/kosmetik/v2.html",
      },
      {
        id: "v3",
        label: "Version 3 — Modern Minimal",
        description: "Sauber, hell, modern. Mit Bewertungen und vollständiger Preisliste.",
        tag: "Empfohlen",
        src: "/muster/kosmetik/v3.html",
      },
    ],
  },
};
