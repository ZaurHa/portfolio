export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
      <h1 className="text-7xl font-extrabold text-cyan-400 mb-4">404</h1>
      <p className="text-2xl mb-6 text-gray-300">Seite nicht gefunden</p>
      <a href="/" className="inline-block text-cyan-400 border border-cyan-400 rounded px-6 py-3 text-lg font-semibold hover:bg-cyan-400 hover:text-black transition">Zurück zur Startseite</a>
    </div>
  );
} 