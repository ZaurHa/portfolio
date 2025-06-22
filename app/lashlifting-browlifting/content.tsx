'use client'
import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Check } from 'lucide-react'

const treatments = [
  {
    title: "Hydra Lash Lifting",
    price: "49,00€",
    addOn: "Aufpreis Färben 10,00€",
    intro: "Keine Lust mehr auf Wimpernzange und -tusche? Nach dem Lash Lifting kannst du dir das für 5-8 Wochen sparen.",
    benefits: [
      "Verleiht den Wimpern perfekten Schwung",
      "Sorgt für einen natürlichen, wachen Augenaufschlag",
      "Hält 5-8 Wochen"
    ]
  },
  {
    title: "Beauty Browlift",
    price: "39,00€",
    description: "(inkl. Färben)",
    intro: "Hast du lückenhafte, dünne oder störrische Augenbrauen? Das Brow Lifting ist DIE Lösung!",
    benefits: [
        "Macht Brauen voller und gleichmäßiger",
        "Gleicht Asymmetrien aus",
        "Hält 4-6 Wochen"
    ]
  },
  {
    title: "Sweet Henna Brows",
    price: "39,00€",
    description: "",
    intro: "Eine natürliche Alternative zum klassischen Färben für definierte und langanhaltende Augenbrauen.",
    benefits: [
        "Färbt Haut und Härchen",
        "Natürliche Inhaltsstoffe",
        "Sorgt für einen Tattoo-Effekt"
    ]
  }
]

const LashBrowContent = () => {
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
          <h1 className="text-5xl md:text-6xl font-bold mb-16">
            Lashlifting & <span className="text-pink-400">Browlifting</span>
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
              <p className="text-gray-400 text-sm mb-4">{treatment.intro}</p>
              
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
                {treatment.description && <p className="text-sm text-gray-400">{treatment.description}</p>}
              </div>
            </motion.div>
          ))}
        </div>

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

export default LashBrowContent 