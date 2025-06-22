'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { FaInstagram, FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const images = [
    { id: 1, src: '/images/peeling.webp', alt: 'Peeling Behandlung - Zaira Beauty' },
    { id: 2, src: '/images/gesichtsbehandlung.webp', alt: 'Gesichtsbehandlung - Zaira Beauty' },
    { id: 3, src: '/images/clearskin.webp', alt: 'Clear Skin Behandlung - Zaira Beauty' },
    { id: 4, src: '/images/antiaging.webp', alt: 'Anti-Aging Behandlung - Zaira Beauty' },
    { id: 5, src: '/images/fruchtsäurepeeling.webp', alt: 'Fruchtsäure Peeling - Zaira Beauty' },
    { id: 6, src: '/images/lashlifting.webp', alt: 'Lash Lifting Behandlung - Zaira Beauty' },
    { id: 7, src: '/images/Aquafacial.webp', alt: 'Aquafacial Behandlung - Zaira Beauty' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <section id="gallery" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Deine Transformationen
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Hier siehst du echte Ergebnisse meiner Kundinnen. Jede Transformation ist einzigartig und zeigt, was mit der richtigen Behandlung möglich ist.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {images.map((image, index) => (
            <motion.div
              key={image.id}
              variants={itemVariants}
              className="group relative overflow-hidden bg-gray-900 rounded-none cursor-pointer"
              onClick={() => setSelectedImage(image.id)}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="aspect-[4/5] relative">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-sm font-medium">Vergrößern</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
            Deine Transformation wartet auf dich
          </h3>
          <Link href="https://www.instagram.com/zaira.beautyface/" target="_blank" passHref>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary"
            >
              Jetzt Beratung anfragen
            </motion.button>
          </Link>
        </div>
      </div>

      {/* Modal für vergrößerte Bilder */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative max-w-4xl max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={`/images/${selectedImage}.webp`}
              alt={`Zaira Beauty - Instagram Beitrag ${selectedImage}`}
              width={800}
              height={1000}
              className="object-contain max-h-[90vh] w-auto"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300 transition-colors"
            >
              ✕
            </button>
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}

export default Gallery 