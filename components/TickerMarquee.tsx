// Kinetischer Keyword-Ticker unter dem Hero — reines CSS (keine Client-JS-Kosten).
// Inhalt wird doppelt gerendert, damit die -50%-Translation nahtlos loopt.
type Props = {
  items: string[];
};

export default function TickerMarquee({ items }: Props) {
  const row = (keyPrefix: string) => (
    <div className="ticker-item" aria-hidden={keyPrefix === "b"}>
      {items.map((item, i) => (
        <span key={`${keyPrefix}-${i}`} style={{ display: "inline-flex", alignItems: "center", gap: "1.6rem" }}>
          {item.startsWith("*") ? <strong>{item.slice(1)}</strong> : item}
          <span className="ticker-sep">✦</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className="ticker-strip">
      <div className="ticker-track">
        {row("a")}
        {row("b")}
      </div>
    </div>
  );
}
