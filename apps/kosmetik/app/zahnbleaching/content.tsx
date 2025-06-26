'use client'
import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Check } from 'lucide-react'

const ZahnbleachingContent = () => {
  return (
    <main className="bg-black text-white">
      <div className="container mx-auto px-4 py-20 flex flex-col items-center">

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Zahn<span className="text-pink-400">bleaching</span>
          </h1>
          <p className="text-center text-neutral-300 text-lg max-w-3xl mx-auto mb-16">
            Professionelles Zahnbleaching für ein strahlendes Lächeln. Unsere sanfte Methode hellt Ihre Zähne auf und sorgt für ein selbstbewusstes Auftreten.
          </p>
        </motion.div>

        {/* Treatment Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="border border-neutral-800 p-8 md:p-12 flex flex-col max-w-2xl w-full mb-16"
        >
          <p className="text-neutral-300 leading-relaxed mb-8">
            Unser professionelles Zahnbleaching ist eine sichere und effektive Methode, um Ihre Zähne aufzuhellen. Die Behandlung wird individuell auf Ihre Zähne abgestimmt und sorgt für natürliche, lang anhaltende Ergebnisse.
          </p>
          
          <div className="mt-auto text-center">
            <p className="text-lg text-neutral-300">Behandlungsdauer: ca. 45-60 min</p>
            <p className="text-5xl font-bold mt-2">79,00€</p>
          </div>
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

export default ZahnbleachingContent 