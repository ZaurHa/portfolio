'use client'
import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Check } from 'lucide-react'

const treatments = [
  {
    title: "Lasertherapie Pigmentflecken",
    price: "99,00€",
    addOn: "Aufpreis + 10,00€ Jelly Mask",
    description: "(inkl. Voreinigung, Glow Peel, IPL Laserbehandlung & Tuchmaske).",
    benefits: [
      "Minimiert unerwünschte Hautverfärbungen",
      "Nutzt moderne IPL-Lasertechnologie",
      "Sorgt für einen harmonischen Hautton"
    ]
  },
  {
    title: "Anti Pigment Peel & Microneedling",
    price: "129,00€",
    addOn: "Aufpreis +10,00€ Jelly Mask oder Goldmaske",
    description: "(inkl. Voreinigung, Microneedling, Glow Peel, Anti Pigment Peel, Tuchmaske & Lifting).",
    benefits: [
        "Kombiniert Peeling & Microneedling",
        "Sichtbare Verbesserung der Pigmentierung",
        "Inklusive straffendem Lifting-Effekt"
    ]
  }
]

const PigmentfleckenContent = () => {
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
            Pigment<span className="text-pink-400">flecken</span>
          </h1>
           <p className="text-center text-gray-300 text-lg max-w-3xl mx-auto mb-16">
            Erleben Sie, wie Ihre Haut strahlend schön wird, frei von störenden Flecken.
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
           Mit der Pigmentfleckenbehandlung werden unerwünschte Hautverfärbungen und dunkle Bereiche minimiert, um einen harmonischen Hautton zu schaffen. Ich passe die Behandlung präzise an die individuellen Bedürfnisse Ihrer Haut an und erreichen damit eine sichtbare Verbesserung der Pigmentierung.
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

export default PigmentfleckenContent 