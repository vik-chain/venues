"use client"

import { useState, useRef, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { enhanceAllVenuesWithTicketmaster } from "@/lib/ticketmaster-integration"

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

interface VenueCardProps {
  venue: Venue
  index?: number
  isActive?: boolean
  isCurrent?: boolean
  mousePosition?: { x: number, y: number }
}

export default function VenueCard({ 
  venue, 
  index = 0, 
  isActive = false, 
  isCurrent = false,
  mousePosition = { x: 0, y: 0 } 
}: VenueCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  
  // Reset flip state when active card changes
  useEffect(() => {
    if (!isActive && !isCurrent) {
      setIsFlipped(false)
    }
  }, [isActive, isCurrent])
  
  // Calculate rotation based on mouse position
  const calculateRotation = () => {
    if (!cardRef.current) return { x: 0, y: 0 }
    
    const card = cardRef.current.getBoundingClientRect()
    const cardCenterX = card.left + card.width / 2
    const cardCenterY = card.top + card.height / 2
    
    // Calculate rotation (limited to ±15 degrees)
    const rotateY = Math.min(15, Math.max(-15, (mousePosition.x - cardCenterX) / 20))
    const rotateX = Math.min(15, Math.max(-15, (cardCenterY - mousePosition.y) / 20))
    
    return { x: rotateX, y: rotateY }
  }
  
  const rotation = calculateRotation()
  const shouldAllowInteraction = isActive || isCurrent
  
  return (
    <motion.div
      ref={cardRef}
      className="venue-card perspective-1000 w-full h-[500px] cursor-pointer"
      onClick={() => shouldAllowInteraction && setIsFlipped(!isFlipped)}
      style={{
        transformStyle: "preserve-3d",
      }}
      animate={{
        rotateX: rotation.x,
        rotateY: rotation.y,
        scale: mousePosition.x > 0 ? 1.02 : 1,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Card Front */}
      <motion.div 
        className="absolute w-full h-full rounded-2xl overflow-hidden backface-hidden border-2 border-[#FFE9CE]/20 shadow-xl bg-gradient-to-b from-[#52414C] to-[#3A2E36]"
        style={{ 
          backfaceVisibility: "hidden",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          transition: "transform 0.6s"
        }}
      >
        <div className="relative h-full">
          <div className="absolute inset-0 bg-black/40 z-10" />
          <Image 
            src={venue.imageUrl || "/images/venue-placeholder.jpg"} 
            alt={venue.name}
            fill
            className="object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-white">
            <h3 className="text-2xl font-bold mb-2">{venue.name}</h3>
            <p className="text-sm opacity-90 mb-3">{venue.description}</p>
            <div className="flex flex-wrap gap-2">
              {venue.vibe.split(',').map((tag, i) => (
                <Badge key={i} variant="outline" className="bg-white/10 border-white/20">
                  {tag.trim()}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Card Back */}
      <motion.div 
        className="absolute w-full h-full rounded-2xl overflow-hidden backface-hidden border-2 border-[#FFE9CE]/20 shadow-xl bg-gradient-to-b from-[#3A2E36] to-[#52414C]"
        style={{ 
          backfaceVisibility: "hidden",
          transform: isFlipped ? "rotateY(0deg)" : "rotateY(-180deg)",
          transition: "transform 0.6s"
        }}
      >
        <div className="p-6 h-full flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-2xl font-bold text-[#FFE9CE]">{venue.name}</h3>
            <X 
              className="h-6 w-6 text-[#FFE9CE]/60 hover:text-[#FFE9CE] cursor-pointer" 
              onClick={(e) => {
                e.stopPropagation()
                setIsFlipped(false)
              }}
            />
          </div>
          
          <div className="flex items-center gap-2 mb-4 text-[#FFE9CE]/80">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">{venue.address}</span>
          </div>
          
          <div className="flex items-center gap-2 mb-6 text-[#FFE9CE]/80">
            <Users className="h-4 w-4" />
            <span className="text-sm">Capacity: {venue.capacity}</span>
          </div>
          
          <div className="mb-6">
            <h4 className="text-lg font-medium mb-2 text-[#FFE9CE]">Upcoming Shows</h4>
            <ul className="space-y-2">
              {venue.upcomingShows.slice(0, 3).map((show, i) => (
                <li key={i} className="text-sm text-[#FFE9CE]/80">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3 w-3 flex-shrink-0" />
                    <span>{show.name} - {show.date}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="mt-auto">
            <Link 
              href={`/venues/${venue.id}`}
              className="block w-full py-3 text-center bg-[#989FCE]/20 hover:bg-[#989FCE]/30 text-[#FFE9CE] rounded-lg transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              View Details
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

