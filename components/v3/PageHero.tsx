import type { ReactNode } from "react";

type Fact = { label: string; value: ReactNode };

/** Seitenkopf im V3-Stil: Mono-Meta, große Headline, Lead, Aktionen, Faktenleiste. */
export default function PageHero({
  meta,
  metaRight,
  title,
  lead,
  actions,
  facts,
  children,
}: {
  meta: ReactNode;
  metaRight?: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  actions?: ReactNode;
  facts?: Fact[];
  children?: ReactNode;
}) {
  return (
    <section className="v3-hero v3-page-hero">
      <div className="v3-wrap">
        <div className="v3-hero-top v3-rise">
          <span className="v3-mono"><span className="v3-dot" />{meta}</span>
          {metaRight && <span className="v3-mono v3-hide-sm">{metaRight}</span>}
        </div>
        <h1 className="v3-h1 v3-h1-page v3-rise d1">{title}</h1>
        {(lead || actions) && (
          <div className="v3-page-hero-grid v3-rise d2">
            {lead && <p className="v3-lead">{lead}</p>}
            {actions && <div className="v3-cta-row v3-cta-end">{actions}</div>}
          </div>
        )}
        {children}
        {facts && facts.length > 0 && (
          <div className="v3-facts v3-rise d3">
            {facts.map((f) => (
              <div key={f.label}>
                <span className="v3-mono">{f.label}</span>
                <span className="v">{f.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
