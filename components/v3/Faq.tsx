/** FAQ als <details>-Liste (Antworten stehen im HTML) – optional mit FAQPage-JSON-LD. */
export default function Faq({ label, items, jsonLd = false }: { label: string; items: [string, string][]; jsonLd?: boolean }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
  };
  return (
    <div className="v3-faq">
      {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />}
      <span className="v3-mono">{label}</span>
      <div>
        {items.map(([q, a], i) => (
          <details key={q} open={i === 0}><summary>{q}</summary><p>{a}</p></details>
        ))}
      </div>
    </div>
  );
}
