'use client'
import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Check } from 'lucide-react'

const treatments = [
  {
    title: "Luxury Collagenbehandlung",
    price: "89,00€",
    addOn: "Aufpreis 10,00€ Jelly Maske",
    description: "(inkl. Voreinigung, Hyaluron, Collagenbehandlung, Lifting & Tuchmaske).",
    benefits: [
      "Füllt die Kollagenspeicher auf",
      "Sorgt für pralle, jugendliche Haut",
      "Intensive Feuchtigkeitsversorgung"
    ]
  },
  {
    title: "Luxury Lifting",
    price: "89,00€",
    addOn: "Aufpreis 10,00€ Jelly Maske",
    description: "(inkl. Voreinigung, Hyaluron, RF-Lifting, Ultraschall & Tuchmaske).",
    benefits: [
        "Sofortiger Straffungseffekt",
        "Stimuliert die Kollagenproduktion",
        "Verbessert die Hautfestigkeit"
    ]
  },
  {
    title: "Das Schälkur 100% natural",
    price: "159,00€",
    addOn: "Aufpreis 10,00€ Jelly Maske",
    description: "(inkl. Reinigung, Glow Peel & Tuchmaske).",
    benefits: [
        "Intensive Hauterneuerung auf Naturbasis",
        "Reduziert Unreinheiten und Pigmentflecken",
        "Sorgt für einen reinen, frischen Teint"
    ]
  },
  {
    title: "Luxury Aquafacial",
    price: "119,00€",
    addOn: "+19€ Ultra Lifting & Jelly Mask / +89€ Glow Ampulle, Carboxy & Jelly Mask",
    description: "(inkl. Aquafacial Gesichtsreinigung, Hyaluron & Tuchmaske).",
    benefits: [
        "Tiefenreinigung und sanftes Peeling",
        "Versorgt die Haut mit wertvollen Wirkstoffen",
        "Für ein klares, strahlendes Hautbild"
    ]
  },
  {
    title: "Yellow Peel",
    price: "189,00€",
    addOn: "Neue Haut in 10 Tagen",
    description: "(inkl. Glow Peel & Jelly Mask).",
    benefits: [
        "Starke und effektive Hauterneuerung",
        "Wirkt gegen starke Pigmentierung & Narben",
        "Sichtbar verbessertes Hautbild"
    ]
  }
]

const GesichtsbehandlungContent = () => {
  return (
    <main className="bg-black text-white">
      <div className="container mx-auto px-4 py-20">

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Gesichts<span className="text-pink-400">behandlungen</span>
          </h1>
           <p className="text-center text-gray-300 text-lg max-w-3xl mx-auto mb-16">
            Rundum-Pakete für ein strahlendes und jugendliches Hautbild.
          </p>
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
              
              <ul className="space-y-2 mb-6 flex-grow">
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
        
        {/* Intro Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="border border-gray-800 p-8 md:p-12 mb-16"
        >
          <p className="text-lg text-gray-200 leading-relaxed text-center">
           Entspannen und verwöhnen Sie sich mit unseren Luxury Gesichtsbehandlungen. Von der Hydrofacial-Behandlung, die Ihre Haut tiefenreinigt und mit wertvollen Wirkstoffen versorgt, bis hin zur Microneedling-Behandlung, die Kollagen und Elastin stimuliert und das Bindegewebe stärkt – unsere Gesichtsbehandlungen bieten Ihnen ein Rundum-Paket für ein strahlendes und jugendliches Hautbild.
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

export default GesichtsbehandlungContent 