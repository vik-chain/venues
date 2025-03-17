"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

type Venue = {
  id: number
  name: string
  description: string
  capacity: string
  address: string
  upcomingShows: Array<{ name: string; date: string }>
  vibe: string
  imageUrl: string
}

type VenueCardProps = {
  venue: Venue
  isCurrent: boolean
}

export default function VenueCard({ venue, isCurrent }: VenueCardProps) {
  const [flipped, setFlipped] = useState(false)

  const handleClick = () => {
    if (isCurrent) {
      setFlipped(!flipped)
    }
  }

  return (
    <div
      className="w-[450px] sm:w-[500px] md:w-[600px] h-[500px] sm:h-[550px] md:h-[650px] cursor-pointer select-none"
      onClick={handleClick}
    >
      <div
        className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${
          flipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front of card */}
        <div
          className={`absolute w-full h-full backface-hidden rounded-2xl shadow-2xl overflow-hidden ${
            isCurrent ? "ring-2 ring-[#989FCE]/50" : ""
          } flex flex-col items-center justify-center select-none`}
        >
          {/* Background image with lighter overlay */}
          <div className="absolute inset-0 z-0">
            <Image
              src={venue.imageUrl}
              alt={venue.name}
              fill
              className="object-cover select-none"
              sizes="(max-width: 768px) 100vw, 600px"
              priority={isCurrent}
              quality={95}
              draggable="false"
            />
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
                {venue.upcomingShows.map((show, i) => (
                  <li key={i} className="border-b border-[#52414C]/20 pb-3">
                    <div className="font-medium text-base text-[#52414C]">{show.name}</div>
                    <div className="text-sm text-[#52414C]/70">{show.date}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Fixed position link at the bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-[#FFE9CE] to-[#FFE9CE]/80 backdrop-blur-sm">
            <Link 
              href={`/venues/${venue.id}`}
              className="block w-full py-4 bg-gradient-to-r from-[#52414C] to-[#989FCE] text-[#FFE9CE] text-base font-medium rounded-lg hover:from-[#989FCE] hover:to-[#52414C] transition-colors text-center shadow-md"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                window.location.href = `/venues/${venue.id}`;
              }}
            >
              View Full Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

