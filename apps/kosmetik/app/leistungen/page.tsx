export default function Leistungen() {
  const services = [
    {
      title: "Gesichtsbehandlung",
      desc: "Individuelle Pflege für ein frisches, strahlendes Hautbild."
    },
    {
      title: "Anti-Aging",
      desc: "Moderne Methoden zur Reduktion von Falten und für ein jugendliches Aussehen."
    },
    {
      title: "Dauerhafte Haarentfernung",
      desc: "Sanfte und effektive Methoden für glatte Haut."
    },
    {
      title: "Microneedling",
      desc: "Regt die Hauterneuerung an und verbessert das Hautbild sichtbar."
    },
    {
      title: "Wimpernlifting & Browlifting",
      desc: "Für einen natürlichen Schwung und ausdrucksstarke Augen."
    },
    {
      title: "Zahnbleaching",
      desc: "Sanfte Aufhellung für ein strahlendes Lächeln."
    },
  ];
  return (
    <section className="max-w-3xl mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8 text-center text-cyan-400">Unsere Leistungen</h1>
      <div className="grid md:grid-cols-2 gap-8">
        {services.map((s) => (
          <div key={s.title} className="bg-black card-hover rounded-xl p-6 shadow border border-[#23232a]">
            <h2 className="text-2xl font-semibold mb-2 text-cyan-400">{s.title}</h2>
            <p className="text-neutral-300">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
} 