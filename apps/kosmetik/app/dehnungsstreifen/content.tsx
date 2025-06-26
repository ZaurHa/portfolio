'use client'
import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Check } from 'lucide-react'

const DehnungsstreifenContent = () => {
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
          <h1 className="text-5xl md:text-6xl font-bold mb-16">
            Dehnungs<span className="text-pink-400">streifen</span>
          </h1>
        </motion.div>

        {/* Treatment Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="border border-neutral-800 p-8 md:p-12 flex flex-col max-w-2xl w-full mb-16"
        >
          <h2 className="text-3xl font-bold mb-3 text-pink-400 text-center">Dehnungsstreifenbehandlung</h2>
          <p className="text-neutral-400 text-sm mb-6 text-center">(inkl. RF Microneedling + beruhigende Maske)</p>
          
          <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <Check className="w-5 h-5 text-pink-400 mt-1 mr-4 flex-shrink-0" />
                <span className="text-neutral-300">Sichtbare Reduzierung von Dehnungsstreifen</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-pink-400 mt-1 mr-4 flex-shrink-0" />
                <span className="text-neutral-300">Verbesserung der Hautelastizität und -festigkeit</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-pink-400 mt-1 mr-4 flex-shrink-0" />
                <span className="text-neutral-300">Stimulierung der körpereigenen Kollagenproduktion</span>
              </li>
          </ul>

          <div className="mt-auto text-center">
            <p className="text-lg text-neutral-300">Bauch</p>
            <p className="text-5xl font-bold mb-4">199,00€</p>
            <p className="text-sm text-neutral-400">Weitere Areale: Aufpreis 19,00€</p>
            <p className="text-sm text-neutral-400">Jelly Maske: Aufpreis 10,00€</p>
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

export default DehnungsstreifenContent 