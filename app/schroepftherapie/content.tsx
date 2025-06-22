'use client'
import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Check } from 'lucide-react'

const treatments = [
  {
    title: "Schröpfmassage Medical",
    price: "49,00€",
    description: "Eine intensive Therapie zur Lockerung von Verspannungen und zur Linderung von Schmerzen.",
    benefits: [
      "Fördert die Durchblutung des Gewebes",
      "Regt den Lymphfluss an",
      "Effektiv gegen hartnäckige Verspannungen"
    ]
  },
  {
    title: "Anti-Migräne Massage",
    price: "29,00€",
    description: "Eine spezielle Massagetechnik zur Linderung von Kopfschmerzen und Migräne-Symptomen.",
    benefits: [
        "Löst Verspannungen im Nacken- & Kopfbereich",
        "Kann die Häufigkeit von Migräneanfällen reduzieren",
        "Fördert tiefe Entspannung"
    ]
  }
]

const SchroepftherapieContent = () => {
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
            Schröpf<span className="text-pink-400">therapie</span>
          </h1>
           <p className="text-center text-gray-300 text-lg max-w-3xl mx-auto mb-16">
            Gezielte Behandlungen zur Linderung von Schmerzen und zur Förderung der Durchblutung.
          </p>
        </motion.div>

        {/* Treatments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 max-w-4xl mx-auto">
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

export default SchroepftherapieContent