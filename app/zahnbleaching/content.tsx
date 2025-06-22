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
          <p className="text-center text-gray-300 text-lg max-w-3xl mx-auto mb-16">
            Entdecken Sie den Weg zu Ihrem strahlendsten Lächeln.
          </p>
        </motion.div>

        {/* Treatment Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="border border-gray-800 p-8 md:p-12 flex flex-col max-w-2xl w-full mb-16"
        >
          <p className="text-gray-300 leading-relaxed mb-8">
            Ein blendend weißes Lächeln steht für Jugend, Anziehungskraft und Eleganz. Allerdings können Lebensgewohnheiten wie der Konsum von Kaffee oder Tabak, sowie genetische Faktoren, die Zahnfarbe im Laufe der Zeit beeinflussen. Solche Verfärbungen können das Selbstwertgefühl negativ beeinflussen. Ich nehme Ihre Sorgen ernst und möchte Ihnen das Vergnügen am Lächeln wieder schenken.
          </p>
          
          <div className="mt-auto text-center">
            <p className="text-lg text-gray-300">Behandlungsdauer: ca. 45-60 min</p>
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