'use client'

import React from 'react'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Services from '@/components/Services'
import Gallery from '@/components/Gallery'
import Pricing from '@/components/Pricing'
import Testimonials from '@/components/Testimonials'
import Booking from '@/components/Booking'

export default function Home() {
  return (
    <main className="bg-black">
      <Header />
      <Hero />
      <Services />
      <Gallery />
      <About />
      <Pricing />
      <Testimonials />
      <Booking />
    </main>
  )
} 