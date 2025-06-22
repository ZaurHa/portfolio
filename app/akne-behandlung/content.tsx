'use client'
import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Check } from 'lucide-react'

const treatments = [
  {
    title: "FruchtsäurePeel / Anti Acne Peeling",
    price: "129,00€",
    addOn: "Aufpreis Jelly Mask 10,00€",
    description: "(inkl. Voreinigung+FruchsäurePeel & Microneedling + Tuchmaske).",
    benefits: [
      "Hilft bei Pigmentflecken & Akne",
      "Fördert die Hauterneuerung",
      "Für verschiedene Hauttypen geeignet"
    ]
  },
  {
    title: "Vampirlifting / Microneedling",
    price: "199,00€",
    description: "(inkl. Voreinigung+Microneedling + Vampirlifting & Jelly Mask).",
    benefits: [
        "Glättet und minimiert Fältchen",
        "Verleiht einen strahlenden Glow",
        "Körpereigenes Plasma, 100% natürlich"
    ]
  },
  {
    title: "Pur Microneedling",
    price: "79,00€",
    addOn: "Aufpreis Jelly Mask 10,00€",
    description: "(inkl. Microneedling + Tuchmaske).",
    benefits: [
        "Reduziert Narben und Akne",
        "Glättet Falten & verbessert das Hautbild",
        "Erhöht die Hautelastizität"
    ]
  },
  {
    title: "Luxury Aquafacial & Carboxytherapie",
    price: "109,00€ + 89,00€",
    addOn: "Aufpreis Jelly Mask 10,00€",
    description: "(inkl. Aquafacial Gesichtsreinigung + Tuchmaske).",
    benefits: [
        "Minimiert Falten und feine Linien",
        "Wirkt gegen verstopfte Poren & Akne",
        "Verbessert Rosazea & Hyperpigmentierung"
    ]
  },
  {
    title: "Das Schälkur 100% natural",
    price: "159,00€",
    addOn: "Aufpreis Jelly Mask 10,00€",
    description: "Natürliches Glow Peel (inkl. Reinigung + Tuchmaske) für eine tiefgehende Erneuerung.",
    benefits: [
        "100% natürliche Inhaltsstoffe",
        "Intensive Hauterneuerung (Schälkur)",
        "Sorgt für einen frischen Glow"
    ]
  },
  {
    title: "Clear Skin Treatment",
    price: "189,00€",
    addOn: "Aufpreis Jelly Maske 10,00€",
    description: "(Vergleichbar mit Co2 Laser aber viel schonender). Inkl. Glow Peel, Nano- & Microneedling.",
    benefits: [
        "Schonende Alternative zum CO2 Laser",
        "Klärt das Hautbild tiefenwirksam",
        "Kombiniert Glow Peel & Microneedling"
    ]
  },
  {
    title: "RF Microneedling Königsklasse",
    price: "199,00€",
    addOn: "Aufpreis Peeling 89,00€ und Jelly Maske 10,00€",
    description: "(inkl. Vorreinigung, Glow Peel, RF Microneedling & Maske).",
    benefits: [
        "Königsklasse der Hautverjüngung",
        "Wirkt effektiv gegen tiefe Narben",
        "Glättet die Hautstruktur nachhaltig"
    ]
  }
]

const AkneContent = () => {
  return (
    <main className="bg-black text-white">
      <div className="container mx-auto px-4 py-20">

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-center mb-16">
            Akne & <span className="text-pink-400">Aknenarben</span>
          </h1>
        </motion.div>

        {/* Treatments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {treatments.map((treatment, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="border border-gray-800 p-8 flex flex-col"
            >
              <h2 className="text-2xl font-bold mb-3 text-pink-400">{treatment.title}</h2>
              <p className="text-gray-400 text-sm mb-4">{treatment.description}</p>
              
              <ul className="space-y-2 mb-6">
                {treatment.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start">
                    <Check className="w-4 h-4 text-pink-400 mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-300">{benefit}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto">
                <p className="text-4xl font-bold mb-2">{treatment.price}</p>
                {treatment.addOn && <p className="text-sm text-gray-400">{treatment.addOn}</p>}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="border border-gray-800 p-8 md:p-12 mb-16"
        >
          <h3 className="text-3xl font-bold mb-4">Gezielte Aknenarben<span className="text-pink-400">behandlung</span></h3>
          <p className="text-lg text-gray-200 leading-relaxed">
            Wir verstehen, wie Aknenarben das Selbstbewusstsein beeinflussen können. Unsere gezielte Aknenarbenbehandlung wirkt effektiv gegen Narben und verbessert das Hautbild. Wir verwenden spezielle Techniken und Wirkstoffe, um die Hautstruktur zu glätten und das Erscheinungsbild von Aknenarben zu minimieren.
          </p>
        </motion.div>

        {/* Back to Home Link */}
        <div className="text-center">
            <Link href="/#services" className="text-pink-400 hover:text-pink-500 transition-colors duration-300 text-lg">
              &larr; Zurück zu allen Services
            </Link>
        </div>

      </div>
    </main>
  )
}

export default AkneContent 