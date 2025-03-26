"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import VenueCard from "./venue-card"
import type { Venue } from "@/lib/api"

export default function VenueCarousel({ venues }: { venues: Venue[] }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [activeIndex, setActiveIndex] = useState(0)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  
  // Track mouse position
  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY })
  }
  
  // When a card is hovered, make it the active card after a short delay
  useEffect(() => {
    if (hoveredIndex !== null && hoveredIndex !== activeIndex) {
      const timer = setTimeout(() => {
        setActiveIndex(hoveredIndex)
      }, 300) // Short delay to prevent rapid changes when moving between cards
      
      return () => clearTimeout(timer)
    }
  }, [hoveredIndex, activeIndex])
  
  // Calculate card positions based on active index with curved arrangement
  const getCardPosition = (index: number) => {
    // Calculate the shortest path to the active index in a circular array
    const totalCards = venues.length
    let diff = index - activeIndex
    
    // Adjust diff to find the shortest path around the circle
    if (Math.abs(diff) > totalCards / 2) {
      diff = diff > 0 
        ? diff - totalCards 
        : diff + totalCards
    }
    
    // Parameters for the curved arrangement
    const radius = 800 // Radius of the imaginary circle
    const cardSpacing = 30 // Degrees between cards on the arc
    const angle = diff * cardSpacing * (Math.PI / 180) // Convert to radians
    
    // Calculate position on the arc
    const x = Math.sin(angle) * radius
    const z = (Math.cos(angle) * radius) - radius // Subtract radius to position cards in front
    
    // Calculate vertical offset (higher for cards further from center)
    const y = Math.abs(diff) * 20
    
    // Scale and z-index based on position
    const scale = 1 - Math.min(0.3, Math.abs(diff) * 0.1)
    const zIndex = totalCards - Math.abs(diff)
    
    // Rotation to face toward the center
    const rotate = diff * -10 // Negative to rotate cards inward
    
    return { x, y, z, scale, zIndex, rotate }
  }
  
  // Handle card selection with wrapping
  const selectCard = (index: number) => {
    setActiveIndex((index + venues.length) % venues.length)
  }
  
  // Handle navigation to next/previous card with wrapping
  const navigateCarousel = (direction: 'next' | 'prev') => {
    setActiveIndex(prevIndex => {
      if (direction === 'next') {
        return (prevIndex + 1) % venues.length
      } else {
        return (prevIndex - 1 + venues.length) % venues.length
      }
    })
  }
  
  return (
    <div 
      ref={carouselRef}
      className="relative h-full w-full overflow-visible flex items-center justify-center perspective-1500"
      onMouseMove={handleMouseMove}
      style={{ perspective: "1500px" }}
    >
      {/* Navigation arrows */}
      <button 
        className="absolute left-4 top-1/2 -translate-y-1/2 z-50 bg-[#FFE9CE]/20 hover:bg-[#FFE9CE]/30 rounded-full p-3 text-[#FFE9CE]"
        onClick={() => navigateCarousel('prev')}
        aria-label="Previous venue"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m15 18-6-6 6-6"/>
        </svg>
      </button>
      
      <button 
        className="absolute right-4 top-1/2 -translate-y-1/2 z-50 bg-[#FFE9CE]/20 hover:bg-[#FFE9CE]/30 rounded-full p-3 text-[#FFE9CE]"
        onClick={() => navigateCarousel('next')}
        aria-label="Next venue"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m9 18 6-6-6-6"/>
        </svg>
      </button>
      
      <div className="relative h-[650px] w-full transform-style-3d">
        {venues.map((venue, index) => {
          const position = getCardPosition(index)
          const isHovered = hoveredIndex === index
          
          return (
            <motion.div
              key={venue.id}
              className="absolute top-0 left-0 right-0 mx-auto w-[450px]"
              initial={false}
              animate={{
                x: `calc(50% - 225px + ${position.x}px)`,
                y: position.y,
                z: position.z,
                scale: isHovered ? position.scale * 1.05 : position.scale,
                rotateY: position.rotate,
                zIndex: isHovered ? 100 : position.zIndex,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
              onClick={() => selectCard(index)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{ 
                cursor: "pointer",
                transformStyle: "preserve-3d"
              }}
            >
              <VenueCard 
                venue={venue} 
                index={index}
                isActive={index === activeIndex}
                mousePosition={mousePosition}
              />
            </motion.div>
          )
        })}
      </div>
      
      {/* Card indicators */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {venues.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all ${
              index === activeIndex 
                ? "bg-[#FFE9CE] scale-125" 
                : "bg-[#FFE9CE]/30 hover:bg-[#FFE9CE]/50"
            }`}
            onClick={() => selectCard(index)}
            aria-label={`Go to venue ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

