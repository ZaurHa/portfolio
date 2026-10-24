"use client";

import { useState, type ReactNode } from "react";

// Weicher Seitenübergang: Beim Wechsel auf eine andere Seite gleitet der Inhalt sanft herein.
// Beim allerersten Aufruf nicht (dort laufen schon die Einstiegs-Animationen, und der erste Eindruck soll sofort stehen).
let ersterAufruf = true;

export default function Template({ children }: { children: ReactNode }) {
  const [gleiten] = useState(() => {
    if (typeof window === "undefined") return false;
    const ja = !ersterAufruf;
    ersterAufruf = false;
    return ja;
  });
  return <div className={gleiten ? "v3-page-enter" : undefined}>{children}</div>;
}
