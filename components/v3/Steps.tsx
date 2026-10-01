/** Ablauf als Zeitleiste (01–04). */
export default function Steps({ steps }: { steps: [string, string][] }) {
  return (
    <ol className="v3-steps">
      {steps.map(([t, d], i) => (
        <li key={t}>
          <span className="s-n">{String(i + 1).padStart(2, "0")}</span>
          <span className="knot" aria-hidden="true" />
          <div><h3>{t}</h3><p>{d}</p></div>
        </li>
      ))}
    </ol>
  );
}
