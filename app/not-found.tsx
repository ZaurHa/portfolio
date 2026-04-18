export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
      <h1 className="text-7xl font-extrabold text-[#0d9488] mb-4">404</h1>
      <p className="text-2xl mb-6 text-gray-300">Seite nicht gefunden</p>
      <a href="/" className="inline-block text-[#0d9488] border border-[#0d9488] rounded px-6 py-3 text-lg font-semibold hover:bg-[#0d9488] hover:text-black transition">Zurück zur Startseite</a>
    </div>
  );
} 