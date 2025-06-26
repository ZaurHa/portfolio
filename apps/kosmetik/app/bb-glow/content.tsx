'use client'
import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const BBGlowContent = () => {
  return (
    <main className="bg-black text-white">
      <div className="container mx-auto px-4 py-20">
        
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-center mb-6">
            BB-<span className="text-pink-400">Glow</span>
          </h1>
          <p className="text-center text-neutral-300 text-lg max-w-3xl mx-auto mb-16">
            Das Meso-Needling für ein professionelles, semi-permanentes Make-Up.
          </p>
        </motion.div>

        {/* Intro Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="border border-neutral-800 p-8 md:p-12 mb-16"
        >
          <p className="text-lg text-neutral-200 leading-relaxed">
            Entdecken Sie unsere revolutionäre BB-Glow-Behandlung! Mit dieser innovativen Behandlung erzielen Sie ein ebenmäßigeres Hautbild, verfeinerte Poren und einen frischen Glow. Unsere patentierten Peptidkomplexe wirken den Zeichen der Hautalterung entgegen und korrigieren Pigmentierungen sowie dunkle Augenschatten. Egal welcher Hauttyp, die natürlichen und effektiven Farbpigmente passen sich individuell Ihrem Hautton an. Gönnen Sie sich 3-4 Behandlungen im wöchentlichen Abstand und genießen Sie ein ganzes Jahr lang das perfekte und ebenmäßige Hautbild ohne Make-up!
          </p>
        </motion.div>
        
        {/* Pricing Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="border border-neutral-800 p-8 h-full flex flex-col"
          >
            <h2 className="text-3xl font-bold mb-4 text-pink-400">Ohne Microneedling</h2>
            <p className="text-neutral-400 mb-6">(inkl. Voreinigung + BBGLOW)</p>
            <p className="text-5xl font-bold mt-auto">79,00€</p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="border border-neutral-800 p-8 h-full flex flex-col"
          >
            <h2 className="text-3xl font-bold mb-4 text-pink-400">Mit Microneedling</h2>
            <p className="text-neutral-400 mb-6">(inkl. Voreinigung + Microneedling + BBGLOW)</p>
            <p className="text-5xl font-bold mt-auto">89,00€</p>
          </motion.div>
        </div>

        {/* Info Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="border border-neutral-800 p-8"
          >
            <h3 className="text-3xl font-bold mb-6">Anwendungs<span className="text-pink-400">bereiche</span></h3>
            <p className="text-neutral-300 mb-4">BB Glow hilft gegen viele Probleme:</p>
            <ul className="list-disc list-inside space-y-2 text-neutral-300">
              <li>trockene Haut</li>
              <li>Augenringe</li>
              <li>Sommersprossen</li>
              <li>vergrößerte Poren</li>
              <li>Narben</li>
              <li>Rötungen</li>
              <li>Linien und Fältchen</li>
            </ul>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="border border-neutral-800 p-8"
          >
            <h3 className="text-3xl font-bold mb-6">Nach der <span className="text-pink-400">Behandlung</span></h3>
            <ul className="list-disc list-inside space-y-4 text-neutral-300">
              <li>Nach der BB-Glow Behandlung ist es wichtig, die Haut vor direkter Sonneneinstrahlung zu schützen. Tragen Sie einen breitkrempigen Hut oder verwenden Sie einen Sonnenschutz mit hohem LSF, um Pigmentveränderungen zu vermeiden.</li>
              <li>Vermeiden Sie für die nächsten 24 Stunden nach der Behandlung den Kontakt mit Wasser und starken Reinigungsprodukten, um die Haut nicht zu irritieren.</li>
              <li>Tragen Sie für ein optimales Ergebnis keine starken Make-up-Produkte auf und lassen Sie die Haut atmen, um die besten Ergebnisse zu erzielen.</li>
            </ul>
          </motion.div>
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

export default BBGlowContent 