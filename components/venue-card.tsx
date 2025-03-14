"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users } from "lucide-react"

type Venue = {
  id: number
  name: string
  description: string
  capacity: string
  address: string
  upcomingShows: Array<{ name: string; date: string }>
  vibe: string
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
      className="w-[350px] sm:w-[400px] md:w-[450px] h-[400px] sm:h-[450px] md:h-[500px] cursor-pointer"
      onClick={handleClick}
    >
      <div
        className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${
          flipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front of card */}
        <div
          className={`absolute w-full h-full backface-hidden bg-amber-100 rounded-xl shadow-xl border-2 ${
            isCurrent ? "border-white" : "border-gray-400"
          } flex flex-col items-center justify-center p-6`}
        >
          <h2 className="text-2xl font-bold text-amber-900 text-center mb-4">{venue.name}</h2>

          {isCurrent && (
            <div className="absolute bottom-4 text-sm text-amber-700 bg-amber-200 px-3 py-1 rounded-full">
              Click to see details
            </div>
          )}
        </div>

        {/* Back of card */}
        <div className="absolute w-full h-full backface-hidden bg-amber-50 rounded-xl shadow-xl border-2 border-white rotate-y-180 overflow-hidden">
          <div className="p-4 h-full overflow-y-auto">
            <h2 className="text-xl font-bold text-amber-900 mb-2">{venue.name}</h2>
            <p className="text-amber-800 mb-4 text-sm">{venue.description}</p>

            <div className="flex items-center gap-2 mb-2">
              <MapPin className="h-4 w-4 text-amber-700" />
              <span className="text-xs text-amber-800">{venue.address}</span>
            </div>

            <div className="flex items-center gap-2 mb-3">
              <Users className="h-4 w-4 text-amber-700" />
              <span className="text-xs text-amber-800">Capacity: {venue.capacity}</span>
            </div>

            <div className="mb-3">
              <h3 className="text-sm font-semibold mb-1 text-amber-900">Vibe</h3>
              <div className="flex flex-wrap gap-1">
                {venue.vibe.split(", ").map((tag, i) => (
                  <Badge key={i} variant="outline" className="bg-amber-100 text-amber-800 border-amber-300 text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-1 flex items-center gap-1 text-amber-900">
                <Calendar className="h-3 w-3" />
                Upcoming Shows
              </h3>
              <ul className="space-y-1">
                {venue.upcomingShows.map((show, i) => (
                  <li key={i} className="border-b border-amber-200 pb-1">
                    <div className="font-medium text-xs">{show.name}</div>
                    <div className="text-xs text-amber-700">{show.date}</div>
                  </li>
                ))}
              </ul>
            </div>

            <button
              className="mt-3 w-full py-2 bg-amber-800 text-amber-50 text-sm font-medium rounded hover:bg-amber-700 transition-colors"
              onClick={(e) => {
                e.stopPropagation()
                alert(`View more details about ${venue.name}`)
              }}
            >
              View Full Details
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

