export default function Kontakt() {
  return (
    <section className="max-w-2xl mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8 text-center text-cyan-400">Kontakt</h1>
      <div className="neumorph-card p-8">
        <form className="space-y-6">
          <div>
            <label className="block text-cyan-300 mb-2">Name</label>
            <input type="text" className="neumorph-input w-full px-4 py-2" placeholder="Ihr Name" />
          </div>
          <div>
            <label className="block text-cyan-300 mb-2">E-Mail</label>
            <input type="email" className="neumorph-input w-full px-4 py-2" placeholder="Ihre E-Mail" />
          </div>
          <div>
            <label className="block text-cyan-300 mb-2">Nachricht</label>
            <textarea className="neumorph-input w-full px-4 py-2 min-h-[120px]" placeholder="Ihre Nachricht" />
          </div>
          <div className="text-center">
            <button type="submit" className="neumorph-button-primary px-6 py-3 font-semibold">Absenden</button>
          </div>
        </form>
      </div>
    </section>
  );
} 