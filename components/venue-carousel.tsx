"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import VenueCard from "./venue-card"

// Sample venue data
const venues = [
  {
    id: 1,
    name: "Madison Square Garden",
    description: "The world's most famous arena",
    capacity: "20,789",
    address: "4 Pennsylvania Plaza, New York, NY 10001",
    upcomingShows: [
      { name: "Billy Joel", date: "June 15, 2025" },
      { name: "The Weeknd", date: "July 3, 2025" },
      { name: "Coldplay", date: "July 20, 2025" },
    ],
    vibe: "Iconic, Energetic, Massive",
  },
  {
    id: 2,
    name: "Radio City Music Hall",
    description: "Home of the Rockettes",
    capacity: "6,015",
    address: "1260 6th Ave, New York, NY 10020",
    upcomingShows: [
      { name: "Dave Chappelle", date: "May 25, 2025" },
      { name: "John Legend", date: "June 10, 2025" },
      { name: "Alicia Keys", date: "June 22, 2025" },
    ],
    vibe: "Historic, Elegant, Theatrical",
  },
  {
    id: 3,
    name: "Brooklyn Steel",
    description: "Industrial-chic concert venue",
    capacity: "1,800",
    address: "319 Frost St, Brooklyn, NY 11222",
    upcomingShows: [
      { name: "Tame Impala", date: "May 30, 2025" },
      { name: "Glass Animals", date: "June 5, 2025" },
      { name: "Khruangbin", date: "June 18, 2025" },
    ],
    vibe: "Industrial, Intimate, Hip",
  },
  {
    id: 4,
    name: "Bowery Ballroom",
    description: "Intimate downtown music venue",
    capacity: "575",
    address: "6 Delancey St, New York, NY 10002",
    upcomingShows: [
      { name: "Japanese Breakfast", date: "May 22, 2025" },
      { name: "Mitski", date: "June 8, 2025" },
      { name: "Car Seat Headrest", date: "June 25, 2025" },
    ],
    vibe: "Intimate, Historic, Underground",
  },
  {
    id: 5,
    name: "Apollo Theater",
    description: "Legendary Harlem landmark",
    capacity: "1,506",
    address: "253 W 125th St, New York, NY 10027",
    upcomingShows: [
      { name: "Amateur Night", date: "Every Wednesday" },
      { name: "D'Angelo", date: "June 12, 2025" },
      { name: "Lauryn Hill", date: "July 8, 2025" },
    ],
    vibe: "Historic, Soulful, Cultural",
  },
]

export default function VenueCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [startX, setStartX] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [dragThreshold] = useState(50) // Minimum drag distance to trigger navigation
  const containerRef = useRef<HTMLDivElement>(null)

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? venues.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === venues.length - 1 ? 0 : prev + 1))
  }

  // Mouse events for desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setStartX(e.clientX)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return

    const currentX = e.clientX
    const diff = startX - currentX

    if (Math.abs(diff) > dragThreshold) {
      if (diff > 0) {
        handleNext()
      } else {
        handlePrev()
      }
      setIsDragging(false)
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Touch events for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    setStartX(e.touches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return

    const currentX = e.touches[0].clientX
    const diff = startX - currentX

    if (Math.abs(diff) > dragThreshold) {
      if (diff > 0) {
        handleNext()
      } else {
        handlePrev()
      }
      setIsDragging(false)
    }
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  // Add and remove event listeners
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Add global event listeners to catch events outside the container
    window.addEventListener("mouseup", handleMouseUp)
    window.addEventListener("touchend", handleTouchEnd)

    return () => {
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("touchend", handleTouchEnd)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center select-none"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ cursor: isDragging ? "grabbing" : "grab" }}
    >
      <div className="relative w-full max-w-4xl h-full flex items-center justify-center perspective-1000">
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

          if (index !== currentIndex) {
            if (index === currentIndex + 1 || (currentIndex === venues.length - 1 && index === 0)) {
              position = "left-[85%] -translate-x-1/2"
              zIndex = 5
              opacity = 0.7
              scale = 0.85
            } else {
              position = "left-[15%] -translate-x-1/2"
              zIndex = 5
              opacity = 0.7
              scale = 0.85
            }
          }

          return (
            <div
              key={venue.id}
              className={`absolute ${position} transition-all duration-500 ease-in-out`}
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

      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4 z-20">
        <Button
          variant="outline"
          size="icon"
          onClick={handlePrev}
          className="bg-black/50 backdrop-blur-sm text-white border-white/20 hover:bg-white/20"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={handleNext}
          className="bg-black/50 backdrop-blur-sm text-white border-white/20 hover:bg-white/20"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      <div className="absolute bottom-16 left-0 right-0 flex justify-center gap-2 z-20">
        {venues.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full ${index === currentIndex ? "bg-white" : "bg-white/30"}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  )
}

