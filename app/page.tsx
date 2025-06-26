import Image from "next/image";

const projects = [
  {
    title: "Beauty Studio Demo",
    description: "Eine vollständige Beauty-Studio Website mit allen Services, Online-Buchung und modernem Design. Live-Demo verfügbar!",
    tech: ["Next.js", "React", "TailwindCSS", "TypeScript", "Framer Motion"],
    image: "/images/beauty-praxis-preview.svg",
    link: "/kosmetik",
    demo: true,
    featured: true,
  },
  {
    title: "E-Commerce Shop",
    description: "Ein performanter Online-Shop mit Warenkorb, Authentifizierung und Admin-Panel.",
    tech: ["Next.js", "TypeScript", "Stripe", "Prisma"],
    image: "/images/ecommerce-preview.svg",
    link: "/projekte/ecommerce-shop",
  },
  {
    title: "Blog Plattform",
    description: "Eine skalierbare Blogging-Plattform mit Markdown-Support und SEO-Optimierung.",
    tech: ["Next.js", "MDX", "Vercel", "TailwindCSS"],
    image: "/images/blog-preview.svg",
    link: "/projekte/blog-plattform",
  },
  {
    title: "Dashboard App",
    description: "Ein interaktives Dashboard mit Datenvisualisierung und Echtzeit-Updates.",
    tech: ["React", "D3.js", "Node.js", "Socket.io"],
    image: "/images/dashboard-preview.svg",
    link: "/projekte/dashboard-app",
  },
];

export default function Home() {
  return (
    <section>
      <h1 className="text-4xl font-bold mb-6 text-center">Meine Projekte</h1>
      
      {/* Demo Highlight Section */}
      <div className="mb-12 p-8 bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-2xl border border-purple-500/30">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-purple-400 mb-2">🎨 Live Demo verfügbar!</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Schauen Sie sich meine neueste Beauty-Studio Website an - eine vollständige Demo mit allen Features, 
            die ich für Ihre Projekte umsetzen kann.
          </p>
        </div>
        <div className="flex justify-center">
          <a 
            href="http://localhost:3001" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <span>🚀 Live Demo öffnen</span>
            <span className="text-sm">↗</span>
          </a>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div key={project.title} className={`card-hover bg-black rounded-xl shadow-lg overflow-hidden flex flex-col border border-[#23232a] transition ${project.featured ? 'ring-2 ring-cyan-400/50' : ''}`}>
            <div className="relative">
              <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
              {project.featured && (
                <div className="absolute top-2 right-2 bg-cyan-400 text-black px-2 py-1 rounded text-xs font-semibold">
                  Featured
                </div>
              )}
              {project.demo && (
                <div className="absolute top-2 left-2 bg-purple-500 text-white px-2 py-1 rounded text-xs font-semibold">
                  Live Demo
                </div>
              )}
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <h2 className="text-2xl font-semibold mb-2 text-cyan-400">{project.title}</h2>
              <p className="mb-3 text-gray-300 flex-1">{project.description}</p>
              <div className="mb-4 flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span key={t} className="bg-cyan-400/10 text-cyan-400 px-2 py-1 rounded text-xs font-mono">{t}</span>
                ))}
              </div>
              <div className="mt-auto flex gap-2">
                {project.demo ? (
                  <>
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-1 text-center bg-purple-600 text-white rounded px-4 py-2 text-sm font-semibold hover:bg-purple-700 transition"
                    >
                      Live Demo ↗
                    </a>
                    <a 
                      href={project.link.replace('/kosmetik', '/projekte/beauty-praxis')} 
                      className="flex-1 text-center text-cyan-400 border border-cyan-400 rounded px-4 py-2 text-sm font-semibold hover:bg-cyan-400 hover:text-black transition"
                    >
                      Details
                    </a>
                  </>
                ) : (
                  <a href={project.link} className="w-full text-center text-cyan-400 border border-cyan-400 rounded px-4 py-2 text-sm font-semibold hover:bg-cyan-400 hover:text-black button-animated transition">
                    Mehr erfahren
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Skills/Leistungen Section */}
      <section className="max-w-4xl mx-auto my-16 px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-cyan-400">Meine Skills & Leistungen</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-black border border-cyan-700 rounded-xl p-6 flex flex-col items-center text-center shadow-lg">
            <span className="text-4xl mb-4">💻</span>
            <h3 className="text-xl font-semibold mb-2 text-cyan-300">Webentwicklung</h3>
            <p className="text-gray-300">Moderne Websites & Webapps mit Next.js, React, TypeScript, TailwindCSS.</p>
          </div>
          <div className="bg-black border border-cyan-700 rounded-xl p-6 flex flex-col items-center text-center shadow-lg">
            <span className="text-4xl mb-4">🎨</span>
            <h3 className="text-xl font-semibold mb-2 text-cyan-300">UI/UX Design</h3>
            <p className="text-gray-300">Ästhetische, benutzerfreundliche Oberflächen – von der Idee bis zum Prototypen.</p>
          </div>
          <div className="bg-black border border-cyan-700 rounded-xl p-6 flex flex-col items-center text-center shadow-lg">
            <span className="text-4xl mb-4">🚀</span>
            <h3 className="text-xl font-semibold mb-2 text-cyan-300">SEO & Performance</h3>
            <p className="text-gray-300">Schnelle Ladezeiten, Google-Optimierung und Top-Core-Web-Vitals.</p>
          </div>
          <div className="bg-black border border-cyan-700 rounded-xl p-6 flex flex-col items-center text-center shadow-lg">
            <span className="text-4xl mb-4">🤝</span>
            <h3 className="text-xl font-semibold mb-2 text-cyan-300">Beratung & Support</h3>
            <p className="text-gray-300">Individuelle Beratung, transparente Kommunikation und zuverlässiger Support.</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 justify-center mt-6">
          {["Next.js", "React", "TypeScript", "TailwindCSS", "Figma", "SEO", "Performance", "UI/UX", "Beratung"].map(skill => (
            <span key={skill} className="bg-cyan-900/40 text-cyan-300 px-3 py-1 rounded-full text-sm font-mono">{skill}</span>
          ))}
        </div>
        <div className="text-center mt-8">
          <a href="/kontakt" className="inline-block bg-cyan-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-cyan-300 transition">
            Projekt anfragen
          </a>
        </div>
      </section>
    </section>
  );
}
