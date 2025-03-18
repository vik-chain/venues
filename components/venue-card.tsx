"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

type Venue = {
  id: number
  name: string
  description: string
  capacity: string
  address: string
  upcomingShows: Array<{ name: string; date: string; priceRange?: string; ticketUrl?: string }>
  vibe: string
  imageUrl: string
}

type VenueCardProps = {
  venue: Venue
  isCurrent: boolean
}

export default function VenueCard({ venue, isCurrent }: VenueCardProps) {
  const [flipped, setFlipped] = useState(false)
  const [showButton, setShowButton] = useState(false)
  const [imageError, setImageError] = useState(false)

  const handleFlip = () => {
    if (isCurrent) {
      setFlipped(true)
      // Delay showing the button until after the card has flipped
      setTimeout(() => {
        setShowButton(true)
      }, 350) // Half of the flip animation duration
    }
  }

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowButton(false) // Hide button first
    setTimeout(() => {
      setFlipped(false)
    }, 50) // Small delay before flipping back
  }

  const handleImageError = () => {
    // Only log in development
    if (process.env.NODE_ENV === 'development') {
      // This is a safer way to conditionally log
      // eslint-disable-next-line no-console
      console.error(`Failed to load image for ${venue.name}:`, venue.imageUrl)
    }
    setImageError(true)
  }

  return (
    <div className="w-[450px] sm:w-[500px] md:w-[600px] h-[500px] sm:h-[550px] md:h-[650px] cursor-pointer select-none relative">
      {/* Main card with 3D flip */}
      <div
        onClick={flipped ? undefined : handleFlip}
        className={`relative w-full h-full transition-transform duration-700 ease-in-out transform-style-3d ${
          flipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front of card */}
        <div
          className={`absolute w-full h-full backface-hidden rounded-2xl shadow-2xl overflow-hidden ${
            isCurrent ? "ring-2 ring-[#989FCE]/50" : ""
          } flex flex-col items-center justify-center select-none`}
        >
          {/* Background image with darker overlay */}
          <div className="absolute inset-0 z-0">
            {imageError ? (
              // Fallback for image error
              <div 
                className="w-full h-full bg-[#52414C]"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFE9CE',
                  fontSize: '1.5rem',
                  textAlign: 'center',
                  padding: '2rem'
                }}
              >
                {venue.name}
              </div>
            ) : (
              <Image
                src={venue.imageUrl}
                alt={venue.name}
                fill
                className="object-cover select-none"
                sizes="(max-width: 768px) 100vw, 600px"
                priority={isCurrent}
                quality={95}
                draggable="false"
                onError={handleImageError}
              />
            )}
            {/* Darker gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#52414C]/90 via-[#52414C]/40 to-[#52414C]/20"></div>
          </div>
          
          <div className="relative z-10 px-10 py-8 mt-auto w-full select-none">
            <h2 className="text-4xl font-bold text-[#FFE9CE] text-center mb-4 drop-shadow-lg">{venue.name}</h2>
            <p className="text-[#FFE9CE]/90 text-center mb-6 text-lg line-clamp-2">{venue.description}</p>
            
            <div className="flex justify-center gap-3 mb-2">
              {venue.vibe.split(", ").slice(0, 3).map((tag, i) => (
                <Badge key={i} variant="outline" className="bg-[#989FCE]/20 backdrop-blur-sm text-[#FFE9CE] border-[#989FCE]/30 text-sm px-4 py-1">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div className="absolute w-full h-full backface-hidden bg-gradient-to-b from-[#FFE9CE] to-[#FFE9CE]/90 rounded-2xl shadow-2xl rotate-y-180 overflow-hidden backdrop-blur-sm select-none">
          {/* Close button */}
          <button 
            onClick={handleClose}
            className="absolute top-4 right-4 z-20 bg-[#52414C]/30 hover:bg-[#52414C]/50 text-[#52414C] rounded-full p-1.5 transition-colors"
            aria-label="Close details"
          >
            <X className="h-5 w-5" />
          </button>
          
          <div className="p-8 h-full overflow-y-auto pb-24">
            <h2 className="text-3xl font-bold text-[#52414C] mb-4">{venue.name}</h2>
            <p className="text-[#52414C]/80 mb-6 text-base">{venue.description}</p>

            <div className="flex items-center gap-3 mb-4">
              <MapPin className="h-5 w-5 text-[#52414C]" />
              <span className="text-base text-[#52414C]/80">{venue.address}</span>
            </div>

            <div className="flex items-center gap-3 mb-5">
              <Users className="h-5 w-5 text-[#52414C]" />
              <span className="text-base text-[#52414C]/80">Capacity: {venue.capacity}</span>
            </div>

            <div className="mb-5">
              <h3 className="text-base font-semibold mb-3 text-[#52414C]">Vibe</h3>
              <div className="flex flex-wrap gap-2">
                {venue.vibe.split(", ").map((tag, i) => (
                  <Badge key={i} variant="outline" className="bg-[#989FCE]/20 text-[#52414C] border-[#989FCE]/40 text-sm px-3 py-1">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-base font-semibold mb-3 flex items-center gap-2 text-[#52414C]">
                <Calendar className="h-4 w-4" />
                Upcoming Shows
              </h3>
              <ul className="space-y-3">
                {venue.upcomingShows.map((show, index) => (
                  <li key={index} className="border-b border-[#52414C]/20 pb-3">
                    <div className="font-medium text-base text-[#52414C]">{show.name}</div>
                    <div className="text-sm text-[#52414C]/70">{show.date}</div>
                    
                    {/* Add price and ticket link */}
                    <div className="mt-1 flex justify-between items-center">
                      {show.priceRange && (
                        <span className="text-[#989FCE] text-xs">
                          {show.priceRange}
                        </span>
                      )}
                      
                      {show.ticketUrl && (
                        <a 
                          href={show.ticketUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="bg-[#989FCE]/20 hover:bg-[#989FCE]/40 text-[#52414C] text-xs px-2 py-1 rounded-full transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Buy Tickets
                        </a>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Completely separate link outside the 3D transform with transition */}
      <div 
        className={`absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-[#FFE9CE] to-[#FFE9CE]/80 backdrop-blur-sm z-50 pointer-events-auto transition-opacity duration-300 ease-in-out ${
          showButton ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <Link 
          href={`/venues/${venue.id}`}
          passHref
          legacyBehavior
        >
          <a className="block w-full py-4 bg-gradient-to-r from-[#52414C] to-[#989FCE] text-[#FFE9CE] text-base font-medium rounded-lg hover:from-[#989FCE] hover:to-[#52414C] transition-colors shadow-md flex items-center justify-center cursor-pointer">
            View Full Details
          </a>
        </Link>
      </div>
    </div>
  )
}

