'use client'
import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Check } from 'lucide-react'

const treatments = [
  {
    title: "Po Aknebehandlung",
    price: "159,00€",
    addOn: "Aufpreis Jelly Maske 10,00€",
    description: "Gezielte Behandlung zur Klärung der Haut und Reduzierung von Unreinheiten und Akne im Po-Bereich für ein glattes und ebenmäßiges Hautbild.",
    benefits: [
      "Reduziert Akne und Entzündungen",
      "Klärt und beruhigt die Haut",
      "Verbessert das Hautbild sichtbar"
    ]
  },
  {
    title: "Aufhellung Intimbereiche",
    price: "159,00€",
    addOn: "Aufpreis Jelly Maske 10,00€",
    description: "Sanftes und effektives Peeling zur Aufhellung von hyperpigmentierten Stellen im Intimbereich, für einen gleichmäßigen und schönen Hautton.",
    benefits: [
        "Hellt Hyperpigmentierung auf",
        "Für einen ebenmäßigen Hautton",
        "Sichere und diskrete Behandlung"
    ]
  }
]

const ClearIntimPeelContent = () => {
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
            Clear Intim<span className="text-pink-400">Peel</span>
          </h1>
        </motion.div>

        {/* Treatments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 max-w-4xl mx-auto">
          {treatments.map((treatment, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="border border-neutral-800 p-8 flex flex-col"
            >
              <h2 className="text-2xl font-bold mb-3 text-pink-400">{treatment.title}</h2>
              <p className="text-neutral-400 text-sm mb-4">{treatment.description}</p>
              
              <ul className="space-y-2 mb-6 flex-grow">
                {treatment.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start">
                    <Check className="w-4 h-4 text-pink-400 mt-1 mr-3 flex-shrink-0" />
                    <span className="text-neutral-300">{benefit}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto">
                <p className="text-4xl font-bold mb-2">{treatment.price}</p>
                {treatment.addOn && <p className="text-sm text-neutral-400">{treatment.addOn}</p>}
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

export default ClearIntimPeelContent 