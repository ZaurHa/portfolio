import { notFound } from "next/navigation";

const projects = [
  {
    slug: "beauty-praxis",
    title: "Beauty Praxis Website",
    description: "Eine moderne, responsive Website für eine Beauty-Praxis mit verschiedenen Behandlungsseiten und Online-Buchungssystem.",
    tech: ["Next.js", "React", "TailwindCSS", "TypeScript"],
    image: "/images/beauty-praxis-preview.svg",
    details: "Diese Website wurde für eine Beauty-Praxis entwickelt und bietet eine moderne, benutzerfreundliche Oberfläche. Sie enthält verschiedene Behandlungsseiten wie Akne-Behandlung, Anti-Aging, BB-Glow und viele weitere. Die Website ist vollständig responsive und optimiert für alle Geräte. Features umfassen ein Online-Buchungssystem, eine Galerie mit Vorher-Nachher-Bildern, Preistabellen und eine Kontaktseite. Das Design ist elegant und professionell, passend für den Beauty-Bereich.",
    features: [
      "Responsive Design für alle Geräte",
      "Verschiedene Behandlungsseiten",
      "Online-Buchungssystem",
      "Galerie mit Vorher-Nachher-Bildern",
      "Preistabellen",
      "SEO-optimiert",
      "Schnelle Ladezeiten"
    ],
    liveUrl: "https://beauty-praxis.example.com",
    githubUrl: "https://github.com/username/beauty-praxis"
  },
  {
    slug: "ecommerce-shop",
    title: "E-Commerce Shop",
    description: "Ein performanter Online-Shop mit Warenkorb, Authentifizierung und Admin-Panel.",
    tech: ["Next.js", "TypeScript", "Stripe", "Prisma"],
    image: "/images/ecommerce-preview.svg",
    details: "Ein vollständiger E-Commerce Shop mit modernen Features wie Warenkorb, Benutzerauthentifizierung, Zahlungsintegration über Stripe und einem Admin-Panel für Produktverwaltung. Die Anwendung ist auf Performance und Skalierbarkeit optimiert.",
    features: [
      "Produktkatalog mit Kategorien",
      "Warenkorb-Funktionalität",
      "Benutzerauthentifizierung",
      "Stripe-Zahlungsintegration",
      "Admin-Panel",
      "Bestellverfolgung",
      "Responsive Design"
    ],
    liveUrl: "https://shop.example.com",
    githubUrl: "https://github.com/username/ecommerce-shop"
  },
  {
    slug: "blog-plattform",
    title: "Blog Plattform",
    description: "Eine skalierbare Blogging-Plattform mit Markdown-Support und SEO-Optimierung.",
    tech: ["Next.js", "MDX", "Vercel", "TailwindCSS"],
    image: "/images/blog-preview.svg",
    details: "Eine moderne Blogging-Plattform mit Markdown-Support, Syntax-Highlighting und umfassender SEO-Optimierung. Die Plattform ist deployment-ready für Vercel und bietet eine intuitive Benutzeroberfläche für Content Creator.",
    features: [
      "Markdown/MDX Support",
      "Syntax-Highlighting",
      "SEO-Optimierung",
      "Kategorien und Tags",
      "Suchfunktion",
      "Kommentarsystem",
      "Analytics Integration"
    ],
    liveUrl: "https://blog.example.com",
    githubUrl: "https://github.com/username/blog-platform"
  },
  {
    slug: "dashboard-app",
    title: "Dashboard App",
    description: "Ein interaktives Dashboard mit Datenvisualisierung und Echtzeit-Updates.",
    tech: ["React", "D3.js", "Node.js", "Socket.io"],
    image: "/images/dashboard-preview.svg",
    details: "Ein interaktives Dashboard mit erweiterten Datenvisualisierungen, Echtzeit-Updates über WebSockets und einer modernen Benutzeroberfläche. Perfekt für Business Intelligence und Datenanalyse.",
    features: [
      "Interaktive Charts und Grafiken",
      "Echtzeit-Daten-Updates",
      "Anpassbare Widgets",
      "Export-Funktionen",
      "Benutzerrollen und Berechtigungen",
      "Mobile Optimierung",
      "Dark/Light Mode"
    ],
    liveUrl: "https://dashboard.example.com",
    githubUrl: "https://github.com/username/dashboard-app"
  },
];

export default function ProjectDetail({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return notFound();

  return (
    <div className="max-w-4xl mx-auto">
      <img src={project.image} alt={project.title} className="w-full rounded-xl mb-6 shadow-lg" />
      <h1 className="text-3xl font-bold text-cyan-400 mb-2">{project.title}</h1>
      <p className="mb-4 text-gray-300">{project.description}</p>
      <div className="mb-6 flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <span key={t} className="bg-cyan-400/10 text-cyan-400 px-2 py-1 rounded text-xs font-mono">{t}</span>
        ))}
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-3">Über das Projekt</h2>
        <p className="text-white/90 leading-relaxed">{project.details}</p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-3">Features</h2>
        <ul className="grid md:grid-cols-2 gap-2">
          {project.features.map((feature) => (
            <li key={feature} className="flex items-center text-gray-300">
              <span className="text-cyan-400 mr-2">✓</span>
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex gap-4 mb-8">
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-block bg-cyan-400 text-black px-6 py-2 rounded font-semibold hover:bg-cyan-300 transition">
            Live Demo
          </a>
        )}
        {project.githubUrl && (
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-block text-cyan-400 border border-cyan-400 rounded px-6 py-2 font-semibold hover:bg-cyan-400 hover:text-black transition">
            GitHub
          </a>
        )}
      </div>

      <a href="/" className="inline-block text-cyan-400 border border-cyan-400 rounded px-4 py-2 text-sm font-semibold hover:bg-cyan-400 hover:text-black transition">← Zurück zur Übersicht</a>
    </div>
  );
} 