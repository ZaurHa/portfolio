const skills = [
  "Next.js",
  "React",
  "TypeScript",
  "TailwindCSS",
  "Node.js",
  "MongoDB",
  "Figma",
  "Git",
  "JavaScript",
  "HTML/CSS",
  "REST APIs",
  "Responsive Design",
];

const experience = [
  {
    title: "Frontend Development",
    description: "Entwicklung moderner, responsiver Benutzeroberflächen mit React und Next.js"
  },
  {
    title: "Backend Development", 
    description: "API-Entwicklung und Datenbankdesign mit Node.js und MongoDB"
  },
  {
    title: "UI/UX Design",
    description: "Erstellung benutzerfreundlicher Designs mit Figma und TailwindCSS"
  },
  {
    title: "Performance Optimization",
    description: "Optimierung von Webanwendungen für beste Performance und SEO"
  }
];

export default function UeberMich() {
  return (
    <div className="max-w-4xl mx-auto mt-10">
      {/* Hero Section */}
      <div className="neumorph-card bg-black p-8 rounded-xl shadow-lg border border-[#23232a] flex flex-col md:flex-row items-center gap-8 mb-8">
        <img
          src="https://placehold.co/200x200/06b6d4/fff?text=Zaur"
          alt="Profilbild Zaur"
          className="w-48 h-48 rounded-full border-4 border-cyan-400 object-cover"
        />
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl font-bold text-cyan-400 mb-4">Zaur</h1>
          <p className="text-xl text-gray-300 mb-4">Full-Stack Webentwickler</p>
          <p className="text-gray-400 leading-relaxed">
            Hi, ich bin Zaur – ein leidenschaftlicher Webentwickler mit Fokus auf moderne, performante und ästhetische Webanwendungen. 
            Ich liebe es, innovative Lösungen zu bauen und stetig neue Technologien zu lernen. Meine Stärken liegen in der Entwicklung 
            von benutzerfreundlichen Interfaces und der Implementierung robuster Backend-Systeme.
          </p>
        </div>
      </div>

      {/* Skills Section */}
      <div className="neumorph-card bg-black p-8 rounded-xl shadow-lg border border-[#23232a] mb-8">
        <h2 className="text-2xl font-bold text-cyan-400 mb-6">Technische Fähigkeiten</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {skills.map((skill) => (
            <span key={skill} className="neumorph-badge text-cyan-400 px-3 py-2 rounded text-sm font-mono text-center hover:bg-cyan-400/20 transition">
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Experience Section */}
      <div className="bg-black p-8 rounded-xl shadow-lg border border-[#23232a] mb-8">
        <h2 className="text-2xl font-bold text-cyan-400 mb-6">Expertise</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {experience.map((exp) => (
            <div key={exp.title} className="neumorph-card p-4">
              <h3 className="text-lg font-semibold text-white mb-2">{exp.title}</h3>
              <p className="text-gray-400">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-black p-8 rounded-xl shadow-lg border border-[#23232a]">
        <h2 className="text-2xl font-bold text-cyan-400 mb-6 text-center">Kontakt</h2>
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          <a 
            href="https://github.com/ZaurHa" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition font-semibold"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub
          </a>
          <a 
            href="https://www.linkedin.com/in/zaur-hatuev-8559b91a1/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition font-semibold"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            LinkedIn
          </a>
          <a 
            href="mailto:zaur@brandwerkx.de" 
            className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition font-semibold"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M0 3v18h24V3H0zm21.518 2L12 12.713 2.482 5h19.036zM2 19V7.183l10 8.104 10-8.104V19H2z"/>
            </svg>
            E-Mail
          </a>
        </div>
      </div>
    </div>
  );
} 