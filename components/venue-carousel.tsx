"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import VenueCard from "./venue-card"
import type { Venue } from "@/lib/api"

export default function VenueCarousel({ venues }: { venues: Venue[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [startX, setStartX] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  const goToNext = () => {
    if (isAnimating) return
    
    setIsAnimating(true)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % venues.length)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const goToPrevious = () => {
    if (isAnimating) return
    
    setIsAnimating(true)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + venues.length) % venues.length)
    setTimeout(() => setIsAnimating(false), 500)
  }

  // Handle drag events
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (isAnimating) return
    
    // Get the starting position
    if ('touches' in e) {
      setStartX(e.touches[0].clientX)
    } else {
      setStartX(e.clientX)
    }
  }

  const handleDragEnd = (e: React.MouseEvent | React.TouchEvent) => {
    if (isAnimating || startX === 0) return
    
    let endX: number
    
    if ('changedTouches' in e) {
      endX = e.changedTouches[0].clientX
    } else {
      endX = e.clientX
    }
    
    const diffX = endX - startX
    
    // If the drag was significant enough
    if (Math.abs(diffX) > 50) {
      if (diffX > 0) {
        goToPrevious()
      } else {
        goToNext()
      }
    }
    
    setStartX(0)
  }

  // Add event listeners for touch events
  useEffect(() => {
    const carousel = carouselRef.current
    if (!carousel) return
    
    const touchStartHandler = (e: TouchEvent) => {
      handleDragStart(e as unknown as React.TouchEvent)
    }
    
    const touchEndHandler = (e: TouchEvent) => {
      handleDragEnd(e as unknown as React.TouchEvent)
    }
    
    carousel.addEventListener('touchstart', touchStartHandler)
    carousel.addEventListener('touchend', touchEndHandler)
    
    return () => {
      carousel.removeEventListener('touchstart', touchStartHandler)
      carousel.removeEventListener('touchend', touchEndHandler)
    }
  }, [handleDragStart, handleDragEnd])

  return (
    <div 
      className="relative w-full h-full select-none"
      ref={carouselRef}
      onMouseDown={handleDragStart}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
    >
      {/* Darker background gradient for blending */}
      <div className="absolute inset-0 bg-gradient-radial from-[#52414C]/30 to-black z-0"></div>
      
      {/* Navigation buttons */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-[#52414C]/60 hover:bg-[#52414C]/80 text-[#FFE9CE] p-4 rounded-full backdrop-blur-sm transition-all"
        aria-label="Previous venue"
      >
        <ChevronLeft className="h-7 w-7" />
      </button>
      
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-[#52414C]/60 hover:bg-[#52414C]/80 text-[#FFE9CE] p-4 rounded-full backdrop-blur-sm transition-all"
        aria-label="Next venue"
      >
        <ChevronRight className="h-7 w-7" />
      </button>
      
      {/* Carousel indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
        {venues.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (isAnimating) return
              setIsAnimating(true)
              setCurrentIndex(index)
              setTimeout(() => setIsAnimating(false), 500)
            }}
            className={`h-3 rounded-full transition-all ${
              index === currentIndex 
                ? "bg-[#989FCE] w-8" 
                : "bg-[#FFE9CE]/40 w-3 hover:bg-[#FFE9CE]/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Cards container with perspective */}
      <div className="relative w-full max-w-7xl mx-auto h-full flex items-center justify-center perspective-1000 select-none">
        {venues.map((venue, index) => {
          // Only render the current card and the ones immediately before and after
          const isVisible =
            index === currentIndex ||
            index === (currentIndex + 1) % venues.length ||
            index === (currentIndex - 1 + venues.length) % venues.length

          if (!isVisible) return null

          // Calculate position and z-index
          let position = "left-1/2 -translate-x-1/2"
          let zIndex = 10
          let opacity = 1
          let scale = 1
          let blur = ""

          if (index !== currentIndex) {
            if (index === currentIndex + 1 || (currentIndex === venues.length - 1 && index === 0)) {
              position = "left-[85%] -translate-x-1/2"
              zIndex = 5
              opacity = 0.5
              scale = 0.8
              blur = "blur-[2px]"
            } else {
              position = "left-[15%] -translate-x-1/2"
              zIndex = 5
              opacity = 0.5
              scale = 0.8
              blur = "blur-[2px]"
            }
          }

          return (
            <div
              key={venue.id}
              className={`absolute ${position} transition-all duration-500 ease-in-out ${blur} select-none`}
              style={{
                zIndex,
                opacity,
                transform: `translateX(-50%) scale(${scale})`,
              }}
            >
              <VenueCard venue={venue} isCurrent={index === currentIndex} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

