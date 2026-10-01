import Link from "next/link";
import type { HomeContent } from "../../lib/home";

/** Preistafel (3 Pakete + Fußzeile) – genutzt auf Startseite und /leistungen. */
export default function PriceBoard({ pricing }: { pricing: HomeContent["pricing"] }) {
  return (
    <div className="v3-board">
      <div className="board-top"><b>{pricing.boardTitle}</b><span className="v3-mono">{pricing.boardMeta}</span></div>
      <div className="v3-prices">
        {pricing.plans.map((plan) => (
          <article key={plan.name} className={`v3-plan${plan.hot ? " hot" : ""}`}>
            <div className="top"><span className="v3-mono">{plan.code}</span>{plan.hot && <span className="v3-badge">{pricing.popular}</span>}</div>
            <h3>{plan.name}</h3>
            <p className="desc">{plan.desc}</p>
            <div className="v3-price"><small>{pricing.from}</small><span className="amt">{plan.amount}</span><span className="eur">€</span></div>
            <div className="unit">{plan.unit}</div>
            <ul>{plan.items.map((it) => <li key={it}>{it}</li>)}</ul>
            <Link href={plan.href} className={`v3-btn ${plan.hot ? "v3-btn-accent" : "v3-btn-ghost"}`}>{plan.cta} <span className="arr" aria-hidden="true">→</span></Link>
          </article>
        ))}
      </div>
      <div className="board-foot">{pricing.foot.map((f) => <span key={f}>{f}</span>)}</div>
    </div>
  );
}
