'use client'

import React from 'react'

const FlowerPetal = ({
  size = 'w-8 h-8',
  duration = 20,
  delay = 0,
  initialTop = '50%',
  color = 'text-pink-400/30',
  rotation = 0
}: {
  size?: string;
  duration?: number;
  delay?: number;
  initialTop?: string;
  color?: string;
  rotation?: number;
}) => {
  return (
    <div
      className="absolute top-0 left-0 w-full h-full animate-falling-petal"
      style={{
        top: initialTop,
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
        transform: `rotate(${rotation}deg)`,
      }}
    >
      <div className={`relative ${size} ${color} animate-sway`}>
        <svg viewBox="0 0 100 100" className="w-full h-full absolute">
          <path 
            d="M50 20 C 70 25, 75 40, 70 60 C 65 75, 50 80, 35 60 C 30 40, 35 25, 50 20 Z" 
            fill="currentColor" 
            className="animate-petal-glow"
          />
          <path 
            d="M50 25 C 60 30, 65 45, 60 55 C 55 65, 50 70, 40 55 C 35 45, 40 30, 50 25 Z" 
            fill="currentColor" 
            opacity="0.3"
          />
        </svg>
      </div>
    </div>
  )
}

const FlowerPetals = () => {
  const petalData = [
    { size: 'w-6 h-6', duration: 25, delay: 0, initialTop: '15%', color: 'text-pink-400/25', rotation: 15 },
    { size: 'w-4 h-4', duration: 30, delay: 3, initialTop: '40%', color: 'text-pink-300/20', rotation: -20 },
    { size: 'w-5 h-5', duration: 22, delay: 7, initialTop: '60%', color: 'text-pink-400/30', rotation: 45 },
    { size: 'w-8 h-8', duration: 35, delay: 12, initialTop: '80%', color: 'text-pink-300/25', rotation: -30 },
    { size: 'w-3 h-3', duration: 40, delay: 15, initialTop: '5%', color: 'text-pink-400/15', rotation: 60 },
    { size: 'w-7 h-7', duration: 28, delay: 18, initialTop: '90%', color: 'text-pink-300/20', rotation: -15 },
    { size: 'w-5 h-5', duration: 32, delay: 5, initialTop: '25%', color: 'text-pink-400/20', rotation: 30 },
    { size: 'w-6 h-6', duration: 27, delay: 10, initialTop: '75%', color: 'text-pink-300/25', rotation: -45 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {petalData.map((props, i) => (
        <FlowerPetal key={i} {...props} />
      ))}
    </div>
  )
}

export default FlowerPetals 