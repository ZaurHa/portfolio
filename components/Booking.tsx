'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Instagram, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import { FaWhatsapp, FaInstagram } from 'react-icons/fa'

const Booking = () => {
  return (
    <motion.section 
      id="contact" 
      className="py-20 md:py-32 bg-black"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Lass uns deine Beauty-Reise starten
          </h2>
          <p className="text-lg text-neutral-300 max-w-3xl mx-auto">
            Bereit für deine Transformation? Ich bin nur eine Nachricht entfernt. Wähle deinen Lieblingsweg und lass uns gemeinsam deine Schönheitsziele erreichen.
          </p>
        </div>

        <div className="bg-neutral-900/50 border border-neutral-800 p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            
            {/* Preferred Contact */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-white mb-6">Schnell & persönlich</h3>
              <div className="space-y-4">
                <Link href="https://wa.me/4915159414259" target="_blank" className="block w-full text-center p-6 bg-green-500 text-white font-bold text-lg transition-transform hover:scale-105 flex items-center justify-center space-x-3">
                  <MessageCircle className="w-7 h-7" /> 
                  <span>WhatsApp Chat starten</span>
                </Link>
                <Link href="https://www.instagram.com/zaira.beautyface/" target="_blank" className="block w-full text-center p-6 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-bold text-lg transition-transform hover:scale-105 flex items-center justify-center space-x-3">
                  <Instagram className="w-7 h-7" />
                  <span>Instagram Nachricht</span>
                </Link>
              </div>
               <p className="text-neutral-400 mt-6 text-sm">
                Diese Wege sind am schnellsten und persönlichsten. Ich antworte dir innerhalb weniger Minuten.
              </p>
            </motion.div>

            {/* Other Contact Info */}
            <motion.div
               initial={{ opacity: 0, x: 50 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.6, delay: 0.2 }}
               viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-white mb-6">Alle Kontaktdaten</h3>
              <div className="space-y-5">
                  <div className="flex items-start space-x-4">
                    <Phone className="w-6 h-6 text-primary-400 mt-1" />
                    <div>
                      <h4 className="font-semibold text-white">Telefon</h4>
                      <p className="text-neutral-400 hover:text-primary-400 transition-colors"><a href="tel:+4915159414259">+49 1515 9414259</a></p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Mail className="w-6 h-6 text-primary-400 mt-1" />
                    <div>
                      <h4 className="font-semibold text-white">E-Mail</h4>
                      <p className="text-neutral-400 hover:text-primary-400 transition-colors"><a href="mailto:zaira.beauty.face@gmail.com">zaira.beauty.face@gmail.com</a></p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <MapPin className="w-6 h-6 text-primary-400 mt-1" />
                    <div>
                      <h4 className="font-semibold text-white">Studio</h4>
                      <p className="text-neutral-400">Johannispl. 10, 82538 Geretsried</p>
                    </div>
                  </div>
              </div>
            </motion.div>
          </div>
        </div>
        
      </div>
    </motion.section>
  )
}

export default Booking 